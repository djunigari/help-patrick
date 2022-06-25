import { Box, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react';
import { SelectedFile } from '@hooks/useSelectFile';
import { getOrientation } from 'get-orientation/browser';
import React, { useEffect, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from "react-easy-crop/types";
import { IoAddCircleSharp } from 'react-icons/io5';
import { getCroppedImg, getRotatedImage } from './canvasUtils';
import ImgDialog from './ImgDialog/ImgDialog';
import MenuCropperProps from './MenuCropper';

type tplotOptions = {
    [key: string]: number
}
const ORIENTATION_TO_ANGLE: tplotOptions = {
    '3': 180,
    '6': 90,
    '8': -90,
}

interface CropperImageProps {
    selectedFiles: SelectedFile[]
    setSelectedFiles: (files: SelectedFile[]) => void
    onSelectFile: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function CropperImage({ selectedFiles, setSelectedFiles, onSelectFile }: CropperImageProps) {
    const selectedFileRef = useRef<HTMLInputElement>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null)
    const [croppedDataUrl, setCroppedDataUrl] = useState<string | null>(null)

    const [crop, setCrop] = useState({ x: 0, y: 0, })
    const [onCropSize, setOnCropSize] = useState({ width: 520, height: 520 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

    const onCropComplete =
        (croppedArea: Area, croppedAreaPixels: Area) => {
            setCroppedAreaPixels(croppedAreaPixels)
        }

    const showCroppedImage = async () => {
        try {
            const croppedDataUrl = await getCroppedImg(
                selectedFile?.src!,
                croppedAreaPixels!,
                rotation
            )

            setCroppedDataUrl(croppedDataUrl)

            onOpen()
        } catch (e) {
            console.error(e)
        }
    }

    const cancelCroppedImage = () => {
        setCroppedDataUrl(null)
        setSelectedFile(null)
        setRotation(0)
        setZoom(1)
        setCrop({ x: 0, y: 0, })
    }

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            let blob = new Blob([file])
            let src = URL.createObjectURL(new Blob([file], { type: 'image/jpg' }))
            // let imageDataUrl = await readFile(file)

            // apply rotation if needed
            const orientation = await getOrientation(file)
            const rotation = ORIENTATION_TO_ANGLE[orientation]

            if (rotation) {
                const dataUrl = await getRotatedImage(src, rotation)
                URL.revokeObjectURL(src)
                src = dataUrl
                blob = await (await fetch(dataUrl)).blob();
            }

            setSelectedFile({ blob, src, })
        }
    }

    const addImage = async () => {
        if (croppedDataUrl) {
            const blob = await (await fetch(croppedDataUrl)).blob();
            setSelectedFiles([...selectedFiles, { blob, src: croppedDataUrl }])
        }
        cancelCroppedImage()
        onClose()
    }

    useEffect(() => {
        if (!isOpen) setCroppedDataUrl(null)
    }, [isOpen])

    return (
        <>
            {selectedFile?.src ? (
                <>
                    <Box
                        position='relative'
                        width='100%'
                        height={{ base: '200px', sm: '520px' }}
                        bg='#333'
                    >
                        <Cropper
                            image={selectedFile?.src}
                            crop={crop}
                            rotation={rotation}
                            zoom={zoom}
                            onCropSizeChange={setOnCropSize}
                            aspect={1}
                            onCropChange={setCrop}
                            onRotationChange={setRotation}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </Box>
                    <MenuCropperProps
                        zoom={zoom}
                        setZoom={setZoom}
                        rotation={rotation}
                        setRotation={setRotation}
                        showCroppedImage={showCroppedImage}
                        cancelCroppedImage={cancelCroppedImage}
                    />
                    <ImgDialog
                        img={croppedDataUrl as string}
                        isOpen={isOpen}
                        onClose={onClose}
                        addImage={addImage}
                    />
                </>
            ) : (
                <Box
                    border='1px dashed'
                    borderColor='blue.200'
                    borderRadius={4}
                    textColor='blue.200'
                    bg='gray.100'
                    _hover={{
                        borderColor: 'blue.400',
                        bg: 'white',
                        textColor: 'blue.400'
                    }}
                >
                    <Flex
                        direction='column'
                        justify='center'
                        align='center'
                        height={{ base: '100px', md: '200px' }}
                        cursor='pointer'
                        onClick={() => selectedFileRef.current?.click()}
                    >
                        <Icon fontSize='4xl' as={IoAddCircleSharp} />
                        <Text>Adicionar Imagem</Text>
                    </Flex>
                    <input hidden ref={selectedFileRef} type='file' accept="image/*" onChange={onFileChange} />
                </Box>

            )}
        </>
    );
}

export default CropperImage

