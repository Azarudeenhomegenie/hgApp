import { BASE_URL } from "@constants/app";
import { GET_SPECIALIZED, GET_LOGIN, GET_OFFERS, GET_POPULAR_SERVICE, REGISTER_VIA_PHONE, VERIFY_OTP, GET_ERROR, GET_CITY, GET_SEARCH } from "./types"; "./types";
export const getSpecialized = () => dispatch => {
    fetch(`https://api.homegenie.com/api/category/getAllCategories`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })
        .then(response => response.json())
        .then(res => {
            let data = res.data;
            let filData = data.filter(x => x.name === 'Specialised Services');
            let data1 = [];
            let data2 = [];
            let data3 = [];
            let allArray = [];
            filData.forEach(allData => {
                data1.push(allData.subcategories[0])
                data2.push(allData.subcategories[1])
                for (obj of allData.subcategories.slice(2)) {
                    data3.push({
                        _id: obj._id,
                        subCategoryName: obj.subCategoryName,
                        image: obj.image
                    })
                }
            })
            allArray.push([data1, data2, data3])
            dispatch({
                type: GET_SPECIALIZED,
                payload: allArray
            })
        })
        .catch(e => {
            dispatch({
                type: GET_ERROR,
                payload: e
            })
        })
}

export const getSearch = () => dispatch => {
    fetch(`https://api.homegenie.com/api/customer/getCategorySubcategoryName`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })
        .then(response => response.json())
        .then(res => {
            console.log('search data', res.data)
            let data = res.data;
            dispatch({
                type: GET_SEARCH,
                payload: data
            })
        })
        .catch(e => {
            console.log('all error', e)
            dispatch({
                type: GET_ERROR,
                payload: e
            })
        })
}

export const getLogin = (data) => dispatch => {
    fetch(`${BASE_URL}customer/validatePhoneNo`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
        body: data
    })
        .then(response => response.json())
        .then(res => {
            console.log(res)
            dispatch({
                type: GET_LOGIN,
                payload: res
            })
        })
        .catch(e => {
            console.log(e)
            dispatch({
                type: GET_ERROR,
                payload: e
            })
        })
}

export const getOffers = (city, lang) => dispatch => {
    fetch(`${BASE_URL}Webapi/offers?city=${city}&language=${lang}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        }
    })
        .then(response => response.json())
        .then(res => {
            dispatch({
                type: GET_OFFERS,
                payload: res.data.data
            })
        })
        .catch(e => {
            dispatch({
                type: GET_ERROR,
                payload: e
            })
        })
}

export const getPopularService = (city, lang) => dispatch => {
    fetch(`${BASE_URL}/webapi/getServiceGroup?city=${city}&language=${lang}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        }
    })
        .then(response => response.json())
        .then(res => {

            let datas = res.data;
            let array = [];
            for (let obj of datas) {
                let category = obj.categoryIds;
                for (let obj of category) {
                    if (obj.isPopular) {
                        array.push({
                            _id: obj._id,
                            imageURL: obj.imageURL.thumbnail,
                            name: obj.name,
                        })
                    }
                }
            }
            dispatch({
                type: GET_POPULAR_SERVICE,
                payload: array
            })
        })
        .catch(e => {
            console.log(e)
            dispatch({
                type: GET_ERROR,
                payload: e
            })
        })
}

export const registerViaPhone = (data) => {
    fetch(`${BASE_URL}customer/registerViaPhone`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
        body: data
    })
        .then(response => response.json())
        .then(res => {
            console.log(res)
            dispatch({
                type: REGISTER_VIA_PHONE,
                payload: res
            })
        })
        .catch(e => {
            console.log(e)
            dispatch({
                type: GET_ERROR,
                payload: e
            })
        })
}

export const verifyOtp = (data) => {
    fetch(`${BASE_URL}customer/verifyOTP1`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
        body: data
    })
        .then(response => response.json())
        .then(res => {
            console.log(res)
            dispatch({
                type: VERIFY_OTP,
                payload: res
            })
        })
        .catch(e => {
            console.log(e)
            dispatch({
                type: GET_ERROR,
                payload: e
            })
        })
}

export const getCity = () => dispatch => {
    fetch(`${BASE_URL}webapi/getCity`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        }
    })
        .then(response => response.json())
        .then(res => {

            const data = res.data;
            let array = []
            for (let obj of data) {
                array.push({ 'label': obj, 'value': obj })
            }
            dispatch({
                type: GET_CITY,
                payload: array
            })
        })
        .catch(e => {
            dispatch({
                type: GET_ERROR,
                payload: e
            })
        })
}