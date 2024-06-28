'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { Icons } from "../icons"
import { Button } from "./button"
import { Text } from "./text"
import { useCompanies } from "@/hooks/useCompanies"
import { useAssets } from "@/hooks/useAssets"

export interface DivProps
  extends React.HTMLAttributes<HTMLDivElement> {
}

const HeaderTitle = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => {
    const { companySelected } = useCompanies()
    const { assetSelected } = useAssets()
    const isLoading = !companySelected
    const isCritical = assetSelected?.status === 'alert'
   
    return (
      <div
        className={cn(
          "flex justify-between",
          className
        )}
        ref={ref}
        {...props}
      >
          <div className="flex items-center justify-center space-x-2">
            <Text variant={'title'} size={'lg'}>Ativos</Text>
            <Text className={`${isLoading ? 'animate-pulse' : ''}`} size={'sm'}>{isLoading ?  <span className="h-2 w-9 bg-foreground flex" /> : `/ ${companySelected.name}`}</Text>
          </div>
          <div className="flex space-x-2">
            <Button variant={'outline'}>
              <Icons.thunder className="fill-primary mr-2 size-4" />
              Sensor de Energia
            </Button>
            <Button variant={isCritical ? 'default' : 'outline'}>
              <Icons.alert className={`${isCritical ? 'fill-current' : 'fill-primary'} mr-2 size-4`} />
              Crítico
            </Button>
          </div>
      </div>
    )
  }
)
HeaderTitle.displayName = "HeaderTitle"

export { HeaderTitle }