import { storage } from "@firebase/clientApp"
import { DocumentReference } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { ChangeEvent, useEffect, useState } from "react"
import { v4 as uuid } from "uuid"

export interface SelectedFile {
    blob: Blob,
    src: string
}

function useSelectFile() {
    const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])

    const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
            const file = event.target.files?.[0]
            const blob = new Blob([file])
            const src = URL.createObjectURL(new Blob([file], { type: 'image/jpg' }))
            // const src = URL.createObjectURL(new Blob([file], { type: 'video/mp4' }))
            setSelectedFiles([...selectedFiles, { blob, src, }])
        }
    }

    const uploadAllFiles = async (postDocRef: DocumentReference) => {
        if (!postDocRef) throw new Error('updateFile error do not have post to upload the image')
        try {
            const promises = selectedFiles.map(async (fileSelected) => await updateFile(fileSelected, postDocRef))

            return Promise.all(promises)
        } catch (error: any) {
            console.log('updateAllFiles error', error.message)
        }
    }

    const updateFile = async (selectedFile: SelectedFile, postDocRef: DocumentReference) => {
        if (!postDocRef) throw new Error('updateFile error do not have post to upload the image')
        const imageId = uuid()
        const imageRef = ref(storage, `posts/${postDocRef.id}/images/${imageId}`)

        URL.revokeObjectURL(selectedFile.src)
        const uploadResult = await uploadBytes(imageRef, selectedFile.blob)
        return getDownloadURL(uploadResult.ref)
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
        uploadAllFiles,
        cleanFiles
    }
}

export default useSelectFile