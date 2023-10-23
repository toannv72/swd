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
        <ul role="list" className="divide-y divide-gray-200">
          {order.map((orderData) => (
              <tr key={orderData.index}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <td className="px-6 py-4 whitespace-nowrap">{orderData._id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{orderData.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{orderData.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">{orderData.shippingAddress}</td>
              <td className="px-6 py-4 whitespace-nowrap">{orderData.createdAt}</td>
              <td className="px-6 py-4 whitespace-nowrap">{orderData.quantity}</td><td className="px-6 py-4 whitespace-nowrap">{orderData.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{orderData.status}</td>
                <div className="col-span-1 mt-4 md:mt-0">
                  <div className="flex flex-col items-end mb-4">
                    <div className={`flex-none ${orderData.status === "Done" ? 'bg-emerald-500' : 'bg-red-500'} text-white rounded-full px-3 py-1 mb-2`}>
                      {orderData.status}
                    </div>
                  </div>
                </div>
                <div className="col-span-3 mt-4 md:mt-0">
                  <div className="flex flex-col items-end mb-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-900 font-semibold rounded-md">
                        {textApp.OrderHistory.button.contact}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </tr>
          ))}
        </ul>
      )}
    </div>
  );
}
