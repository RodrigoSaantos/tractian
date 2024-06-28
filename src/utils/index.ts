import { Asset } from "@/hooks/useAssets";
import { Location } from "@/hooks/useLocations";

type Args<T extends Function> = T extends (...args: infer R) => any ? R : never;

export function initials(name: string) {
  const [firstName, lastName] = name.split(" ");
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0);
}

export function callAllHandlers<T extends (event: any) => void>(
  ...fns: (T | undefined)[]
) {
  return function func(event: Args<T>[0]) {
    fns.some((fn) => {
      fn?.(event);
      return event?.defaultPrevented;
    });
  };
}


export interface AssetExtends extends Asset {
  children?: AssetExtends[];
}
export interface LocationExtends extends Location {
  children?: (LocationExtends | AssetExtends)[];
}

export function buildHierarchy(locations: Location[], assets: Asset[]) {
  // Função para construir a árvore de localizações
  function buildLocationTree(locations: LocationExtends[]): LocationExtends[] {
    const locationMap: { [key: string]: LocationExtends } = {};
    locations.forEach((location) => {
      location.children = [];
      locationMap[location.id] = location;
    });

    const rootLocations: LocationExtends[] = [];
    locations.forEach((location) => {
      if (location.parentId) {
        locationMap[location.parentId].children!.push(location);
      } else {
        rootLocations.push(location);
      }
    });

    return rootLocations;
  }

  // Função para adicionar ativos e componentes às localizações
  function addAssetsAndComponents(
    locationTree: LocationExtends[],
    assets: AssetExtends[]
  ): LocationExtends[] {
    const assetMap: { [key: string]: AssetExtends } = {};
    assets.forEach((asset) => {
      asset.children = [];
      assetMap[asset.id] = asset;
    });

    // Adicionar ativos e componentes à árvore
    assets.forEach((asset) => {
      if (asset.locationId) {
        const location = findLocationById(locationTree, asset.locationId);
        if (location) {
          location.children!.push(asset);
        }
      } else if (asset.parentId) {
        if (assetMap[asset.parentId]) {
          assetMap[asset.parentId].children!.push(asset);
        }
      }
    });

    return locationTree;
  }

  // Função auxiliar para encontrar localização por ID
  function findLocationById(
    tree: LocationExtends[],
    id: string
  ): LocationExtends | null {
    for (const node of tree) {
      if (node.id === id) return node;
      const found = findLocationById(node.children as LocationExtends[], id);
      if (found) return found;
    }
    return null;
  }

  const locationTree = buildLocationTree(locations);
  const completeTree = addAssetsAndComponents(locationTree, assets);

  // console.log(JSON.stringify(completeTree, null, 2));

  // Adiciona itens não vinculados em uma categoria separada
  function addUnlinkedAssetsAndComponents(
    locationTree: LocationExtends[],
    assets: AssetExtends[]
  ) {
    assets.forEach((asset) => {
      if (!asset.locationId && !asset.parentId) {
        locationTree.push(asset);
      }
    });
  }
  addUnlinkedAssetsAndComponents(completeTree, assets);
  return completeTree
}
