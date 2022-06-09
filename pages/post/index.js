import Router from "next/router";
import { useEffect } from "react";

function Posts() {
  const router = Router;
  useEffect(() => {
    router.push("/post/page/1");
  }, [router]);
}

export default Posts;
