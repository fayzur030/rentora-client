import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface FormFieldProps {
  id: string
  label: string
  placeholder: string
  type?: 'text' | 'number'
  multiline?: boolean
  rows?: number
}

// A single label + input pair used across the equipment form.
// Set multiline = true to get a textarea instead of a normal input.
const FormField = ({
  id,
  label,
  placeholder,
  type = 'text',
  multiline = false,
  rows = 4,
}: FormFieldProps) => {
  return (
    <div className='space-y-2'>
      <Label htmlFor={id} className='text-sm font-medium'>
        {label}
      </Label>

      {multiline ? (
        <Textarea
          id={id}
          name={id}
          placeholder={placeholder}
          rows={rows}
          className='min-h-28 resize-y bg-background'
        />
      ) : (
        <Input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          className='h-11 bg-background'
        />
      )}
    </div>
  )
}

export default FormField
