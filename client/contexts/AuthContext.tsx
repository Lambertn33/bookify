import { createContext, useState } from "react";
import { clearAuthLocalStorage } from "@/helpers";

interface User {
    id: number;
    names: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    setUser: (user: User) => void;
    setToken: (token: string) => void;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,  
    setUser: () => {},
    setToken: () => {},
    logout: async () => {},
});

export const AuthProvider = ({ 
    children,
    initialUser = null,
    initialToken = null
}: { 
    children: React.ReactNode;
    initialUser?: User | null;
    initialToken?: string | null;
}) => {
    const [user, setUser] = useState<User | null>(initialUser);
    const [token, setToken] = useState<string | null>(initialToken);

    const handleSetUser = (user: User) => {
        setUser(user);
    }

    const handleSetToken = (token: string) => {
        setToken(token);
    }

    const handleLogout = async () => {
        setUser(null);
        setToken(null);
        await clearAuthLocalStorage();
    }

    return <AuthContext.Provider value={{ user, token, setUser: handleSetUser, setToken: handleSetToken, logout: handleLogout }}>{children}</AuthContext.Provider>;
}