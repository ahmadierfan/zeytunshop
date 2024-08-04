import Vue from 'vue'

if (process.client) {
    const Toast = require('vue-toastification').default
    require('vue-toastification/dist/index.css')

    Vue.use(Toast, {
        transition: 'Vue-Toastification__fade',
        position: "bottom-right",
        maxToasts: 20,
        newestOnTop: true,
        timeout: 2000,
        rtl: true,
        pauseOnFocusLoss: false,
        // You can add other options here
    })
}