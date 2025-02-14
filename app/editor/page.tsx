import { Room } from "./room.tsx";
import { CollaborativeEditor } from "./editor.tsx";
import ThemeToggle from "./components/theme-switch.tsx";
import Header from './components/header.tsx';

export default function Page() {
  return (
    <div className="grid grid-cols-12 min-h-screen" suppressHydrationWarning>
                <div className="col-span-3 bg-gray-200 dark:bg-zinc-900 text-black dark:text-white w-full flex-none justify-center">
                    <Header />
                    <ThemeToggle />
                </div>
                <div className="col-span-6 bg-white dark:bg-black text-black dark:text-white w-full flex-none justify-center p-6">
                  <Room>
                    <CollaborativeEditor />
                  </Room>
                </div>
                <div className="col-span-3 bg-gray-200 dark:bg-zinc-900 text-black dark:text-white w-full flex-none justify-center">
                </div>
            </div>
  );
}