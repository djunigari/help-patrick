import { Button, Stack } from '@chakra-ui/react'
import React from 'react'
import SliderCropper from './SliderCropper'

interface MenuCropperProps {
    zoom: number
    setZoom: (val: number) => void
    rotation: number
    setRotation: (val: number) => void
    showCroppedImage: () => void
}

function MenuCropper({ zoom, setZoom, rotation, setRotation, showCroppedImage }: MenuCropperProps) {
    return (
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
                onClick={showCroppedImage}
            >
                Adicionar
            </Button>
        </Stack>
    )
}

export default MenuCropper