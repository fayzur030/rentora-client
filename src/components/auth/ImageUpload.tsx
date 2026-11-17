'use client'

import { useState } from 'react'
import { ImagePlus, LoaderCircle, Upload } from 'lucide-react'
import { toast } from 'sonner'

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
    <div className='space-y-3'>
      <label className='block text-sm font-semibold text-[#2B1A12]'>
        Profile Photo
      </label>

      <div className='flex items-center gap-4 rounded-xl border border-dashed border-[#D8CCBE] bg-[#FCFAF7] p-3'>
        <div className='flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F2EADF]'>
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt='Profile preview'
              className='size-full object-cover'
            />
          ) : (
            <ImagePlus className='size-6 text-[#A79A90]' />
          )}
        </div>

        <label className='inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#E8DDD2] bg-white px-3 text-xs font-semibold text-[#2B1A12] transition hover:border-[#F5A623] hover:bg-[#FFF8EA]'>
          {isUploading ? (
            <LoaderCircle className='size-4 animate-spin' />
          ) : (
            <Upload className='size-4' />
          )}
          {isUploading ? 'Uploading...' : 'Choose image'}
          <input
            type='file'
            accept='image/*'
            onChange={uploadImage}
            disabled={isUploading}
            className='hidden'
          />
        </label>
      </div>

      <input
        type='url'
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder='Or paste a direct image URL'
        className='h-11 w-full rounded-xl border border-[#E8DDD2] bg-[#FCFAF7] px-4 text-sm text-[#171411] outline-none transition placeholder:text-[#A79A90] focus:border-[#F5A623] focus:ring-4 focus:ring-[#F5A623]/10'
      />
    </div>
  )
}

export default ImageUpload
