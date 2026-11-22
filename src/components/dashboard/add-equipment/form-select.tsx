import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FormSelectProps {
  id: string
  label: string
  placeholder: string
  options: string[]
  required?: boolean
}

// A single label + dropdown pair used across the equipment form.
// The options are passed in as a simple array of strings.
const FormSelect = ({
  id,
  label,
  placeholder,
  options,
  required = false,
}: FormSelectProps) => {
  return (
    <div className='space-y-2'>
      <Label htmlFor={id} className='text-sm font-medium'>
        {label}
      </Label>

      <Select
        name={id}
        required={required && options.length > 0}
        disabled={options.length === 0}
      >
        <SelectTrigger id={id} className='h-11 w-full bg-background py-5'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.length === 0 ? (
            <SelectItem value='no-options' disabled>
              No categories available
            </SelectItem>
          ) : (
            options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  )
}

export default FormSelect
