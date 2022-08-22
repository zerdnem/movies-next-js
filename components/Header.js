import { useState } from "react";
import Image from "next/image";
import {
  SearchIcon,
  HomeIcon,
  PlusIcon,
  StarIcon,
} from "@heroicons/react/solid";

import styles from "../styles/Search.module.css";
import Link from "next/link";

function Header(props) {
  const [query, setQuery] = useState("");
  const handleOnSubmitSearch = (e) => {
    e.preventDefault();
    props.onSubmitForm(query);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <header className="sticky bg-black-rgba top-0 z-[1000] flex items-center px-10 md:px-12 h-[72px]">
      <Link href="/">
        <Image
          className="invert"
          src="/logo.svg"
          alt="Vercel Logo"
          width={48}
          height={56}
        />
      </Link>
      <div className="hidden ml-10 md:flex items-center space-x-6">
        <Link href="/">
          <a className="header-link group">
            <HomeIcon className="h-4" />
            <span className="span">Home</span>
          </a>
        </Link>
        <a className="header-link group">
          <PlusIcon className="h-4" />
          <span className="span">Watchlist</span>
        </a>
        <a className="header-link group">
          <StarIcon className="h-4" />
          <span className="span">Favorite</span>
        </a>
      </div>

      <form onSubmit={handleOnSubmitSearch} className={styles.search}>
        <input
          type="text"
          className={styles.search__input}
          aria-label="search"
          placeholder="Search"
          value={query}
          onChange={handleChange}
        />
        <button
          className={styles.search__submit}
          type="submit"
          aria-label=">submit search"
        >
          <SearchIcon className="h-8" />
        </button>
      </form>
    </header>
  );
}

export default Header;
