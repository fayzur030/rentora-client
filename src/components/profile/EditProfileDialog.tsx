'use client'

import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import { toast } from 'sonner'

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
import { authClient } from '@/lib/auth-client'

interface EditProfileDialogProps {
  profile: Profile
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (values: ProfileFormValues) => void
}

const EditProfileDialog = ({
  profile,
  open,
  onOpenChange,
  onSave,
}: EditProfileDialogProps) => {
  const [formData, setFormData] = useState<ProfileFormValues>({
    name: profile.name || '',
    email: profile.email || '',
    image: profile.image || '',
    phone: profile.phone || '',
    address: profile.address || '',
  })

  const [isSaving, setIsSaving] = useState(false)

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

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const updatedName = formData.name.trim()

    if (!updatedName) {
      toast.error('Name is required.')
      return
    }

    setIsSaving(true)

    try {
      const { error } = await authClient.updateUser({
        name: updatedName,
        image: formData.image || undefined,
        phone: formData.phone.trim(),
        address: formData.address.trim(),
      })

      if (error) {
        toast.error(error.message || 'Failed to update profile.')
        return
      }

      const updatedProfile: ProfileFormValues = {
        ...formData,
        name: updatedName,
        phone: formData.phone.trim(),
        address: formData.address.trim(),
      }

      onSave(updatedProfile)

      toast.success('Profile updated successfully!')

      onOpenChange(false)
    } catch (error) {
      console.error('Profile update error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        overlayClassName='backdrop-blur-xs'
        forceOverlay
        className='gap-0 overflow-hidden rounded-2xl border border-border bg-card p-0 text-card-foreground shadow-2xl sm:max-w-xl'
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
          <div className='max-h-[70vh] space-y-5 overflow-y-auto px-5 py-5 sm:px-6'>
            {/* Profile Image Upload */}
            <ProfileImageUpload
              value={formData.image}
              name={formData.name}
              onChange={(newImageUrl) =>
                setFormData((prev) => ({
                  ...prev,
                  image: newImageUrl,
                }))
              }
            />

            {/* Fields Grid */}
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              {/* Full Name */}
              <div className='space-y-1.5'>
                <Label htmlFor='profile-name' className='text-xs font-semibold'>
                  Full Name <span className='text-destructive'>*</span>
                </Label>

                <Input
                  id='profile-name'
                  name='name'
                  type='text'
                  required
                  placeholder='e.g. John Doe'
                  value={formData.name}
                  onChange={handleChange}
                  className='h-10'
                />
              </div>

              {/* Email Address */}
              <div className='space-y-1.5'>
                <Label
                  htmlFor='profile-email'
                  className='text-xs font-semibold'
                >
                  Email Address
                </Label>

                <Input
                  id='profile-email'
                  type='email'
                  value={formData.email}
                  readOnly
                  disabled
                  className='h-10'
                />
              </div>

              {/* Phone Number */}
              <div className='space-y-1.5 sm:col-span-2'>
                <Label
                  htmlFor='profile-phone'
                  className='text-xs font-semibold'
                >
                  Phone Number
                </Label>

                <Input
                  id='profile-phone'
                  name='phone'
                  type='tel'
                  placeholder='e.g. +880 1712 345678'
                  value={formData.phone}
                  onChange={handleChange}
                  className='h-10'
                />
              </div>

              {/* Address */}
              <div className='space-y-1.5 sm:col-span-2'>
                <Label
                  htmlFor='profile-address'
                  className='text-xs font-semibold'
                >
                  Address
                </Label>

                <Textarea
                  id='profile-address'
                  name='address'
                  rows={3}
                  placeholder='e.g. House 12, Road 7, Dhanmondi, Dhaka'
                  value={formData.address}
                  onChange={handleChange}
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
                disabled={isSaving}
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>

              <Button
                type='submit'
                disabled={isSaving}
                className='gap-2 shadow-2xs'
              >
                <Save className='size-4' aria-hidden='true' />

                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileDialog
