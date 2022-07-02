import { IPost } from '@model/Post/Post'
import { atom } from 'recoil'

interface PostState {
    selectedPost: IPost | null
    posts: IPost[]
}

const defaultPostState: PostState = {
    selectedPost: null,
    posts: [],
}

export const postState = atom<PostState>({
    key: 'postState',
    default: defaultPostState
})