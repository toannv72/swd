import React, { useEffect, useState } from "react";
import { textApp } from "../../../TextContent/textApp";
import { getData } from '../../../api/api';

export default function Deposit({activeTab}) {
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
  
      getData('/product', {})
        .then((productData) => {
       
            setProducts(productData?.data);
          
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });

      getData('customOrder/admin/deposit', {})
        .then((orderData) => {
          setOrder(orderData?.data?.docs);
    
        })
        .catch((error) => {
          console.error("Error fetching items:", error);
    
        });
    // }
  }, [activeTab]);

  const getProductById = (productId) => {
    // Tìm sản phẩm theo ID trong danh sách sản phẩm
    return products?.docs?.find(product => product._id === productId);
  };
  function formatCurrency(number) {
    // Sử dụng hàm toLocaleString() để định dạng số thành chuỗi với ngăn cách hàng nghìn và mặc định là USD.
    if (typeof number === "number") {
      
      return number.toLocaleString('en-US', {
          style: 'currency',
          currency: 'VND',
      });
    }
}
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-semibold mb-4">{textApp.OrderHistory.title}</h1>
    {order.length === 0 ? (
      <p>Loading...</p>
    ) : order.error ? (
      <p>Error: {order.error.message}</p>
    ) : (
      <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên Đơn Hàng</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên Người Đặt</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số Điện Thoại</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Địa Chỉ</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày Đặt Hàng</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số Lượng</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số Tiền </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng Thái</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành Động</th>
        </tr>
      </thead>
      <tbody>
        {order.map((orderData) => (
          <tr key={orderData.index}>
            <td className="px-6 py-4 whitespace-nowrap">{orderData._id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{orderData.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{orderData.phone}</td>
            <td className="px-6 py-4 whitespace-nowrap">{orderData.shippingAddress}</td>
            <td className="px-6 py-4 whitespace-nowrap">{orderData.createdAt}</td>
            <td className="px-6 py-4 whitespace-nowrap">{orderData.quantity}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                {orderData.amount === 0 ? '' : formatCurrency(orderData.amount)}
              </td>
            <td className="px-6 py-4 whitespace-nowrap">{orderData.status}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button className="bg-blue-500 text-white rounded-md px-2 py-1">{textApp.OrderHistory.button.cancel}</button>
              <button className="text-gray-900 font-semibold rounded-md">{textApp.OrderHistory.button.contact}</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    
    )}
  </div>
  );
}
