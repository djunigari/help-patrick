import { Post } from "@atoms/postsAtom"
import CreatePostLink from "@components/Community/CreatePostLink"
import PageContent from "@components/Layout/PageContent"
import PostComponent from "@components/Posts/Post/Post"
import { auth, firestore } from "@firebase/clientApp"
import usePosts from "@hooks/usePosts"
import { doc, getDoc } from "firebase/firestore"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useAuthState } from 'react-firebase-hooks/auth'
import safeJsonStringify from "safe-json-stringify"

interface PostPageProps {
    post?: Post
}

function PostPage({ post }: PostPageProps) {
    const { postStateValue, setPostStateValue, onDeletePost } = usePosts()
    const [user] = useAuthState(auth)
    const router = useRouter()

    return (
        <PageContent>
            <>
                {user && (<CreatePostLink />)}
            </>
            <>
                {post && (
                    <PostComponent
                        post={post}
                        userIsCreator={user?.uid === post.creatorId}
                    />
                )}
            </>
        </PageContent>
    )
}

export default PostPage

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { postId } = context.query

    try {
        const postDocRef = doc(firestore, 'posts', postId as string)
        const postDoc = await getDoc(postDocRef)

        return {
            props: {
                post: JSON.parse(
                    safeJsonStringify({
                        id: postDoc.id,
                        ...postDoc.data()
                    }))
            }
        }
    } catch (error) {
        console.log('getStaticProps error', error)
    }

    return {
        notFound: true
    }
}