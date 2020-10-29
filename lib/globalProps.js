import {getNavigationBarData} from './api';

export function getStaticPropsWithNavigationData(getPageStaticProps = async () => ({})) {
  async function getStaticProps(context) {
    const navigationData = await getNavigationBarData();
    const {props: pageStaticProps, ...rest} = await getPageStaticProps(context);

    return {
      props: {
        navigationData,
        ...pageStaticProps
      },
      ...rest
    };
  }
  return getStaticProps;
}
