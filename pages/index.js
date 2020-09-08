import { getLandingPage } from '../lib/api';
import { Hero } from '../components/SlizeZone';
import React from 'react';

export default function Index({ preview, homePageData }) {
  console.log(JSON.stringify(homePageData, null, ' '));
  return <Hero heroData={homePageData.body[0].hero} />;
}

export async function getStaticProps({ preview = false, previewData }) {
  const homePageData = await getLandingPage(previewData);
  return {
    props: { homePageData, preview },
  };
}
