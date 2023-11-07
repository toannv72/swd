
import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ShoppingCart from "../../Authenticator/ShoppingCart/ShoppingCart";
import { routs } from "../../../constants/ROUT";
import { ComLink } from "../ComLink/ComLink";
import { Affix, FloatButton, } from "antd";
import images from "../../../img";
import ComInput from "../ComInput/ComInput";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { textApp } from "../../../TextContent/textApp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStorage } from "../../../hooks/useLocalStorage";

const navigation = {
  pages: [
    { name: textApp.Header.home, href: "/",  },
    { name: "Sản phẩm", href: "/product/sold",  },
    { name: textApp.Header.required, href: "/required", },
  ],

};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ComHeader({ dataCart, updateCart }) {
  const [open, setOpen] = useState(false);
  const [shoppingCart, setShoppingCart] = useState(false);
  const [sttLogin, setSttLogin] = useState(JSON.parse(localStorage.getItem('user')) || []);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [token, setToken] = useStorage("user", {});

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const updateShoppingCartStatus = (newStatus) => {
    setShoppingCart(newStatus);
    updateCart && updateCart(newStatus)

  };

  const CreateProductMessenger = yup.object({
    search: yup.string(),
  })
  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    defaultValues: {
      search: ''
    },
  })

  useEffect(() => {
    setSttLogin(JSON.parse(localStorage.getItem('user')) || [])

    if (location.pathname === '/login' && token?.accessToken) {
      navigate('/')
    }
  }, []);;
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')))
  }, [dataCart, shoppingCart]);

  const { handleSubmit, register } = methods
  const onSubmit = (data) => {
    if (data.search.trim() !== '') {
      navigate(`/search/${data.search.trim()}`)
    }
  }

  return (
    <>
      <ShoppingCart
        show={shoppingCart}
        updateShoppingCart={updateShoppingCartStatus}

      ></ShoppingCart>
      <Affix offsetTop={0} >
        <div className="bg-white ">
          {/* Mobile menu */}
          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                    <div className="flex px-4 pb-2 pt-5">
                      <button
                        type="button"
                        className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                        onClick={() => setOpen(false)}
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    <div className=" border-gray-200 px-4 py-6">
                      {navigation.pages.map((page) => (
                        <div key={page.name} className="flow-root ">
                          <Link
                            to={page.href}
                            className=" block p-2 font-medium text-gray-900"
                          >
                           <div className="flex gap-2">
                              {page.icon}
                              {page.name}
                           </div>
                          </Link>
                        </div>
                      ))}
                    </div>

                    {!sttLogin && <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                      <div className="flow-root">
                        <ComLink
                          to={routs["/login"].link}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          {routs["/login"].name}
                        </ComLink>
                      </div>
                      <div className="flow-root">
                        <ComLink
                          to={routs["/reissue"].link}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          {routs["/reissue"].name}
                        </ComLink>
                      </div>
                    </div>}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <header className="relative bg-white z-10">
            <nav
              aria-label="Top"
              className="mx-auto max-w-full px-4 sm:px-6 lg:px-8"
            >
              <div className="border-b border-gray-200">
                <div className="flex h-16 items-center">
                  <button
                    type="button"
                    className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                    onClick={() => setOpen(true)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Logo */}
                  <div className="ml-4 flex lg:ml-0">
                    <ComLink to={routs["/"].link}>
                      <span className="sr-only">Your Company</span>
                      <img
                        className="h-16 w-auto "
                        src={images.logo}
                        alt=""
                      />
                    </ComLink>
                  </div>

                  {/* Flyout menus */}
                  <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                    <div className="flex h-full space-x-8">


                      {navigation.pages.map((page) => (
                        <Link
                          key={page.name}
                          to={page.href}
                          className="flex items-center text-base font-medium text-gray-700 hover:text-gray-800"
                        >
                          <div className="flex gap-2 justify-center">
                              {page.icon}
                              <p>{page.name}</p>
                           </div>
                        </Link>
                      ))}
                    </div>
                  </Popover.Group>

                  <div className="ml-auto flex items-center">

                    {/* Search */}
                    <div className="flex lg:ml-6">
                      <FormProvider {...methods} >
                        <form onSubmit={handleSubmit(onSubmit)} className="lg:w-96">
                          <ComInput
                            placeholder={textApp.Header.search}
                            search

                            type="text"

                            {...register("search")}
                          />
                        </form>
                      </FormProvider>
                    </div>

                    {/* Cart */}
                    <div className="ml-4 flow-root lg:ml-6">
                      <button
                        onClick={() => {
                          setShoppingCart(true);
                        }}
                        className="group -m-2 flex items-center p-2"
                      >
                        <ShoppingBagIcon
                          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                          {dataCart?.length || cart.length}
                        </span>
                        <span className="sr-only">items in cart, view bag</span>
                      </button>
                    </div>
                    {/* login */}
                    {!sttLogin?._doc && <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 lg:ml-6">
                      <ComLink
                        to={routs["/login"].link}
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        {routs["/login"].name}
                      </ComLink>
                      <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                      <ComLink
                        to={routs["/reissue"].link}
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        {routs["/reissue"].name}
                      </ComLink>
                    </div>}

                    {sttLogin?._doc && <div>
                      <Menu as="div" className="relative ml-3 z-50">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img on className="h-8 w-8 rounded-full" src={images.avatar} alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                            {sttLogin?._doc?.role === 'staff' && <Menu.Item >
                              {({ active }) => (
                                <ComLink
                                  to={routs['/createProduct'].link}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {routs['/createProduct'].name2}
                                </ComLink>
                              )}
                            </Menu.Item>}
                            <Menu.Item >
                              {({ active }) => (
                                <ComLink
                                  to={routs['/order'].link}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {routs['/order'].name}
                                </ComLink>

                              )}
                            </Menu.Item>
                            <Menu.Item >
                              {({ active }) => (
                                <ComLink
                                  to={routs['/logout'].link}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {routs['/logout'].name}
                                </ComLink>
                              )}
                            </Menu.Item>

                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                    }
                  </div>
                </div>
              </div>
            </nav>
          </header>
        </div>
      </Affix>
      <FloatButton.BackTop />
    </>
  );
}
