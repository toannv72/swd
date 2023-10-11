import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ComFooter from "../../Components/ComFooter/ComFooter";
import ComHeader from "../../Components/ComHeader/ComHeader";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { textApp } from "../../../TextContent/textApp";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import ComInput from "../../Components/ComInput/ComInput";
import ComTextArea from "../../Components/ComInput/ComTextArea";
import { useLocation, useNavigate } from "react-router-dom";
import { postData } from "../../../api/api";
import { Button, notification } from "antd";
export default function Payment(props) {
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [api, contextHolder] = notification.useNotification();
    const dataProduct = location?.state?.dataProduct || null;
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || []);
    useEffect(() => {
        if (!user?._doc?.username) {
            navigate(`login`)
        }
    }, []);
    const loginMessenger = yup.object({
        name: yup.string().required(textApp.Payment.information.message.name),
        shippingAddress: yup.string().required(textApp.Payment.information.message.address),
        phone: yup.string().required(textApp.Payment.information.message.phone).min(10, "Số điện thoại phải lớn hơn 9 số!").max(11, "Số điện thoại phải nhỏ hơn 12 số!").matches(/^0\d{9,10}$/, "Số điện thoại không hợp lệ"),
        email: yup.string().email(textApp.Payment.information.message.emailError).required(textApp.Payment.information.message.email),

    })
    const LoginRequestDefault = {
        // code: "",
    };
    const methods = useForm({
        resolver: yupResolver(loginMessenger),
        defaultValues: {
            // code: "",
        },
        values: LoginRequestDefault
    })
    const promotion = useForm({

    })
    const { handleSubmit, register, setFocus, watch, setValue } = methods
    const onSubmit = (data) => {

        setDisabled(true)
        const ProductPost = dataProduct.map((e, index) => {
            return { ...e, product: e._id, price: e.reducedPrice, quantity: e?.data };
        })
        const dataPost = { ...data, shippingAddress: data.shippingAddress, description: data.description, email: data.email, products: ProductPost, totalAmount: totalAmount }
        // console.log(dataPost);
        postData('/order/user', dataPost)
            .then((data) => {
                navigate(`bill/${data._id}`)
                setDisabled(false)
            })
            .catch((error) => {
                console.log(error.response.data.error);
                api["error"]({
                    message: textApp.Payment.error,
                    description: error.response.data.error
                });
                setDisabled(false)
            })
    }

    function formatCurrency(number) {
        // Sử dụng hàm toLocaleString() để định dạng số thành chuỗi với ngăn cách hàng nghìn và mặc định là USD.
        return number
            .toLocaleString('en-US', {
                style: 'currency',
                currency: 'VND',
            });
    }
    const totalAmount = dataProduct?.reduce((total, data) => {
        const itemTotal = data.reducedPrice * data?.data;
        return total + itemTotal;
    }, 0) || 0;
    return (
        <>
            {contextHolder}
            <ComHeader />
            <div className="flex justify-center flex-col py-5 text-center">
                <FontAwesomeIcon icon={faCreditCard} size="7x" style={{ color: "#6e7887", }} />
                <h1 className="text-4xl">{textApp.Payment.title}</h1>
                <p className="text-2xl">{textApp.Payment.message}</p>
            </div>

            <div className="flex flex-col md:flex-row">

                <div className="flex flex-col p-4 md:w-1/3 order-1 md:order-2 mb-4 md:mb-0">
                    <FormProvider {...promotion} >
                        <form onSubmit={(onSubmit)} className="text-black text-lg">
                            <h4 className="flex justify-between items-center mb-3 text-gray-600">
                                <span>{textApp.Payment.quantity}</span>
                                <span className="bg-blue-500 text-white rounded-full py-1 px-2">{dataProduct?.length}</span>
                            </h4>
                            <ul className="list-group mb-3">

                                {dataProduct?.map((data, index) => (
                                    <li key={index} className="list-group-item flex justify-between items-center">
                                        <div>
                                            <h6 className="my-0">{data.name}</h6>
                                            <small className="text-gray-500">{formatCurrency(data.reducedPrice)} x {data?.data}</small>
                                        </div>
                                        <span className="text-gray-500">{formatCurrency(data.reducedPrice * data?.data)}</span>
                                    </li>
                                ))}
                                <li className="list-group-item flex justify-between items-center text-black text-xl">
                                    <span>{textApp.Payment.totalMoney}</span>
                                    <strong>{formatCurrency(totalAmount)}</strong>
                                </li>
                            </ul>
                        </form>
                    </FormProvider>
                </div>

                <div className="flex flex-col p-4 md:w-2/3 md:order-1 order-2 md:pl-8">
                    <FormProvider {...methods} >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h4 className="mb-6 text-black text-2xl">{textApp.Payment.information.title}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <ComInput
                                        placeholder={textApp.Payment.information.placeholder.name}
                                        label={textApp.Payment.information.label.name}

                                        {...register("name")}
                                        required
                                    />
                                </div>
                                <div>
                                    <ComInput
                                        placeholder={textApp.Payment.information.placeholder.address}
                                        label={textApp.Payment.information.label.address}
                                        {...register("shippingAddress")}
                                        required
                                    />
                                </div>
                                <div>
                                    <ComInput
                                        placeholder={textApp.Payment.information.placeholder.phone}
                                        label={textApp.Payment.information.label.phone}

                                        {...register("phone")}
                                        required
                                    />
                                </div>
                                <div>
                                    <ComInput
                                        placeholder={textApp.Payment.information.placeholder.email}
                                        label={textApp.Payment.information.label.email}
                                        {...register("email")}
                                        required
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <ComTextArea
                                        placeholder={textApp.Payment.information.placeholder.description}
                                        label={textApp.Payment.information.label.description}
                                        rows={4}
                                        defaultValue={''}
                                        maxLength={1000}
                                        {...register("description")}
                                    />
                                </div>
                            </div>
                            <h4 className="mb-3 text-gray-600 text-lg">{textApp.Payment.payments}</h4>
                            <div className="space-y-2">
                                <div className="flex items-center mb-2">
                                    <input type="radio" defaultChecked className="form-radio" required value="1" />
                                    <label className="ml-2">{textApp.Payment.cash}</label>
                                </div>
                            </div>
                            <div>
                                <Button disabled={disabled}
                                    className="bg-blue-500 h-12 text-white py-3 px-6 rounded-lg w-full "
                                    type="primary"
                                    htmlType="submit"
                                >{textApp.Payment.orderButton}</Button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>


            <ComFooter />
        </>
    );
}