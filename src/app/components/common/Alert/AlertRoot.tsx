'use client'

import { HTMLAttributes, ReactNode } from 'react'
import { IoCloseOutline } from 'react-icons/io5'

import classNames from 'classnames'

interface RootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  dismissible?: boolean
  onClose?: () => void
}

const Root: React.FC<RootProps> = ({
  children,
  dismissible = false,
  onClose,
  ...rest
}) => {
  return (
    // Removido todo o controle de animação daqui
    <div
      className={classNames(
        'relative flex items-start p-4 rounded-xl h-20 gap-4 bg-white shadow-lg',
      )}
      {...rest}
    >
      <div className="flex items-center h-full gap-4">{children}</div>
      {dismissible && (
        <button
          className="flex flex-col items-start cursor-pointer text-theme-100"
          onClick={onClose}
        >
          <IoCloseOutline className="text-3xl" />
        </button>
      )}
    </div>
  )
}

export default Root
