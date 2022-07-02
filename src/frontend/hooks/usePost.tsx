import { firestore } from "@firebase/clientApp"
import { IPost } from "@model/Post/Post"
import { IPostFile, postFileConverter } from "core/models/Post/PostFile"
import { collection, getDocs, limit, query } from "firebase/firestore"
import { useEffect, useState } from "react"

function usePost(post: IPost) {
    const [files, setFiles] = useState<IPostFile[]>([])

    useEffect(() => {
        if (post) fetchPostFiles()
    }, [post])

    const fetchPostFiles = async () => {
        const filesQuery = query(collection(firestore, `posts/${post.id}/files`), limit(10)).withConverter(postFileConverter)
        const docSnap = await getDocs(filesQuery);

        const files = docSnap.docs.map(doc => ({ ...doc.data(), id: doc.id, }))
        setFiles(files)
    }

    return {
        files
    }
}

export default usePost