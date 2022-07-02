import { Button, Img, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'


interface ImgDialogProps {
    img: string
    isOpen: boolean
    onClose: () => void
    addImage: () => void
}

function ImgDialog({ img, isOpen, onClose, addImage }: ImgDialogProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Imagem Selecionada</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    alignSelf='center'
                    width={{ base: 'xs', md: 'md' }}
                    height={{ base: 'xs', md: 'md' }}
                >
                    <Img src={img} alt="Cropped" width='100%' height='100%' />
                </ModalBody>
                <ModalFooter>
                    <Button
                        borderRadius='md'
                        bg='red'
                        mr={3}
                        _hover={{ bg: 'red.200' }}
                        onClick={onClose}
                    >
                        Close
                    </Button>
                    <Button
                        borderRadius='md'
                        bg='green'
                        _hover={{ bg: 'green.200' }}
                        onClick={addImage}
                    >
                        Adicionar Image
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default ImgDialog
