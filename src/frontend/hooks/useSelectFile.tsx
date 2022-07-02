import { firestore, storage } from "@firebase/clientApp"
import { addDoc, collection, doc, DocumentReference, setDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useEffect, useState } from "react"
import { v4 as uuid } from "uuid"

export interface SelectedFile {
    type: 'image' | 'video'
    file: File
    src?: string
    order: number
}

function useSelectFile() {
    const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])

    const uploadAllFiles = async (postDocRef: DocumentReference) => {
        if (!postDocRef) throw new Error('updateFile error do not have post to upload the image')
        try {
            return selectedFiles.map(async (fileSelected) => await updateFile(fileSelected, postDocRef))
        } catch (error: any) {
            console.log('updateAllFiles error', error.message)
            throw error
        }
    }

    const updateFile = async (selectedFile: SelectedFile, postDocRef: DocumentReference) => {
        if (!postDocRef) throw new Error('updateFile error do not have post to upload the image')
        const fileId = uuid()
        const storageRef = ref(storage, `posts/${postDocRef.id}/${selectedFile.type}s/${fileId}`)

        if (selectedFile.src) URL.revokeObjectURL(selectedFile.src)
        const uploadResult = await uploadBytes(storageRef, selectedFile.file)
        const url = await getDownloadURL(uploadResult.ref)

        console.log(selectedFile.type)
        console.log(selectedFile.order)
        console.log(url)
        const fileDocRef = doc(firestore, `posts/${postDocRef.id}/files/${fileId}`)

        await setDoc(fileDocRef,
            {
                type: selectedFile.type,
                order: selectedFile.order,
                url
            })
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