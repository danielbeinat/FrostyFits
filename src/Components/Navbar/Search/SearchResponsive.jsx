import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchResponsive = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const [isSearch, setSearch] = useState(false);

  const openSearch = () => {
    setSearch(!isSearch);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search/${searchQuery}`);
    }
    setSearch(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      setSearch(false);
    }
  };
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 cursor-pointer text-gray-700 md:hidden"
        onClick={openSearch}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      {isSearch && (
        <div className="fixed bg-white top-0 left-0 w-full h-screen z-10 flex justify-center px-4 py-20 border-t border-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 absolute top-4 right-4 cursor-pointer"
            onClick={openSearch}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>

          <p className="absolute top-4 left-4 text-black font-bold">Buscar</p>

          <div className="bg-black w-96 h-10 flex items-center border border-black cursor-pointer">
            <input
              onChange={handleSearchChange}
              value={searchQuery}
              type="text"
              placeholder="Buscar..."
              onKeyDown={handleKeyDown}
              className="w-full h-full  px-4 focus:outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer text-white mx-2"
              onClick={handleSearch}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};
