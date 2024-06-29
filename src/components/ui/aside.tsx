'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { Icons } from "../icons"
import { Input } from "./input"
import { Item } from "./item"
import { useCompanies } from "@/hooks/useCompanies"
import { useLocations } from "@/hooks/useLocations"
import { useAssets } from "@/hooks/useAssets"
import { LocationExtends, buildHierarchy } from "@/utils"

export interface SpanProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

const Aside = React.forwardRef<HTMLDivElement, SpanProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "aside"
    const { companySelected } = useCompanies();
    const { onSetLocations } = useLocations()
    const { onSetAssets } = useAssets()
    const [isLoading, setLoading] = React.useState(true)
    const [data, setData] = React.useState<LocationExtends[] | null>(null);

    React.useEffect(() => {
      if (!!companySelected) {
        setLoading(true)
        const fetchData = async () => {
          try {
            const locationsResponse = fetch(`https://fake-api.tractian.com/companies/${companySelected.id}/locations`).then(res => res.json());
            const assetsResponse = fetch(`https://fake-api.tractian.com/companies/${companySelected.id}/assets`).then(res => res.json());

            const [locationData, assetsData] = await Promise.all([locationsResponse, assetsResponse]);

            onSetLocations(locationData);
            onSetAssets(assetsData);
            setData(buildHierarchy(locationData, assetsData))
          } catch (err) {
            // setError(err);
          } finally {
            setLoading(false);
          }
        };

        fetchData();
      }
    }, [companySelected, onSetAssets, onSetLocations])

    return (
      <Comp
        className={cn('col-span-1 border rounded overflow-auto', className)}
        ref={ref}
        {...props}
      >
        <div className="h-11 w-full relative">
          <Input placeholder="Buscar Ativo ou Local" className="pr-11" />
          <Icons.search className="fill-card-foreground size-[14px] absolute right-5 top-0 bottom-0 m-auto pointer-events-none" />
        </div>
        <hr />
        {data && !isLoading ?
          <div className="m-1 mt-2">
            <div className="space-y-1">
              {data.map(location => (
                <Item
                  key={location.id}
                  data={location}
                  level={'1'}
                >
                  {location.children?.map(subLocation => (
                    <Item
                      key={subLocation.id}
                      data={subLocation}
                      level={'2'}
                    >
                      {subLocation?.children?.map(asset => (
                        <Item
                          key={asset.id}
                          data={asset}
                          level={'3'}
                        >
                          {/* @ts-ignore */}
                          {asset?.children.map(subAsset => (
                            <Item
                            key={subAsset.id}
                            data={subAsset}
                            level={'4'}
                            >
                              {/* @ts-ignore */}
                              {subAsset?.children.map(component => (
                                <Item
                                  key={component.id}
                                  data={component}
                                  level={'5'}
                                />
                              ))}
                            </Item>
                          ))}
                        </Item>
                      ))}
                    </Item>
                  ))}
                </Item>
              ))}
            </div>
          </div>
          :
          <div className="m-1 mt-2 animate-pulse">
            <div className="space-y-1">

              {Array.from({length: 8 }).map((_, index) => (
                <div key={index} className="mx-6 flex space-x-1">
                  <div className="w-7 h-7 bg-muted-foreground" />
                  <div className="w-full h-7 bg-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        }
      </Comp>
    )
  }
)
Aside.displayName = "Aside"

export { Aside }
