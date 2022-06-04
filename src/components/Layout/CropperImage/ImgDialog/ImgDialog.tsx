import { Button, Img, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import useSelectFile from '@hooks/useSelectFile'
import React from 'react'


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
                <ModalHeader>Cropped image</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Img src={img} alt="Cropped" maxHeight='100%' maxWidth='100%' />
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
                        Adicionar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default ImgDialog
