import React from "react";
import {
  getSlugs,
  getPostFromSlug,
  getPosts,
  getAllPosts,
} from "@/src/getData";
import Router from "next/router";
import Layout from "@/src/components/layout";

const postsPerPage = 3;

function Page({ pageData }) {
  //   console.log("2020-05-03" > "2020-05-01");
  //   console.log("page", pageData);
  const router = Router;
  const previousPage = parseInt(pageData.pageNumber) - 1;
  const nextPage = parseInt(pageData.pageNumber) + 1;

  return (
    <Layout>
      {pageData.pagePosts.map((post) => {
        return (
          <ul key={post.id}>
            <h2>{post.meta.title}</h2>
            <p>{post.meta.excerpt}</p>
          </ul>
        );
      })}
      <button
        onClick={() => router.push(`/post/page/${previousPage}`)}
        disabled={pageData.pageNumber <= 1}
      >
        Previous Page
      </button>
      <button
        onClick={() => router.push(`/post/page/${nextPage}`)}
        disabled={pageData.pageNumber >= pageData.numberOfPages}
      >
        Next Page
      </button>
    </Layout>
  );
}

export default Page;

export async function getStaticPaths() {
  //const md_posts = getAllPosts();
  //console.log("markdown posts", md_posts);
  //const posts = getPosts();
  const posts = getAllPosts();

  //console.log("posts:", posts);

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));
  //console.log("paths", paths);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  //const posts = getPosts();
  const posts = getAllPosts();

  const pageIndexes = [...Array(posts.length).keys()];
  const numberOfPages = Math.ceil(posts.length / postsPerPage);

  let itemsStart = postsPerPage * params.id - postsPerPage;
  if (itemsStart < 0) {
    itemsStart = 0;
  }

  let itemsEnd = postsPerPage * params.id;

  const pagePosts = posts.slice(itemsStart, itemsEnd);
  //console.log("page: ", pagePosts);
  const pageData = {
    numberOfPages: numberOfPages,
    pageNumber: params.id,
    pagePosts: pagePosts,
  };

  const post = posts.filter((item) => item.id == params.id)[0];
  //console.log("post", post);
  return { props: { pageData } };
}
