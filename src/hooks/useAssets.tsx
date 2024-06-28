'use client'

import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext
} from 'react';

export interface Asset {
  id: string;
  name: string;
  parentId: string | null
  locationId: string | null
  sensorType: string | null
  sensorId?: string
  status: string | null
  gatewayId?: string
}

type AssetsContextData = {
  assets: Asset[] | null;
  onSetAssets: (props: Asset[]) => void;
  assetSelected: Asset | null;
  onSetAssetSelected: (props: Asset) => void;
};

type AssetsProviderProps = {
  children: ReactNode;
};

const AssetsContext = createContext<AssetsContextData>({} as AssetsContextData);

export function AssetsProvider({ children }: AssetsProviderProps) {
  const [assets, setAssets] = React.useState<Asset[] | null>(null)
  const [assetSelected, setAssetSelected] = React.useState<Asset | null>(null)

  const onSetAssets = useCallback((props: Asset[]) => {
    setAssets(props)
  }, [])

  const onSetAssetSelected = useCallback((props: Asset) => {
    setAssetSelected(props)
  }, [])


  return (
    <AssetsContext.Provider
      value={{ assets, assetSelected, onSetAssets, onSetAssetSelected }}
    >
      {children}
    </AssetsContext.Provider>
  );
}

export function useAssets(): AssetsContextData {
  return useContext(AssetsContext);
}
