import { Box, Flex, Icon, Img, useBreakpointValue } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { AspectRatio } from '@chakra-ui/react'

interface CarouselProps {
    imageUrls?: string[]
    maxWidth?: string
    maxHeight?: string
}


export default function Carousel({ imageUrls, maxHeight, maxWidth }: CarouselProps) {
    const slider = useRef<Slider>(null);
    const [index, setIndex] = useState<number>(0)

    // These are the breakpoints which changes the position of the
    // buttons as the screen size changes
    const top = useBreakpointValue({ base: '50%', md: '50%' });
    const side = useBreakpointValue({ base: '5px', md: '10px' });

    return (
        <>
            {imageUrls?.length && (
                <Box
                    position='relative'
                    width='full'
                    mb={5}
                >
                    {index > 0 && (
                        <Icon as={BsArrowLeftCircleFill}
                            position='absolute'
                            zIndex={2}
                            color='white'
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
                            color='white'
                            cursor='pointer'
                            right={side}
                            top={top}
                            _hover={{ textColor: 'gray.100' }}
                            onClick={() => { slider.current?.slickNext() }}
                        />
                    )}
                    <Slider
                        ref={slider}
                        arrows={false}
                        infinite={false}
                        dots
                        beforeChange={(current, next) => { setIndex(next) }}
                    >
                        {imageUrls.map((url, index) => (

                            <Img

                                src={url}
                                objectFit='contain'
                                alt={`Post Image ${index + 1}`}
                            // onLoad={() => setLoadingImage(false)}
                            />

                        ))
                        }
                    </Slider >
                </Box>
            )}
        </>
    );
}