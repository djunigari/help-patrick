import { firestore } from "backend/utils/firebase"

interface getAccessTokenProps {
    userId: string
}

export default async function getAccessToken({ userId }: getAccessTokenProps) {
    if (!userId) throw new Error('permission-denied')
    const doc = await firestore.doc(`tokens/${userId}`).get()
    return doc.data()?.accessToken
}