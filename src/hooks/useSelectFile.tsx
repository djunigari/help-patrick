import { storage } from "@firebase/clientApp"
import { DocumentReference, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
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

        const promises = selectedFiles.map(async (file) => await updateFile(file, postDocRef))
        const urls = await Promise.all(promises)
        await updateDoc(postDocRef, {
            imageUrls: urls
        })
    }

    const updateFile = async (file: string, postDocRef: DocumentReference) => {
        //store in storage => getDownloadUrl ( return imageUrl)
        if (!postDocRef) throw new Error('updateFile error do not have post to upload the image')

        const imageRef = ref(storage, `posts/${postDocRef.id}/images/${uuid()}`)
        await uploadString(imageRef, file, 'data_url')
        const downloadUrl = await getDownloadURL(imageRef)
        return downloadUrl
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