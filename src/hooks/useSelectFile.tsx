import { storage } from "@firebase/clientApp"
import { DocumentReference } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useEffect, useState } from "react"
import { v4 as uuid } from "uuid"

export interface SelectedFile {
    type: 'image' | 'video'
    file: File
    src?: string
}

function useSelectFile() {
    const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])

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
        const storageRef = ref(storage, `posts/${postDocRef.id}/${selectedFile.type}s/${imageId}`)

        if (selectedFile.src) URL.revokeObjectURL(selectedFile.src)
        const uploadResult = await uploadBytes(storageRef, selectedFile.file)
        return getDownloadURL(uploadResult.ref)
    }

    const cleanFiles = () => {
        setSelectedFiles([])
    }

    useEffect(() => {
        return cleanFiles
    }, [])

    return {
        selectedFiles,
        setSelectedFiles,
        uploadAllFiles,
        cleanFiles
    }
}

export default useSelectFile