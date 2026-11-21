'use client'

import Image from 'next/image'
import { useState, type ChangeEvent, type ComponentProps } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  Clock3,
  ImagePlus,
  Plus,
  Upload,
  UserRound,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import type {
  EquipmentCategory,
  EquipmentCondition,
  EquipmentOwner,
  RentalType,
} from '@/types/equipment'

interface EquipmentFormValues {
  name: string
  description: string
  category: EquipmentCategory | ''
  location: string
  brand: string
  model: string
  condition: EquipmentCondition | ''
  image: string
  rentalPrice: string
  rentalType: RentalType | ''
  availableQuantity: string
  rentalTerms: string
}

interface FormFieldProps {
  id: string
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  type?: ComponentProps<typeof Input>['type']
  multiline?: boolean
  rows?: number
}

const FormField = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  multiline = false,
  rows = 4,
}: FormFieldProps) => (
  <div className='space-y-2'>
    <Label htmlFor={id} className='text-sm font-medium text-foreground'>
      {label}
    </Label>
    {multiline ? (
      <Textarea
        id={id}
        name={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className='min-h-28 resize-y bg-background'
      />
    ) : (
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className='h-11 bg-background'
      />
    )}
  </div>
)

interface FormSelectProps {
  id: string
  label: string
  placeholder: string
  options: readonly string[]
  value: string
  onChange: (value: string) => void
}

const FormSelect = ({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
}: FormSelectProps) => (
  <div className='space-y-2'>
    <Label htmlFor={id} className='text-sm font-medium text-foreground'>
      {label}
    </Label>
    <Select
      value={value || null}
      onValueChange={(selectedValue) => onChange(selectedValue ?? '')}
    >
      <SelectTrigger id={id} className='h-11 w-full bg-background'>
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

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result)
      }
    }
    reader.readAsDataURL(file)
    event.target.value = ''
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
          {value ? (
            <Image
              src={value}
              alt='Equipment preview'
              width={240}
              height={160}
              unoptimized
              className='mb-3 h-32 w-48 rounded-lg object-cover'
            />
          ) : (
            <span className='mb-3 flex size-12 items-center justify-center rounded-xl bg-accent/15 text-primary'>
              <ImagePlus className='size-6' aria-hidden='true' />
            </span>
          )}
          <p className='text-sm font-semibold text-foreground'>
            {value
              ? 'Image ready for preview'
              : 'Add a photo of your equipment'}
          </p>
          <p className='mt-1 text-xs text-muted-foreground'>
            Choose an image from your device. Uploading will be added later.
          </p>
          <Input
            id='equipment-image'
            name='image'
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className='mt-4 h-auto w-full max-w-sm cursor-pointer bg-background py-2 text-xs file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:font-medium file:text-primary-foreground hover:file:bg-primary/85'
          />
        </div>
      </div>
    </div>
  )
}

interface StepIndicatorProps {
  currentStep: number
}

const steps = ['Basic Information', 'Rental Information', 'Review & Publish']

const StepIndicator = ({ currentStep }: StepIndicatorProps) => (
  <div
    className='mt-5 grid grid-cols-3 gap-3'
    aria-label='Form progress'
    role='list'
  >
    {steps.map((step, index) => {
      const stepNumber = index + 1
      const isComplete = stepNumber < currentStep
      const isCurrent = stepNumber === currentStep

      return (
        <div
          key={step}
          role='listitem'
          aria-current={isCurrent ? 'step' : undefined}
        >
          <div className='flex items-center gap-2'>
            <span
              className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                isComplete || isCurrent
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {isComplete ? (
                <Check className='size-4' aria-hidden='true' />
              ) : (
                stepNumber
              )}
            </span>
            {stepNumber < steps.length && (
              <span
                className={`h-px flex-1 ${
                  isComplete ? 'bg-primary' : 'bg-border'
                }`}
                aria-hidden='true'
              />
            )}
          </div>
          <p
            className={`mt-2 text-[10px] leading-tight sm:text-xs ${
              isCurrent
                ? 'font-semibold text-foreground'
                : 'text-muted-foreground'
            }`}
          >
            {step}
          </p>
        </div>
      )
    })}
  </div>
)

interface OwnerInformationProps {
  owner: EquipmentOwner
}

