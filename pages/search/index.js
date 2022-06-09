import { DataContext } from "../../context/DataContext";
import React, { useContext } from "react";

function Search(posts) {
  const dataContext = useContext(DataContext);
  console.log(dataContext.posts);
  return (
    <>
      <ul>
        {dataContext.posts.map((post) => {
          return <h2>{post.title}</h2>;
        })}
      </ul>
    </>
  );
}

export default Search;
