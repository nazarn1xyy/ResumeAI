"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    plan: "free" | "pro" | "premium";
    createdAt: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem("resumeai_user");
        if (saved) {
            try {
                setUser(JSON.parse(saved));
            } catch {
                localStorage.removeItem("resumeai_user");
            }
        }
        setLoading(false);
    }, []);

    const saveUser = (u: User | null) => {
        setUser(u);
        if (u) {
            localStorage.setItem("resumeai_user", JSON.stringify(u));
        } else {
            localStorage.removeItem("resumeai_user");
        }
    };

    const login = async (email: string, password: string) => {
        // Simulate API delay
        await new Promise((r) => setTimeout(r, 800));

        // Check stored users
        const users = JSON.parse(localStorage.getItem("resumeai_users") || "[]");
        const found = users.find((u: { email: string; password: string }) => u.email === email && u.password === password);

        if (!found) {
            throw new Error("Invalid email or password");
        }

        const userData: User = {
            id: found.id,
            email: found.email,
            name: found.name,
            plan: found.plan || "free",
            createdAt: found.createdAt,
        };
        saveUser(userData);
    };

    const register = async (name: string, email: string, password: string) => {
        await new Promise((r) => setTimeout(r, 800));

        const users = JSON.parse(localStorage.getItem("resumeai_users") || "[]");
        if (users.find((u: { email: string }) => u.email === email)) {
            throw new Error("Email already registered");
        }

        const newUser = {
            id: crypto.randomUUID(),
            email,
            name,
            password,
            plan: "free",
            createdAt: new Date().toISOString(),
        };

        users.push(newUser);
        localStorage.setItem("resumeai_users", JSON.stringify(users));

        const userData: User = {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            plan: "free" as const,
            createdAt: newUser.createdAt,
        };
        saveUser(userData);
    };

    const logout = () => {
        saveUser(null);
    };

    const updateUser = (updates: Partial<User>) => {
        if (user) {
            const updated = { ...user, ...updates };
            saveUser(updated);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
