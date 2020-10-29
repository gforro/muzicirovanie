import { getAllCourseUid, getCourseAndTimeslots } from '../../lib/api';
import { RichText } from 'prismic-reactjs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { hrefResolver, linkResolver } from '../../lib/prismicHelpers';
import { sk } from 'date-fns/locale';
import format from 'date-fns-tz/format';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import parseJSON from 'date-fns/parseJSON';
import { getStaticPropsWithNavigationData } from '../../lib/globalProps';
import Button from '../../components/form/Button/Button';

export default function Course({ course, timeslots }) {
  const route = useRouter();

  if (course) {
    return (
      <div className="min-h-full flex flex-col sm:justify-between">
        <div className="relative flex-1">
          <div className="lg:absolute lg:inset-0">
            <div className="lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2">
              <img className="h-56 w-full object-cover object-top lg:absolute lg:h-full rounded-md"
                   src={course.course_image.url}
                   alt={course.course_image.alt} />
            </div>
          </div>
          <div
            className="relative pt-12 pb-16 px-4 sm:pt-16 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2">
            <div className="lg:col-start-2 lg:pl-8">
              <div className="text-base max-w-prose mx-auto lg:max-w-lg lg:ml-auto lg:mr-0">
                <p className="leading-6 text-neutral-600 font-semibold tracking-wide uppercase">Zabav sa s nami</p>
                <h1 className="mt-2 mb-8 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">{RichText.asText(course.title)}</h1>
                <div className="prose">
                  <RichText render={course.description} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-primary-50 overflow-hidden shadow rounded-lg w-full mx-auto mt-8">
          <div className="bg-primary-300 px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Dostupné termíny
            </h3>
          </div>
          <div>
            <ul>
              <li>
                <a
                  href="#"
                  className="block hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 transition duration-150 ease-in-out">
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="space-y-2">
                        <div className="text-sm leading-5 font-medium text-neutral-900 flex items-center space-x-2">
                          <svg className="w-5 h-5 inline text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                               xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>Každý štvrtok medzi 15:00 - 17:00</span>
                        </div>
                        <div className="flex items-center text-sm leading-5 text-gray-800 space-x-2">
                            <svg
                              className="h-5 w-5 text-neutral-300"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor">
                              <path
                                fill-rule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            <span>
                              Od
                              <time dateTime="2020-01-07" className="text-neutral-800"> 14. Januára 2020</time>
                            </span>
                        </div>
                      </div>
                      <div className="mt-4 flex-shrink-0 sm:mt-0">
                        <span className="text-neutral-400">Voľné miestá: <span className="text-neutral-800">3</span></span>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-neutral-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              </li>
              <li className="border-t border-neutral-100">
                <a
                  href="#"
                  className="block hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 transition duration-150 ease-in-out">
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="space-y-2">
                        <div className="text-sm leading-5 font-medium text-neutral-900 flex items-center space-x-2">
                          <svg className="w-5 h-5 inline text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                               xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>Každý štvrtok medzi 15:00 - 17:00</span>
                        </div>
                        <div className="flex items-center text-sm leading-5 text-gray-800 space-x-2">
                          <svg
                            className="h-5 w-5 text-neutral-300"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                              fill-rule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <span>
                              Od
                              <time dateTime="2020-01-07" className="text-neutral-800"> 14. Januára 2020</time>
                            </span>
                        </div>
                      </div>
                      <div className="mt-4 flex-shrink-0 sm:mt-0">
                        <span className="text-neutral-400">Voľné miestá: <span className="text-neutral-800">3</span></span>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-neutral-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>
      What course?
      <pre>{timeslots && JSON.stringify(timeslots, null, '  ')}</pre>
      {timeslots &&
      timeslots.map(ts => (
        <Link href={linkResolver(ts)} key={ts._meta.id}>
          <a className="flex flex-col border border-blue-200 shadow-lg p-2">
            <div>Kapacita: {ts.capacity}</div>
            <div>
              Kedy:{' '}
              {format(
                utcToZonedTime(
                  parseJSON(ts.start_date_time),
                  'Europe/Bratislava',
                ),
                'PPPP, k:mm',
                { locale: sk, timeZone: 'Europe/Bratislava' },
              )}
            </div>
          </a>
        </Link>
      ))}

    </div>;
  }
}

export async function getStaticPaths() {
  const courses = await getAllCourseUid();
  return {
    paths:
      courses?.map(({ node }) => ({
        params: {
          courseUid: node._meta.uid,
        },
      })) || [],
    fallback: false,
  };
}

export const getStaticProps = getStaticPropsWithNavigationData(
  async function getStaticProps({ params, preview = false, previewData }) {
    const { course, timeslots } = await getCourseAndTimeslots(
      params.courseUid,
      previewData,
    );
    return {
      props: {
        preview,
        course,
        timeslots,
      },
    };
  },
);
