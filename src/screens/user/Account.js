import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Header from '../../components/Header/index'
import Button from '../../components/Button/index'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../stores/userSlice'
import Toast from 'react-native-toast-message'

const Account = ({ navigation }) => {

    const { user, isLoggedIn } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleToLogin = () => {

        navigation.navigate("Login")
    }

    const handleLogout = () => {

        dispatch(logout())
        Toast.show({
            type: 'success',
            text1: 'Đăng xuất thành công!'
        })
        setTimeout(() => {
            navigation.navigate('TabBottom')
        }, 500)
    }

    return (
        <View style={tw`flex-1`}>
            <Header title="Thông tin tài khoản" />
            {
                isLoggedIn
                    ?
                    <View style={tw`flex-1 justify-center items-center`}>
                        <Text style={tw`my-[20px]`}>
                            Xin chào {user?.fullName}
                        </Text>
                        <Button title="Đăng xuất" type="line" onPress={handleLogout} />
                    </View>
                    :
                    <View style={tw`flex-1 justify-center items-center`}>
                        <Text style={tw`my-[20px]`}>Vui lòng đăng nhập để xem thông tin tài khoản</Text>
                        <Button title="Đăng nhập" type="line" onPress={handleToLogin} />
                    </View>
            }
        </View>
    )
}

export default Account