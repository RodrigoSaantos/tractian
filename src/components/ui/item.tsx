import { Slot } from "@radix-ui/react-slot"
import * as React from "react"

import { Asset, useAssets } from "@/hooks/useAssets"
import { Location } from "@/hooks/useLocations"
import { cn } from "@/lib/utils"
import { AssetExtends, LocationExtends, callAllHandlers } from "@/utils"
import { Icons } from "../icons"
import { Text } from "./text"

const variantsIcon = {
  location: Icons.location,
  subLocation: Icons.location,
  asset: Icons.cubeOutline,
  subAsset: Icons.cubeOutline,
  component: Icons.codePen,
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  data: (AssetExtends | LocationExtends)
  level: '1' | '2' | '3' | '4' | '5'
}

const variant = (data: Asset | Location) => {
  if ("parentId" in data && !("locationId" in data)) {
    if (data.parentId) {
      return 'subLocation'
    } else {
      return `location`;
    }
  } else if ("locationId" in data) {
    if (data.sensorType) {
      return `component`
    } else if (data.parentId) {
      return `subAsset`;
    } else {
      return `asset`;
    }
  }
}
const Item = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ data, className, value, asChild = false, onClick, level, children, ...props }, ref) => {
    const { onSetAssetSelected } = useAssets()
    const type = variant(data)
    const Comp = asChild ? Slot : "button"
    const [isOpen, setOpen] = React.useState(false)
    const Icon = variantsIcon[variant(data) || 'location']
    // @ts-ignore
    const hasChildren = data?.children.length > 0
    const status = {
      'operating': 'fill-green-500',
      'alert': 'fill-red-500',
    }

    const handleToggleDropdown = () => {
      setOpen(state => !state)
      if (type === 'component') {
        onSetAssetSelected(data as Asset)
      }
    }

    return (
      <div className={`space-y-1 relative
      ${level === '2' && 'ml-4'}  
      ${level === '3' && 'ml-4'}  
      ${level === '4' && 'ml-4'}  
      ${level === '5' && 'after:content-[""] after:absolute after:h-[18px] after:w-3 after:-top-1 after:left-[1.5rem] after:border-l after:border-b ml-[15px]'}
      `}>
        <Comp
          className={cn(`group flex items-center focus:bg-primary focus:text-primary-foreground hover:bg-muted-foreground/20 transition-colors p-1 ${!hasChildren && 'ml-6'} ${level === '5' && 'ml-10'}`, className)}
          ref={ref}
          onClick={callAllHandlers(onClick, handleToggleDropdown)}
          {...props}
        >
          {hasChildren && type !== 'component' &&
            <Icons.down className={`group-focus:fill-primary-foreground size-[10px] m-[7px] transition-transform ${isOpen ? 'rotate-0' : '-rotate-90'}`} />
          }
          <Icon className={`fill-blue-500 group-focus:fill-primary-foreground size-[22px] mr-1`} />
          <Text className="flex items-center group-focus:text-primary-foreground">
            {data.name}
            {/* @ts-ignore */}
            {type === 'component' && <Icons.eclipse className={`ml-2 ${status[data?.status as keyof typeof status]}`} />}
          </Text>
        </Comp>
        {isOpen && hasChildren && children}
      </div>
    )
  }
)
Item.displayName = "Item"

export { Item }
