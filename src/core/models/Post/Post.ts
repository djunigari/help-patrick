import { QueryDocumentSnapshot, SnapshotOptions, Timestamp } from "firebase/firestore"
import { IContact } from "./Contact"

export interface IPost {
    id?: string
    creatorId: string
    creatorDisplayName: string
    title: string
    body: string
    contact: IContact
    createAt: Timestamp
    category: string
    subcategory: string
    tags?: string[]
}

// Firestore data converter
export const postConverter = {
    toFirestore: (post: IPost) => {
        return {
            creatorId: post.creatorId,
            creatorDisplayName: post.creatorDisplayName,
            title: post.title,
            body: post.body,
            createAt: post.createAt,
            category: post.category,
            subcategory: post.subcategory,
            tags: post.tags
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        const user: IPost = {
            id: snapshot.id,
            creatorId: data.creatorId,
            creatorDisplayName: data.creatorDisplayName,
            title: data.title,
            body: data.body,
            contact: data.contact,
            createAt: data.createAt,
            category: data.category,
            subcategory: data.subcategory,
            tags: data.tags
        }
        return user
    }
}