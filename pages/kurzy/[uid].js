import { getAllCourseUid, getCourse } from '../../lib/api';
import { RichText } from 'prismic-reactjs';

export default function ({ course, timeslots }) {
  if (course && timeslots) {
    return (
      <div className="prose">
        <RichText render={course.title} />
        <pre>{JSON.stringify(timeslots, null, '  ')}</pre>
      </div>
    );
  } else {
    return <div>What course?</div>;
  }
}

export async function getStaticPaths() {
  const courses = await getAllCourseUid();
  return {
    paths:
      courses?.map(({ node }) => ({
        params: {
          uid: node._meta.uid,
        },
      })) || [],
    fallback: true,
  };
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const data = await getCourse(params.uid, previewData);
  return {
    props: {
      preview,
      course: data?.course ?? null,
      timeslots: data?.timeslots?.edges?.map(e => e.node) ?? [],
    },
  };
}
