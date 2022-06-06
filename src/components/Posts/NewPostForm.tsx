import { Contact, Post } from '@atoms/postsAtom'
import { Alert, AlertIcon, Box, Button, Flex, Stack, Text } from '@chakra-ui/react'
import CropperImage from '@components/Layout/CropperImage/CropperImage'
import { User } from 'firebase/auth'
import { addDoc, collection, deleteDoc, DocumentReference, serverTimestamp, Timestamp } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { firestore } from '@firebase/clientApp'
import useSelectFile from '../../hooks/useSelectFile'
import ContactInput from './PostForm/ContactInput'
import ImageUpload from './PostForm/ImageUpload'
import TextInput from './PostForm/TextInput'

interface NewPostFormProps {
    user: User
}

function NewPostForm({ user }: NewPostFormProps) {
    const router = useRouter()
    const [contact, setContact] = useState<Contact>({
        phone: '',
        instagram: '',
        facebook: ''
    })

    const [post, setPost] = useState<Post>({
        creatorId: user.uid,
        creatorDisplayName: user.email!.split('@')[0],
        title: '',
        body: '',
        contact,
        createAt: serverTimestamp() as Timestamp,
        categoria: '',
        subcategoria: ''
    })


    const [tags, setTags] = useState<string[]>([])

    const { selectedFiles, setSelectedFiles, onSelectFile, updateAllFiles, cleanFiles } = useSelectFile()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleCreatePost = async () => {
        setLoading(true)
        let postDocRef: DocumentReference | null = null
        try {
            //store the post in db
            postDocRef = await addDoc(collection(firestore, 'posts'), post)

            await updateAllFiles(postDocRef)

            router.push(`/posts/${postDocRef.id}`)
        } catch (error: any) {
            console.log('handleCreatePost error', error.message)
            if (postDocRef) await deleteDoc(postDocRef)
            setError(true)
        }
        cleanFiles()
        setLoading(false)
    }

    // const onTextChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const { target: { name, value } } = event
    //     setPost(prev => ({
    //         ...prev,
    //         [name]: value
    //     }))
    // }
    useEffect(() => {
        setPost({ ...post, contact })
    }, [contact])

    return (
        <Flex direction='column' bg='white' borderRadius={4} mt={2} boxShadow="lg">

            <CropperImage selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />

            <Stack p={4} direction='column' spacing={4}>

                <ImageUpload
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                    onSelectFile={onSelectFile}
                />
                <ContactInput
                    contactInputs={contact}
                    setContact={setContact}
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