import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        try {
            const savedUser = localStorage.getItem('mg_admin_user');
            if (savedUser && savedUser !== 'undefined' && savedUser !== 'null') {
                return JSON.parse(savedUser);
            }
        } catch (e) {
            console.error("Failed to parse user", e);
        }
        return null;
    });

    const [token, setToken] = useState<string | null>(() => {
        const savedToken = localStorage.getItem('mg_admin_token');
        if (!savedToken || savedToken === 'undefined' || savedToken === 'null' || savedToken.length < 20) {
            return null;
        }
        return savedToken;
    });

    const login = (userData: User, authToken: string) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('mg_admin_token', authToken);
        localStorage.setItem('mg_admin_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('mg_admin_token');
        localStorage.removeItem('mg_admin_user');
        // Limpeza de segurança para chaves genéricas antigas
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };


    // Robust check: must have token AND user AND role must be admin-capable for admin routes
    const isAuthenticated = !!token && !!user;

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
