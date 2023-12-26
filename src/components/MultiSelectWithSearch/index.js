import React, { useEffect, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import Search from "./Search";
import SelectedItems from "./SelectedItems";
import ResultItems from "./ResultItems";
import axios from "axios";

const MultiSelectWithSearch = () => {
  const [selectVisible, setSelectVisible] = useState(false);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [selectItems, setSelectItems] = useState([]);
  const [cursor, setCursor] = useState(-1);
  const [message, setMessage] = useState("");

  const isTyping = search.replace(/\s+/, "").length > 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${search}`
        );

        if (res.status === 200) {
          const results = res?.data?.results || [];
          setSelectItems(results);
          setMessage(results.length === 0 ? "No results found." : "");
        } else {
          setSelectItems([]);
          setMessage("An error occurred while fetching data.");
        }
      } catch (error) {
        setSelectItems([]);
        setMessage(error.response?.data?.error);
      }
    };

    if (isTyping) {
      fetchData();
    } else {
      (async () => {
        try {
          const res = await axios.get(
            "https://rickandmortyapi.com/api/character"
          );

          if (res.status === 200) {
            setSelectItems(res?.data?.results || []);
          } else {
            setSelectItems([]);
          }
        } catch (error) {
          setSelectItems([]);
          setMessage(error.response?.data?.error || "An error occurred");
        }
      })();
    }
  }, [isTyping, search, setSelectItems, setMessage]);

  const keyboardNavigation = (e) => {
    if (e.key === "ArrowDown") {
      selectVisible
        ? setCursor((c) => (c < selectItems.length - 1 ? c + 1 : c))
        : setSelectVisible(true);
    }
    if (e.key === "ArrowUp") {
      setCursor((c) => (c > 0 ? c - 1 : 0));
    }
    if (e.key === "Escape") {
      setSelectVisible(false);
    }
  };

  return (
    <>
      <div className="select-box">
        <div className="select">
          <SelectedItems selected={selected} setSelected={setSelected} />
          <Search
            search={search}
            setSearch={setSearch}
            keyboardNavigation={keyboardNavigation}
          />
          <button
            onClick={() => setSelectVisible((prev) => !prev)}
            className="select-btn"
          >
            {selectVisible ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>

        <ResultItems
          selectVisible={selectVisible}
          isTyping={isTyping}
          selectItems={selectItems}
          selected={selected}
          setSelected={setSelected}
          search={search}
          cursor={cursor}
          message={message}
        />
      </div>
    </>
  );
};

export default MultiSelectWithSearch;
