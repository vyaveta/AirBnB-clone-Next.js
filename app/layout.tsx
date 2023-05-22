import './globals.css'
import { Nunito } from 'next/font/google'
import { Provider } from 'react-redux'
import { store } from './Redux/store'

// component imports
import Navbar from './components/Navbar/Navbar'
import { RegisterModal } from './components/Modals/RegisterModal'
import ClientOnly from './components/ClientOnly'
import Modal from './components/Modals/Modal'
import ToasterProvider from './providers/ToasterProvider'
import { LoginModal } from './components/Modals/LoginModal'
import { getCurrentUser } from './actions/getCurrentUser'

export const metadata = {
  title: 'AirBnB',
  description: 'Airbnb clone',
}

const font = Nunito({
  subsets: ['latin']
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser()

  return (
    // <Provider store={store}> 
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
    //  </Provider> 
  )
}
