const Search = ({ search, setSearch, keyboardNavigation }) => {
  return (
    <>
      <input
        className="select-search"
        value={search.toLowerCase()}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Ara..."
        onKeyDown={(e) => keyboardNavigation(e)}
      />
    </>
  );
};

export default Search;
