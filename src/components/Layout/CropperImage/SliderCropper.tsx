import { Text, Stack, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'
import React from 'react'


interface SliderCropperProps {
    display: string
    value: number
    onChange: (val: number) => void
    min: number
    max: number
    step: number
}

function SliderCropper({ display, value, onChange, min, max, step }: SliderCropperProps) {
    return (
        <Stack flexGrow={1} direction='row' align='center' spacing={4}>
            <Text fontWeight='semibold' color='gray.600'>
                {display}
            </Text>
            <Slider
                aria-label={display}
                colorScheme='purple'
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                step={step}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
        </Stack>
    )
}

export default SliderCropper