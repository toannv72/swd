import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ComFooter from "../../Components/ComFooter/ComFooter";
import ComHeader from "../../Components/ComHeader/ComHeader";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { textApp } from "../../../TextContent/textApp";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import ComInput from "../../Components/ComInput/ComInput";
import ComTextArea from "../../Components/ComInput/ComTextArea";
import ComButton from "../../Components/ComButton/ComButton";
export default function Payment() {
    const [disabled, setDisabled] = useState(false);

    const loginMessenger = yup.object({
        name: yup.string().required(textApp.Payment.information.message.name),
        address: yup.string().required(textApp.Payment.information.message.address),
        phone: yup.string().required(textApp.Payment.information.message.phone),
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
    const { handleSubmit1, register1, setFocus1, watch1, setValue1 } = promotion
    const onSubmit = (data) => {
        console.log(data);
        setDisabled(true)

    }
    return (
        <>
            <ComHeader />
            <div className="flex justify-center flex-col py-5 text-center">
                <FontAwesomeIcon icon={faCreditCard} size="7x" style={{ color: "#6e7887", }} />
                <h1 className="text-4xl">{textApp.Payment.title}</h1>
                <p className="text-2xl">{textApp.Payment.message}</p>
            </div>

            <div className="flex flex-col md:flex-row">

                <div className="flex flex-col p-4 md:w-1/3 order-1 md:order-2 mb-4 md:mb-0">
                    <FormProvider {...promotion} >
                        <form onSubmit={(onSubmit)}>
                            <h4 className="flex justify-between items-center mb-3 text-gray-600">
                                <span>Giỏ hàng</span>
                                <span className="bg-blue-500 text-white rounded-full py-1 px-2">2</span>
                            </h4>
                            <ul className="list-group mb-3">
                                <li className="list-group-item flex justify-between items-center">
                                    <div>
                                        <h6 className="my-0">Apple Ipad 4 Wifi 16GB</h6>
                                        <small className="text-gray-500">11800000.00 x 2</small>
                                    </div>
                                    <span className="text-gray-500">23600000</span>
                                </li>
                                <li className="list-group-item flex justify-between items-center">
                                    <div>
                                        <h6 className="my-0">Apple iPhone 5 16GB White</h6>
                                        <small className="text-gray-500">14990000.00 x 8</small>
                                    </div>
                                    <span className="text-gray-500">119920000</span>
                                </li>
                                <li className="list-group-item flex justify-between items-center">
                                    <span>Tổng thành tiền</span>
                                    <strong>143520000</strong>
                                </li>
                            </ul>
                            <div className="input-group mb-4">
                                <ComInput
                                    placeholder={textApp.Payment.information.placeholder.promotion}
                                    label={textApp.Payment.information.label.promotion}

                                    {...register("promotion")}
                                    required
                                />
                                <div className="input-group-append">
                                    <button className="bg-blue-500 mt-2 text-white py-2 px-4 ">Xác nhận</button>
                                </div>
                            </div>
                        </form>
                    </FormProvider>
                </div>

                <div className="flex flex-col p-4 md:w-2/3 md:order-1 order-2 md:pl-8">
                    <FormProvider {...methods} >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h4 className="mb-6 text-gray-600 text-lg">{textApp.Payment.information.title}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                                        {...register("address")}
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
                            <h4 className="mb-3 text-gray-600 text-lg">Hình thức thanh toán</h4>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <input id="httt-1" name="httt_ma" type="radio" className="form-radio" required value="1" />
                                    <label htmlFor="httt-1" className="ml-2">Tiền mặt</label>
                                </div>
                                <div className="flex items-center">
                                    <input id="httt-2" name="httt_ma" type="radio" className="form-radio" required value="2" />
                                    <label htmlFor="httt-2" className="ml-2">Chuyển khoản</label>
                                </div>
                                <div className="flex items-center">
                                    <input id="httt-3" name="httt_ma" type="radio" className="form-radio" required value="3" />
                                    <label htmlFor="httt-3" className="ml-2">Ship COD</label>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <ComButton
                                disabled={disabled}
                                htmlType="submit"
                                type="primary"
                            >
                                {/* {textApp.Login.pageTitle} */}
                                Đặt hàng
                            </ComButton>
                            <button className="bg-blue-500 text-white py-3 px-6 rounded-lg w-full md:w-auto" type="submit"
                                name="btnDatHang">Đặt hàng</button>
                        </form>
                    </FormProvider>
                </div>
            </div>


            <ComFooter />
        </>
    );
}