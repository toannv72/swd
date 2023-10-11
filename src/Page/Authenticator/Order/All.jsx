import React, { useState } from "react";
import { textApp } from "../../../TextContent/textApp";

const orders = [
  {
    index: 1,
    products: [
      {
        name: "Lồng chim chào mào",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGr83ZEwZOv05dzZZVzeLsuTtYCsckaFejiw&usqp=CAU",
        quantity: "Số lượng:",
        number: "1",
        sumPrice: "Tổng tiền:",
        price: "365.000",
        material: "Gỗ",
      },
      {
        name: "Lồng chim chào mào 2",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGr83ZEwZOv05dzZZVzeLsuTtYCsckaFejiw&usqp=CAU",
        quantity: "Số lượng:",
        number: "3",
        sumPrice: "Tổng tiền:",
        price: "400.000",
        material: "Gỗ",
      },
    ],
    amount: "Thành tiền: 765.000",
    status: textApp.OrderHistory.label.status3,
    contact: textApp.OrderHistory.button.contact,
    reBuy: textApp.OrderHistory.button.reBuy
  },
  {
    index: 2,
    products: [
      {
        name: "Lồng chim chào mào 4",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGr83ZEwZOv05dzZZVzeLsuTtYCsckaFejiw&usqp=CAU",
        quantity: "Số lượng:",
        number: "1",
        sumPrice: "Tổng tiền:",
        price: "365.000",
        material: "Gỗ",
      },
      {
        name: "Lồng chim chào mào 5",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGr83ZEwZOv05dzZZVzeLsuTtYCsckaFejiw&usqp=CAU",
        quantity: "Số lượng:",
        number: "3",
        sumPrice: "Tổng tiền:",
        price: "400.000",
        material: "Gỗ",
      },
      {
        name: "Lồng chim chào mào 6",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGr83ZEwZOv05dzZZVzeLsuTtYCsckaFejiw&usqp=CAU",
        quantity: "Số lượng:",
        number: "2",
        sumPrice: "Tổng tiền:",
        price: "400.000",
        material: "Gỗ",
      },
    ],
    amount: "Thành tiền: 1.165.000",
    status: textApp.OrderHistory.label.status4,
    contact: textApp.OrderHistory.button.contact,
    reBuy: textApp.OrderHistory.button.reBuy
  },
];

export default function All() {
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleClick = (orderId) => {
    // Log the selected orderId to the console
    console.log("Selected Order ID:", orderId);
    setSelectedOrderId(orderId); // Optionally, set the selectedOrderId state for use in your component
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">{textApp.OrderHistory.title}</h1>
      <ul role="list" className="divide-y divide-gray-200">
        {orders.map((order) => (
          <li key={order.index} className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="col-span-2">
                <h2 className="text-lg font-semibold mb-2">{order.amount}</h2>
                <ul className="space-y-4">
                  {order.products.map((product, id) => (
                    <li key={id} className="flex items-center space-x-4">
                      <img
                        className="w-16 h-16 rounded-full bg-gray-200"
                        src={product.imageUrl}
                        alt=""
                      />
                      <div className="flex-1">
                        <p className="text-lg font-semibold">{product.name}</p>
                        <p className="text-gray-500">{product.material}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.quantity} {product.number}
                      </div>
                      <div className="text-sm text-gray-900">
                        {product.sumPrice} {product.price}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-1 mt-4 md:mt-0"> 
                <div className="flex flex-col items-end mb-4"> 
                  <div className={`flex-none ${order.status === textApp.OrderHistory.label.status3 ? 'bg-emerald-500' : 'bg-red-500'} text-white rounded-full px-3 py-1 mb-2`}>
                    {order.status}
                  </div>
                </div>
              </div>
              <div className="col-span-3 mt-4 md:mt-0"> 
                <div className="flex flex-col items-end mb-4"> 
                  <div className="flex items-center space-x-2">
                    <button  onClick={() => handleClick(order.index)}
                    className="bg-blue-500 text-white rounded-md px-2 py-1">
                      {order.reBuy}
                    </button>
                    <button className="text-gray-900 font-semibold rounded-md">
                      {order.contact}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}