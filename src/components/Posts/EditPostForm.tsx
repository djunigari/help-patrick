import { Contact, Post } from '@atoms/postsAtom'
import { Alert, AlertIcon, Button, Flex, Stack, Text } from '@chakra-ui/react'
import CropperImage from '@components/Layout/CropperImage/CropperImage'
import { firestore, storage } from '@firebase/clientApp'
import { User } from 'firebase/auth'
import { collection, doc, DocumentReference, setDoc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSelectFile from '../../hooks/useSelectFile'
import ContactInput from './PostForm/ContactInput'
import FilterInputs from './PostForm/FilterInputs'
import ImageUpload from './PostForm/ImageUpload'
import TextInput from './PostForm/TextInput'

interface EditPostFormProps {
    user: User
    oldVersionPost: Post
}

function EditPostForm({ user, oldVersionPost }: EditPostFormProps) {
    const router = useRouter()
    const [contact, setContact] = useState<Contact>({ ...oldVersionPost.contact })

    const [post, setPost] = useState<Post>({ ...oldVersionPost })
    const [images, setImages] = useState<string[]>([])

    const { selectedFiles, setSelectedFiles, onSelectFile, uploadAllFiles } = useSelectFile()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleUpdatePost = async () => {
        setLoading(true)
        let postDocRef: DocumentReference | null = null
        try {
            //store the post in db
            postDocRef = doc(collection(firestore, 'posts'), oldVersionPost.id)

            const urls = await uploadAllFiles(postDocRef)

            const removedImgs = oldVersionPost.imageUrls?.filter(item => !images.includes(item));
            removedImgs?.map(item => {
                const storageRef = ref(storage, item);
                console.log(storageRef)
                // Delete the file
                deleteObject(storageRef).then(() => {
                    console.log('Image deleted')
                }).catch((error) => {
                    console.log('Ocorreu um erro')
                });
            })

            const postDodc = await setDoc(postDocRef, { ...post, imageUrls: [...images, ...(urls || [])] })

            router.push(`/posts/${postDocRef.id}`)
        } catch (error: any) {
            console.log('handleUpdatePost error', error.message)
            setError(true)
        }
        router.push(`/posts/${post.id}`)
        setLoading(false)
    }

    useEffect(() => {
        if (oldVersionPost) {
            setPost({ ...oldVersionPost })
            setImages([...oldVersionPost.imageUrls || []])
        }
    }, [oldVersionPost])

    useEffect(() => {
        setPost({ ...post, contact })
    }, [contact])

    return (
        <Flex direction='column' bg='white' borderRadius={4} mt={2} boxShadow="lg">

            <CropperImage selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />

            <Stack p={4} direction='column' spacing={4}>

                <ImageUpload
                    images={images}
                    setImages={setImages}
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                    onSelectFile={onSelectFile}
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
                <Flex justify='flex-end'>
                    <Button
                        alignSelf='flex-end'
                        height='34px'
                        padding='0px 30px'
                        disabled={!post.title}
                        isLoading={loading}
                        onClick={() => router.back()}
                    >
                        Cancelar
                    </Button>
                    <Button
                        alignSelf='flex-end'
                        height='34px'
                        padding='0px 30px'
                        disabled={!post.title}
                        isLoading={loading}
                        onClick={handleUpdatePost}
                    >
                        Atualizar
                    </Button>
                </Flex>


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

export default EditPostForm