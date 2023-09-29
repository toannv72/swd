import { useState } from "react";
import "./Payment.css";
import ComHeader from "../../Components/ComHeader/ComHeader";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập họ tên"),
  phoneNumber: Yup.string()
    .required("Vui lòng nhập số điện thoại")
    .length(10, "SĐT phải đủ 10 số")
    .matches(/^[0-9]+$/, "SĐT không hợp lệ"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  address: Yup.string().required("Vui lòng nhập địa chỉ"),
  paymentMethod: Yup.string().required("Vui lòng chọn hình thức thanh toán"),
  cardNumber: Yup.string()
    .required("Vui lòng nhập số thẻ")
    .matches(/^\d{16}$/, "Số thẻ không hợp lệ (16 chữ số)"),
  expirationDate: Yup.string()
    .required("Vui lòng nhập ngày hết hạn")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Ngày hết hạn không hợp lệ (MM/YY)"),
  cvv: Yup.string()
    .required("Vui lòng nhập mã CVV")
    .matches(/^\d{3}$/, "Mã CVV không hợp lệ (3 chữ số)"),
});

function LeftComponent() {
  return (
    <div className="left-component">
      <h2>Thông tin thanh toán</h2>
      <Formik
        initialValues={{
          fullName: "",
          phoneNumber: "",
          address: "",
          email: "",
          additionalInfo: "",
          paymentMethod: "",
          cardNumber: "",
          expirationDate: "",
          cvv: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Handle form submission logic here
          // You can access form values via the 'values' parameter
          // Set 'setSubmitting' to true when submitting and false after submission
          console.log(values);
          setSubmitting(false);
        }}
      >
        <Form>
          <div className="input-group">
            <label>Họ tên:</label>
            <Field
              type="text"
              name="fullName"
              placeholder="Nhập họ tên của bạn"
            />
            <ErrorMessage name="fullName" component="div" className="error" />
          </div>
          <div className="input-group">
            <label>Số điện thoại:</label>
            <Field
              type="tel"
              name="phoneNumber"
              placeholder="Nhập số điện thoại của bạn"
            />
            <ErrorMessage
              name="phoneNumber"
              component="div"
              className="error"
            />
          </div>
          <div className="input-group">
            <label>Địa chỉ:</label>
            <Field
              type="text"
              name="address"
              placeholder="Nhập địa chỉ của bạn"
            />
            <ErrorMessage name="address" component="div" className="error" />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <Field type="email" name="email" placeholder="Nhập email của bạn" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="input-group">
            <label>Thông tin bổ sung:</label>
            <Field
              as="textarea"
              name="additionalInfo"
              placeholder="Nhập thông tin bổ sung (nếu có)"
            />
            <ErrorMessage
              name="additionalInfo"
              component="div"
              className="error"
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
}

function RightComponent() {
  const [paymentMethod, setPaymentMethod] = useState(""); // Lựa chọn phương thức thanh toán

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="right-component">
      <h2
        style={{
          fontWeight: "bold",
          color: "red",
        }}
      >
        Đơn hàng của bạn
      </h2>
      <Formik
        initialValues={{
          fullName: "",
          phoneNumber: "",
          address: "",
          email: "",
          additionalInfo: "",
          paymentMethod: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Handle form submission logic here
          // You can access form values via the 'values' parameter
          // Set 'setSubmitting' to true when submitting and false after submission
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <table></table>
            <div className="payment-options">
              <h3 style={{ fontWeight: "bold" }}>Phương thức thanh toán</h3>
              <label>
                <input
                  type="radio"
                  value="chuyenkhoan"
                  checked={paymentMethod === "chuyenkhoan"}
                  onChange={handlePaymentMethodChange}
                />
                Chuyển khoản
              </label>
              <label>
                <input
                  type="radio"
                  value="tienmat"
                  checked={paymentMethod === "tienmat"}
                  onChange={handlePaymentMethodChange}
                />
                Trả tiền mặt khi nhận hàng
              </label>

              {/* thông báo xác nhận */}
              {paymentMethod === "chuyenkhoan" && (
                <div className="payment-confirm">
                  <p>
                    Vui lòng chuyển khoản vào tài khoản sau để hoàn tất đơn hàng
                  </p>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="order-button"
              disabled={!isValid || isSubmitting}
            >
              Đặt hàng
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

function HeaderComponent() {
  return (
    // Thang thanh toán
    <div className="header-component">
      <h1>Thanh toán</h1>
      <div className="breadcrumb">
        <span>Thanh toán</span>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <>
      <ComHeader />
      <HeaderComponent />
      <div
        className="payment-page"
        // chiều rộng của trang thanh toán là 80% chiều rộng của trang
        style={{ width: "80%", margin: "auto" }}
      >
        <LeftComponent />
        <RightComponent />
      </div>
    </>
  );
}
