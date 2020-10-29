import '../styles/index.css';
import React from 'react';
import { Layout } from '../components';
import { useRouter } from 'next/router';
import UserContext from '../lib/context/UserContext';
import Loading from '../components/Loading';
import 'react-datepicker/dist/react-datepicker.css';

function MyApp({ Component, pageProps: {navigationData, ...pageProps}, ...rest }) {
  const router = useRouter();
  console.log(`Navigation data: ${!!navigationData}, fallback: ${router.isFallback}`)
  if (router.isFallback) {
    return <Loading />
  }
  return (
    <UserContext>
      {navigationData && <Layout navigationBarData={navigationData}>
        <Component siteLogo={navigationData.logo} {...pageProps} />
      </Layout>}
    </UserContext>
  );
}

export default MyApp;
