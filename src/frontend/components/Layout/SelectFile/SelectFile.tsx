import { SelectedFile } from '@hooks/useSelectFile';
import { getOrientation } from 'get-orientation/browser';
import { useState } from 'react';
import AddButton from './AddButton';
import { getRotatedImage } from './canvasUtils';
import CropperImage, { ORIENTATION_TO_ANGLE } from './CropperImage';
import VideoUpload from './VideoUpload';

interface CropperImageProps {
    selectedFiles: SelectedFile[]
    setSelectedFiles: (files: SelectedFile[]) => void
}

function SelectFile({ selectedFiles, setSelectedFiles }: CropperImageProps) {
    const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null)

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            let file = e.target.files[0]
            let type = file.type.split('/')[0]
            if (type === 'video') {
                setSelectedFile({ type: 'video', file, order: selectedFiles.length + 1 })
            } else if (type === 'image') {
                await onFileChangeImage(file)
            } else {
                throw new Error('Filex extension not accept')
            }
        }
    }

    const onFileChangeImage = async (file: File) => {
        let blob = new Blob([file])
        let src = URL.createObjectURL(blob)
        setSelectedFile({ file, src, type: 'image', order: selectedFiles.length + 1 })
        // let imageDataUrl = await readFile(file)

        // apply rotation if needed
        const orientation = await getOrientation(file)
        const rotation = ORIENTATION_TO_ANGLE[orientation]

        if (rotation) {
            const dataUrl = await getRotatedImage(src, rotation)
            URL.revokeObjectURL(src)
            src = dataUrl
            blob = await fetch(dataUrl).then(it => it.blob())
            file = new File([blob], file.name);
            setSelectedFile({ file, src, type: 'image', order: selectedFiles.length + 1 })
        }
    }

    return (
        <>
            {selectedFile?.file ? (
                <>
                    {selectedFile.type === 'video' && (
                        <VideoUpload
                            selectedFile={selectedFile}
                            setSelectedFile={setSelectedFile}
                            selectedFiles={selectedFiles}
                            setSelectedFiles={setSelectedFiles}
                        />
                    )}
                    {selectedFile.type === 'image' && (
                        <CropperImage
                            selectedFile={selectedFile}
                            setSelectedFile={setSelectedFile}
                            selectedFiles={selectedFiles}
                            setSelectedFiles={setSelectedFiles}
                        />
                    )}
                </>
            ) : (
                <AddButton onFileChange={onFileChange} />
            )}
        </>
    );
}

export default SelectFile

