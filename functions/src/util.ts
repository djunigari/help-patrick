import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';

const db = admin.firestore()
export const callableFunction = functions.region('asia-northeast1').https.onCall

export const getAccessToken = async (userId: string | null | undefined) => {
    if (!userId) throw new functions.https.HttpsError('permission-denied', '')
    const doc = await db.collection('tokens').doc(userId).get()
    return doc.data()?.accessToken
}


