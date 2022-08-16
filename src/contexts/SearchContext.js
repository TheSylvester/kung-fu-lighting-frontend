import React from "react";

const SearchContext = React.createContext(null);

const useSearchContext = () => React.useContext(SearchContext);

const SearchProvider = ({ value, children }) => {
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export { SearchProvider, useSearchContext };
