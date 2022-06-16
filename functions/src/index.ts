import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


//firebase deploy --only functions

admin.initializeApp();
const db = admin.firestore()

const bucketName = "gs://help-patrick.appspot.com";

exports.onDeletePost = functions.firestore
    .document("posts/{postId}")
    .onDelete((snap, context) => {
        const { postId } = context.params;

        console.log(`Bucket: ${bucketName}`);

        const folder = `posts/${postId}`;
        const bucket = admin.storage().bucket(bucketName);

        // eslint-disable-next-line require-jsdoc
        async function deleteBucket() {
            console.log(`Folder ${folder} delete initiated`);
            await bucket.deleteFiles({ prefix: folder });
            console.log(`Folder ${folder} deleted`);
        }

        console.log(`Requesting delete of folder: ${folder}`);
        deleteBucket().catch((err) => {
            // eslint-disable-next-line max-len
            console.error(`Error occurred while deleting the folder: ${folder}`, err);
        });
    });
//Tutorial blockfuntion
//https://cloud.google.com/identity-platform/docs/blocking-functions
//https://www.youtube.com/watch?v=BGCLPiR_0Lg&t=2148s
export const beforeCreate = functions.auth.user().beforeCreate(
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
export const beforeSignIn = functions.handler.auth.user.beforeSignIn(
    async (user, context) => {
        console.log('accessToken: ', context.credential?.accessToken)
        // verify status
        return {
            // If no display name is provided, set it to "Guest".
            displayName: user.displayName || 'Guest'
        };
    }
)

export const createUserDocument = functions.auth.user().onCreate(
    async (user) => {
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
