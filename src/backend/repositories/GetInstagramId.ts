import { firestore } from "@backend/utils/firebase"


export default async function getInstagramId(userId: string) {
    if (!userId) throw new Error('permission-denied')
    const doc = await firestore.doc(`users/${userId}`).get()
    return doc.data()?.facebookAcount?.instagramAccountId
}