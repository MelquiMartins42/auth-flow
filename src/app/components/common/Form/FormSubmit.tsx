import { motion } from 'framer-motion'

import Button, { ButtonProps } from '../Button'

interface SubmitProps extends ButtonProps {
  isLoading?: boolean
}

const Submit: React.FC<SubmitProps> = ({
  type = 'submit',
  isLoading,
  children,
  ...rest
}) => {
  return (
    <Button type={type} disabled={isLoading} isActive={isLoading} {...rest}>
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{
            width: 25,
            height: 25,
            border: '3px solid white',
            borderTop: '3px solid black',
            borderRadius: '100%',
          }}
        />
      ) : (
        children
      )}
    </Button>
  )
}

export default Submit
