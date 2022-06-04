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
  }, [])

  const images = [
    "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80",
    "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80",
    "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"

  ]

  return (
    <PageContent>
      <>
        <Carousel imageUrls={images} />
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
