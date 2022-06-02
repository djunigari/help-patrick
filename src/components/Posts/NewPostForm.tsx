import { Contact, Post } from '@atoms/postsAtom'
import { Alert, AlertIcon, Flex, Stack, Text } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import { firestore, storage } from '../../firebase/clientApp'
import useSelectFile from '../../hooks/useSelectFile'
import ImageUpload from './PostForm/ImageUpload'
import TextInput from './PostForm/TextInput'

interface NewPostFormProps {
    user: User
}

function NewPostForm({ user }: NewPostFormProps) {
    const router = useRouter()

    const [contact, setContact] = useState<Contact>({
        email: user.email!,
        phone: '',
        instagram: '',
        facebook: ''
    })

    const [textInputs, setTextInputs] = useState({
        title: '',
        body: ''
    })
    const { onSelectFile, selectedFile, setSelectedFile } = useSelectFile()
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
            createAt: serverTimestamp() as Timestamp
        }

        setLoading(true)
        try {
            //store the post in db
            const postDocRef = await addDoc(collection(firestore, 'posts'), newPost)

            //check for selectedFile
            if (selectedFile) {
                //store in storage => getDownloadUrl ( return imageUrl)
                const imageRef = ref(storage, `posts/${postDocRef.id}/image`)
                await uploadString(imageRef, selectedFile, 'data_url')
                const downloadUrl = await getDownloadURL(imageRef)
                //update post doc by adding imageUrl
                await updateDoc(postDocRef, {
                    imageUrl: downloadUrl
                })
            }
            router.back()
        } catch (error: any) {
            console.log('handleCreatePost error', error.message)
            setError(true)
        }
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
        <Flex direction='column' bg='white' borderRadius={4} mt={2}>
            <Stack p={4} direction='column' spacing={4}>
                <ImageUpload
                    selectedFile={selectedFile}
                    onSelectImage={onSelectFile}
                    setSelectedFile={setSelectedFile}
                />
                <TextInput
                    textInputs={textInputs}
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