import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const SelectedItems = ({ selected, setSelected }) => {
  const handleDeleteSelectedItem = (id) => {
    if (id) {
      setSelected((prev) => prev.filter((el) => el?.id !== id));
    }
  };

  const [filteredSelected, setFilteredSelected] = useState([]);

  useEffect(() => {
    if (selected?.length > 2) {
      setFilteredSelected(selected.slice(0, 2));
    } else {
      setFilteredSelected(selected);
    }
  }, [selected, setSelected]);

  return (
    <div className="selected">
      {filteredSelected?.length > 0 &&
        filteredSelected.map((item) => (
          <div className="selected-item text-nowrap" key={item.id}>
            {item?.name.length > 12
              ? item?.name.substr(0, 12) + " ..."
              : item?.name}
            <button
              className="selected-item-btn"
              onClick={() => handleDeleteSelectedItem(item?.id)}
            >
              <FaTimes />
            </button>
          </div>
        ))}
      {selected?.length > 2 && (
        <div className="selected-item">+{selected?.length - 2}</div>
      )}
    </div>
  );
};

export default SelectedItems;
