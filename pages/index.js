import { getLandingPage } from '../lib/api';
import { Hero } from '../components/SlizeZone';
import React from 'react';
import {getStaticPropsWithNavigationData} from '../lib/globalProps';

export default function Index({ preview, homePageData }) {
  return <Hero heroData={homePageData.body[0].hero} />;
}

export const getStaticProps = getStaticPropsWithNavigationData(
  async function getStaticProps({ preview = false, previewData }) {
    const homePageData = await getLandingPage(previewData);
    return {
      props: { homePageData, preview },
    };
  }
)
