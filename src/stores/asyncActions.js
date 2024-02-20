import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiGetProductCategory, apiGetProductHots, apiGetSlideList } from "../apis/data"
import { listPathCategory, listPathHots, listPathLearn } from "../constants/index"

export const fetchInitialData = createAsyncThunk(
    'data/initialData',
    async () => {

        const productsHots = await apiGetProductHots(listPathHots[0].path)
        const categoryBooks = await apiGetProductCategory(listPathCategory[0].path)
        const learnBooks = await apiGetProductCategory(listPathLearn[0].path)
        const slideList = await apiGetSlideList()

        return {
            productsHots: [{
                title: listPathHots[0].title,
                products: productsHots.data.data
            }],
            categoryBooks: [{
                title: listPathCategory[0].title,
                products: categoryBooks.data.data
            }],
            learnBooks: [{
                title: listPathLearn[0].title,
                products: learnBooks.data.data
            }],
            slideList: slideList.data.data
        }
    }
)