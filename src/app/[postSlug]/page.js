import React from 'react';

import CodeSnippet from '@/components/CodeSnippet';

import BlogHero from '@/components/BlogHero';

import { loadBlogPost } from '@/helpers/file-helpers';

import styles from './postSlug.module.css';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { BLOG_TITLE } from '@/constants';

export async function generateMetadata({
  params
}) {

  const { frontmatter, content }= await loadBlogPost(params.postSlug);

  return {
    title: `${frontmatter.title} • ${BLOG_TITLE}`,
    description: `${frontmatter.abstract}`
  }
}

async function BlogPost({ params }) {

  const { frontmatter, content }= await loadBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>

      <MDXRemote source={content}
        components={{
          pre: CodeSnippet,  // this essentialy uses the hightlight component to high light the 
                            // pre tags - code tags - in the mdx content. 
        }}
      />
      </div>
    </article>
  );
}

export default BlogPost;
