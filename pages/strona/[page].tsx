import { getMarkdownPostsForPage, PAGE_SIZE, postToProps } from '../../utils/postToProps';
import { getAllPermalinks } from '../../utils/wordpress';
import IndexPage from '../index';

import type { GetStaticPaths, GetStaticPropsContext } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPermalinks();

  const maxPages = Math.ceil(posts.length / PAGE_SIZE);

  return {
    paths: Array.from({ length: maxPages })
      .map((_, idx) => String(idx + 1))
      .map((page) => ({ params: { page } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params || typeof params.page !== 'string' || Number.isNaN(Number(params.page))) {
    return { notFound: true };
  }

  const page = Number(params.page);
  const { markdownPosts } = await getMarkdownPostsForPage(page);

  if (markdownPosts.length === 0) {
    return { notFound: true };
  }

  const authorsJson = (await import(/* webpackChunkName: "authors" */ '../../authors.json')).default;

  const posts = markdownPosts.map((post) => postToProps(post, authorsJson)).map((p) => ({ ...p, content: '' }));

  return { props: { posts, page } };
};

export default IndexPage;