import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Post, postState } from '../atoms/postsAtom'
import { auth, firestore, storage } from '../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import { authModalState } from '../atoms/authModal'
import { useRouter } from 'next/router'

function usePosts() {
    const router = useRouter()
    const [user] = useAuthState(auth)
    const [postStateValue, setPostStateValue] = useRecoilState(postState)

    const setAuthModelState = useSetRecoilState(authModalState)

    const onSelectPost = (post: Post) => {
        setPostStateValue(prev => ({
            ...prev,
            selectedPost: post
        }))
        router.push(`/posts/${post.id}`)
    }

    const onDeletePost = async (post: Post): Promise<boolean> => {
        try {
            //Check if image, delete if exists
            if (post.imageUrl) {
                const imageRef = ref(storage, `posts/${post.id}/image`)
                await deleteObject(imageRef)
            }
            //Delete post document from firestore
            const postDocRef = doc(firestore, 'posts', post.id!)
            await deleteDoc(postDocRef)

            //update recoil state
            setPostStateValue(prev => ({
                ...prev,
                posts: prev.posts.filter(item => item.id !== post.id)
            }))
            return true
        } catch (error) {
            return false
        }
    }

    useEffect(() => {
        if (!user) {
            //clear user post votes
            setPostStateValue(prev => ({
                ...prev,
                postVotes: []
            }))
        }
    }, [user])
    return {
        postStateValue,
        setPostStateValue,
        onSelectPost,
        onDeletePost
    }
}

export default usePosts