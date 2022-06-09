import { DataContext } from "../../context/DataContext";
import React, { useContext } from "react";
import Router from "next/router";

function Search(posts) {
  const dataContext = useContext(DataContext);
  const router = Router;

  console.log(dataContext.posts);

  router.push("/search/1");
  return (
    <>
      <ul>
        {dataContext.posts.map((post) => {
          return <h2 key={post.id}>{post.title}</h2>;
        })}
      </ul>
    </>
  );
}

export default Search;
