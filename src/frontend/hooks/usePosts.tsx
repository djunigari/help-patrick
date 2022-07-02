import { deleteDoc, doc } from 'firebase/firestore'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'
import { Post, postState } from '../atoms/postsAtom'
import { auth, firestore } from '../firebase/clientApp'

function usePosts() {
    const [user] = useAuthState(auth)
    const [postStateValue, setPostStateValue] = useRecoilState(postState)

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