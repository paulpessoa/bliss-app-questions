import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import ConnectionStatus from '../../components/ConnectionStatus';
import Link from 'next/link'
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

  return (
    <div >
      <header>
        <h2> Bliss App Questions </h2>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <Link href="https://www.linkedin.com/in/paulmspessoa/" target='_blank'>Paul Pessoa</Link>
        <ConnectionStatus />
      </footer>
    </div>
  );
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;