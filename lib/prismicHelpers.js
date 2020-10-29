import Link from 'next/link';
import { getDateAndTimeText } from './utils';

// -- Link resolution rules

// Manages the url links to internal Prismic documents
export const linkResolver = doc => {
  if (!doc) return '/';
  const meta = doc._meta ? doc._meta : doc;
  switch (meta.type) {
    case 'course':
      return `/kurzy/${meta.uid}`;
    case 'page':
      return `/${meta.uid}`;
    case 'timeslot':
      if (doc.start_date_time && doc.course && doc.course._meta) {
        const { date, time } = getDateAndTimeText(doc.start_date_time);
        return `/registrovat/${doc.course._meta.uid}/${date}/${time}`;
      } else {
        return '/';
      }
    default:
      return '/';
  }
};

// Additional helper function for Next/Link component
export const hrefResolver = doc => {
  if (!doc) return '/';
  const meta = doc._meta ? doc._meta : doc;

  switch (meta.type) {
    case 'course':
      return '/kurzy/[uid]';
    case 'page':
      return '/[uid]';
    case 'timeslot':
      if (doc.start_date_time && doc.course && doc.course._meta) {
        return '/registrovat/[courseUid]/[date]/[time]';
      } else {
        return '/';
      }
    default:
      return '/';
  }
};

// Helper function to convert Prismic Rich Text links to Next/Link components
export const customLink = (type, element, content, children, index) => {
  if (element.data.link_type === 'Document') {
    return (
      <Link
        key={element.data.id}
        href={linkResolver(element.data)}>
        <a>{content}</a>
      </Link>
    );
  } else {
    const target = element.data.target
      ? { target: element.data.target, rel: 'noopener' }
      : {};
    return (
      <a href={element.data.url} {...target} key={index}>
        {content}
      </a>
    );
  }
};
