import React, { useState } from "react";
import { ProfilesSearch, SearchBars } from "./components/ProfilesSearch";
import { ProfilesGallery } from "./components/ProfilesGallery";

export function SearchAndGallery() {
  const [query, setQuery] = useState({});

  return (
    <>
      <ProfilesSearch />
      <SearchBars setQuery={setQuery} />
      <ProfilesGallery query={query} />
    </>
  );
}
