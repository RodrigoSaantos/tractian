'use client'

import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext
} from 'react';

export interface Location {
  id: string;
  name: string;
  parentId: string | null
}

type LocationsContextData = {
  locations: Location[] | null;
  onSetLocations: (props: Location[]) => void;
  locationSelected: Location | null;
  onSetLocationSelected: (props: Location) => void;
};

type LocationsProviderProps = {
  children: ReactNode;
};

const LocationsContext = createContext<LocationsContextData>({} as LocationsContextData);

export function LocationsProvider({ children }: LocationsProviderProps) {
  const [locations, setLocations] = React.useState<Location[] | null>(null)
  const [locationSelected, setLocationSelected] = React.useState<Location | null>(null)

  const onSetLocations = useCallback((props: Location[]) => {
    setLocations(props)
  }, [])

  const onSetLocationSelected = useCallback((props: Location) => {
    setLocationSelected(props)
  }, [])


  return (
    <LocationsContext.Provider
      value={{ locations, locationSelected, onSetLocations, onSetLocationSelected }}
    >
      {children}
    </LocationsContext.Provider>
  );
}

export function useLocations(): LocationsContextData {
  return useContext(LocationsContext);
}
