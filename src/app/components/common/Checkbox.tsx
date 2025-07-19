import { InputHTMLAttributes } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { FaCheck } from 'react-icons/fa'

import classNames from 'classnames'

interface CheckboxProps<TFormValues extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
  control: Control<TFormValues>
  name: Path<TFormValues>
}

const Checkbox = <TFormValues extends FieldValues>({
  name,
  control,
  children,
  ...rest
}: CheckboxProps<TFormValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <label className="relative flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={field.value}
              className="h-5 border rounded-md appearance-none cursor-pointer min-w-5 bg-theme-500 border-theme-200 checked:bg-theme-500 checked:border-theme-200"
              {...field}
              {...rest}
            />

            <span
              className={classNames(
                'text-sm transition-colors duration-200',
                field.value ? 'text-white' : 'text-theme-100',
              )}
            >
              {children}
            </span>

            {field.value && (
              <FaCheck className="absolute text-white text-sm pointer-events-none left-[3px] top-[3px]" />
            )}
          </label>
        )
      }}
    />
  )
}

export default Checkbox
