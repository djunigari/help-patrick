import { Alert, AlertIcon, Button, Flex, Stack, Text } from '@chakra-ui/react'
import SelectFile from '@components/Layout/SelectFile/SelectFile'
import { firestore } from '@firebase/clientApp'
import { IContact } from '@model/Post/Contact'
import { IPost } from '@model/Post/Post'
import { User } from 'firebase/auth'
import { addDoc, collection, deleteDoc, DocumentReference, serverTimestamp, Timestamp } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSelectFile from '../../hooks/useSelectFile'
import ContactInput from './PostForm/ContactInput'
import FileUpload from './PostForm/FileUpload'
import FilterInputs from './PostForm/FilterInputs'
import TextInput from './PostForm/TextInput'

interface NewPostFormProps {
    user: User
}

function NewPostForm({ user }: NewPostFormProps) {
    const router = useRouter()
    const [contact, setContact] = useState<IContact>({
        phone: '',
        instagram: '',
        facebook: ''
    })

    const [post, setPost] = useState<IPost>(
        {
            creatorId: user.uid,
            creatorDisplayName: user.email!.split('@')[0],
            title: '',
            body: '',
            contact,
            createAt: serverTimestamp() as Timestamp,
            category: '',
            subcategory: ''
        })

    const { selectedFiles, setSelectedFiles, uploadAllFiles, cleanFiles } = useSelectFile()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleCreatePost = async () => {
        setLoading(true)
        let postDocRef: DocumentReference | null = null
        try {
            //store the post in db
            postDocRef = await addDoc(collection(firestore, 'posts'), post)

            await uploadAllFiles(postDocRef)

            router.push(`/posts/${postDocRef.id}`)
        } catch (error: any) {
            console.log('handleCreatePost error', error.message)
            if (postDocRef) await deleteDoc(postDocRef)
            setError(true)
        }
        cleanFiles()
        setLoading(false)
    }

    useEffect(() => {
        setPost({ ...post, contact })
    }, [contact])

    return (
        <Flex direction='column' bg='white' borderRadius={4} mt={2} boxShadow="lg">

            <SelectFile selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />

            <Stack p={4} direction='column' spacing={4}>

                <FileUpload
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                />
                <ContactInput
                    contactInputs={contact}
                    setContact={setContact}
                />
                <FilterInputs
                    post={post}
                    setPost={setPost}
                />
                <TextInput
                    post={post}
                    setPost={setPost}
                />
                <Button
                    alignSelf='flex-end'
                    height='34px'
                    padding='0px 30px'
                    disabled={!post.title}
                    isLoading={loading}
                    onClick={handleCreatePost}
                >
                    Post
                </Button>

            </Stack>
            {error && (
                <Alert status='error'>
                    <AlertIcon />
                    <Text mr={2}>Error creating post</Text>
                </Alert>
            )}
        </Flex>
    )
}

export default NewPostForm