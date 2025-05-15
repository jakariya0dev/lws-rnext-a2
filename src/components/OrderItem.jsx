import React from 'react'

export default function OrderItem({order,index,handleDeliver}) {
    return (
      <tr className="border-t border-gray-700">
        <td className="py-3">{index + 1}</td>
        <td className="py-3">{order.customerName}</td>
        <td className="py-3">{order.orderedItemsId.length}</td>
        <td className="py-3">{order.totalPrice}</td>
        <td className="py-3">
          <span className="text-red-500">{order.status}</span>
        </td>
        <td className="py-3">
          <button className="bg-gray-800 hover:bg-red-600 text-xs px-3 py-1 rounded-full mr-1 transition-colors duration-300">
            Delete
          </button>
          {order.status === "Pending" && (
            <button
              onClick={() => handleDeliver(order.id)}
              className="bg-gray-800 hover:bg-green-600 text-xs px-3 py-1 rounded-full transition-colors duration-300"
            >
              DELIVER
            </button>
          )}
        </td>
      </tr>
    );
}
