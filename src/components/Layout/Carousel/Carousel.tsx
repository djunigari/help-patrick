import { Box, Icon, Img, useBreakpointValue } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";


interface CarouselProps {
    imageUrls: string[]
    maxWidth?: string
    maxHeight?: string
    onLoad: () => void
}


export default function Carousel({ imageUrls, maxHeight, maxWidth, onLoad }: CarouselProps) {
    const slider = useRef<Slider>(null);
    const [index, setIndex] = useState<number>(0)

    // These are the breakpoints which changes the position of the
    // buttons as the screen size changes
    const top = useBreakpointValue({ base: '50%', md: '50%' });
    const side = useBreakpointValue({ base: '5px', md: '10px' });

    useEffect(() => {
        onLoad()
    }, [])

    return (
        <Box
            position={'relative'}
            height={'600px'}
            width={'full'}
            overflow={'hidden'}
            mb={10}
            fontSize='2xl'
            color='gray.200'
        >


            {index > 0 && (
                <Icon as={BsArrowLeftCircleFill}
                    position='absolute'
                    zIndex={2}
                    border='1px solid'
                    borderColor='gray.600'
                    borderRadius='full'
                    bg='black'
                    cursor='pointer'
                    left={side}
                    top={top}
                    _hover={{ textColor: 'gray.100' }}
                    onClick={() => slider.current?.slickPrev()}
                />
            )}
            {index < (imageUrls.length - 1) && (
                <Icon as={BsArrowRightCircleFill}
                    position='absolute'
                    zIndex={2}
                    border='1px solid'
                    borderColor='gray.600'
                    borderRadius='full'
                    bg='black'
                    cursor='pointer'
                    right={side}
                    top={top}
                    _hover={{ textColor: 'gray.100' }}
                    onClick={() => { slider.current?.slickNext() }}
                />
            )}

            {/* Slider */}
            <Slider
                ref={slider}
                arrows={false}
                infinite={false}
                dots
                beforeChange={(current, next) => { setIndex(next) }}
            >
                {imageUrls.map((url, index) => (
                    <Box
                        key={index}
                        height={'6xl'}
                        position="relative"
                    >
                        <Img
                            src={url}
                            objectFit='cover'
                            height='100%'
                            width='100%'
                            alt='Post Image'
                        />
                    </Box>
                ))
                }
            </Slider >
        </Box >
    );
}