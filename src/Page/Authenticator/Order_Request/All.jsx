import React, { useEffect, useState } from "react";
import { textApp } from "../../../TextContent/textApp";
import { getData } from '../../../api/api';

export default function All() {
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);
  const [dataRun, setDataRun] = useState(false);

  useEffect(() => {
  
      getData('/product', {})
        .then((productData) => {
       
            setProducts(productData?.data);
          
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });

      getData('/customOrder/user', {})
        .then((orderData) => {
          setOrder(orderData?.data?.docs);
    
        })
        .catch((error) => {
          console.error("Error fetching items:", error);
    
        });
    // }
  }, []);

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
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành Động</th> */}
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
              <td className="px-6 py-4 whitespace-nowrap">{orderData.quantity}</td><td className="px-6 py-4 whitespace-nowrap">{orderData.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">
              <div className="col-span-1 mt-4 md:mt-0">
                  <div className="flex flex-col items-end mb-4">
                    <div className={`flex-none ${orderData.status === "Done" ? 'bg-emerald-500' : 'bg-red-500'} text-white rounded-full px-3 py-1 mb-2`}>
                      {orderData.status}
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
