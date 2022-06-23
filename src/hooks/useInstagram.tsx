import { auth, firestore } from '@firebase/clientApp'
import { collection, doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

function useInstagram() {
    const [user] = useAuthState(auth)
    const [instagramAccountId, setInstagramAccountId] = useState('')
    const [loading, setLoading] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)

    const getInstagramAccountId = async (facebookAccountId: string) => {
        if (!user) return
        setLoading(true)
        const idToken = await user.getIdToken()
        const res = await fetch(`/api/instagram/account-id?facebookPageId=${facebookAccountId}`,
            {
                method: 'GET',
                headers: {
                    'token': idToken as string
                }
            }
        )
        const data = await res.json()
        setInstagramAccountId(data)
        setLoading(false)
    }

    const saveAccountIdToFirebase = async (facebookAccountId: string) => {
        setSaveLoading(true)
        const userDocRef = doc(collection(firestore, `users`), user?.uid)
        await setDoc(userDocRef, {
            facebookAcount: {
                facebookAccountId,
                instagramAccountId
            }
        }, { merge: true })
        setSaveLoading(false)
    }
    const isRateLimiteOk = async () => {
        if (!user) return
        const idToken = await user.getIdToken()
        const res = await fetch(`/api/instagram/check-rate-limit-usage`,
            {
                method: 'GET',
                headers: {
                    'token': idToken as string,
                }
            }
        )

        return res.json()
    }

    //Check isRateLimiteOk first after execute share
    const shareSingleMedia = async (imageUrl: string, caption: string) => {
        if (!user) return
        setLoading(true)

        const idToken = await user.getIdToken()
        fetch(`/api/instagram/share-carousel`,
            {
                method: 'POST',
                headers: {
                    'token': idToken as string,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    imageUrl: imageUrl,
                    caption: caption
                })
            }
        )
            .then(res => {
                if (res.ok) {
                    return res;
                }
                throw new Error('error');
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(e => console.log(e.message))

        setLoading(false)
    }

    //Check isRateLimiteOk first after execute share
    const shareCarouselMedia = async (imageUrls: string[], caption: string) => {
        if (!user) return
        setLoading(true)

        const idToken = await user.getIdToken()
        fetch(`/api/instagram/share-single`,
            {
                method: 'POST',
                headers: {
                    'token': idToken as string,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    imageUrls: imageUrls,
                    caption: caption
                })
            }
        )
            .then(res => {
                if (res.ok) {
                    return res;
                }
                throw new Error('error');
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(e => console.log(e.message))

        setLoading(false)
    }

    return {
        getInstagramAccountId,
        loading,
        instagramAccountId,
        saveAccountIdToFirebase,
        saveLoading,
        shareSingleMedia,
        shareCarouselMedia,
        isRateLimiteOk
    }
}

export default useInstagram