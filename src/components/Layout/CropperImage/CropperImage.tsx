import { Box, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react';
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

function readFile(file: Blob): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result), false)
        reader.readAsDataURL(file)
    })
}

interface CropperImageProps {
    selectedFiles: string[]
    setSelectedFiles: (values: string[]) => void
}

function CropperImage({ selectedFiles, setSelectedFiles }: CropperImageProps) {
    const selectedFileRef = useRef<HTMLInputElement>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const [crop, setCrop] = useState({ x: 0, y: 0, })
    const [onCropSize, setOnCropSize] = useState({ width: 520, height: 520 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
    const [croppedImage, setCroppedImage] = useState<string | null>(null)

    const onCropComplete =
        (croppedArea: Area, croppedAreaPixels: Area) => {
            setCroppedAreaPixels(croppedAreaPixels)
        }

    const showCroppedImage = async () => {
        try {
            const croppedImage = await getCroppedImg(
                imageSrc!,
                croppedAreaPixels!,
                rotation
            )

            setCroppedImage(croppedImage)

            onOpen()
        } catch (e) {
            console.error(e)
        }
    }

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            let imageDataUrl = await readFile(file)

            // apply rotation if needed
            const orientation = await getOrientation(file)
            const rotation = ORIENTATION_TO_ANGLE[orientation]
            if (rotation) {
                imageDataUrl = await getRotatedImage(imageDataUrl as string, rotation)
            }

            setImageSrc(imageDataUrl as string)
        }
    }

    const addImage = () => {
        if (croppedImage) setSelectedFiles([...selectedFiles, croppedImage])
        setImageSrc(null)
        onClose()
    }

    useEffect(() => {
        if (!isOpen) setCroppedImage(null)
    }, [isOpen])

    return (
        <>
            {imageSrc ? (
                <>
                    <Box
                        position='relative'
                        width='100%'
                        height={{ base: '200px', sm: '520px' }}
                        bg='#333'
                    >
                        <Cropper
                            image={imageSrc}
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
                    />
                    <ImgDialog
                        img={croppedImage as string}
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

