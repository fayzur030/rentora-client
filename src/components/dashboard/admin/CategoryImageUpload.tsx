'use client'

import { useState } from 'react'
import { ImagePlus, LoaderCircle, Upload } from 'lucide-react'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CategoryImageUploadProps {
  id: string
  value: string
  onChange: (value: string) => void
}

const CategoryImageUpload = ({
  id,
  value,
  onChange,
}: CategoryImageUploadProps) => {
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
        throw new Error('Image upload failed')
      }

      onChange(result.data.url)
      toast.success('Image uploaded successfully.')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Image upload failed.'
      )
    } finally {
      setIsUploading(false)
      event.target.value = ''
    }
  }

  return (
    <div className='space-y-2'>
      <Label htmlFor={id}>Category image</Label>

      <div className='flex items-center gap-4 rounded-xl border border-dashed border-border bg-muted/30 p-4'>
        <div className='flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted'>
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt='Category preview'
              className='size-full object-cover'
            />
          ) : (
            <ImagePlus className='size-6 text-muted-foreground' />
          )}
        </div>

        <Label
          htmlFor={`${id}-file`}
          className='inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium hover:bg-muted'
        >
          {isUploading ? (
            <LoaderCircle className='size-4 animate-spin' aria-hidden='true' />
          ) : (
            <Upload className='size-4' aria-hidden='true' />
          )}
          {isUploading ? 'Uploading...' : 'Choose image'}
        </Label>
        <Input
          id={`${id}-file`}
          type='file'
          accept='image/*'
          onChange={uploadImage}
          disabled={isUploading}
          className='hidden'
        />
      </div>

      <Input
        id={id}
        type='url'
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder='Or paste an image URL'
        required
      />
    </div>
  )
}

export default CategoryImageUpload
