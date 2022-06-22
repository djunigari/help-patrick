import { auth, firestore } from '@firebase/clientApp'
import { collection, doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/instagram/account-id?facebookPageId=${facebookAccountId}`,
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

    const shareSingleMedia = async (imageUrl: string, caption: string) => {
        if (!user) return
        setLoading(true)
        const idToken = await user.getIdToken()
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/instagram/share-single`,
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
        const data = await res.json()
        console.log(data.id)
        setLoading(false)
    }

    return {
        getInstagramAccountId,
        loading,
        instagramAccountId,
        saveAccountIdToFirebase,
        saveLoading,
        shareSingleMedia
    }
}

export default useInstagram