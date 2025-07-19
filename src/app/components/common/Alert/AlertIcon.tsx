import { ReactElement } from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

interface IconComponentProps {
  status?: 'success' | 'error'
}

const IconComponent: React.FC<IconComponentProps> = ({ status }) => {
  const iconMap: Record<'success' | 'error', ReactElement> = {
    success: <FaCheckCircle className="text-4xl text-green-500" />,
    error: <FaTimesCircle className="text-4xl text-red-500" />,
  }

  if (!status || !iconMap[status]) {
    return null // ou um ícone padrão opcional
  }

  return <div className="flex items-center h-full">{iconMap[status]}</div>
}

export default IconComponent
