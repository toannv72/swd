import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
  PresentationChartBarIcon,

  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, } from '@heroicons/react/20/solid'
import { ComLink } from '../ComLink/ComLink'
import { Link, useNavigate } from 'react-router-dom'
import { getData } from '../../../api/api'
import { Affix } from 'antd'
import { useCookies } from 'react-cookie'
import images from '../../../img'
import { routs } from '../../../constants/ROUT'
import { textApp } from '../../../TextContent/textApp'
import { AccordionBody, AccordionHeader, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react'
import React from "react";
import {
  Card,
  List,
  ListItemSuffix,
  Chip,
  Accordion,
} from "@material-tailwind/react";

import { ChevronRightIcon } from "@heroicons/react/24/outline";

const products = [
  { name: routs['/createProduct'].name, href: routs['/createProduct'].link, },
  { name: routs['/tableProduct'].name, href: routs['/tableProduct'].link, },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ComDefaultSidebar() {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const navigate = useNavigate();
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const handleDeleteCookie = () => {
    removeCookie('accessToken');
  };
  useEffect(() => {
    getData('/admin')
      .then((data) => {
        if (!data.data.admin) {
          navigate('/')
        }
        if (data.data.admin === 'login') {
          navigate('/login')
        }
      })
      .catch((error) => {
        console.log(error);
        navigate('/login')
      })

  }, [navigate]);
  return (
    <Affix offsetTop={0}>
      <Card className="h-[calc(100vh)] w-full max-w-[20rem] min-w-[18rem] p-4 shadow-xl shadow-blue-gray-900/5 hidden  xl:block lg:block border-r-2  border-r-slate-100">
        <div className=" ml-8">
          <Typography color="blue-gray">
            <img
              className="h-16 w-auto"
              src={images.logo}
              alt=""
            />
          </Typography>
        </div>
        <List>
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Dashboard
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Analytics
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Reporting
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Projects
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          <Accordion
            open={open === 2}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 2}>
              <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  E-Commerce
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Orders
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Products
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          <hr className="my-2 border-blue-gray-50" />
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Inbox
            <ListItemSuffix>
              <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    </Affix>
  )
}