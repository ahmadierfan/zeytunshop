<template>
    <section class="mt-3 py-5 px=5">
        <h1 class="is-size-3 has-text-centered my-5 box">سفارشات شما</h1>
        <form ref="payForm" action="https://rt.sizpay.ir/Route/Payment" method="POST" style="display:none">
            <input type="text" name="MerchantID" value="500118991200026">
            <input type="text" name="TerminalID" value="18000475">
            <input type="text" id="paytoken" name="Token">
        </form>
        <div class="columns is-flex is-justify-content-center mb-6">
            <div class="column is-8" style="overflow-x: scroll;">
                <table class="table is-striped is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th class="has-text-centered">مبلغ</th>
                            <th class="has-text-centered">وضعیت فروش</th>
                            <th class="has-text-centered">نحوه تحویل</th>
                            <th class="has-text-centered">تاریخ</th>
                            <th class="has-text-centered">وضعیت فاکتور</th>
                            <th class="has-text-centered">مشاهده</th>
                            <th class="has-text-centered">حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in orders">
                            <td class="has-text-centered">
                                {{ threecomma(item.price) }}
                            </td>
                            <td class="has-text-centered">
                                {{ item.salestatus }}
                            </td>
                            <td class="has-text-centered">
                                <p v-if="item.deliverytype">{{ item.deliverytype }}</p>
                                <p v-if="!item.deliverytype">-</p>
                            </td>
                            <td class="has-text-centered">
                                <p v-if="item.created_at">{{ item.created_at.substr(0, 10) }}</p>
                                <p v-if="!item.created_at">-</p>
                            </td>
                            <td class="has-text-centered">
                                <p v-if="item.invoicestatus">{{ item.invoicestatus }}</p>
                                -
                                <button v-if="!item.invoicestatus && item.fk_invoice" class="button is-success is-light"
                                    @click="payOrder(item)">
                                    نهایی نمودن سفارش
                                </button>
                            </td>
                            <td class="has-text-centered">
                                <button class="button is-info is-light" @click="getOrderDetail(item)">
                                    مشاهده سفارش
                                </button>
                            </td>
                            <td class="has-text-centered">
                                <p class="button is-danger is-light" v-if="!item.invoicestatus && item.fk_invoice"
                                    @click="deleteConfirm(item)">
                                    حذف</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="modal" :class="{ 'is-active': isOrderModalActive }">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">اطلاعات سفارش</p>
                        <button class="delete" @click="isOrderModalActive = false" aria-label="close"></button>

                        <nuxt-link class="has-background-warning is-flex is-align-items-center px-3 py-2 mx-2 "
                            to="/store/card">
                            بازگشت به سبد خريد
                        </nuxt-link>
                    </header>
                    <section class="modal-card-body">
                        <table class="table is-striped is-hoverable is-fullwidth">
                            <thead>
                                <tr>
                                    <th class="has-text-centered">نام محصول</th>
                                    <th class="has-text-centered">قیمت محصول</th>
                                    <th class="has-text-centered">تعداد</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in orderdetail">
                                    <td class="has-text-centered">
                                        {{ item.product }}
                                    </td>
                                    <td class="has-text-centered">
                                        {{ threecomma(item.price) }}
                                    </td>
                                    <td class="has-text-centered">
                                        {{ item.count }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    auth: true,
    head() {
        return {
            title: "سفارشات",
        };
    },
    data() {
        return {
            isOrderModalActive: false,
            order: {},
            orders: [],
            orderdetail: [],

            selected: [],
        }
    },
    created: function () {
        this.getOrders()
    },

    methods: {
        getOrders() {
            const vm = this

            this.$axios.$post("UserOrders")
                .then((res) => {
                    vm.orders = res
                })
        },
        payOrder(row) {
            this.$axios.$post('easyToken', { invoicePricevalue: row.price, pk_invoice: row.fk_invoice })
                .then((response) => {

                    var paytoken = document.getElementById("paytoken")
                    paytoken.value = response;
                    if (paytoken.value != '' && paytoken.value != null) {
                        this.$refs.payForm.submit()
                    }
                })
                .catch((error) => {
                    vm.$toast.error(error.response.data.error);
                })
        },
        deleteConfirm(row) {
            const vm = this
            let text = "از حذف سفارش اطمینان دارید؟";

            if (confirm(text) == true) {
                vm.DestroyOrder(row.fk_invoice)
                vm.getOrders()
            }
        },
        getOrderDetail(e) {

            const vm = this

            this.$axios.$post("UserOrderDetail", { fk_invoice: e.fk_invoice })
                .then((res) => {
                    vm.orderdetail = res

                    vm.isOrderModalActive = true
                })
        },
        DestroyOrder(fk_invoice) {
            const vm = this
            this.$axios.$post('DestroyOrder', { 'fk_invoice': fk_invoice })
                .then((res) => {
                    vm.$toast.error(res.message);
                })
        }
    }
};
</script>