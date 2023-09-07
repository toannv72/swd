
import { FormProvider, useForm } from "react-hook-form";

import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import ComInput from "../../Components/ComInput/ComInput";
import ComButton from "../../Components/ComButton/ComButton";
import { TextLogin } from "../../../TextContent/TextLogin";




export default function Login() {

    const loginMessenger = yup.object({
        code: yup.string().required(TextLogin.Login.message.username).min(5, "Username must be at least 5 characters"),
        username: yup.string().required(TextLogin.Login.message.username),
        password: yup.string().required(TextLogin.Login.message.password),
        email: yup.string().email('định dạng sai').required('Login ID is required email'),
    })
    const LoginRequestDefault = {
        code: "",
        password: "",
        username: "",
        email: "",

    };
    const methods = useForm({
        resolver: yupResolver(loginMessenger),
        defaultValues: {
            code: "",
            username: "",
            password: "",
            email: "",
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
                            />
                            <ComButton
                                htmlType="submit"
                                type="primary"
                            >
                                login
                            </ComButton>
                            <ComButton
                                htmlType="submit"
                                type="primary"
                                className="bg-black hover:bg-white"
                            >
                                cancel
                            </ComButton>
                        </form>
                    </FormProvider>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Start a 14 day free trial
                        </a>
                    </p>
                </div>
            </div>

        </>
    )

}

