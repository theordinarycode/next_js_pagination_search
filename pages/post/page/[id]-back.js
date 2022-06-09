import React from "react";
import { getSlugs, getPostFromSlug } from "@/src/getData";

function Page({ post }) {
  console.log("post", post);
  return (
    <>
      <div>Page {post.id}</div>
      <p>{post.title}</p>
    </>
  );
}

export default Page;

const items = [
  { id: 1, title: "Item 1", slug: "item-1" },
  { id: 2, title: "Item 2", slug: "item-2" },
  { id: 3, title: "Item 3", slug: "item-3" },
  { id: 4, title: "Item 4", slug: "item-4" },
  { id: 5, title: "Item 5", slug: "item-5" },
  { id: 6, title: "Item 6", slug: "item-6" },
  { id: 7, title: "Item 7", slug: "item-7" },
  { id: 8, title: "Item 8", slug: "item-8" },
  { id: 9, title: "Item 9", slug: "item-9" },
  { id: 10, title: "Item 10", slug: "item-10" },
];

export async function getStaticPaths() {
  const posts = items;
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));
  console.log("paths", paths);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = items.filter((item) => item.id == params.id)[0];
  console.log("post", post);
  return { props: { post } };
}
