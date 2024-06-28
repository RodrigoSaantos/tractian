import { Aside } from "@/components/ui/aside";
import { Asset } from "@/components/ui/asset";
import { HeaderMain } from "@/components/ui/header-main";
import { HeaderTitle } from "@/components/ui/header-title";
import { AssetsProvider } from "@/hooks/useAssets";
import { LocationsProvider } from "@/hooks/useLocations";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen h-screen">
      <HeaderMain />
      <LocationsProvider>
        <AssetsProvider>
          <main className="h-full m-2 p-4 border rounded flex flex-col space-y-3">
            <HeaderTitle />
            <div className="grid grid-cols-3 space-x-2 h-full max-h-[85vh]">
              <Aside />
              <Asset />
            </div>
          </main>
        </AssetsProvider>
      </LocationsProvider>
    </div>
  );
}
