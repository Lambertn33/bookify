import { createContext, useState } from "react";

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
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,  
    setUser: () => {},
    setToken: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const handleSetUser = (user: User) => {
        setUser(user);
    }

    const handleSetToken = (token: string) => {
        setToken(token);
    }

    const handleLogout = () => {
        setUser(null);
        setToken(null);
    }

    return <AuthContext.Provider value={{ user, token, setUser: handleSetUser, setToken: handleSetToken, logout: handleLogout }}>{children}</AuthContext.Provider>;
}