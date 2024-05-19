// pages/index.js
import Head from 'next/head';
import Chat from '../components/Chat';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Calidad Comercial A SIGET</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Bienvenido a DocuChaty v1.0</h1>
        <Chat />
      </main>
    </div>
  );
}
