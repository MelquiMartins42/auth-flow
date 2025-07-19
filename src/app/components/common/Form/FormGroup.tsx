import { ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

interface GroupProps {
  children: ReactNode
  legend: string
  customClassName?: string
}

const Group: React.FC<GroupProps> = ({
  children,
  legend,
  customClassName = '',
}) => {
  return (
    <fieldset className={twMerge('flex w-full', customClassName)}>
      <legend className="sr-only">{legend}</legend>
      {children}
    </fieldset>
  )
}

export default Group
