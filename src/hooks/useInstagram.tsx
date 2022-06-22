import { auth, firestore } from '@firebase/clientApp'
import { collection, doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

function useInstagram(facebookAccountId: string) {
    const [user] = useAuthState(auth)
    const [instagramAccountId, setInstagramAccountId] = useState('')
    const [loading, setLoading] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)

    const getInstagramAccountId = async () => {
        if (!user) return
        setLoading(true)
        const idToken = await user.getIdToken()
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/instagram?facebookPageId=${facebookAccountId}`,
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

    const saveAccountIdToFirebase = async () => {
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

    return {
        getInstagramAccountId,
        loading,
        instagramAccountId,
        saveAccountIdToFirebase,
        saveLoading
    }
}

export default useInstagram