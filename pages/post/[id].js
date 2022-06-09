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

function Page({ post }) {
  //   console.log("2020-05-03" > "2020-05-01");
  //   console.log("page", pageData);
  const router = Router;

  console.log("post", post);

  return (
    <Layout>
      <h2>{post.meta.title}</h2>
      <p>{post.content}</p>
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

  const post = posts.filter((post) => post.id == params.id)[0];
  //console.log("post", post);
  return { props: { post } };
}
