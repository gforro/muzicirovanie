import React from 'react';
import { RichText } from 'prismic-reactjs';
import {customLink} from '../../../lib/prismicHelpers';

export const Text = ({ slice }) => {
  return (
    <div className="prose lg:prose-xl max-w-none">
      <RichText render={slice.primary.text} serializeHyperlink={customLink} />
    </div>
  );
};
