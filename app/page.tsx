import Image from 'next/image'
import Header from './components/header'
import Homepage from './components/homepage/homepage'
import Checklist from './components/homepage/checklist'
import Footer from './components/footer'

export default function Home() {
  return (
  <div>
    <Header />
    <Homepage />
    
    <Footer />
  </div>
  )
}
