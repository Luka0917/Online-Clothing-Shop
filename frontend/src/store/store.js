import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const api = 'http://localhost:1717';

const themeChange = set => ({
    theme: 'light',
    themeToggle: () => set(s => ({ theme: s.theme === 'light' ? 'dark' : 'light' }))
})

const languageChange = set => ({
    lang: 'en',
    langToggle: () => set(s => ({ lang: s.lang === 'en' ? 'ge' : 'en' }))
})

const userAuth = set => ({
    user: null,
    setUser: user => set({ user }),
    clearUser: () => set({ user: null })
})

const useCart = set => ({
    cart: 0,
    addItem: quantity => set(s => ({ cart: s.cart + quantity })),
    removeItem: quantity => set(s => ({ cart: s.cart - quantity })),
    clearCart: () => set({ cart: 0 })
})

export const useStore = create(
    persist(
        set => ({
            ...themeChange(set),
            ...languageChange(set),
            ...userAuth(set),
            ...useCart(set)
        }),
        { name: 'online-clothing-shop-data' }
    )
)