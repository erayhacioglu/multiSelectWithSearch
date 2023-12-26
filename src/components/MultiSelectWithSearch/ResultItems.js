const ResultItems = ({
  selectVisible,
  isTyping,
  selectItems,
  selected,
  setSelected,
  search,
  cursor,
  message,
}) => {
  const handleChangeCheckbox = (item) => {
    if (item) {
      const findItem = selected.find((el) => el.id === item.id);
      if (findItem) {
        setSelected((prev) => prev.filter((el) => el.id !== item.id));
      } else {
        setSelected((prev) => [...prev, item]);
      }
    }
  };

  const foundValue = (value, search) => {
    const position = value.toLowerCase().indexOf(search.toLowerCase());
    if (position !== -1) {
      const firstPart = value.substring(0, position);
      const searchedPart = value.substring(position, position + search.length);
      const lastPart = value.substring(position + search.length);
      return (
        <>
          {firstPart}
          <span
            style={{ color: "#475569", fontWeight: "bold", fontSize: "22px" }}
          >
            {searchedPart}
          </span>
          {lastPart}
        </>
      );
    } else {
      return value;
    }
  };

  return (
    <div
      className={`select-results ${selectVisible || isTyping ? "open" : ""}`}
    >
      {selectItems?.length > 0 ? (
        selectItems.map((item, idx) => (
          <label
            className={`select-result-item ${cursor === idx ? "hover" : ""}`}
            key={item?.id}
          >
            <input
              type="checkbox"
              checked={selected.find((el) => el.id === item.id) ? true : false}
              onChange={() => handleChangeCheckbox(item)}
            />
            <img src={item?.image} alt={item?.name} />
            <div>
              <h4>{foundValue(item?.name, search)}</h4>
              <span>{item?.episode?.length} Episodes</span>
            </div>
          </label>
        ))
      ) : (
        <div className="select-result-item d-flex align-items-center justify-content-center ">
          {message}
        </div>
      )}
    </div>
  );
};

export default ResultItems;
