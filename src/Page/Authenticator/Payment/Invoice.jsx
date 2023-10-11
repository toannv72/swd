import React from "react";
import { textApp } from "../../../TextContent/textApp";
import { Link } from "react-router-dom"; 
const orders = [
  {
    index: 1,
    orderDate: "Ngày đặt hàng: 09/10/2023",
    paymentMethod: "Hình thức thanh toán: Thanh toán khi nhận hàng",
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
  },
];

const InvoicePage = () => {
  const order = orders[0]; // Lấy đơn hàng đầu tiên trong danh sách

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-4 md:p-8 lg:p-12 rounded-lg shadow-md w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
        <h1 className="bg-blue-500 text-white py-2 px-4 rounded-md text-center block w-full text-2xl font-semibold mb-4">{textApp.Invoice.title}</h1>
        <p className="text-gray-600 mb-2">{textApp.Invoice.status}</p> 
        <p className="text-gray-600 mb-6">{textApp.Invoice.thankyou}</p>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">{textApp.Invoice.info}</h2>
          {order.products.map((product, index) => (
            <div key={index} className="mb-4 flex items-center">
              <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="ml-4">
                <p className="text-lg font-semibold">{product.name}</p>
                <p>{product.quantity} {product.number}</p>
                <p>{product.sumPrice} {product.price} </p>
                <p>{textApp.Product.page.material} {product.material}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-gray-600 mb-2">{order.orderDate}</p>
        <p className="text-gray-600 mb-2">{order.paymentMethod}</p>
        <p className="text-gray-600 mb-6">{order.amount}</p>
        <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center block w-full max-w-xs mx-auto">{textApp.Invoice.button}</Link>
      </div>
    </div>
  );
};

export default InvoicePage;
