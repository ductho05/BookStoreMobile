import Home from "../../screens/public/Home"
import Suggest from "../../screens/public/Suggest"
import Account from "../../screens/user/Account"
import Cart from "../../screens/user/Cart"
import Notification from "../../screens/user/Notification"


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
        badge: 'notification'
    }
]

export default TabBottomRouters
