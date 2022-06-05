import { deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { authModalState } from '../atoms/authModal'
import { Post, postState } from '../atoms/postsAtom'
import { auth, firestore, storage } from '../firebase/clientApp'

function usePosts() {
    const [user] = useAuthState(auth)
    const [postStateValue, setPostStateValue] = useRecoilState(postState)

    const setAuthModelState = useSetRecoilState(authModalState)

    const onDeletePost = async (post: Post): Promise<boolean> => {
        try {
            const postDocRef = doc(firestore, 'posts', post.id!)
            await deleteDoc(postDocRef)

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
        onDeletePost
    }
}

export default usePosts