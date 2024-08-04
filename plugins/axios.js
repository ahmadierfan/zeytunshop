export default function ({ $axios, redirect, store }) {
    $axios.onRequest(config => {
        store.commit('BtnLoading', true)
    })

    $axios.onError(error => {
        store.commit('BtnLoading', false)
        store.commit('isLoading', false)
    })

    $axios.onResponse(response => {
        store.commit('BtnLoading', false)
        store.commit('isLoading', false)
    })

    $axios.onRequestError(err=> {
        store.commit('BtnLoading', false)
        store.commit('isLoading', false)
    })

    $axios.onResponseError(err=> {
        store.commit('BtnLoading', false)
        store.commit('isLoading', false)
    })
}