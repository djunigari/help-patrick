import { Post } from "@atoms/postsAtom"
import PageContent from "@components/Layout/PageContent"
import PostItem from "@components/Posts/PostItem/PostItem"
import { auth, firestore } from "@firebase/clientApp"
import usePosts from "@hooks/usePosts"
import { doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuthState } from 'react-firebase-hooks/auth'


function PostPage() {
    const { postStateValue, setPostStateValue, onDeletePost } = usePosts()
    const [user] = useAuthState(auth)
    const router = useRouter()

    const fetchPost = async (postId: string) => {
        try {
            const postDocRef = doc(firestore, 'posts', postId)
            const postDoc = await getDoc(postDocRef)
            setPostStateValue(prev => ({
                ...prev,
                selectedPost: {
                    id: postDoc.id,
                    ...postDoc.data()
                } as Post
            }))

        } catch (error: any) {
            console.log('fetchPost error', error.message)
        }
    }

    useEffect(() => {
        const { pid } = router.query
        if (pid && !postStateValue.selectedPost) {
            fetchPost(pid as string)
        }
    }, [router.query, postStateValue.selectedPost])

    return (
        <PageContent>
            <>
                {postStateValue.selectedPost && (
                    <PostItem
                        post={postStateValue.selectedPost}
                        onDeletePost={onDeletePost}
                        userIsCreator={user?.uid === postStateValue.selectedPost?.creatorId}
                    />
                )}

            </>
            <>
            </>
        </PageContent>
    )
}

export default PostPage