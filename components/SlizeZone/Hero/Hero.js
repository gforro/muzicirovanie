import React from 'react';
import { hrefResolver, linkResolver } from '../../../lib/prismicHelpers';
import Link from 'next/link';

export const Hero = ({
  className,
  heroData: { primaryText, secondaryText, image, buttonText, buttonLink },
}) => {
  return (
    <section
      className={`text-neutral-700 bg-primary-100 flex p-5 pb-20 ${className}`}>
      <div className="flex flex-col items-center justify-center w-full">
        {/*<Chorus className="md:w-3/4 xl:w-1/2 mb-4" />*/}
        {image && (
          <img
            src={image.url}
            className="md:w-3/4 xl:w-3/5 mb-4"
            alt={image.alt}
          />
        )}
        <div className="text-center">
          <h1 className="md:text-6xl text-3xl mb-4 font-semibold tracking-wider text-neutral-800">
            {primaryText}
          </h1>
          <p className="mb-8 leading-relaxed text-neutral-600 font-serif md:text-2xl">
            {secondaryText}
          </p>
          <Link href={linkResolver(buttonLink)}>
            <a className="text-white bg-primary-900 border-0 py-2 px-6 focus:outline-none hover:bg-primary-700  rounded text-lg tracking-wide">
              {buttonText}
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};
