import AddIcon from "../assets/add.svg";
import RemoveIcon from "../assets/remove.svg";

export default function MenuItem({
  item,
  orderedItemsId,
  handleAddItem,
  handleRemoveItem,
}) {
  return (
    <div className="bg-gray-700 bg-opacity-30 rounded-md p-3 mb-3 flex justify-between items-center hover:bg-opacity-40 transition-all duration-300">
      <div className="flex items-center">
        <div className="w-12 h-12   flex items-center justify-center mr-3">
          <img src={item.image} alt="Hamburger" className="w-10 h-10" />
        </div>
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-xs text-gray-400">BDT {item.price}</p>
        </div>
      </div>
      <button
        onClick={() =>
          orderedItemsId.includes(item.id)
            ? handleRemoveItem(item.id)
            : handleAddItem(item.id)
        }
        className="w-8 h-8 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300"
      >
        <img
          src={orderedItemsId.includes(item.id) ? RemoveIcon : AddIcon}
          alt=""
        />
      </button>
    </div>
  );
}
