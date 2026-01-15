import { createContext, useContext, useState } from 'react'

const ContactDrawerContext = createContext()

export function ContactDrawerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const openDrawer = () => setIsOpen(true)
  const closeDrawer = () => setIsOpen(false)
  const toggleDrawer = () => setIsOpen((prev) => !prev)

  return (
    <ContactDrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer, toggleDrawer }}>
      {children}
    </ContactDrawerContext.Provider>
  )
}

export function useContactDrawer() {
  const context = useContext(ContactDrawerContext)
  if (!context) {
    throw new Error('useContactDrawer must be used within a ContactDrawerProvider')
  }
  return context
}
