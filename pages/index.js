// pages/index.jsxx
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
        <h1>Welcome to DocuChaty</h1>
        <Chat />
      </main>
    </div>
  );
}
