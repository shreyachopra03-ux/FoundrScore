import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface RouterContextType {
    path: string;
    navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType>({
    path: "/",
    navigate: () => {},
});

export function RouterProvider({ children }: { children: ReactNode }) {
    const getInitialPath = () => {
        if (typeof window === "undefined") return "/";
        const pathname = window.location.pathname;
        if (pathname === "/validate" || pathname === "/results") {
            return pathname;
        }
        const hash = window.location.hash.replace(/^#\/?/, "/");
        if (hash === "/validate" || hash === "/results") {
            return hash;
        }
        return "/";
    };

    const [path, setPath] = useState<string>(getInitialPath);

    useEffect(() => {
        const handlePopState = () => {
            setPath(getInitialPath());
        };

        window.addEventListener("popstate", handlePopState);
        window.addEventListener("hashchange", handlePopState);
        return () => {
            window.removeEventListener("popstate", handlePopState);
            window.removeEventListener("hashchange", handlePopState);
        };
    }, []);

    const navigate = (to: string) => {
        if (to === path) return;
        window.history.pushState(null, "", to);
        setPath(to);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <RouterContext.Provider value={{ path, navigate }}>
            {children}
        </RouterContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRouter() {
    return useContext(RouterContext);
}
