import { Timestamp } from 'firebase/firestore'
import { atom } from 'recoil'

export type Post = {
    id?: string
    creatorId: string
    creatorDisplayName: string
    title: string
    body: string
    imageUrls?: string[]
    contact: Contact
    createAt: Timestamp
    category: string
    subcategory: string
    tags?: string[]
}

export type Contact = {
    phone: string
    instagram: string
    facebook: string
}


interface PostState {
    selectedPost: Post | null
    posts: Post[]
}

const defaultPostState: PostState = {
    selectedPost: null,
    posts: [],
}

export const postState = atom<PostState>({
    key: 'postState',
    default: defaultPostState
})