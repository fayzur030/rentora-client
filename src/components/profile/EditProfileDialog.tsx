'use client'

import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import ProfileImageUpload from './ProfileImageUpload'
import type { Profile, ProfileFormValues } from './types'

interface EditProfileDialogProps {
  profile: Profile
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (values: ProfileFormValues) => void
}

/**
 * EditProfileDialog: Modern SaaS Modal for editing the 5 core profile fields
 * - Profile Image (with ImgBB upload & preview)
 * - Full Name
 * - Email Address
 * - Phone Number
 * - Address
 */
const EditProfileDialog = ({
  profile,
  open,
  onOpenChange,
  onSave,
}: EditProfileDialogProps) => {
  // Local state for the 5 profile fields
  const [formData, setFormData] = useState<ProfileFormValues>({
    name: profile.name || '',
    email: profile.email || '',
    image: profile.image || '',
    phone: profile.phone || '',
    address: profile.address || '',
  })

  // Synchronize form values whenever the dialog opens or profile changes
  useEffect(() => {
    if (open) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        image: profile.image || '',
        phone: profile.phone || '',
        address: profile.address || '',
      })
    }
  }, [open, profile])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        overlayClassName='backdrop-blur-xs'
        forceOverlay
        className='gap-0 p-0 sm:max-w-xl overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl'
      >
        {/* Modal Header */}
        <DialogHeader className='border-b border-border px-5 py-5 pr-14 sm:px-6'>
          <DialogTitle className='font-heading text-lg font-bold text-foreground sm:text-xl'>
            Edit Profile
          </DialogTitle>
          <DialogDescription className='text-xs text-muted-foreground'>
            Update your profile photo, personal information, and address.
          </DialogDescription>
        </DialogHeader>

        {/* Form Container */}
        <form onSubmit={handleSubmit}>
          {/* Scrollable Form Body */}
          <div className='max-h-[70vh] overflow-y-auto px-5 py-5 sm:px-6 space-y-5'>
            {/* 1. Profile Image Upload Section */}
            <ProfileImageUpload
              value={formData.image}
              name={formData.name}
              onChange={(newImageUrl) =>
                setFormData((prev) => ({ ...prev, image: newImageUrl }))
              }
            />

            {/* Fields Grid */}
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              {/* 2. Full Name */}
              <div className='space-y-1.5 sm:col-span-1'>
                <Label htmlFor='profile-name' className='text-xs font-semibold'>
                  Full Name <span className='text-destructive'>*</span>
                </Label>
                <Input
                  id='profile-name'
                  type='text'
                  required
                  placeholder='e.g. John Doe'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className='h-10'
                />
              </div>

              {/* 3. Email Address */}
              <div className='space-y-1.5 sm:col-span-1'>
                <Label htmlFor='profile-email' className='text-xs font-semibold'>
                  Email Address <span className='text-destructive'>*</span>
                </Label>
                <Input
                  id='profile-email'
                  type='email'
                  required
                  placeholder='e.g. user@example.com'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className='h-10'
                />
              </div>

              {/* 4. Phone Number */}
              <div className='space-y-1.5 sm:col-span-2'>
                <Label htmlFor='profile-phone' className='text-xs font-semibold'>
                  Phone Number
                </Label>
                <Input
                  id='profile-phone'
                  type='tel'
                  placeholder='e.g. +880 1712 345678'
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className='h-10'
                />
              </div>

              {/* 5. Address */}
              <div className='space-y-1.5 sm:col-span-2'>
                <Label htmlFor='profile-address' className='text-xs font-semibold'>
                  Delivery / Contact Address
                </Label>
                <Textarea
                  id='profile-address'
                  rows={3}
                  placeholder='e.g. House 12, Road 7, Dhanmondi, Dhaka'
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, address: e.target.value }))
                  }
                  className='resize-none'
                />
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <DialogFooter className='border-t border-border bg-muted/20 px-5 py-4 sm:px-6'>
            <div className='flex w-full flex-col-reverse justify-end gap-2 sm:flex-row'>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type='submit' className='gap-2 shadow-2xs'>
                <Save className='size-4' aria-hidden='true' />
                Save Changes
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileDialog
