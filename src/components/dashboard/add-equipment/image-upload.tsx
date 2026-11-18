'use client'

import { useState } from 'react'
import { ImagePlus, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false)

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file.')
      event.target.value = ''
      return
    }

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY

    if (!apiKey) {
      toast.error('ImgBB API key is missing.')
      event.target.value = ''
      return
    }

    const formData = new FormData()
    formData.append('image', file)

    setIsUploading(true)

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: 'POST',
          body: formData,
        }
      )

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error('Upload failed')
      }

      onChange(result.data.url)
      toast.success('Image uploaded successfully.')
    } catch {
      toast.error('Image upload failed. Please try again.')
    } finally {
      setIsUploading(false)
      event.target.value = ''
    }
  }

  return (
    <div className='space-y-2'>
      <Label
        htmlFor='equipment-image'
        className='text-sm font-medium text-foreground'
      >
        Equipment image
      </Label>

      <div className='rounded-xl border border-dashed border-border bg-muted/30 p-5'>
        <div className='flex flex-col items-center text-center'>
          <span className='mb-3 flex size-12 items-center justify-center overflow-hidden rounded-xl bg-primary/10 text-primary'>
            {value ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value}
                alt='Equipment preview'
                className='size-full object-cover'
              />
            ) : (
              <ImagePlus className='size-6' aria-hidden='true' />
            )}
          </span>

          <p className='text-sm font-semibold text-foreground'>
            Add a photo of your equipment
          </p>

          <p className='mt-1 text-xs text-muted-foreground'>
            Choose an image from your device.
          </p>

          <Label
            htmlFor='equipment-image'
            className='mt-4 flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 text-xs font-medium text-primary-foreground '
          >
            {isUploading && <LoaderCircle className='size-4 animate-spin' />}

            {isUploading ? 'Uploading...' : 'Choose image'}
          </Label>

          <Input
            id='equipment-image'
            type='file'
            accept='image/*'
            onChange={uploadImage}
            disabled={isUploading}
            className='hidden '
          />
        </div>
      </div>

      <Input
        type='url'
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder='Or paste an image URL '
      />
    </div>
  )
}

export default ImageUpload
