import { NotificationContext } from '@/components/NotificationProvider'
import { useContext, useEffect, useRef } from 'react'
import OneSignal from 'react-onesignal'

export const ONE_SIGNAL_SUBSCRIPTION_KEY = 'onesignal-subscription-testing'

const useOneSignal = () => {
    const onesignalInitializingRef = useRef(false)
    const { setIsInitialized, setIsSubscribed, updateSubscriptionRef } =
        useContext(NotificationContext)

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        const init = async () => {
            try {
                if (!onesignalInitializingRef.current) {
                    onesignalInitializingRef.current = true
                    await OneSignal.init({
                        appId: '04adfa5d-80f0-4ab3-abb1-011c81033d79',
                        allowLocalhostAsSecureOrigin: true,
                        notifyButton: {
                            enabled: false,
                        },
                    })
                    setIsInitialized(true)
                    OneSignal.User.PushSubscription.addEventListener('change', (isSubscribed) => {
                        setIsSubscribed(isSubscribed.current.optedIn)
                    })
                    setIsSubscribed(OneSignal.User.PushSubscription.optedIn || false)
                    // @ts-ignore
                    updateSubscriptionRef.current = async (updatedSubscription: boolean) => {
                        if (updatedSubscription) {
                            await OneSignal.User.PushSubscription.optIn()
                        } else {
                            await OneSignal.User.PushSubscription.optOut()
                        }
                    }
                }
            } catch (e) {
                console.error('OneSignal Initilization', e)
            } finally {
                onesignalInitializingRef.current = false
            }
        }
        init()
    }, [])
}

export default useOneSignal