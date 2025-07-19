import Content from './AlertContent'
import Icon from './AlertIcon'
import Root from './AlertRoot'

export interface AlertData {
  status: 'success' | 'error'
  title: string
  description: string
}

export const Alert = {
  Root,
  Icon,
  Content,
}
