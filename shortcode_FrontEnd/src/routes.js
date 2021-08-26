/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Cart from "views/cart";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import Login from "./views/examples/Login";
import Forget from "./views/examples/Forget";
import Register from "./views/examples/Register";
import Edit from "./views/edit";
import InVoice from "./views/invoice";
import ShowInvoice from "./views/showInvoice";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
    {
    path: "/InVoice",
    name: "InVoice",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-paper",
    component: InVoice,
    layout: "/admin",
  },  {
    path: "/invoiceShow",
    name: "show",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-paper",
    component: ShowInvoice,
    layout: "/admin",
  },
     {
    path: "/item/edit",
    name: "edit",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-pencil",
    component: Edit,
    layout: "/admin",
  },
     {
    path: "/Cart",
    name: "Cart",
    rtlName: "لوحة القيادة",
    icon: "tim-icons  icon-cart",
    component: Cart,
    layout: "/admin",
  },


  {
        path: "/login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        component: Login,
        layout: "/auth",
    },
    {
        path: "/Forget",
        name: "Forget",
        icon: "ni ni-key-25 text-info",
        component: Forget,
        layout: "/auth",
    },
    {
        path: "/register",
        name: "Register",
        icon: "ni ni-circle-08 text-pink",
        component: Register,
        layout: "/auth",
    },
];
export default routes;
