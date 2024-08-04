import _sumBy from "lodash/sumBy";

export default {
    setCardNumberAnimate(state, value) {
        state.cardNumberAnimate = value
    },

    onMobilePanel(state, value) {
        state.mobilePanel = value
    },

    saleEmptier(state) {
        state.sales = []
    },

    addOrder(state, value) {
        state.ordered.push(value)
    },

    orderEmptier(state) {
        state.ordered = []
    },

    setSales(state, value) {
        state.sales = value
    },

    setInvoiceSales(state, value) {
        state.invoicesales = value
    },

    BtnLoading(state, value) {
        state.BtnLoading = value
    },

    isLoading(state, value) {
        state.isLoading = value
        state.mobilePanel = false
    },

    basketActive(state) {
        if (state.basketActive)
            state.basketActive = false
        else
            state.basketActive = true
    },

    Products(state, value) {
        state.Products = value
    },

    Product(state, value) {
        state.Product = value
    },

    sumOfOrdersAndSales(state) {
        if (state.sales.length === 0 && state.sales.length === 0)
            state.sumOfOrdersAndSales = 0

        else if (state.sales.length > 0 && state.ordered.length === 0)
            state.sumOfOrdersAndSales = _sumBy(state.sales, function (o) { return o.price * o.count })

        else if (state.sales.length === 0 && state.ordered.length > 0)
            state.sumOfOrdersAndSales = _sumBy(state.ordered, function (o) { return o.price * o.count })

        else if (state.sales.length > 0 && state.ordered.length > 0)
            state.sumOfOrdersAndSales = _sumBy(state.sales, function (o) { return o.price * o.count }) + _sumBy(state.ordered, function (o) { return o.price * o.count })
    },
}