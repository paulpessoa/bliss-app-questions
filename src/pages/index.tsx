import Head from "next/head";
import styles from '../styles/home.module.scss';
import ServerStatus from "../../components/ServerStatus";


export default function Home() {
  return (
    <>
      <Head>
        <title>Bliss App Questions</title>
        <meta name="description" content="Bliss App mock questions list" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.box}>
            <ServerStatus />
          </div>
        </div>
      </main>
    </>
  );
}
