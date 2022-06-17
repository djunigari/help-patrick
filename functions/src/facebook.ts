import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
import axios from 'axios'

const db = admin.firestore()

exports.postFacebook = functions.region('asia-northeast1').https.onCall(async (data, context) => {
    if (!context.auth?.uid) {
        console.log('user does not exist')
    }
    const doc = await db.collection('tokens').doc(context.auth?.uid as string).get()
    const accessToken = doc.data()?.accessToken

    axios.get(`https://graph.facebook.com/v14.0/me?access_token=${accessToken}`)
        .then(res => {
            console.log(res.status)
            console.log(res.data)
        })
    return {
        result: `User: created successfully`
    }
})