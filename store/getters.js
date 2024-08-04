import _sumBy from "lodash/sumBy";

export default {
    cardNumberAnimate: state => {
        return state.cardNumberAnimate
    },
    allSales: state => {
        return state.sales
    },

    allOrdered: state => {
        return state.ordered
    },

    BtnLoading: state => {
        return state.BtnLoading
    },

    isLoading: state => {
        return state.isLoading
    },

    basketActive: state => {
        return state.basketActive
    },

    Products: state => {
        return state.Products
    },

    Product: state => {
        return state.Product
    },

    Ordered: state => {
        return state.ordered
    },

    OrdersAndSalesNumber: state => {
        return (state.sales.length + state.ordered.length)
    },

    OrdersAndSales: state => {
        return (state.sales.concat(state.ordered))
    },

    sumOfOrdersAndSales: state => {
        return state.sumOfOrdersAndSales
    },

    invoicesales: state => {
        return state.invoicesales
    },
}