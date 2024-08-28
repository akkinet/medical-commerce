'use client'
import { SessionProvider } from 'next-auth/react'
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext([])

function SessionProVider({ children, session }) {
    const [cartItems, setCartItems] = useState(0)

    useEffect(() => {
        const localCart = window.localStorage.getItem("medCart")
        if (localCart) {
            setCartItems(JSON.parse(localCart).length)
        }
    }, [])

    return (
        <CartContext.Provider value={[cartItems, setCartItems]}>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </CartContext.Provider>
    )
}

export default SessionProVider