'use client'

import { useState } from 'react'
import { MapPin, Sparkles, UserRound } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import ProfileImageUpload from './ProfileImageUpload'
import type { Profile, ProfileFormValues } from './types'

interface ProfileFormProps {
  profile: Profile
  onSave: (values: ProfileFormValues) => void
  onCancel: () => void
}

const genderOptions = ['Female', 'Male', 'Other', 'Prefer not to say']
const languageOptions = ['English', 'Bangla', 'Hindi', 'Arabic', 'Spanish']
const timeZoneOptions = [
  'Asia/Dhaka',
  'Asia/Kolkata',
  'Asia/Dubai',
  'Europe/London',
  'America/New_York',
]

// Every input is a string so it can be bound to the form directly.
// Missing profile values become empty strings.
const toFormValues = (profile: Profile): ProfileFormValues => ({
  image: profile.image || '',
  name: profile.name || '',
  email: profile.email || '',
  phone: profile.phone || '',
  dateOfBirth: profile.dateOfBirth || '',
  gender: profile.gender || '',
  address: profile.address || '',
  city: profile.city || '',
  state: profile.state || '',
  country: profile.country || '',
  postalCode: profile.postalCode || '',
  bio: profile.bio || '',
  companyName: profile.companyName || '',
  website: profile.website || '',
  preferredLanguage: profile.preferredLanguage || '',
  timeZone: profile.timeZone || '',
})

interface TextFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
  required?: boolean
}

// A small label + input helper used by the form below.
const TextField = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
}: TextFieldProps) => {
  return (
    <div className='space-y-2'>
      <Label htmlFor={id} className='text-sm font-medium'>
        {label}
      </Label>

      <Input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className='h-10'
      />
    </div>
  )
}

interface SelectFieldProps {
  id: string
  label: string
  value: string
  placeholder: string
  options: string[]
  onChange: (value: string) => void
}

// A small label + dropdown helper.
const SelectField = ({
  id,
  label,
  value,
  placeholder,
  options,
  onChange,
}: SelectFieldProps) => {
  return (
    <div className='space-y-2'>
      <Label htmlFor={id} className='text-sm font-medium'>
        {label}
      </Label>

      <Select
        value={value || null}
        onValueChange={(selectedValue) => onChange(selectedValue ?? '')}
      >
        <SelectTrigger id={id} className='h-10 w-full bg-background'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

interface SectionHeadingProps {
  icon: typeof UserRound
  title: string
  description: string
}

const SectionHeading = ({ icon: Icon, title, description }: SectionHeadingProps) => {
  return (
    <div className='flex items-start gap-3'>
      <span className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary ring-1 ring-primary/10'>
        <Icon className='size-4' aria-hidden='true' />
      </span>

      <div className='space-y-0.5'>
        <h3 className='text-sm font-semibold text-foreground'>{title}</h3>
        <p className='text-xs text-muted-foreground'>{description}</p>
      </div>
    </div>
  )
}

const ProfileForm = ({ profile, onSave, onCancel }: ProfileFormProps) => {
  const [values, setValues] = useState<ProfileFormValues>(() =>
    toFormValues(profile)
  )

  const updateField = (field: keyof ProfileFormValues, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSave(values)
  }

  return (
    <form onSubmit={handleSubmit} className='flex min-h-0 flex-1 flex-col'>
      <div className='min-h-0 flex-1 space-y-7 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6'>
        <section className='space-y-4'>
          <SectionHeading
            icon={UserRound}
            title='Personal information'
            description='Your name, contact details and profile photo.'
          />

          <ProfileImageUpload
            value={values.image}
            name={values.name}
            onChange={(image) => updateField('image', image)}
          />

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <TextField
              id='profile-name'
              label='Full name'
              value={values.name}
              onChange={(value) => updateField('name', value)}
              placeholder='Your full name'
              required
            />

            <TextField
              id='profile-email'
              label='Email address'
              type='email'
              value={values.email}
              onChange={(value) => updateField('email', value)}
              placeholder='you@example.com'
              required
            />

            <TextField
              id='profile-phone'
              label='Phone number'
              type='tel'
              value={values.phone}
              onChange={(value) => updateField('phone', value)}
              placeholder='+880 1XXX XXXXXX'
            />

            <TextField
              id='profile-date-of-birth'
              label='Date of birth'
              type='date'
              value={values.dateOfBirth}
              onChange={(value) => updateField('dateOfBirth', value)}
            />

            <SelectField
              id='profile-gender'
              label='Gender'
              value={values.gender}
              placeholder='Select gender'
              options={genderOptions}
              onChange={(value) => updateField('gender', value)}
            />
          </div>
        </section>

        <section className='space-y-4'>
          <SectionHeading
            icon={MapPin}
            title='Address information'
            description='Where you are based, used for rentals and deliveries.'
          />

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div className='sm:col-span-2'>
              <TextField
                id='profile-address'
                label='Street address'
                value={values.address}
                onChange={(value) => updateField('address', value)}
                placeholder='House, road and area'
              />
            </div>

            <TextField
              id='profile-city'
              label='City'
              value={values.city}
              onChange={(value) => updateField('city', value)}
              placeholder='City'
            />

            <TextField
              id='profile-state'
              label='State / Province'
              value={values.state}
              onChange={(value) => updateField('state', value)}
              placeholder='State or province'
            />

            <TextField
              id='profile-country'
              label='Country'
              value={values.country}
              onChange={(value) => updateField('country', value)}
              placeholder='Country'
            />

            <TextField
              id='profile-postal-code'
              label='Postal code'
              value={values.postalCode}
              onChange={(value) => updateField('postalCode', value)}
              placeholder='Postal code'
            />
          </div>
        </section>

        <section className='space-y-4'>
          <SectionHeading
            icon={Sparkles}
            title='Additional information'
            description='Optional details that help people know you better.'
          />

          <div className='space-y-2'>
            <Label htmlFor='profile-bio' className='text-sm font-medium'>
              Bio / About me
            </Label>

            <Textarea
              id='profile-bio'
              value={values.bio}
              onChange={(event) => updateField('bio', event.target.value)}
              placeholder='Tell us a little about yourself.'
              className='min-h-24 resize-y'
            />
          </div>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <TextField
              id='profile-company'
              label='Company name'
              value={values.companyName}
              onChange={(value) => updateField('companyName', value)}
              placeholder='Your company'
            />

            <TextField
              id='profile-website'
              label='Website'
              type='url'
              value={values.website}
              onChange={(value) => updateField('website', value)}
              placeholder='https://example.com'
            />

            <SelectField
              id='profile-language'
              label='Preferred language'
              value={values.preferredLanguage}
              placeholder='Select language'
              options={languageOptions}
              onChange={(value) => updateField('preferredLanguage', value)}
            />

            <SelectField
              id='profile-time-zone'
              label='Time zone'
              value={values.timeZone}
              placeholder='Select time zone'
              options={timeZoneOptions}
              onChange={(value) => updateField('timeZone', value)}
            />
          </div>
        </section>
      </div>

      <div className='flex shrink-0 flex-col-reverse gap-2 border-t border-border bg-card px-5 py-4 sm:flex-row sm:justify-end sm:px-6'>
        <Button
          type='button'
          variant='outline'
          onClick={onCancel}
          className='w-full sm:w-auto'
        >
          Cancel
        </Button>

        <Button type='submit' className='w-full sm:w-auto'>
          Save changes
        </Button>
      </div>
    </form>
  )
}

export default ProfileForm
