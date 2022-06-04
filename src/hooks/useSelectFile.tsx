import { storage } from "@firebase/clientApp"
import { async } from "@firebase/util"
import { DocumentReference, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage"
import { useState, ChangeEvent, useEffect } from "react"
import { v4 as uuid } from "uuid"

function useSelectFile() {
    const [selectedFiles, setSelectedFiles] = useState<string[]>([])

    const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        if (event.target.files?.[0]) {
            reader.readAsDataURL(event.target.files[0])
        }

        reader.onload = (readerEvent) => {
            if (readerEvent.target?.result) {
                const file = readerEvent.target.result as string
                if (selectedFiles.includes(file)) return
                setSelectedFiles([...selectedFiles, file])
            }
        }
        event.target.value = ''
    }

    const updateAllFiles = async (postDocRef: DocumentReference) => {
        if (!postDocRef) throw new Error('updateFile error do not have post to upload the image')
        try {
            const promises = selectedFiles.map(async (file) => await updateFile(file, postDocRef))
            const urls = await Promise.all(promises)
            await updateDoc(postDocRef, {
                imageUrls: urls
            })
        } catch (error: any) {
            console.log('updateAllFiles error', error.message)
        }
    }

    const updateFile = async (file: string, postDocRef: DocumentReference) => {
        //store in storage => getDownloadUrl ( return imageUrl)
        if (!postDocRef) throw new Error('updateFile error do not have post to upload the image')
        const imageId = uuid()
        const imageRef = ref(storage, `posts/${postDocRef.id}/images/${imageId}`)

        // await uploadString(imageRef, file, 'data_url')
        // const downloadUrl = await getDownloadURL(imageRef)

        const blobFile = await getBlobFile(file, imageId)
        URL.revokeObjectURL(file)

        const uploadResult = await uploadBytes(imageRef, blobFile)
        const downloadUrl = await getDownloadURL(uploadResult.ref)

        return downloadUrl
    }

    const getBlobFile = async (url: string, name: string) => {
        return fetch(url)
            .then(
                r => r.blob())
            .then(
                blobFile => new File([blobFile], name, { type: "image/png" })
            )
    }

    const cleanFiles = () => {
        setSelectedFiles([])
    }

    useEffect(() => {
        return cleanFiles
    }, [])

    return {
        onSelectFile,
        selectedFiles,
        setSelectedFiles,
        updateAllFiles,
        cleanFiles
    }
}

export default useSelectFile