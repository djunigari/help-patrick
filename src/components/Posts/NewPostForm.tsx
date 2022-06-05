import { Contact, Post } from '@atoms/postsAtom'
import { Alert, AlertIcon, Box, Flex, Stack, Text } from '@chakra-ui/react'
import CropperImage from '@components/Layout/CropperImage/CropperImage'
import { User } from 'firebase/auth'
import { addDoc, collection, deleteDoc, DocumentReference, serverTimestamp, Timestamp } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import { firestore } from '../../firebase/clientApp'
import useSelectFile from '../../hooks/useSelectFile'
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

    const [textInputs, setTextInputs] = useState({
        title: '',
        body: '',
        categoria: ''
    })
    const { selectedFiles, setSelectedFiles, onSelectFile, updateAllFiles, cleanFiles } = useSelectFile()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleCreatePost = async () => {

        // create new post object => type Post
        const newPost: Post = {
            creatorId: user?.uid,
            creatorDisplayName: user.email!.split('@')[0],
            title: textInputs.title,
            body: textInputs.body,
            contact,
            categoria: textInputs.categoria,
            createAt: serverTimestamp() as Timestamp
        }

        setLoading(true)
        let postDocRef: DocumentReference | null = null
        try {
            //store the post in db
            postDocRef = await addDoc(collection(firestore, 'posts'), newPost)

            await updateAllFiles(postDocRef)

            router.back()
        } catch (error: any) {
            console.log('handleCreatePost error', error.message)
            if (postDocRef) await deleteDoc(postDocRef)
            setError(true)
        }
        cleanFiles()
        setLoading(false)
    }

    const onTextChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { target: { name, value } } = event
        setTextInputs(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <Flex direction='column' bg='white' borderRadius={4} mt={2} boxShadow="lg">

            <CropperImage selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />

            <Stack p={4} direction='column' spacing={4}>

                <ImageUpload
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                    onSelectFile={onSelectFile}
                />
                <TextInput
                    textInputs={textInputs}
                    contactInputs={contact}
                    setContact={setContact}
                    handleCreatePost={handleCreatePost}
                    onChange={onTextChange}
                    loading={loading}
                />
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