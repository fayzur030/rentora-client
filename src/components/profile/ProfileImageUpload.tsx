'use client'

import { useRef, useState } from 'react'
import { ImagePlus, LoaderCircle, Trash2, Upload } from 'lucide-react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { getInitials } from './profile-utils'

interface ProfileImageUploadProps {
  value: string
  name: string
  onChange: (value: string) => void
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024

const ProfileImageUpload = ({
  value,
  name,
  onChange,
}: ProfileImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file.')
      event.target.value = ''
      return
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error('Image must be 5 MB or smaller.')
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
      toast.success('Profile image uploaded successfully.')
    } catch {
      toast.error('Image upload failed. Please try again.')
    } finally {
      setIsUploading(false)
      event.target.value = ''
    }
  }

  return (
    <div className='space-y-3'>
      <div>
        <Label htmlFor='profile-image' className='text-sm font-medium'>
          Profile image
        </Label>
        <p className='mt-1 text-xs text-muted-foreground'>
          Upload a clear photo. JPG, PNG or WebP up to 5 MB.
        </p>
      </div>

      <div className='flex flex-col gap-4 rounded-xl border border-dashed border-border bg-muted/30 p-4 sm:flex-row sm:items-center'>
        <Avatar className='size-20 shrink-0'>
          <AvatarImage
            src={value || undefined}
            alt={name || 'Profile image'}
            className='object-cover'
          />

          <AvatarFallback className='bg-primary text-lg font-semibold text-primary-foreground'>
            {value ? (
              <ImagePlus className='size-6' aria-hidden='true' />
            ) : (
              getInitials(name)
            )}
          </AvatarFallback>
        </Avatar>

        <div className='flex flex-wrap items-center gap-2'>
          <Button
            type='button'
            variant='outline'
            size='sm'
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className='gap-2'
          >
            {isUploading ? (
              <LoaderCircle className='size-4 animate-spin' aria-hidden='true' />
            ) : (
              <Upload className='size-4' aria-hidden='true' />
            )}
            {isUploading ? 'Uploading...' : 'Upload image'}
          </Button>

          {value ? (
            <Button
              type='button'
              variant='ghost'
              size='sm'
              disabled={isUploading}
              onClick={() => onChange('')}
              className='gap-2 text-destructive hover:text-destructive'
            >
              <Trash2 className='size-4' aria-hidden='true' />
              Remove
            </Button>
          ) : null}

          <input
            ref={fileInputRef}
            id='profile-image'
            type='file'
            accept='image/*'
            onChange={uploadImage}
            disabled={isUploading}
            className='hidden'
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileImageUpload
