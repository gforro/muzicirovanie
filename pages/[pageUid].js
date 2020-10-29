import React from 'react';
import { getAllPagesWithUid, getPage } from '../lib/api';
import { SliceZone } from '../components';
import { useRouter } from 'next/router';
import {getStaticPropsWithNavigationData} from '../lib/globalProps';

export default function Page({ page }) {
  return page ? <SliceZone body={page.body} /> : <div>What?</div>;
};

export async function getStaticPaths() {
  const allPages = await getAllPagesWithUid();
  return {
    paths:
      allPages?.map(({ node }) => ({
        params: {
          pageUid: node._meta.uid,
        },
      })) || [],
    fallback: true,
  };
}

export const getStaticProps = getStaticPropsWithNavigationData(
  async function getStaticProps({ params, preview = false, previewData }) {
    const data = await getPage(params.pageUid, previewData);
    return {
      props: {
        preview,
        page: data?.page ?? null,
      },
    };
  }
);
