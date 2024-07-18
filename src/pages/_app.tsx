// pages/_app.tsx
import 'antd/dist/reset.css'; // Importez les styles Ant Design
import '../styles/global.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
