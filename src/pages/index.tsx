import { Post } from '@atoms/postsAtom'
import { Grid, GridItem, Stack } from '@chakra-ui/react'
import CreatePostLink from '@components/Community/CreatePostLink'
import PersonalHome from '@components/Community/PersonalHome'
import Premium from '@components/Community/Premium'
import PageContent from '@components/Layout/PageContent'
import PostItem from '@components/Posts/PostItem/PostItem'
import { auth, firestore } from '@firebase/clientApp'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import { useAuthState } from 'react-firebase-hooks/auth'
import safeJsonStringify from 'safe-json-stringify'

interface HomeProps {
  posts: Post[]
}

function Home({ posts }: HomeProps) {
  const [user, loadingUser] = useAuthState(auth)

  return (
    <PageContent>
      <>
        <Stack spacing={5}>
          <Premium />
          <PersonalHome />
          {user && (<CreatePostLink />)}
        </Stack>
      </>
      <>
        <Grid templateColumns='repeat(3, 1fr)'>
          {posts.map(post => (
            <GridItem
              key={post.id}
            >
              <PostItem post={post} />
            </GridItem>
          ))}
        </Grid>
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
