import { useCallback, useRef, useState, useContext } from "react";
import Link from "next/link";
import styles from "@/styles/Search.module.css";
import Router from "next/router";
import { DataContext } from "../../context/DataContext";

export default function Search() {
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

  const dataContext = useContext(DataContext);

  const router = Router;

  const searchEndpoint = (query) => `/api/search?q=${query}`;

  const onChange = useCallback((event) => {
    const query = event.target.value;
    //console.log("query: ", query);
    setQuery(query);
    if (query.length) {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          setResults(res.results);
        });
    } else {
      setResults([]);
    }
  }, []);

  const onFocus = useCallback(() => {
    setActive(true);
    window.addEventListener("click", onClick);
  }, []);

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener("click", onClick);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(results);
    dataContext.setPosts(results);
    router.push("/search");
  };

  return (
    <div className={styles.container} ref={searchRef}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.search}
          onChange={onChange}
          onFocus={onFocus}
          placeholder="Search posts"
          type="text"
          value={query}
        />
      </form>

      {/* {active && results.length > 0 && (
        <ul className={styles.results}>
          {results.map(({ id, title }) => (
            <li className={styles.result} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
}
