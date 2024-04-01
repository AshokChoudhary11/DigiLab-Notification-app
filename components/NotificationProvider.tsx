'use client'

import React, { MutableRefObject, createContext } from 'react'

import OneSignalInit from '@/app/integrations/onesignal/OneSignalInit'

export const NotificationContext = createContext({
    isInitialized: false,
    isSubscribed: false,
    setIsInitialized: (value: boolean) => {},
    setIsSubscribed: (value: boolean) => {},
    updateSubscriptionRef: React.createRef<((a: boolean) => void) | undefined>(),
})

export default function NotificationProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [isInitialized, setIsInitialized] = React.useState(false)
    const [isSubscribed, setIsSubscribed] = React.useState(false)
    const updateSubscriptionRef = React.useRef<(a: boolean) => void>()

    return (
        <NotificationContext.Provider
            value={{
                isInitialized,
                isSubscribed,
                setIsInitialized,
                setIsSubscribed,
                updateSubscriptionRef,
            }}
        >
            <OneSignalInit />
            {children}
        </NotificationContext.Provider>
    )
}