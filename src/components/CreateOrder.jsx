import { useState } from "react";
import Chicken from "../assets/chicken.svg";
import Hamburger from "../assets/hamburger.svg";
import Pizza from "../assets/pizza.svg";
import Submarine from "../assets/submarine.svg";
import MenuItem from "./MenuItem";

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
    price: 200,
    image: Chicken,
  },
  {
    id: 3,
    name: "Submarine Sandwich",
    price: 400,
    image: Submarine,
  },
  {
    id: 4,
    name: "Pizza slices",
    price: 100,
    image: Pizza,
  },
];

export default function CreateOrder({ setOrders }) {
  const [customerName, setCustomerName] = useState("");
  const [orderedItemsId, setOrderedItemsId] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleAddItem = (id) => {
    const newOrderedItemsId = [...orderedItemsId, id];
    setOrderedItemsId(newOrderedItemsId);
    calcuateTotalPrice(newOrderedItemsId);
  };

  const handleRemoveItem = (id) => {
    const newOrderedItemsId = orderedItemsId.filter((itemId) => itemId !== id);
    setOrderedItemsId(newOrderedItemsId);
    calcuateTotalPrice(newOrderedItemsId);
  };

  const calcuateTotalPrice = (ordersId) => {
    let totalPrice = 0;
    ordersId.forEach((id) => {
      const item = items.find((item) => item.id === id);
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
          onChange={(e) => setCustomerName(e.target.value)}
          type="text"
          value={customerName}
          className="w-full bg-gray-700 bg-opacity-50 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
        />
      </div>

      {/* <!-- Choose Items --> */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Choose Items</label>
        <div className="items-container">
          {/* <!-- Item 1 --> */}

          {items.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              orderedItemsId={orderedItemsId}
              handleAddItem={handleAddItem}
              handleRemoveItem={handleRemoveItem}
            />
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
