import { Post } from '@atoms/postsAtom'
import { Grid, GridItem, Stack } from '@chakra-ui/react'
import usePosts from '@hooks/usePosts'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import safeJsonStringify from 'safe-json-stringify'
import CreatePostLink from '@components/Community/CreatePostLink'
import PersonalHome from '@components/Community/PersonalHome'
import Premium from '@components/Community/Premium'
import PageContent from '@components/Layout/PageContent'
import PostItem from '@components/Posts/PostItem/PostItem'
import PostLoader from '@components/Posts/PostLoader'
import { auth, firestore } from '@firebase/clientApp'
import Carousel from '@components/Layout/Carousel/Carousel'

interface HomeProps {
  posts: Post[]
}

function Home({ posts }: HomeProps) {
  const [user, loadingUser] = useAuthState(auth)
  const [loading, setLoading] = useState(false)
  const { postStateValue, setPostStateValue, onSelectPost, onDeletePost } = usePosts()

  const buildNoUserHomeFeed = async () => {
    setLoading(true)

    if (posts.length) {
      setPostStateValue(prev => ({
        ...prev,
        posts: posts as Post[]
      }))
    }

    setLoading(false)
  }

  useEffect(() => {
    buildNoUserHomeFeed()
    return () => {
      setPostStateValue((prev => ({
        ...prev,
        posts: []
      })))
    }
  }, [])

  return (
    <PageContent>
      <>
        <Stack spacing={5}>
          <Premium />
          <PersonalHome />
        </Stack>
      </>
      <>
        {user && (<CreatePostLink />)}
        {loading ? (
          <PostLoader />
        ) : (
          <Grid templateColumns='repeat(3, 1fr)'>
            {postStateValue.posts.map(post => (
              <GridItem
                key={post.id}
              >
                <PostItem
                  homePage
                  post={post}
                  onSelectPost={onSelectPost}
                  onDeletePost={onDeletePost}
                  userIsCreator={user?.uid === post.creatorId}
                />
              </GridItem>
            ))}
          </Grid>
        )}
      </>
    </PageContent>
  )
}

export default Home


export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const postQuery = query(
      collection(firestore, 'posts'),
      orderBy('createAt', 'desc'),
      limit(10)
    )
    const postDocs = await getDocs(postQuery)

    const posts = postDocs.docs.map(item =>
      JSON.parse(
        safeJsonStringify(
          {
            id: item.id,
            ...item.data()
          }))

    )
    return {
      props: {
        posts
      }
    }
  } catch (error) {
    console.log('getStaticProps error', error)
  }
}
