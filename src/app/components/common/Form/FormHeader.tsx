import { twMerge } from 'tailwind-merge'

interface HeaderProps {
  title: string
  description: string
  customTitleClassName?: string
  customDescriptionClassName?: string
}

const Header: React.FC<HeaderProps> = ({
  title,
  description,
  customTitleClassName = '',
  customDescriptionClassName = '',
}) => {
  return (
    <header className="flex flex-col items-center gap-1">
      <h2
        className={twMerge(
          'text-4xl font-semibold text-white',
          customTitleClassName,
        )}
      >
        {title}
      </h2>
      <p
        className={twMerge(
          'text-lg text-theme-100',
          customDescriptionClassName,
        )}
      >
        {description}
      </p>
    </header>
  )
}

export default Header
