import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';

const db = admin.firestore()

//Tutorial blockfuntion
//https://cloud.google.com/identity-platform/docs/blocking-functions
//https://www.youtube.com/watch?v=BGCLPiR_0Lg&t=2148s
exports.beforeCreate = functions.region('asia-northeast1').auth.user().beforeCreate(
    async (user, context) => {
        try {
            // console.log(JSON.stringify(user, null, 2));

            const doc = await db.collection('authorizedEmails').doc(user.email as string).get()
            if (doc.exists) {
                // let response = {
                //     customClaims: {
                //         test_user: true
                //     }
                // };
                // console.log(JSON.stringify(response, null, 2))
                if (context.credential && context.credential.providerId === 'facebook.com') {
                    console.log('accessToken: ', context.credential.accessToken)
                }
                // return response;
            } else {
                // Block sign-up for unauthorized emails.
                throw new functions.https.HttpsError('invalid-argument', `Unauthorized email "${user.email}"`)
            }

        } catch (error: any) {
            throw new Error(error.message);
        }
    });

//Identity Platform console -> Configurações -> Gatilhos
exports.beforeSignIn = functions.region('asia-northeast1').auth.user().beforeSignIn(
    async (user, context) => {
        if (context.credential?.accessToken) {
            db.collection('tokens').doc(user.uid)
                .set({
                    accessToken: context.credential?.accessToken,
                    expirationTime: context.credential.expirationTime || null,
                    date: admin.firestore.Timestamp.now(),
                    providerId: context.credential.providerId
                })
        }
        // verify status
        return {
            // If no display name is provided, set it to "Guest".
            displayName: user.displayName || 'Guest'
        };
    }
)

exports.createUserDocument = functions.region('asia-northeast1').auth.user().onCreate(
    async (user, context) => {
        user.providerData
        console.log(context.auth?.token)
        try {
            const newUser = {
                email: user.email,
                displayName: user.displayName,
                providerData: user.providerData,
                createdAt: admin.firestore.Timestamp.now(),
                status: "pending",
                roles: ["normal"],
            };
            await db.collection("users").doc(user.uid).set(newUser);
            await updateTotalUserCounter(1);
        } catch (error: any) {
            throw new Error(error.message);
        }
    });

async function updateTotalUserCounter(delta: number) {
    await db.doc("counters/totalUserCreated").set({ totalUsers: admin.firestore.FieldValue.increment(1) }, { merge: true });
}