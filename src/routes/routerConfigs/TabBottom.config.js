import Account from "../../screens/Account"
import Cart from "../../screens/Cart"
import Home from "../../screens/Home"
import Notification from "../../screens/Notification"
import Suggest from "../../screens/Suggest"

const TabBottomRouters = [
    {
        screen: Home,
        label: 'Trang chủ',
        tabIconLabel: 'home',
        iconName: 'home',
    },
    {
        screen: Account,
        label: 'Tài khoản',
        tabIconLabel: 'user',
        iconName: 'user',
    },
    {
        screen: Suggest,
        label: 'Gợi ý',
        tabIconLabel: 'lightbulb',
        iconName: 'lightbulb',
    },
    {
        screen: Notification,
        label: 'Thông báo',
        tabIconLabel: 'info',
        iconName: 'bell',
    },
    {
        screen: Cart,
        label: 'Giỏ hàng',
        tabIconLabel: 'cart-plus',
        iconName: 'cart-plus'
    }
]

export default TabBottomRouters
