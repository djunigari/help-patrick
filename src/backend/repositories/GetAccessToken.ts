import { firestore } from "backend/utils/firebase"

export default async function getAccessToken(userId: string) {
    if (!userId) throw new Error('permission-denied')
    const doc = await firestore.doc(`tokens/${userId}`).get()
    return doc.data()?.accessToken
}