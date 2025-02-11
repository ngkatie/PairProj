import Tiptap from './components/tiptap';
import ThemeToggle from './components/theme-switch';
import Header from './components/header';

export default function Home() {
    return (
        <div className="grid grid-cols-12 min-h-screen" suppressHydrationWarning>
            <div className="col-span-3 bg-gray-200 dark:bg-zinc-900 text-black dark:text-white w-full flex-none justify-center">
                <Header />
                <ThemeToggle />
            </div>
            <div className="col-span-6 bg-white dark:bg-black text-black dark:text-white w-full flex-none justify-center p-6">
                <Tiptap />
            </div>
            <div className="col-span-3 bg-gray-200 dark:bg-zinc-900 text-black dark:text-white w-full flex-none justify-center">
            </div>
        </div>
    );
}
