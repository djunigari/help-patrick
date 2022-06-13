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
    async (user) => {
        try {
            console.log(JSON.stringify(user, null, 2));

            const doc = await db.collection('authorizedEmails').doc(user.email as string).get()
            if (doc.exists) {
                let response = {
                    customClaims: {
                        test_user: true
                    }
                };
                console.log(JSON.stringify(response, null, 2))
                return response;
            } else {
                // Block sign-up for unauthorized emails.
                throw new functions.https.HttpsError('invalid-argument', `Unauthorized email "${user.email}"`)
            }

        } catch (error: any) {
            throw new Error(error.message);
        }
    });

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
            // Needs transaction future feature
            await updateUserInvitationAsUserCreated(user.email as string);

            await db.collection("users").doc(user.uid).set(newUser);

            await updateTotalUserCounter(1);
        } catch (error: any) {
            throw new Error(error.message);
        }
    });

async function updateTotalUserCounter(delta: number) {
    await db.doc("counters/totalUserCreated").set({ totalUsers: admin.firestore.FieldValue.increment(1) }, { merge: true });
}

async function updateUserInvitationAsUserCreated(email: string) {
    const invitationsRef = await db.collection("invitations").where("email", "==", email).get();

    if (invitationsRef.empty) throw new Error(`Invitation do not exist for email:${email}`);

    const invitationDocRef = invitationsRef.docs[0];
    await db.collection("invitations").doc(invitationDocRef.id).update({ isAccountCreated: true });
}

export const updateTotalInvitation = functions.firestore.document("invitations/{invitationId}").onCreate(async (snapshot, context) => {
    const invitationData = snapshot.data();
    if (!invitationData) return null;

    // send a message to the email
    console.log("invitation created");

    await updateInvitationCouter(1);

    return snapshot;
});

async function updateInvitationCouter(delta: number) {
    await db.doc("counters/totalInvitation").set({ totalInvitation: admin.firestore.FieldValue.increment(1) }, { merge: true });
}
