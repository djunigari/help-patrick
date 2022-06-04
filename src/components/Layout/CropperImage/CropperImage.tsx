import { Stack, Box, Button, Flex, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text, Icon } from '@chakra-ui/react';
import { getOrientation } from 'get-orientation/browser';
import React, { useCallback, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from "react-easy-crop/types";
import { IoAddCircleSharp } from 'react-icons/io5';
import { getCroppedImg, getRotatedImage } from './canvasUtils';
import SliderCropper from './SliderCropper'

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

function CropperImage() {
    const selectedFileRef = useRef<HTMLInputElement>(null)
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
    const [croppedImage, setCroppedImage] = useState<string | null>(null)

    const onCropComplete = useCallback(
        (croppedArea: Area, croppedAreaPixels: Area) => {
            setCroppedAreaPixels(croppedAreaPixels)
        }, [])

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imageSrc!,
                croppedAreaPixels!,
                rotation
            )
            console.log('donee', { croppedImage })
            setCroppedImage(croppedImage)
        } catch (e) {
            console.error(e)
        }
    }, [imageSrc, croppedAreaPixels, rotation])

    const onClose = useCallback(() => {
        setCroppedImage(null)
    }, [])

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

    return (
        <>
            {imageSrc ? (
                <>
                    <Box
                        position='relative'
                        width='100%'
                        height={{ base: '200px', sm: '400px' }}
                        bg='#333'
                    >
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            rotation={rotation}
                            zoom={zoom}
                            aspect={4 / 3}
                            onCropChange={setCrop}
                            onRotationChange={setRotation}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </Box>
                    <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={{ base: 'stretch', sm: 'center' }}
                        justify='center'
                        width='full'
                        spacing={8}
                        p={4}
                    >
                        <SliderCropper
                            display='Zoom'
                            value={zoom}
                            onChange={(val) => setZoom(val)}
                            min={1}
                            max={3}
                            step={0.1}
                        />
                        <SliderCropper
                            display='Rotation'
                            value={rotation}
                            onChange={(val) => setRotation(val)}
                            min={0}
                            max={360}
                            step={1}
                        />
                        <Button
                            borderRadius='md'
                            bg='purple.600'
                        // onClick={showCroppedImage}
                        >
                            Show Result
                        </Button>
                    </Stack>
                    {/* <ImgDialog img={croppedImage} onClose={onClose} /> */}
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
                        justify='center'
                        align='center'
                        height={{ base: '100px', md: '200px' }}
                        cursor='pointer'
                        onClick={() => selectedFileRef.current?.click()}
                    >
                        <Icon as={IoAddCircleSharp} />
                    </Flex>
                    <input hidden ref={selectedFileRef} type='file' accept="image/*" onChange={onFileChange} />
                </Box>

            )}
        </>
    );
}

export default CropperImage

