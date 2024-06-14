import axios from "axios";
import { createBrowserRouter } from "react-router-dom";
import { baseUrl } from "../config/Url";
import CheckoutLayout from "../layout/Checkout";
import Dashboard from "../layout/Dashboard";
import Home from "../layout/Home";
import Main from "../layout/Main";
import Advertise from "../pages/Advertise";
import AllCategories from "../pages/AllCategories";
import Blogs from "../pages/Blogs";
import BlogsForm from "../pages/BlogsForm";
import Category from "../pages/Category";
import Contact from "../pages/Contact";
import DashboardHome from "../pages/DashboardHome";
import Deals from "../pages/Deals";
import DetailsPage from "../pages/DetailsPage";
import ManageBlogs from "../pages/ManageBlogs";
import ManageTools from "../pages/ManageTools";
import ManageUsers from "../pages/ManageUsers";
import MyTools from "../pages/MyTools";
import Search from "../pages/Search";
import SubmitATool from "../pages/SubmitATool";
import Test from "../pages/Test";
import ToolsForm from "../pages/ToolsForm";
import UpdateBlog from "../pages/UpdateBlog";
import UpdateTool from "../pages/UpdateTool";
import ManagePublication from "../pages/dashboard/ManageOrders";
import OrderDetails from "../pages/dashboard/OrderDetails";
import Checkout from "../pages/payment/Checkout";
import Payment from "../pages/payment/Payment";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/search/:value",
        element: <Search />,
      }, 
      {
        path: "/ai-tools/:category",
        element: <Category />,
      },
      {
        path: "/ai-tools/all-categories",
        element: <AllCategories />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "deals",
        element: <Deals />,
      },
      {
        path: "order/checkout",
        element: <Checkout />,
      },
      {
        path: "submit-tools",
        element: <SubmitATool />,
      },
      {
        path: "advertise",
        element: <Advertise />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      // for blogs
      {
        path: "/:title",
        element: <DetailsPage />,
        loader: ({ params }) =>
          axios.get(
            `${baseUrl}/api/v1/blogs/${params.title}`
          ),
      },
      {
        path: "/update/:title",
        element: <UpdateBlog />,
        loader: ({ params }) =>
          axios.get(
            `${baseUrl}/api/v1/blogs/${params.title}`
          ),
      },
      // for tools
      {
        path: "/tool-details/:title",
        element: <DetailsPage />,
        loader: ({ params }) =>
          axios.get(
            `${baseUrl}/api/v1/tools/${params.title}`
          ),
      },
      {
        path: "/update-tools/:title",
        element: <UpdateTool />,
        loader: ({ params }) =>
          axios.get(
            `${baseUrl}/api/v1/tools/${params.title}`
          ),
      },
    ],
  },
  {
    path: "/order",
    element: <CheckoutLayout />,
    children: [
      
      {
        path: "pay",
        element: <Payment />,
      }, 
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <DashboardHome />,
      },

      // users route
      {
        path: "submit-tools",
        element: <ToolsForm />,
      },
      
      {
        path: "my-tools",
        element: <MyTools />,
      },

      // admins route
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-tools",
        element: <ManageTools />,
      },
      {
        path: "manage-blogs",
        element: <ManageBlogs />,
      },
      {
        path: "add-tool",
        element: <ToolsForm />,
      },
      {
        path: "publish-blog",
        element: <BlogsForm />,
      },
      {
        path: "manage-publications",
        element: <ManagePublication />,
      }, 
      {
        path: "manage-order/:id",
        element: <OrderDetails />,
      }, 
    ],
  },
]);

export default router;
