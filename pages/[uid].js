import React from 'react';
import { getAllPagesWithUid, getPage } from '../lib/api';
import { SliceZone } from '../components';
import { useRouter } from 'next/router';

export default function ({ page }) {
  return page ? <SliceZone body={page.body} /> : <div>What?</div>;
};

export async function getStaticPaths() {
  const allPages = await getAllPagesWithUid();
  return {
    paths:
      allPages?.map(({ node }) => ({
        params: {
          uid: node._meta.uid,
        },
      })) || [],
    fallback: true,
  };
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const data = await getPage(params.uid, previewData);
  return {
    props: {
      preview,
      page: data?.page ?? null,
    },
  };
}
