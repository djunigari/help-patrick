import { Box, useDisclosure } from '@chakra-ui/react'
import { SelectedFile } from '@hooks/useSelectFile'
import { useEffect, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { getCroppedImg } from './canvasUtils'
import ImgDialog from './ImgDialog/ImgDialog'
import MenuCropper from './MenuCropper'

type tplotOptions = {
  [key: string]: number
}
export const ORIENTATION_TO_ANGLE: tplotOptions = {
  '3': 180,
  '6': 90,
  '8': -90,
}

interface CropperImageProps {
  selectedFile: SelectedFile
  setSelectedFile: (selectedFile: SelectedFile | null) => void
  selectedFiles: SelectedFile[]
  setSelectedFiles: (files: SelectedFile[]) => void
}

function CropperImage({ selectedFile, setSelectedFile, selectedFiles, setSelectedFiles }: CropperImageProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [croppedDataUrl, setCroppedDataUrl] = useState<string | null>(null)

  const [crop, setCrop] = useState({ x: 0, y: 0, })
  const [onCropSize, setOnCropSize] = useState({ width: 520, height: 520 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropComplete =
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels)
    }

  const showCroppedImage = async () => {
    try {
      const croppedDataUrl = await getCroppedImg(
        selectedFile?.src!,
        croppedAreaPixels!,
        rotation
      )

      setCroppedDataUrl(croppedDataUrl)

      onOpen()
    } catch (e) {
      console.error(e)
    }
  }

  const cancelCroppedImage = () => {
    if (croppedDataUrl) URL.revokeObjectURL(croppedDataUrl)
    setCroppedDataUrl(null)
    setSelectedFile(null)
    setRotation(0)
    setZoom(1)
    setCrop({ x: 0, y: 0, })
  }

  const addImage = async () => {
    if (croppedDataUrl) {
      const blob = await fetch(croppedDataUrl).then(it => it.blob())
      const file = new File([blob], 'croppedImage.jpg');
      setSelectedFiles([...selectedFiles, { type: 'image', file, src: croppedDataUrl, order: selectedFiles.length + 1 }])
    }
    cancelCroppedImage()
    onClose()
  }

  useEffect(() => {
    if (!isOpen) setCroppedDataUrl(null)
  }, [isOpen])

  return (
    <>
      <Box
        position='relative'
        width='100%'
        height={{ base: '200px', sm: '520px' }}
        bg='#333'
      >
        <Cropper
          image={selectedFile?.src}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          onCropSizeChange={setOnCropSize}
          aspect={1}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </Box>
      <MenuCropper
        zoom={zoom}
        setZoom={setZoom}
        rotation={rotation}
        setRotation={setRotation}
        showCroppedImage={showCroppedImage}
        cancelCroppedImage={cancelCroppedImage}
      />
      <ImgDialog
        img={croppedDataUrl as string}
        isOpen={isOpen}
        onClose={onClose}
        addImage={addImage}
      />
    </>
  )
}

export default CropperImage