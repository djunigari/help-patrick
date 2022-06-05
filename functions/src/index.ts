import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const bucketName = "gs://help-patrick.appspot.com";

exports.onDeletePost = functions.firestore
    .document("posts/{postId}")
    .onDelete((snap, context)=> {
      const {postId} = context.params;

      console.log(`Bucket: ${bucketName}`);

      const folder = `posts/${postId}`;
      const bucket = admin.storage().bucket(bucketName);

      // eslint-disable-next-line require-jsdoc
      async function deleteBucket() {
        console.log(`Folder ${folder} delete initiated`);
        await bucket.deleteFiles({prefix: folder});
        console.log(`Folder ${folder} deleted`);
      }

      console.log(`Requesting delete of folder: ${folder}`);
      deleteBucket().catch((err) => {
        // eslint-disable-next-line max-len
        console.error(`Error occurred while deleting the folder: ${folder}`, err);
      });
    });
