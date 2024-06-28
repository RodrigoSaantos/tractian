'use client'

import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext
} from 'react';

export interface Company {
  id: string;
  name: string;
}

type CompaniesContextData = {
  companies: Company[] | null;
  onSetCompanies: (props: Company[] | null) => void;
  companySelected: Company | null;
  onSetCompanySelected: (props: Company) => void;
};

type CompaniesProviderProps = {
  children: ReactNode;
};

const CompaniesContext = createContext<CompaniesContextData>({} as CompaniesContextData);

export function CompaniesProvider({ children }: CompaniesProviderProps) {
  const [companies, setCompanies] = React.useState<Company[] | null>(null)
  const [companySelected, setCompanySelected] = React.useState<Company | null>(null)

  const onSetCompanies = useCallback((props: Company[] | null) => {
    setCompanies(props)
  }, [])

  const onSetCompanySelected = useCallback((props: Company) => {
    setCompanySelected(props)
  }, [])


  return (
    <CompaniesContext.Provider
      value={{ companies, companySelected, onSetCompanies, onSetCompanySelected }}
    >
      {children}
    </CompaniesContext.Provider>
  );
}

export function useCompanies(): CompaniesContextData {
  return useContext(CompaniesContext);
}
