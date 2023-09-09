
import { FormProvider, useForm } from "react-hook-form";

import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import ComInput from "../../Components/ComInput/ComInput";
import ComButton from "../../Components/ComButton/ComButton";
import { textLogin } from "../../../TextContent/TextLogin";
import { ComLink } from "../../Components/ComLink/ComLink";
import { routs } from "../../../constants/ROUT.ts";
import { useStorage } from "../../../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { fetchData } from "../../../api/api";




export default function Login() {
    const [Token, setToken] = useStorage("ACCESS_TOKEN",null);

    const [data, setData] = useState({});

    useEffect(() => {
        // Truyền headers tùy chỉnh (nếu cần) cho yêu cầu GET
        const headers = {
          "Custom-Header": "custom-value0",
          // Thêm các headers khác tùy chỉnh ở đây
        };
    
        // Sử dụng fetchData để lấy danh sách các mục từ API với headers tùy chỉnh
        fetchData("/", { /* params */ }, headers)
          .then((data) => {
            console.log(data);
            setData(data);
          })
          .catch((error) => {
            console.error("Error fetching items:", error);
          });
      }, []);
    
    const loginMessenger = yup.object({
        // code: yup.string().required(textLogin.Login.message.username).min(5, "Username must be at least 5 characters"),
        username: yup.string().required(textLogin.Login.message.username),
        password: yup.string().required(textLogin.Login.message.password),
        // email: yup.string().email('định dạng sai').required('Login ID is required email'),
    })
    const LoginRequestDefault = {
        // code: "",
        password: "",
        username: "",
        // email: "",

    };
    const methods = useForm({
        resolver: yupResolver(loginMessenger),
        defaultValues: {
            // code: "",
            username: "",
            password: "",
            // email: "",
        },
        values: LoginRequestDefault
    })
    const { handleSubmit, register, setFocus, watch, setValue } = methods
    const onSubmit = (data) => console.log(data)


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <FormProvider {...methods} >
                        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                            {/* 
                            <ComInput
                                placeholder={TextLogin.Login.label.username}
                                label={TextLogin.Login.pageTitle}
                                type="numbers"
                                search
                                maxLength={5}
                                // minLength={4}
                                {...register("code")}
                                required
                            />

                            <ComInput
                                placeholder='question'
                                label='qưe'
                                type="text"
                                // search
                                maxLength={5}
                                {...register("username")}
                                required
                            />

                            <ComInput
                                placeholder='email'
                                label='email'
                                type="emails"
                                // search
                                {...register("email")}
                                required
                            />

                            <ComInput
                                placeholder='question'
                                label='qưe'
                                type="password"
                                maxLength={16}
                                {...register("password")}
                                required
                            /> */}

                            <ComInput
                                placeholder={textLogin.Login.placeholder.username}
                                label={textLogin.Login.label.username}
                                type="text"
                                // search
                                maxLength={5}
                                {...register("username")}
                                required
                            />

                            <ComInput
                                placeholder={textLogin.Login.placeholder.password}
                                label={textLogin.Login.label.password}
                                type="password"
                                maxLength={16}
                                {...register("password")}
                                required
                            /> 
                            <ComButton
                                htmlType="submit"
                                type="primary"
                            >
                                login
                            </ComButton>

                            {/* <ComButton
                                htmlType="submit"
                                type="primary"
                                className="bg-black hover:bg-white"
                            >
                                cancel
                            </ComButton> */}
                        </form>
                    </FormProvider>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <ComLink to={routs["/reissue"].link} >
                            <>{routs["/reissue"].name}</>
                        </ComLink>
                    </p>
                </div>
            </div>

        </>
    )

}

