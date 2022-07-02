import { AspectRatio, Box, Icon, Img, useBreakpointValue } from '@chakra-ui/react';
import { IPostFile } from '@model/Post/PostFile';
import { useRef, useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface CarouselProps {
    files?: IPostFile[]
    maxWidth?: string
    maxHeight?: string
}


export default function Carousel({ files, maxHeight, maxWidth }: CarouselProps) {
    const slider = useRef<Slider>(null);
    const [index, setIndex] = useState<number>(0)

    // These are the breakpoints which changes the position of the
    // buttons as the screen size changes
    const top = useBreakpointValue({ base: '50%', md: '50%' });
    const side = useBreakpointValue({ base: '5px', md: '10px' });

    return (
        <>
            {files?.length && (
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
                    {index < (files.length - 1) && (
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
                        {files.map((file, index) => (
                            <AspectRatio key={index} maxH="100%" ratio={1} >
                                {file.type === 'image' ? (
                                    <Img
                                        width='100%' height='100%'
                                        key={index}
                                        src={file.url}
                                        objectFit='contain'
                                        alt={`Post Image ${index + 1}`}
                                    // onLoad={() => setLoadingImage(false)}
                                    />
                                ) : (
                                    <video
                                        width='100%'
                                        controls
                                        src={file.url}
                                    />
                                )}
                            </AspectRatio>
                        ))}
                    </Slider >
                </Box>
            )}
        </>
    );
}