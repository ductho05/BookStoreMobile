import ForgotPassword from "../../screens/auth/ForgotPassword"
import Login from "../../screens/auth/Login"
import Register from "../../screens/auth/Register"
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
    }
]

export default TabAllRoutes