const OwnerInformation = ({ owner }: OwnerInformationProps) => (
  <Card>
    <CardHeader className='pb-3'>
      <div className='flex items-center gap-2'>
        <UserRound className='size-4 text-primary' aria-hidden='true' />
        <CardTitle className='text-sm font-semibold'>
          Owner information
        </CardTitle>
      </div>
      <CardDescription>Owner details are read-only.</CardDescription>
    </CardHeader>
    <CardContent className='flex items-center gap-3'>
      <Avatar className='size-12 bg-accent/20 text-primary'>
        <AvatarImage
          src={owner.image || undefined}
          alt={`${owner.name} profile`}
        />
        <AvatarFallback className='bg-accent/20 text-primary'>
          {owner.name
            .split(' ')
            .map((part) => part[0])
            .join('')
            .slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className='min-w-0'>
        <p className='truncate text-sm font-semibold text-foreground'>
          {owner.name}
        </p>
        <p className='truncate text-xs text-muted-foreground'>{owner.email}</p>
      </div>
    </CardContent>
  </Card>
)

const EquipmentStatus = () => (
  <Card>
    <CardHeader className='pb-3'>
      <div className='flex items-center gap-2'>
        <BadgeCheck className='size-4 text-primary' aria-hidden='true' />
        <CardTitle className='text-sm font-semibold'>
          Equipment status
        </CardTitle>
      </div>
      <CardDescription>Listings are reviewed by an admin.</CardDescription>
    </CardHeader>
    <CardContent>
      <Badge className='gap-1.5 border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200'>
        <Clock3 className='size-3.5' aria-hidden='true' />
        Pending
      </Badge>
    </CardContent>
  </Card>
)

interface ReviewItemProps {
  label: string
  value: string
  className?: string
}

const ReviewItem = ({ label, value, className = '' }: ReviewItemProps) => (
  <div className={`min-w-0 ${className}`}>
    <p className='text-xs font-medium text-muted-foreground'>{label}</p>
    <p className='mt-1 whitespace-pre-wrap break-words text-sm text-foreground'>
      {value || 'Not provided'}
    </p>
  </div>
)

interface EquipmentFormProps {
  onCancel: () => void
}

const initialFormValues: EquipmentFormValues = {
  name: '',
  description: '',
  category: '',
  location: '',
  brand: '',
  model: '',
  condition: '',
  image: '',
  rentalPrice: '',
  rentalType: '',
  availableQuantity: '',
  rentalTerms: '',
}

const mockOwner: EquipmentOwner = {
  ownerId: '',
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  image: '',
}

const equipmentCategories: EquipmentCategory[] = [
  'Construction Equipment',
  'Agriculture Equipment',
  'Power Tools',
  'Heavy Machinery',
  'Electronics',
  'Vehicles',
  'Other',
]

const rentalTypes: RentalType[] = ['Daily', 'Weekly', 'Monthly']

const equipmentConditions: EquipmentCondition[] = [
  'New',
  'Like New',
  'Good',
  'Fair',
]

const EquipmentForm = ({ onCancel }: EquipmentFormProps) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] =
    useState<EquipmentFormValues>(initialFormValues)

  const updateFormValue = (field: keyof EquipmentFormValues, value: string) => {
    setFormData((previousValues) => ({
      ...previousValues,
      [field]: value,
    }))
  }

  const goToNextStep = () => {
    setCurrentStep((step) => Math.min(step + 1, steps.length))
  }

  const goToPreviousStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 1))
  }

  const handleCancel = () => {
    setFormData(initialFormValues)
    setCurrentStep(1)
    onCancel()
  }

  return (
    <div className='flex min-h-0 flex-1 flex-col'>
      <DialogHeader className='shrink-0 border-b border-border px-5 py-5 pr-14 sm:px-7'>
        <DialogTitle className='text-xl font-bold sm:text-2xl'>
          Add New Equipment
        </DialogTitle>
        <DialogDescription>
          Provide equipment details to make it available for rent.
        </DialogDescription>
        <StepIndicator currentStep={currentStep} />
      </DialogHeader>

      <div className='min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7'>
        {currentStep === 1 && (
          <div className='grid gap-5 sm:grid-cols-2'>
            <FormField
              id='name'
              label='Equipment name'
              placeholder='e.g. Caterpillar mini excavator'
              value={formData.name}
              onChange={(value) => updateFormValue('name', value)}
            />
            <FormSelect
              id='category'
              label='Category'
              placeholder='Choose a category'
              options={equipmentCategories}
              value={formData.category}
              onChange={(value) =>
                updateFormValue('category', value as EquipmentCategory)
              }
            />
            <div className='sm:col-span-2'>
              <FormField
                id='description'
                label='Description'
                placeholder='Describe the equipment and what renters should know...'
                value={formData.description}
                onChange={(value) => updateFormValue('description', value)}
                multiline
              />
            </div>
            <FormField
              id='location'
              label='Location'
              placeholder='City or service area'
              value={formData.location}
              onChange={(value) => updateFormValue('location', value)}
            />
            <FormSelect
              id='condition'
              label='Equipment condition'
              placeholder='Choose the condition'
              options={equipmentConditions}
              value={formData.condition}
              onChange={(value) =>
                updateFormValue('condition', value as EquipmentCondition)
              }
            />
            <FormField
              id='brand'
              label='Brand'
              placeholder='e.g. Caterpillar'
              value={formData.brand}
              onChange={(value) => updateFormValue('brand', value)}
            />
            <FormField
              id='model'
              label='Model'
              placeholder='e.g. 301.7 CR'
              value={formData.model}
              onChange={(value) => updateFormValue('model', value)}
            />
            <div className='sm:col-span-2'>
              <ImageUpload
                value={formData.image}
                onChange={(value) => updateFormValue('image', value)}
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className='grid gap-5 sm:grid-cols-2'>
            <FormField
              id='rentalPrice'
              label='Rental price'
              type='number'
              placeholder='e.g. 150'
              value={formData.rentalPrice}
              onChange={(value) => updateFormValue('rentalPrice', value)}
            />
            <FormSelect
              id='rentalType'
              label='Rental type'
              placeholder='Choose a rental period'
              options={rentalTypes}
              value={formData.rentalType}
              onChange={(value) =>
                updateFormValue('rentalType', value as RentalType)
              }
            />
            <FormField
              id='availableQuantity'
              label='Available quantity'
              type='number'
              placeholder='e.g. 1'
              value={formData.availableQuantity}
              onChange={(value) => updateFormValue('availableQuantity', value)}
            />
            <div className='sm:col-span-2'>
              <FormField
                id='rentalTerms'
                label='Rental terms and conditions'
                placeholder='Add any rental rules, return expectations or damage policies...'
                value={formData.rentalTerms}
                onChange={(value) => updateFormValue('rentalTerms', value)}
                multiline
                rows={5}
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className='space-y-5'>
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base font-semibold'>
                  Equipment summary
                </CardTitle>
                <CardDescription>
                  Review the details before publishing your listing.
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-x-6 gap-y-4 sm:grid-cols-2'>
                <ReviewItem label='Equipment name' value={formData.name} />
                <ReviewItem label='Category' value={formData.category} />
                <ReviewItem label='Description' value={formData.description} />
                <ReviewItem label='Location' value={formData.location} />
                <ReviewItem label='Rental price' value={formData.rentalPrice} />
                <ReviewItem label='Rental type' value={formData.rentalType} />
                <ReviewItem
                  label='Available quantity'
                  value={formData.availableQuantity}
                />
                <ReviewItem label='Condition' value={formData.condition} />
                <ReviewItem label='Brand' value={formData.brand} />
                <ReviewItem label='Model' value={formData.model} />
                <ReviewItem
                  label='Rental terms and conditions'
                  value={formData.rentalTerms}
                  className='sm:col-span-2'
                />
                <div className='sm:col-span-2'>
                  <p className='text-xs font-medium text-muted-foreground'>
                    Equipment image
                  </p>
                  {formData.image ? (
                    <Image
                      src={formData.image}
                      alt='Equipment preview'
                      width={240}
                      height={160}
                      unoptimized
                      className='mt-2 h-32 w-48 rounded-lg object-cover'
                    />
                  ) : (
                    <p className='mt-1 text-sm text-foreground'>
                      No image selected
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className='grid gap-4 sm:grid-cols-2'>
              <OwnerInformation owner={mockOwner} />
              <EquipmentStatus />
            </div>
          </div>
        )}
      </div>

      <Separator />
      <div className='shrink-0 px-5 py-4 sm:px-7'>
        {currentStep === 1 && (
          <div className='flex items-center justify-between gap-3'>
            <Button
              type='button'
              variant='outline'
              className='h-10 px-4'
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type='button'
              className='h-10 gap-2 px-5'
              onClick={goToNextStep}
            >
              Next
              <ArrowRight className='size-4' aria-hidden='true' />
            </Button>
          </div>
        )}

        {currentStep === 2 && (
          <div className='flex items-center justify-between gap-3'>
            <Button
              type='button'
              variant='outline'
              className='h-10 gap-2 px-4'
              onClick={goToPreviousStep}
            >
              <ArrowLeft className='size-4' aria-hidden='true' />
              Previous
            </Button>
            <Button
              type='button'
              className='h-10 gap-2 px-5'
              onClick={goToNextStep}
            >
              Next
              <ArrowRight className='size-4' aria-hidden='true' />
            </Button>
          </div>
        )}

        {currentStep === 3 && (
          <div className='flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <Button
              type='button'
              variant='outline'
              className='h-10 gap-2 px-4'
              onClick={goToPreviousStep}
            >
              <ArrowLeft className='size-4' aria-hidden='true' />
              Previous
            </Button>
            <div className='flex flex-col-reverse gap-3 sm:flex-row'>
              <Button
                type='button'
                variant='outline'
                className='h-10 px-4'
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button type='button' className='h-10 gap-2 px-5'>
                <Upload className='size-4' aria-hidden='true' />
                Publish Equipment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const EquipmentFormDialog = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger
        render={
          <Button type='button' className='h-11 gap-2 px-5 shadow-sm'>
            <Plus className='size-4' aria-hidden='true' />
            Add Equipment
          </Button>
        }
      />
      <DialogContent className='h-[min(90dvh,780px)] w-[95vw] max-w-[1400px] p-0'>
        <EquipmentForm onCancel={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export default EquipmentFormDialog
