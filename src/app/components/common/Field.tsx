'use client'

import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'
import classNames from 'classnames'

const fieldVariants = cva(
  'h-12 px-5 text-sm transition-colors duration-200 border rounded-xl',
  {
    variants: {
      intent: {
        primary:
          'text-white placeholder:text-theme-100 bg-theme-500 hover:bg-theme-400 hover:border-theme-200 focus:bg-theme-400 focus:border-theme-200',
      },
      active: {
        true: 'border-red-500',
        false: 'border-theme-300',
      },
      fieldSize: {
        full: 'w-full',
        wide: 'w-[800px] max-w-full',
        medium: 'w-[600px] max-w-full',
        small: 'w-72 max-w-full',
      },
    },
    defaultVariants: {
      intent: 'primary',
      fieldSize: 'full',
      active: false,
    },
  },
)

export interface FieldProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof fieldVariants> {
  label?: string
  trigger?: ReactNode
  errorMessage?: string
  icon?: ReactNode
}

const Field = forwardRef<HTMLInputElement, FieldProps>(
  (
    {
      type = 'text',
      label,
      trigger,
      errorMessage,
      icon,
      children,
      intent,
      fieldSize,
      className,
      ...rest
    },
    ref,
  ) => {
    const hasError = !!errorMessage
    const hasIcon = !!icon

    return (
      <label className="flex flex-col items-start w-full gap-3">
        {label && <span className="font-medium text-white">{label}</span>}

        <div className="relative w-full">
          {icon && (
            <div className="absolute -translate-y-1/2 left-4 top-1/2">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            type={type}
            className={fieldVariants({
              intent,
              fieldSize,
              active: hasError,
              className: classNames(className, hasIcon && 'pl-13'),
            })}
            {...rest}
          />

          {trigger && trigger}

          {(errorMessage || children) && (
            <div className="absolute flex items-center gap-4 -top-7 right-2">
              {errorMessage && (
                <span className="text-sm text-red-500 rounded-md">
                  {errorMessage}
                </span>
              )}
              {children && <div className="flex">{children}</div>}
            </div>
          )}
        </div>
      </label>
    )
  },
)

Field.displayName = 'Field'

export default Field
