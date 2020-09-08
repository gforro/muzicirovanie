import '../styles/index.css';
import React from 'react';
import { getNavigationBarData } from '../lib/api';
import { Layout } from '../components';

function MyApp({ Component, pageProps, navigationBarData }) {
  return (
    <Layout navigationBarData={navigationBarData}>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async context => {
  console.log('_app init props called');
  //console.log(context);
  const navigationBarData = await getNavigationBarData();
  return { navigationBarData };
};

export default MyApp;
