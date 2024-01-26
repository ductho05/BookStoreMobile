import { View, Text, TextInput } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5'
import useDebounce from '../../hooks/useDebounce'
import { useDispatch } from 'react-redux'
import { search } from '../../stores/productSlice'
import { apiSearchProduct } from '../../apis/product'

const SearchInput = ({ isSearch }) => {

    const [keywords, setKeywords] = React.useState()
    const dispatch = useDispatch()

    const keywordDebounce = useDebounce(keywords, 300)

    const getSuggesttionProducts = async (keywords) => {

        const response = await apiSearchProduct(keywords)

        if (response.status === 200) {
            dispatch(search({
                suggestionProducts: response.data.data.products,
                keywords: keywords
            }))
        }
    }

    React.useEffect(() => {

        if (keywords) {

            getSuggesttionProducts(keywordDebounce)
        } else {

            dispatch(search({
                keywords: null,
                suggestionProducts: []
            }))
        }

    }, [keywordDebounce])

    return (
        <View style={tw`flex-row flex-1 items-center bg-white px-[10px] py-[4px] rounded-[6px] border border-[#999]`}>
            <IconFontAwesome
                name="search"
                size={18}
                color="#999"
            />
            {
                isSearch
                    ?
                    <TextInput
                        placeholder='Nhập để tìm kiếm...'
                        style={tw`text-[#333] flex-1 py-[0] ml-[10px]`}
                        autoFocus={true}
                        value={keywords}
                        onChangeText={setKeywords}
                    />
                    :
                    <Text style={tw`text-[#999] ml-[10px] py-[4px]`}>Nhập để tìm kiếm...</Text>
            }
        </View>
    )
}

export default SearchInput