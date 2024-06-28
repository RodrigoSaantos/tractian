'use client'
import * as React from "react"
import { cn } from "@/lib/utils"
import { Text } from "./text"
import { Icons } from "../icons"
import { initials } from "@/utils"
import { useAssets } from "@/hooks/useAssets"

export interface AssetProps
  extends React.HTMLAttributes<HTMLDivElement> { }

const Asset = React.forwardRef<HTMLDivElement, AssetProps>(
  ({ className, ...props }, ref) => {
    const { assetSelected } = useAssets()
    const status = {
      'operating': 'fill-green-500',
      'alert': 'fill-red-500',
    }
    return (
      <section
        className={cn(
          "w-full border rounded col-span-2",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="flex items-center py-[14px] px-4 border-b">
          <Text variant={'title'} size={'lg'}>{assetSelected?.name}</Text>
          {assetSelected ? <Icons.eclipse className={`ml-2 ${status[assetSelected.status as keyof typeof status]}`} /> : ''}

        </div>
        <div className="p-6 space-y-6">
          <div className="flex space-x-6 items-center">
            <div className="w-[336px] h-[226px] flex  flex-col items-center justify-center bg-primary/10 border border-primary border-dashed">
              <Icons.inbox className="fill-primary" />
              <Text className="text-primary">Adicionar imagem do Ativo</Text>
            </div>

            <div className="flex flex-1 flex-col space-y-6">
              <div className="flex flex-col space-y-2">
                <Text variant={'title'}>Tipo de equipamento</Text>
                <Text>{assetSelected?.name}</Text>
              </div>
              <hr />
              <div className="flex flex-col space-y-2">
                <Text variant={'title'}>Responsáveis</Text>
                <div className="flex space-x-2">
                  <div className="size-6 rounded-full bg-primary flex justify-center items-center uppercase">
                    <Text size={'sm'} className="text-primary-foreground">{initials(assetSelected?.sensorType ?? '')}</Text>
                  </div>
                  <Text className="capitalize">{assetSelected?.sensorType}</Text>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div className="grid grid-cols-2">
            <div className="flex flex-col space-y-2">
              <Text variant={'title'}>Sensor</Text>
              <div className="flex items-center">
                <Icons.sensor className="fill-primary mr-2" />
                <Text>{assetSelected?.sensorId}</Text>
              </div>
            </div>
            <div className="flex flex-col ml-6 space-y-2">
              <Text variant={'title'}>Receptor</Text>
              <div className="flex items-center">
                <Icons.routerOutline className="fill-primary mr-2" />
                <Text>{assetSelected?.gatewayId}</Text>
              </div>
            </div>
          </div>

        </div>

      </section>
    )
  }
)
Asset.displayName = "Asset"

export { Asset }