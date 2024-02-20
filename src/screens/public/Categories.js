import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header/index'

const Categories = ({ navigation }) => {
    return (
        <View>
            <Header title="Danh mục sản phẩm" navigation={navigation} />
        </View>
    )
}

export default Categories