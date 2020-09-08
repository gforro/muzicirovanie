import React from 'react';
import { RichText } from 'prismic-reactjs';
import Link from 'next/link';
import {
  customLink,
  hrefResolver,
  linkResolver,
} from '../../../lib/prismicHelpers';
import cn from 'classnames';

export const Courses = ({ slice: { primary, fields } }) => {
  if (fields.length === 0) {
    return (
      <RichText render={primary.no_courses} serializeHyperlink={customLink} />
    );
  }
  return fields.map(({ course }, i) => (
    <React.Fragment key={i}>
      <hr className="border-t-0 h-px bg-gradient-to-r from-neutral-200 via-neutral-400 to-neutral-200"></hr>
      <div className="relative my-4">
        <div className="h-56 bg-indigo-600 sm:h-72 md:absolute md:h-full md:w-5/12 md:left-0">
          <img
            className="w-full h-full object-cover object-top shadow-lg"
            src={course.course_image.url}
            alt={course.course_image.alt}
          />
        </div>
        <div className="relative max-w-screen-xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="md:w-7/12 md:pl-10 md:ml-auto">
            <div className="text-base leading-6 font-semibold uppercase tracking-wider text-neutral-700">
              Award winning support
            </div>
            <h2 className="mt-2 text-black text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl sm:leading-10">
              {RichText.asText(course.title)}
            </h2>
            <p className="mt-3 text-lg leading-7 text-neutral-700 prose">
              <RichText render={course.description} />
            </p>
            <div className="mt-8">
              <div className="inline-flex rounded-md shadow">
                <Link href={hrefResolver(course)} as={linkResolver(course)}>
                  <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-neutral-100 bg-primary-900 hover:text-neutral-300 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                    Viac o kurze
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-t-0 h-px bg-gradient-to-r from-neutral-200 via-neutral-400 to-neutral-200"></hr>
    </React.Fragment>
  ));
  // <section className="mx-auto py-24">
  //   {fields.map(({ course }, i) =>
  //     i % 2 === 0 ? (
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-32 gap-x-10 md:gap-x-24 items-start mb-24" key={course._meta.uid}>
  //         <div>
  //           <h2 className="text-center sm:text-left text-black text-2xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
  //             <RichText render={course.title} />
  //           </h2>
  //           <p className="prose text-center sm:text-left text-base md:text-lg text-neutral-800 mb-5">
  //             <RichText render={course.description} />
  //           </p>
  //           <a href="#" className="btn btn-dark btn-lg w-full sm:w-auto">
  //             Learn More
  //           </a>
  //         </div>
  //         <div className="w-full h-full">
  //           <img src={course.course_image.url} alt={course.course_image.alt} className="rounded-md shadow-lg"/>
  //         </div>
  //       </div>
  //     ) : (
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-32 gap-x-10 md:gap-x-24 items-start flex-col-reverse">
  //         <div className="order-none md:order-2">
  //           <h2 className="text-center sm:text-left text-black text-2xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
  //             <RichText render={course.title} />
  //           </h2>
  //           <p className="prose text-center sm:text-left text-base md:text-lg text-netural-800 mb-5">
  //               <RichText render={course.description} />
  //           </p>
  //           <a href="#" className="btn btn-dark btn-lg w-full sm:w-auto">
  //             Learn More
  //           </a>
  //         </div>
  //         <div className="w-full h-full">
  //           <img src={course.course_image.url} alt={course.course_image.alt} className="rounded-md shadow-lg"/>
  //         </div>
  //       </div>
  //     ),
  //   )}
  // </section>

  // <section className="text-gray-700 body-font">
  //   <div className="px-5 py-24 mx-auto">
  //     <div className="flex flex-col">
  //       <div className="h-1 bg-gray-200 rounded overflow-hidden">
  //         <div className="w-24 h-full bg-indigo-500"></div>
  //       </div>
  //       <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
  //         <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">Space The Final
  //           Frontier</h1>
  //         <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">Street art subway tile salvia four dollar
  //           toast bitters selfies quinoa yuccie synth meditation iPhone intelligentsia prism tofu. Viral gochujang
  //           bitters dreamcatcher.</p>
  //       </div>
  //     </div>
  //     <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
  //       {fields.map(({ course, i }) => (
  //         <div className="flex flex-col justify-between p-4 md:w-1/2 sm:mb-0 mb-6" key={course._meta.uid}>
  //           {/*<pre>{JSON.stringify(course, null, '    ')}</pre>*/}
  //           <div className="rounded-lg overflow-hidden">
  //             <img alt="content" className="object-cover object-center h-full w-full"
  //                  src={course.course_image.url} alt={course.course_image.alt} />
  //           </div>
  //           <h2 className="text-xl font-medium title-font text-gray-900 mt-5"><RichText render={course.title} /></h2>
  //           <p className="text-base leading-relaxed mt-2">{RichText.asText(course.description)}</p>
  //           <Link as={linkResolver(course)} href={hrefResolver(course)}>
  //             <a className="text-indigo-500 inline-flex items-center mt-3">Ďalej
  //               <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
  //                    className="w-4 h-4 ml-2" viewBox="0 0 24 24">
  //                 <path d="M5 12h14M12 5l7 7-7 7"></path>
  //               </svg>
  //             </a>
  //           </Link>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // </section>
};
