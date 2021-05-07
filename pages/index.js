import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { ToolBar } from '../components/toolbar'
import Link from 'next/link'

export default function Home() {
  return(
    <div className="page-container">

      <ToolBar />

      <div className={styles.main}>
        <h1>Next.js News App</h1>

        <h3>You are one stop shop for the latest news</h3>

        <Link href="https://myworldgist.com"><a>CodeWithSmart.com</a></Link>
      </div>
      
    </div>
  )
}
