import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore"

export interface IPostFile {
    id?: string
    type: 'video' | 'image'
    url: string
    order: number
}

// Firestore data converter
export const postFileConverter = {
    toFirestore: (file: IPostFile) => {
        return {
            type: file.type,
            url: file.url,
            order: file.order
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        const user: IPostFile = {
            id: snapshot.id,
            type: data.type,
            url: data.url,
            order: data.order
        }
        return user
    }
}