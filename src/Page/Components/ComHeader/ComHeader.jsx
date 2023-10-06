
import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Popover, Tab, Transition } from "@headlessui/react";
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
import { getData } from "../../../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Dresses", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Denim", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Significant Other", href: "#" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ComHeader({ dataCart, updateCart }) {
  const [open, setOpen] = useState(false);
  const [shoppingCart, setShoppingCart] = useState(false);
  const [sttLogin, setSttLogin] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const location = useLocation();
  const navigate = useNavigate();

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
    getData('/login')
      .then((data) => {
        setSttLogin(data.data);
        if (location.pathname === '/login' && data.data.login) {
          navigate('/')
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')))
  }, [dataCart, shoppingCart]);

  const { handleSubmit, register } = methods
  const onSubmit = (data) => {
    console.log(data);
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

                    {/* Links */}
                    <Tab.Group as="div" className="mt-2">
                      <div className="border-b border-gray-200">
                        <Tab.List className="-mb-px flex space-x-8 px-4">
                          {navigation.categories.map((category) => (
                            <Tab
                              key={category.name}
                              className={({ selected }) =>
                                classNames(
                                  selected
                                    ? "border-indigo-600 text-indigo-600"
                                    : "border-transparent text-gray-900",
                                  "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                                )
                              }
                            >
                              {category.name}
                            </Tab>
                          ))}
                        </Tab.List>
                      </div>
                      <Tab.Panels as={Fragment}>
                        {navigation.categories.map((category) => (
                          <Tab.Panel
                            key={category.name}
                            className="space-y-10 px-4 pb-8 pt-10"
                          >
                            <div className="grid grid-cols-2 gap-x-4">
                              {category.featured.map((item) => (
                                <div
                                  key={item.name}
                                  className="group relative text-sm"
                                >
                                  <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                    <img
                                      src={item.imageSrc}
                                      alt={item.imageAlt}
                                      className="object-cover object-center"
                                    />
                                  </div>
                                  <a
                                    href={item.href}
                                    className="mt-6 block font-medium text-gray-900"
                                  >
                                    <span
                                      className="absolute inset-0 z-10"
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                  </a>
                                  <p aria-hidden="true" className="mt-1">
                                    Shop now
                                  </p>
                                </div>
                              ))}
                            </div>
                            {category.sections.map((section) => (
                              <div key={section.name}>
                                <p
                                  id={`${category.id}-${section.id}-heading-mobile`}
                                  className="font-medium text-gray-900"
                                >
                                  {section.name}
                                </p>
                                <ul
                                  role="list"
                                  aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                  className="mt-6 flex flex-col space-y-6"
                                >
                                  {section.items.map((item) => (
                                    <li key={item.name} className="flow-root">
                                      <a
                                        href={item.href}
                                        className="-m-2 block p-2 text-gray-500"
                                      >
                                        {item.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </Tab.Panel>
                        ))}
                      </Tab.Panels>
                    </Tab.Group>

                    <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                      {navigation.pages.map((page) => (
                        <div key={page.name} className="flow-root">
                          <a
                            href={page.href}
                            className="-m-2 block p-2 font-medium text-gray-900"
                          >
                            {page.name}
                          </a>
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
                      {navigation.categories.map((category) => (
                        <Popover key={category.name} className="flex">
                          {({ open }) => (
                            <>
                              <div className="relative flex">
                                <Popover.Button
                                  className={classNames(
                                    open
                                      ? "border-indigo-600 text-indigo-600"
                                      : "border-transparent text-gray-700 hover:text-gray-800",
                                    "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                                  )}
                                >
                                  {category.name}
                                </Popover.Button>
                              </div>

                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                  {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                  <div
                                    className="absolute inset-0 top-1/2 bg-white shadow"
                                    aria-hidden="true"
                                  />

                                  <div className="relative bg-white">
                                    <div className="mx-auto max-w-7xl px-8">
                                      <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                        <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                          {category.featured.map((item) => (
                                            <div
                                              key={item.name}
                                              className="group relative text-base sm:text-sm"
                                            >
                                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                <img
                                                  src={item.imageSrc}
                                                  alt={item.imageAlt}
                                                  className="object-cover object-center"
                                                />
                                              </div>
                                              <a
                                                href={item.href}
                                                className="mt-6 block font-medium text-gray-900"
                                              >
                                                <span
                                                  className="absolute inset-0 z-10"
                                                  aria-hidden="true"
                                                />
                                                {item.name}
                                              </a>
                                              <p
                                                aria-hidden="true"
                                                className="mt-1"
                                              >
                                                Shop now
                                              </p>
                                            </div>
                                          ))}
                                        </div>
                                        <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                          {category.sections.map((section) => (
                                            <div key={section.name}>
                                              <p
                                                id={`${section.name}-heading`}
                                                className="font-medium text-gray-900"
                                              >
                                                {section.name}
                                              </p>
                                              <ul
                                                role="list"
                                                aria-labelledby={`${section.name}-heading`}
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {section.items.map((item) => (
                                                  <li
                                                    key={item.name}
                                                    className="flex"
                                                  >
                                                    <a
                                                      href={item.href}
                                                      className="hover:text-gray-800"
                                                    >
                                                      {item.name}
                                                    </a>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
                      ))}

                      {navigation.pages.map((page) => (
                        <a
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          {page.name}
                        </a>
                      ))}
                    </div>
                  </Popover.Group>

                  <div className="ml-auto flex items-center">

                    {/* Search */}
                    <div className="flex lg:ml-6">
                      <FormProvider {...methods} >
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                    {!sttLogin?.login && <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 lg:ml-6">
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

                    {sttLogin?.login && <div>
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

                            {sttLogin?.user?.admin && <Menu.Item >
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
                                  to={routs['/oder'].link}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {routs['/oder'].name}
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
