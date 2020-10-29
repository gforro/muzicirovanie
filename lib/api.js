import Prismic from 'prismic-javascript';

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME;
const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`;
const GRAPHQL_API_URL = `https://${REPOSITORY}.prismic.io/graphql`;
// export const API_URL = 'https://your-repo-name.cdn.prismic.io/api/v2'
export const API_TOKEN = process.env.PRISMIC_API_TOKEN;
export const API_LOCALE = process.env.PRISMIC_REPOSITORY_LOCALE;

export const PrismicClient = Prismic.client(REF_API_URL, {
  accessToken: API_TOKEN,
});

async function fetchAPI(query, { previewData, variables } = {}) {
  const prismicAPI = await PrismicClient.getApi();
  const res = await fetch(
    `${GRAPHQL_API_URL}?query=${query}&variables=${JSON.stringify(variables)}`,
    {
      headers: {
        'Prismic-Ref': previewData?.ref || prismicAPI.masterRef.ref,
        'Content-Type': 'application/json',
        'Accept-Language': API_LOCALE,
        Authorization: `Token ${API_TOKEN}`,
      },
    },
  );

  if (res.status !== 200) {
    console.log(await res.text());
    throw new Error('Failed to fetch API');
  }

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

export async function getLandingPage(previewData) {
  const data = await fetchAPI(
    `
      {
        homepage(uid: "landing", lang: "sk") {
          title
          body {
            ... on HomepageBodyHero {
              type
              hero: primary {
                primaryText: hero_primary_text
                secondaryText:hero_secondary_text
                image: hero_image
                buttonText: hero_button_text
                buttonLink: hero_button_link {
                  ... on _Document{
                    _meta {
                      type
                      uid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    { previewData },
  );
  return data?.homepage;
}

export async function getNavigationBarData(previewData) {
  const data = await fetchAPI(
    `
    query {
      allNavigations {
        edges {
          node {
            title: site_title
            logo: site_logo
            menuItems: menu {
              label: menu_item_label
              link: menu_item_link {
                ... on Page {
                  _meta {
                    id
                    uid
                    type
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
    { previewData },
  );
  return data?.allNavigations?.edges[0]?.node;
}

export async function getAllPagesWithUid() {
  const data = await fetchAPI(`
    query {
      allPages {
        edges {
          node {
            _meta {
              uid
            }
          }
        }
      }
    }
  `);
  return data?.allPages?.edges;
}

export async function getAllCourseUid() {
  const data = await fetchAPI(`
    query {
      allCourses {
        edges {
          node {
            _meta {
              uid
            }
          }
        }
      }
    }
  `);
  return data?.allCourses?.edges;
}

export async function getPage(uid, previewData) {
  const data = await fetchAPI(
    `
    query getPageByUid($uid: String!, $lang: String!) {
      page(uid: $uid, lang: $lang) {
        title
        body {
          ... on PageBodyText {
            type
            primary {
              text
            }
          }
          ... on PageBodyCourses {
            type
            primary {
              no_courses
            }
            fields {
              course {
                ... on Course {
                  title
                  short_description
                  description
                  course_image
                  _meta {
                    uid
                    type
                  }
                }
              }
            }
          }
          ... on PageBodySelected_timeslots {
            type
            primary {
              no_timeslot
            }
            fields {
              timeslot {
                ... on Timeslot {
                  start_date_time
                  capacity
                  duration
                  course {
                    ... on Course {
                      title
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      previewData,
      variables: {
        uid,
        lang: API_LOCALE,
      },
    },
  );

  return data;
}

export async function getCourseAndTimeslots(uid, previewData) {
  const courseIdData = await fetchAPI(
    `
    query getCourseByUid($uid: String!, $lang: String!) {
      course(uid: $uid, lang: $lang) {
        _meta {
          id
        }
      }
    }
  `,
    {
      previewData,
      variables: {
        uid,
        lang: API_LOCALE,
      },
    },
  );

  let data = null;
  if (courseIdData?.course?._meta?.id) {
    data = await fetchAPI(
      `
        query getCourseId($id: String!, $uid: String!, $lang: String!) {
          course(uid: $uid, lang: $lang) {
            title
            short_description
            description
            course_image
            _meta {
              uid
            }
          }
          timeslots: allTimeslots(where: {course: $id} ) {
            edges {
              node {
                _meta {
                  id
                  type
                }
                start_date_time
                capacity
                duration
                course {
                  ... on Course {
                    _meta {
                      uid
                      type
                    }
                  }
                } 
              }
            }
          }
        }
      `,
      {
        previewData,
        variables: {
          id: courseIdData.course._meta.id,
          uid,
          lang: API_LOCALE,
        },
      },
    );
  }

  return {
    course: data?.course || null,
    timeslots: data?.timeslots?.edges?.map(({ node }) => node) || null,
  };
}

export async function getAllTimeslots(previewData) {
  const data = await fetchAPI(
    `
    query {
      allTimeslots {
        edges {
          node {
            _meta {
              id
              uid
              type
            }
            start_date_time
            end_date
            duration
            capacity
            course {
              ... on Course {
                _meta {
                  id
                  uid
                  type
                }
                title
                short_description
                description
                course_image
              }
            }
          }
        }
      }
    }
  `,
    { previewData },
  );
  return data?.allTimeslots?.edges;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      allPosts {
        edges {
          node {
            _meta {
              uid
            }
          }
        }
      }
    }
  `);
  return data?.allPosts?.edges;
}

export async function getAllPostsForHome(previewData) {
  const data = await fetchAPI(
    `
    query {
      allPosts(sortBy: date_DESC) {
        edges {
          node {
            date
            title
            content
            coverimage
            excerpt
            author {
              ...on Author {
                name
                picture
              }
            }
            _meta {
              uid
            }
          }
        }
      }
    }
  `,
    { previewData },
  );

  return data.allPosts.edges;
}

export async function getPostAndMorePosts(slug, previewData) {
  const data = await fetchAPI(
    `
  query PostBySlug($slug: String!, $lang: String!) {
    post(uid: $slug, lang: $lang) {
      title
      content
      date
      coverimage
      author {
        ...on Author {
          name
          picture
        }
      }
      _meta {
        uid
      }
    }

   morePosts: allPosts(sortBy: date_DESC, first: 3) {
      edges {
        node {
          title
          content
          date
          coverimage
          excerpt
          author {
            ...on Author {
              name
              picture
            }
          }
          _meta {
            uid
          }
        }
      }
    }
  }
  `,
    {
      previewData,
      variables: {
        slug,
        lang: API_LOCALE,
      },
    },
  );

  data.morePosts = data.morePosts.edges
    .filter(({ node }) => node._meta.uid !== slug)
    .slice(0, 2);

  return data;
}
