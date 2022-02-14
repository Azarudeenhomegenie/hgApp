import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit'

import { client } from '../../api/client';

export const GET_CITY            = '/hg/app/GET_CITY';
export const GET_POPULAR_SERVICE = '/hg/app/GET_POPULAR_SERVICE';
export const GET_OFFERS          = '/hg/app/GET_OFFERS';
export const GET_SPECIALIZED     = '/hg/app/GET_SPECIALIZED';

export const getCity = createAsyncThunk(GET_CITY, async () => {
    const data = await client.get('webapi/getCity');
    return data;
})

export const getPopularServices = createAsyncThunk(GET_POPULAR_SERVICE, async (city, lang) => {
    const data = await client.get(`webapi/getServiceGroup?city=${city}&language=${lang}`)
    return data
})

export const getOffers = createAsyncThunk(GET_OFFERS, async (city, lang) => {
    const data = await client.get(`Webapi/offers?city=${city}&language=${lang}`)
    return data
})

export const getSpecializedServices = createAsyncThunk(GET_SPECIALIZED, async () => {
    const data = await client.get('category/getSpecializedServices')
    return data
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
      status: 'idle',
      error: null,
      cities: null,
      offers: null,
      popularServices: null,
      specializedServices: null,
    },
    reducers: {},
    extraReducers: {
        [getCity.fulfilled]: (state, action) => {
            const data = action.payload
            state.cities = data.map(city => ({label: city, value: city }));
        },
        [getPopularServices.fulfilled]: (state, action) => {

            const data = action.payload;
            const flatData = data.flatMap(category => category.categoryIds);
            const popularServices = data
                .filter(group => group.isPopular)
                .map(group => ({
                    _id: group._id,
                    imageURL: group.imageURL.thumbnail,
                    name: group.name
                }));
            state.popularServices = popularServices;
        },
        [getOffers.fulfilled]: (state, action) => {
            state.offers = action.payload
        },
        [getSpecializedServices.fulfilled]: (state, action) => {
            const data = action.payload;

            // let specialisedServices = data.filter(service => service.name === 'Specialised Services');
            // let data1 = [];
            // let data2 = [];
            // let data3 = [];
            // let allArray = [];
            // specialisedServices.forEach(allData => {
            //     data1.push(allData.subcategories[0])
            //     data2.push(allData.subcategories[1])
            //     for (obj of allData.subcategories.slice(2)) {
            //         data3.push({
            //             _id: obj._id,
            //             subCategoryName: obj.subCategoryName,
            //             image: obj.image
            //         })
            //     }
            // })
            state.specializedServices = data[0].subcategories;
        },
    },
})
  
export default userSlice.reducer
