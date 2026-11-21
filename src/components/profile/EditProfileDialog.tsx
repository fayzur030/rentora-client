'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import ProfileForm from './ProfileForm'
import type { Profile, ProfileFormValues } from './types'

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        overlayClassName='backdrop-blur-lg'
        forceOverlay
        className='max-h-[calc(100dvh-1.5rem)] gap-0 p-0 sm:max-w-3xl'
      >
        <DialogHeader className='shrink-0 border-b border-border px-5 py-5 pr-14 sm:px-6'>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Update your personal details, address and optional information.
          </DialogDescription>
        </DialogHeader>

        <ProfileForm
          profile={profile}
          onSave={onSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileDialog
