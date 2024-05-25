// pages/index.js
import Head from 'next/head';
import Chat from '../components/Chat';

export default function Home() {
  return (
    <div>
      <Head>
        <title>DocuChaty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Chat />
      </main>
    </div>
  );
}
