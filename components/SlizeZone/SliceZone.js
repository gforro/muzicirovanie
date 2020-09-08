import React from 'react';
import { Courses } from './Courses';
import { Text } from './Text';
import { Hero } from './Hero';

export const SliceZone = ({ body }) => {
  return body.map((bodyContent, i) => {
    console.log(`body content is ${bodyContent}`);
    switch (bodyContent.type) {
      case 'courses':
        return <Courses slice={bodyContent} key={i} />;
      case 'text':
        return <Text slice={bodyContent} key={i} />;
      case 'hero':
        return <Hero slice={bodyContent} key={i} />;
      default:
        return null;
    }
  });
};
