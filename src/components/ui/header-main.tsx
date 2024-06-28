'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { Icons } from "../icons"
import { Button } from "./button"
import { useCompanies, type Company } from "@/hooks/useCompanies"

export interface DivProps
  extends React.HTMLAttributes<HTMLDivElement> {
}

const HeaderMain = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => {
    const { companies, companySelected, onSetCompanies, onSetCompanySelected } = useCompanies()
    const [isLoading, setLoading] = React.useState(true)

    const onSelectCompany = (company: Company) => {
      onSetCompanySelected(company)
    }

    React.useEffect(() => {
      fetch(`https://fake-api.tractian.com/companies`)
        .then((res) => res.json())
        .then((data) => {
          onSetCompanies(data)
          setLoading(false)
          onSetCompanySelected(data[0])
        })      
    }, [onSetCompanies, onSetCompanySelected])

    return (
      <header
        className={cn(
          "h-12 bg-[#17192D] text-white flex justify-between items-center py-[17px] px-4",
          className
        )}
        ref={ref}
        {...props}
      >
        <Icons.logo className="fill-white w-28 h-4" />
        <div className="flex space-x-[10px]">
          {companies && !isLoading ? companies.map(company => (
            <Button
              variant={companySelected?.name === company.name ? 'default' : 'secondary'}
              key={company.id}
              size={'sm'}
              onClick={() => onSelectCompany(company)}
            >
              <Icons.gold className="fill-white mr-2 size-[14px]" />
              {company.name}
            </Button>
          )) : Array.from({ length: 3 }).map((_, index) => (
            <Button key={index} size={'sm'} className="animate-pulse">
              <div className="h-2 w-3 bg-white rounded-[2px] mr-2"></div>
              <div className="h-2 w-9 bg-white rounded-[2px]"></div>
            </Button>
          ))}
        </div>
      </header>
    )
  }
)
HeaderMain.displayName = "HeaderMain"

export { HeaderMain }