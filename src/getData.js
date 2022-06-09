import path from "path";
import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";

//console.log("from get data");

export const getPosts = () => {
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
  return items;
};

export const POSTS_PATH = path.join(process.cwd(), "posts");

export const getSlugs = () => {
  const paths = sync(`${POSTS_PATH}/*.md`);
  return paths.map((path) => {
    const parts = path.split("/");
    const fileName = parts[parts.length - 1];
    const [slug, _ext] = fileName.split(".");
    return slug;
  });
};

export const getAllPosts = () => {
  const posts = getSlugs()
    .map((slug) => getPostFromSlug(slug))
    .sort((a, b) => {
      console.log();
      var dateA = new Date(a.meta.date);
      var dateB = new Date(b.meta.date);
      console.log("dateA", dateA, "dateB", dateB);
      if (Date.parse(new Date(a.meta.date)) > Date.parse(new Date(b.meta.date)))
        return 1;
      if (Date.parse(new Date(a.meta.date)) < Date.parse(new Date(b.meta.date)))
        return -1;
      return 0;
    })
    .reverse();
  console.log("posts:", posts);
  return posts;
};

export const getPostFromSlug = (slug) => {
  const postPath = path.join(POSTS_PATH, `${slug}.md`);
  const source = fs.readFileSync(postPath);
  const { content, data } = matter(source);

  return {
    content,
    id: data.id,
    meta: {
      slug,
      excerpt: data.excerpt ?? "",
      title: data.title ?? slug,
      tags: (data.tags ?? []).sort(),
      date: (data.date ?? new Date()).toString(),
    },
  };
};
