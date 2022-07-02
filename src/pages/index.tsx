import { Grid, GridItem, Stack } from '@chakra-ui/react'
import CreatePostLink from '@components/Community/CreatePostLink'
import Premium from '@components/Community/Premium'
import PageContent from '@components/Layout/PageContent'
import PostItem from '@components/Posts/PostItem/PostItem'
import { auth, firestore } from '@firebase/clientApp'
import { IPost, postConverter } from '@model/Post/Post'
import { collection, limit, onSnapshot, orderBy, query, QueryDocumentSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

function Home() {
  const [user, loadingUser] = useAuthState(auth)
  const [posts, setPosts] = useState<IPost[]>([])

  useEffect(() =>
    onSnapshot(
      query(
        collection(firestore, 'posts'),
        orderBy('createAt', 'desc'),
        limit(10)
      ).withConverter(postConverter),
      snapshot => setPosts(snapshot.docs.map(item => ({ ...item.data(), id: item.id })))
    )
    , [])

  return (
    <PageContent>
      <>
        <Stack spacing={5}>
          <Premium />
          {user && (<CreatePostLink />)}
        </Stack>
      </>
      <>
        <Grid templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(5, 1fr)' }}>
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