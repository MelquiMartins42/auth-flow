import { FormHTMLAttributes } from 'react'

const Root: React.FC<FormHTMLAttributes<HTMLFormElement>> = ({
  children,
  ...rest
}) => {
  return (
    <form className="flex flex-col items-center gap-4 w-[30rem]" {...rest}>
      {children}
    </form>
  )
}

export default Root
