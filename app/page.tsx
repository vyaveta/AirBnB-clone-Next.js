import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import { store } from './Redux/store'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='text-rose-500 text-2xl'>Hello AirBnb! from the page.tsx</div>
  )
}
