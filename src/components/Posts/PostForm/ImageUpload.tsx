import { Button, Flex, Image, Stack } from "@chakra-ui/react"
import { ChangeEvent, useRef } from "react"

interface ImageUploadProps {
    selectedFile?: string
    onSelectImage: (event: ChangeEvent<HTMLInputElement>) => void
    setSelectedFile: (value: string) => void
}

function ImageUpload({ selectedFile, onSelectImage, setSelectedFile }: ImageUploadProps) {
    const selectedFileRef = useRef<HTMLInputElement>(null)

    return (
        <Flex direction='column' justify='center' align='center' width='100%'>
            {selectedFile ? (
                <>
                    <Image src={selectedFile} maxWidth='400px' maxHeight='400px' alt='Image Selected' />
                    <Stack direction='row' mt={4}>
                        <Button
                            variant='outline'
                            height='28px'
                            onClick={() => setSelectedFile('')}
                        >
                            Remove
                        </Button>
                    </Stack>
                </>
            ) : (
                <Flex
                    justify='center'
                    align='center'
                    p={20}
                    border='1px dashed'
                    borderColor='gray.200'
                    width='100%'
                    borderRadius={4}
                >
                    <Button
                        variant='outline'
                        height='28px'
                        onClick={() => selectedFileRef.current?.click()}>
                        Upload Image
                    </Button>
                    <input ref={selectedFileRef} type='file' hidden onChange={onSelectImage} />
                    <img src={selectedFile} />
                </Flex>
            )}
        </Flex>
    )
}

export default ImageUpload