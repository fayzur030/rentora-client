import { ImagePlus } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Image picker UI only.
// The actual ImgBB upload logic will be added later.
const ImageUpload = () => {
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
          <span className='mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary'>
            <ImagePlus className='size-6' aria-hidden='true' />
          </span>

          <p className='text-sm font-semibold text-foreground'>
            Add a photo of your equipment
          </p>
          <p className='mt-1 text-xs text-muted-foreground'>
            Choose an image from your device.
          </p>

          <Input
            id='equipment-image'
            name='image'
            type='file'
            accept='image/*'
            className='mt-4 h-auto w-full max-w-sm cursor-pointer bg-background py-2 text-xs file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:font-medium file:text-primary-foreground'
          />
        </div>
      </div>
    </div>
  )
}

export default ImageUpload
