import ForgotPassword from "../../screens/auth/ForgotPassword"
import Login from "../../screens/auth/Login"
import Register from "../../screens/auth/Register"
import TabBottom from "../routerRenders/TabBottom"
import SearchProduct from "../../screens/SearchProduct"

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
    }
]

export default TabAllRoutes
