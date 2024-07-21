// pages/_app.tsx
import 'antd/dist/reset.css'; // Importez les styles Ant Design
import '../styles/global.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from '../i18n';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);
