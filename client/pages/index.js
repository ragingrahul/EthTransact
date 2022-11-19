import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Navbar, Welcome, Loader, Footer, Transactions, Services } from '../components'
import { TransactionProvider } from '../context/TransactionContext'

export default function Home() {
  return (
    <TransactionProvider>
      <Head>
        <title>Krypt</title>
        <meta name='description' content='Krypt'/>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <div className="min-h-screen">
        <div className={styles.gradientbgwelcome}>
          <Navbar />
          <Welcome />
        </div>
        <Services />
        <Transactions />
        <Footer />
      </div>
    </TransactionProvider>
  )
}
