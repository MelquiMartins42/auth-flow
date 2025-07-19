'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react'

import {
  Alert,
  AlertData as BaseAlertData,
} from '@/app/components/common/Alert'
import { motion, AnimatePresence } from 'framer-motion'

interface AlertData extends BaseAlertData {
  id: number
}

interface AlertContextType {
  addAlert: (
    data: Omit<BaseAlertData, 'status'> & { status?: BaseAlertData['status'] },
  ) => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

const MAX_VISIBLE_ALERTS = 3
const ALERT_LIFESPAN = 1500

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<AlertData[]>([])

  const removeAlert = useCallback((id: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id))
  }, [])

  const addAlert = useCallback(
    (
      data: Omit<BaseAlertData, 'status'> & {
        status?: BaseAlertData['status']
      },
    ) => {
      const status = data.status || 'success'
      const id = Date.now()

      setAlerts((prevAlerts) => {
        const newAlerts = [{ ...data, status, id }, ...prevAlerts]

        if (newAlerts.length > MAX_VISIBLE_ALERTS) {
          return newAlerts.slice(0, MAX_VISIBLE_ALERTS)
        }
        return newAlerts
      })
    },
    [],
  )

  useEffect(() => {
    if (alerts.length > 0) {
      const timer = setTimeout(() => {
        setAlerts((prevAlerts) => prevAlerts.slice(0, prevAlerts.length - 1))
      }, ALERT_LIFESPAN)

      return () => clearTimeout(timer)
    }
  }, [alerts])

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}

      <div
        aria-live="assertive"
        className="fixed top-4 right-3 flex flex-col items-center space-y-[-50px] z-50 pointer-events-none"
      >
        <AnimatePresence>
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              className="pointer-events-auto"
              layout
              initial="initial"
              animate="animate"
              exit="exit"
              custom={index}
              variants={{
                initial: { opacity: 0, y: -20, scale: 0.8 },
                animate: (i) => ({
                  opacity: 1,
                  y: i * 20,
                  scale: 1 - i * 0.1,
                  zIndex: MAX_VISIBLE_ALERTS - i,
                }),
                exit: {
                  opacity: 0,
                  y: -50,
                  scale: 0.8,
                  transition: { duration: 0.2 },
                },
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <Alert.Root onClose={() => removeAlert(alert.id)}>
                <Alert.Icon status={alert.status} />
                <Alert.Content
                  title={alert.title}
                  description={alert.description}
                />
              </Alert.Root>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AlertContext.Provider>
  )
}

export const useAlert = () => {
  const context = useContext(AlertContext)
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider')
  }
  return context
}
