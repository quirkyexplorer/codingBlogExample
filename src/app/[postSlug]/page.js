import React from 'react';
import dynamic from 'next/dynamic'; // this helps with lazy loading. 
import CodeSnippet from '@/components/CodeSnippet';
import BlogHero from '@/components/BlogHero';
import { loadBlogPost } from '@/helpers/file-helpers';
import styles from './postSlug.module.css';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { BLOG_TITLE } from '@/constants';

export async function generateMetadata({
  params
}) {

  const { frontmatter }= await loadBlogPost(params.postSlug);

  return {
    title: `${frontmatter.title} • ${BLOG_TITLE}`,
    description: `${frontmatter.abstract}`
  }
}

// the following adds lazy loading so the page only request the code until is needed. 
const DivisionGroupsDemo = dynamic(() => import('@/components/DivisionGroupsDemo') )

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
          DivisionGroupsDemo                  // pre tags - code tags - in the mdx content. 
        }}
      />
      </div>
    </article>
  );
}

export default BlogPost;
