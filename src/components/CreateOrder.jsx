import { useState } from "react";
import AddIcon from "../assets/add.svg";
import Chicken from "../assets/chicken.svg";
import Hamburger from "../assets/hamburger.svg";
import Pizza from "../assets/pizza.svg";
import RemoveIcon from "../assets/remove.svg";
import Submarine from "../assets/submarine.svg";

const items = [
  {
    id: 1,
    name: "Hamburger",
    price: 300,
    image: Hamburger,
  },
  {
    id: 2,
    name: "Chicken Nuggets",
    price: 300,
    image: Chicken,
  },
  {
    id: 3,
    name: "Submarine Sandwich",
    price: 300,
    image: Submarine,
  },
  {
    id: 4,
    name: "Pizza slices",
    price: 300,
    image: Pizza,
  },
];
export default function CreateOrder({ setOrders }) {
  const [customerName, setCustomerName] = useState("");
  const [orderedItemsId, setOrderedItemsId] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value);
  };

  const handleAddItem = (id) => {
    setOrderedItemsId([...orderedItemsId, id]);

    let totalPrice = 0;
    orderedItemsId.forEach((itemId) => {
      const item = items.find((item) => item.id === itemId);
      if (item) {
        totalPrice += item.price;
      }
    });
    setTotalPrice(totalPrice);
  };

  const handleRemoveItem = (id) => {
    const newOrderedItemsId = orderedItemsId.filter((itemId) => itemId !== id);
    setOrderedItemsId(newOrderedItemsId);
    calcuateTotalPrice();
  };

  const calcuateTotalPrice = () => {
    let totalPrice = 0;
    orderedItemsId.forEach((itemId) => {
      const item = items.find((item) => item.id === itemId);
      if (item) {
        totalPrice += item.price;
      }
    });
    setTotalPrice(totalPrice);
  };

  const handleCreateOrder = () => {
    if (customerName.trim() === "") {
      alert("Please enter a customer name.");
      return;
    }
    if (orderedItemsId.length === 0) {
      alert("Please select at least one item.");
      return;
    }

    const order = {
      customerName,
      orderedItemsId,
      totalPrice,
      status: "Pending",
      id: crypto.randomUUID(),
    };

    setOrders((prevOrders) => [...prevOrders, order]);
    setCustomerName("");
    setOrderedItemsId([]);
    setTotalPrice(0);
  };

  return (
    <div className="bg-cardbg rounded-lg p-6 h-[calc(100vh_-_130px)]">
      <h2 className="text-xl font-bold mb-1">CREATE ORDER</h2>
      <p className="text-gray-400 text-sm mb-4">
        Accurately fulfill customer orders based on a precise understanding of
        their requirements.
      </p>

      {/* <!-- Customer Name Input --> */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Customer Name</label>
        <input
          onChange={handleCustomerNameChange}
          type="text"
          defaultValue={customerName}
          className="w-full bg-gray-700 bg-opacity-50 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
        />
      </div>

      {/* <!-- Choose Items --> */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Choose Items</label>
        <div className="items-container">
          {/* <!-- Item 1 --> */}

          {items.map((item) => (
            <div className="bg-gray-700 bg-opacity-30 rounded-md p-3 mb-3 flex justify-between items-center hover:bg-opacity-40 transition-all duration-300">
              <div className="flex items-center">
                <div className="w-12 h-12   flex items-center justify-center mr-3">
                  <img src={item.image} alt="Hamburger" className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-xs text-gray-400">BDT 300</p>
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
          ))}
        </div>
      </div>

      {/* <!-- Place Order Button --> */}
      <button
        onClick={handleCreateOrder}
        className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3 rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
      >
        Place Order (BDT {totalPrice})
      </button>
    </div>
  );
}
