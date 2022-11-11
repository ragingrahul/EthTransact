import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Navbar,Welcome,Loader,Footer,Transactions,Services} from './components'

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className={styles.gradientbgwelcome}>
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  )
}
