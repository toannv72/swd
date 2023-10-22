import React, { useEffect, useState } from "react";
import { textApp } from "../../../TextContent/textApp";
import { getData } from '../../../api/api';

export default function Pprocessing({activeTab}) {
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

      getData('/customOrder/user/processing', {})
        .then((orderData) => {
          setOrder(orderData?.data?.docs);
    
        })
        .catch((error) => {
          console.error("Error fetching items:", error);
    
        });
    // }
  }, [activeTab]);
  function formatCurrency(number) {
    // Sử dụng hàm toLocaleString() để định dạng số thành chuỗi với ngăn cách hàng nghìn và mặc định là USD.
    if (typeof number === "number") {
      
      return number.toLocaleString('en-US', {
          style: 'currency',
          currency: 'VND',
      });
    }
}
  const getProductById = (productId) => {
    // Tìm sản phẩm theo ID trong danh sách sản phẩm
    return products?.docs?.find(product => product._id === productId);
  };

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
            <li key={orderData.index} className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="col-span-2">
              <img
                            className="w-16 h-16 rounded-full bg-gray-200"
                            src={orderData?.image}
                            alt=""
                          />
                  <h2 className="text-lg font-semibold mb-2">
                  {"Tên Đơn Hàng :"}{orderData._id}
                   </h2> 
                   <h3 className="text-lg  mb-4">
                  {"Tên Người đặt :"}{orderData.name}
                   </h3> 
                   <h3 className="text-lg  mb-4">
                  {"Số điện thoại :"}{orderData.phone}
                   </h3> 
                   <h3 className="text-lg  mb-4">
                  {"Địa chỉ :"}{orderData.shippingAddress}
                   </h3> 
                   {/* Ngày đặt hàng */}
                   <h3 className="text-lg  mb-4">
                  {"Ngày đặt hàng :"}{orderData.createdAt}
                   </h3> 
                   <h3 className="text-lg mb-4">
                    {"số lượng:"}{orderData.quantity}
                    </h3>
                </div>
                <div className="col-span-1 mt-4 md:mt-0">
                  <div className="flex flex-col items-end mb-4">
                    <div className="flex-none bg-yellow-400 text-white rounded-full px-3 py-1 mb-2">
                    {textApp.OrderHistory.label.status1}
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
