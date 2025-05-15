import { useState } from "react";
import "./App.css";
import CreateOrder from "./components/CreateOrder";
import Navbar from "./components/Navbar";
import OrderSummery from "./components/OrderSummery";

function App() {
  const [orders, setOrders] = useState([]);

  return (
    <div className="container mx-auto px-4 h-screen flex flex-col">
      <Navbar />
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 flex-grow">
        <CreateOrder setOrders={setOrders} />
        <OrderSummery orders={orders} setOrders={setOrders} />
      </main>
    </div>
  );
}

export default App;
