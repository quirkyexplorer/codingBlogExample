import React from 'react';
import BlogSummaryCard from '@/components/BlogSummaryCard';
import styles from './homepage.module.css';
import { getBlogPostList } from '@/helpers/file-helpers';

async function Home() {

  const blogs = await getBlogPostList();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>
        Latest Content:
      </h1>

      { blogs.length != 0 ?  

        blogs.map( (blog) => (

          <div key={crypto.randomUUID()} >
            <BlogSummaryCard
                slug={blog.slug}
                title={blog.title}
                abstract={blog.abstract}
                publishedOn={blog.publishedOn}
            />
          </div>
        ))

      : null

      }

      

    </div>
  );
}

export default Home;
