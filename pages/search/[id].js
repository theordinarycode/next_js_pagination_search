import React, { useContext, useEffect, useState } from "react";
import {
  getSlugs,
  getPostFromSlug,
  getPosts,
  getAllPosts,
} from "@/src/getData";

import Router, { useRouter } from "next/router";
import Layout from "@/src/components/layout";
import { DataContext } from "../../context/DataContext";

const postsPerPage = 3;

function Page() {
  const dataContext = useContext(DataContext);
  const [id, setId] = useState((useRouter().query.page || 1).toString());

  const router = Router;

  useEffect(() => {
    setId((Router.query.page || 1).toString());
  }, []);

  console.log("id", id);

  const posts = dataContext.posts;

  const numberOfPages = Math.ceil(posts.length / postsPerPage);

  const pageIndexes = [...Array(posts.length).keys()];

  let itemsStart = postsPerPage * id - postsPerPage;
  if (itemsStart < 0) {
    itemsStart = 0;
  }

  let itemsEnd = postsPerPage * id;

  const pagePosts = posts.slice(itemsStart, itemsEnd);
  console.log("search Page Posts: ", pagePosts);

  let previousPage;
  let nextPage;

  const changePageForward = (e) => {
    e.preventDefault();
    nextPage = parseInt(id) + 1;
    router.push(`/search/${nextPage}`);
    setId(nextPage);
  };
  const changePageBack = (e) => {
    e.preventDefault();
    previousPage = parseInt(id) - 1;
    router.push(`/search/${previousPage}`);
    setId(previousPage);
  };

  return (
    <Layout>
      <ul>
        {pagePosts.map((post) => {
          return (
            <li key={post.id}>
              <a href={`/post/${post.id}`}>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
              </a>
            </li>
          );
        })}
      </ul>
      <button onClick={changePageBack} disabled={id <= 1}>
        Previous Page
      </button>
      <button onClick={changePageForward} disabled={id >= numberOfPages}>
        Next Page
      </button>
    </Layout>
  );
}

export default Page;
