import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ({ numberText }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="flex justify-center">
          <Link as="/test-fallback/1" href="/test-fallback/[id]">
            <a className="p-4">1</a>
          </Link>
          <Link as="/test-fallback/2" href="/test-fallback/[id]">
            <a className="p-4">2</a>
          </Link>
          <Link as="/test-fallback/3" href="/test-fallback/[id]">
            <a className="p-4">3</a>
          </Link>
          <Link as="/test-fallback/4" href="/test-fallback/[id]">
            <a className="p-4">4</a>
          </Link>
          <Link as="/test-fallback/7" href="/test-fallback/[id]">
            <a className="p-4">5</a>
          </Link>
        </div>
        <div>{numberText}</div>
      </>
    );
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const numberText =
    Number.parseInt(params.id) === 1
      ? 'one'
      : Number.parseInt(params.id) === 2
      ? 'two'
      : `something else (${params.id})`;
  if (numberText === 'one' || numberText === 'two') {
    await new Promise(resolve => setTimeout(() => resolve(), 1000));
  } else {
    console.log('before awaiting for promise');
    await new Promise(resolve => setTimeout(() => {console.log('after 5000 ms'); resolve();}, 5000));
  }
  console.log('returning....')
  return {
    props: { numberText },
  };
}
