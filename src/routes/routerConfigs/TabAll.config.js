import ForgotPassword from "../../screens/auth/ForgotPassword"
import Login from "../../screens/auth/Login"
import Register from "../../screens/auth/Register"
import Categories from "../../screens/public/Categories"
import Product from "../../screens/public/Product"
import ProductDetail from "../../screens/public/ProductDetail"
import ProductInfo from "../../screens/public/ProductInfo"
import SearchProduct from "../../screens/public/SearchProduct"
import TabBottom from "../routerRenders/TabBottom"

const TabAllRoutes = [
    {
        name: 'TabBottom',
        component: TabBottom
    },
    {
        name: 'Login',
        component: Login
    },
    {
        name: 'Register',
        component: Register
    },
    {
        name: 'ForgotPassword',
        component: ForgotPassword
    },
    {
        name: 'SearchProduct',
        component: SearchProduct
    },
    {
        name: 'Categories',
        component: Categories
    },
    {
        name: 'Product',
        component: Product
    },
    {
        name: 'ProductDetail',
        component: ProductDetail
    },
    {
        name: 'ProductInfo',
        component: ProductInfo
    }
]

export default TabAllRoutes
