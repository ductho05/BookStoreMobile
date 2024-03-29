import ForgotPassword from "../../screens/auth/ForgotPassword"
import Login from "../../screens/auth/Login"
import Register from "../../screens/auth/Register"
import Categories from "../../screens/public/Categories"
import Product from "../../screens/public/Product"
import ProductDetail from "../../screens/public/ProductDetail"
import ProductInfo from "../../screens/public/ProductInfo"
import SearchProduct from "../../screens/public/SearchProduct"
import TabBottom from "../routerRenders/TabBottom"
import Favorite from '../../screens/user/Favorite';
import Voucher from '../../screens/user/Voucher';
import Language from '../../screens/public/Language';
import MyOrder from '../../screens/user/MyOrder';
import Support from '../../screens/public/Support';
import Contact from '../../screens/public/Support/screen/Contact';
import DeliveryMethod from '../../screens/public/Support/screen/DeliveryMethod';
import Introduce from '../../screens/public/Support/screen/Introduce';
import PaymentMethod from '../../screens/public/Support/screen/PaymentMethod';
import PrivacyPolicy from '../../screens/public/Support/screen/PrivacyPolicy';
import TermsOfUse from '../../screens/public/Support/screen/TermsOfUse';
import DeliveryAddress from '../../screens/user/DeliveryAddress';
import AddDeliveryAddress from '../../screens/user/AddDeliveryAddress';
import TASHunting from '../../screens/user/TASHunting';
import GuessName from '../../screens/user/TASHunting/game/GuessName';

const TabAllRoutes = [
  {
    name: 'TabBottom',
    component: TabBottom,
  },
  {
    name: 'Login',
    component: Login,
  },
  {
    name: 'Register',
    component: Register,
  },
  {
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
  {
    name: 'SearchProduct',
    component: SearchProduct,
  },
  {
    name: 'Categories',
    component: Categories,
  },
  {
    name: 'Product',
    component: Product,
  },
  {
    name: 'Favorite',
    component: Favorite,
  },
  {
    name: 'Voucher',
    component: Voucher,
  },
  {
    name: 'Language',
    component: Language,
  },
  {
    name: 'MyOrder',
    component: MyOrder,
  },
  {
    name: 'Support',
    component: Support,
  },
  {
    name: 'Contact',
    component: Contact,
  },
  {
    name: 'DeliveryMethod',
    component: DeliveryMethod,
  },
  {
    name: 'Introduce',
    component: Introduce,
  },
  {
    name: 'PaymentMethod',
    component: PaymentMethod,
  },
  {
    name: 'PrivacyPolicy',
    component: PrivacyPolicy,
  },
  {
    name: 'TermsOfUse',
    component: TermsOfUse,
  },
  {
    name: 'DeliveryAddress',
    component: DeliveryAddress,
  },
  {
    name: 'AddDeliveryAddress',
    component: AddDeliveryAddress,
  },
  {
    name: 'TASHunting',
    component: TASHunting,
  },
  {
    name: 'GuessName',
    component: GuessName,
  },
  {
    name: 'ProductDetail',
    component: ProductDetail
},
{
    name: 'ProductInfo',
    component: ProductInfo
}
];

export default TabAllRoutes;
