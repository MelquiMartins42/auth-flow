import { ButtonHTMLAttributes } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'flex items-center justify-center w-full h-12 p-3 font-medium rounded-full bg-white text-theme-500 transition-opacity',
  {
    variants: {
      active: {
        true: 'opacity-50 cursor-not-allowed',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      active: false,
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isActive?: boolean
}

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  isActive,
  ...rest
}) => {
  return (
    <button
      className={buttonVariants({ active: !!isActive, className })}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
