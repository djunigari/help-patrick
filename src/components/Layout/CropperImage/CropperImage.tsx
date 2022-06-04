import { Box, Button, Flex, Slider, Text } from '@chakra-ui/react';
import { getOrientation } from 'get-orientation/browser';
import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from "react-easy-crop/types";
import { getCroppedImg, getRotatedImage } from './canvasUtils';

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
                    <Flex
                        direction={{ base: 'column', sm: 'row' }}
                        align={{ base: 'stretch', sm: 'center' }}
                        p={16}
                    >
                        <Flex align='center'>
                            <Text>
                                Zoom
                            </Text>
                            <Slider
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                            // aria-labelledby="Zoom"
                            // classes={{ root: classes.slider }}
                            // onChange={(e, zoom) => setZoom(zoom)}
                            />
                        </Flex>
                        <Flex align='center'>
                            <Text>
                                Rotation
                            </Text>
                            <Slider
                                value={rotation}
                                min={0}
                                max={360}
                                step={1}
                            // aria-labelledby="Rotation"
                            // classes={{ root: classes.slider }}
                            // onChange={(e, rotation) => setRotation(rotation)}
                            />
                        </Flex>
                        <Button
                            color='purple.400'
                        // onClick={showCroppedImage}
                        >
                            Show Result
                        </Button>
                    </Flex>
                    {/* <ImgDialog img={croppedImage} onClose={onClose} /> */}
                </>
            ) : (
                <input type="file" onChange={onFileChange} accept="image/*" />
            )}
        </>
    );
}

export default CropperImage

