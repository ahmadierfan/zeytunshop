<template>
    <section class="section" v-if="productDetail.product">
        <div class="columns mt-4">
            <div class="column is-3 pt-6">
                <div class="columns is-centered">
                    <div class="column has-text-centered" >
                        <img :alt="productDetail.product.product" :src="imager(productDetail.product.image)" />
                        <div class="columns mx-6 is-size-5 has-background-danger has-text-white mt-4 is-mobile animate-flicker"
                            style="border-radius: 20px;"
                            v-show="productDetail.product.expiredate != 'undefined' && productDetail.product.expiredate != null">
                            <div class="column">
                                تاریخ انقضا:
                            </div>
                            <div class="column">
                                {{ productDetail.product.expiredate }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="column is-9 pt-6 px-6 is-flex is-flex-direction-column is-justify-content-space-between has-text-centered">
                <h1 class="title is-3 has-background-white py-4">
                    {{ productDetail.product.product }}
                </h1>
                <p class="subtitle is-5 py-3 has-text-right hsa-text-danger px-4">
                    قیمت: {{ lastcharthreecomma(productDetail.product.price) }} تومان
                </p>
                <p class="pt-3 py-5 has-text-right"
                    :class="{ 'has-text-success': productDetail.product.isavailable === 1, 'has-text-danger': productDetail.product.isavailable !== 1 }">
                    وضعیت:
                    <icon v-if="productDetail.product.isavailable === 1" icon="check" size="is-small" type="is-success">
                    </icon>
                    {{ productDetail.product.isavailable === 1 ? 'موجود می باشد' : 'عدم موجودی' }}
                    <br v-if="productDetail.product.isavailable === 1" />
                    {{ productDetail.product.isavailable === 1 ? 'آماده ارسال' : '' }}
                </p>
                <p v-show="saleChecker(productDetail.product.pk_product)" class="has-text-success has-text-right">
                    <svg fill="green" height="26px" width="24px" version="1.1" id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 117.72 117.72" style="enable-background:new 0 0 117.72 117.72"
                        xml:space="preserve">
                        <style type="text/css">
                            <![CDATA[
                            .st0 {
                                fill: #01A601;
                            }
                            ]]>
                        </style>
                        <g>
                            <path class="st0"
                                d="M58.86,0c9.13,0,17.77,2.08,25.49,5.79c-3.16,2.5-6.09,4.9-8.82,7.21c-5.2-1.89-10.81-2.92-16.66-2.92 c-13.47,0-25.67,5.46-34.49,14.29c-8.83,8.83-14.29,21.02-14.29,34.49c0,13.47,5.46,25.66,14.29,34.49 c8.83,8.83,21.02,14.29,34.49,14.29s25.67-5.46,34.49-14.29c8.83-8.83,14.29-21.02,14.29-34.49c0-3.2-0.31-6.34-0.9-9.37 c2.53-3.3,5.12-6.59,7.77-9.85c2.08,6.02,3.21,12.49,3.21,19.22c0,16.25-6.59,30.97-17.24,41.62 c-10.65,10.65-25.37,17.24-41.62,17.24c-16.25,0-30.97-6.59-41.62-17.24C6.59,89.83,0,75.11,0,58.86 c0-16.25,6.59-30.97,17.24-41.62S42.61,0,58.86,0L58.86,0z M31.44,49.19L45.8,49l1.07,0.28c2.9,1.67,5.63,3.58,8.18,5.74 c1.84,1.56,3.6,3.26,5.27,5.1c5.15-8.29,10.64-15.9,16.44-22.9c6.35-7.67,13.09-14.63,20.17-20.98l1.4-0.54H114l-3.16,3.51 C101.13,30,92.32,41.15,84.36,52.65C76.4,64.16,69.28,76.04,62.95,88.27l-1.97,3.8l-1.81-3.87c-3.34-7.17-7.34-13.75-12.11-19.63 c-4.77-5.88-10.32-11.1-16.79-15.54L31.44,49.19L31.44,49.19z" />
                        </g>
                    </svg>
                    موجود در سبد
                </p>
                <h4 class="title is-4 py-3 has-text-light has-background-danger"
                    v-if="productDetail.product.discount !== 0">
                    {{ productDetail.product.discount }}% تخفیف
                </h4>
                <div class="columns is-5 is-mobile">
                    <div class="column has-text-left">
                        <div class="select is-medium">
                            <select v-model="count">
                                <option v-for="option in ProductsCounts" :value="option.key" :key="option.key">
                                    {{ option.value }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="column has-text-right">

                        <button v-if="productDetail.product.isavailable === 1" class="button is-success is-medium"
                            @click="changer">
                            افزودن به سبد خرید
                        </button>
                        <p v-else class="has-text-danger">موجود نمی باشد</p>
                    </div>
                </div>
                <hr />
            </div>
        </div>
        <div>
            <p class="mt-5">مشخصات</p>
            <hr class="mt-2">
        </div>
        <div class="columns mt-4">
            <div class="column is-6">
                <table class="table is-striped is-hoverable is-fullwidth">
                    <tbody>
                        <tr v-for="(item, index) in productDetail.filters">
                            <td class="has-text-right">
                                {{ item.parentfilter }} :
                            </td>
                            <td class="has-text-centered">
                                {{ item.filter }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    auth: false,
    head() {
        return {
            script: [{ type: 'application/ld+json', json: this.schemaData }],
            title: this.$store.getters.Product.product + " با بهترین قیمت",
            meta: [
                {
                    hid: 'product_id',
                    name: 'product_id',
                    content: this.$store.getters.Product.pk_product,
                },
                {
                    hid: 'product_name',
                    name: 'product_name',
                    content: this.$store.getters.Product.product,
                },
                {
                    hid: 'product_price',
                    name: 'product_price',
                    content: this.$store.getters.Product.price,
                },
                {
                    hid: 'guarantee',
                    name: 'guarantee',
                    content: 'بازگشت بی قید و شرط محصول تا یک هفته',
                },
                {
                    hid: 'stock',
                    name: 'availability',
                    content: this.$store.getters.Product.isavailablext,
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: 'خرید' + this.$store.getters.Product.product + ', زیتون شاپ',
                },
                {
                    hid: 'image',
                    name: 'image',
                    property: 'og:image',
                    content: this.imager(this.$store.getters.Product.image),
                }
            ]
        };
    },

    //recive product detail from database

    async asyncData({ store, params, $axios }) {
        const productDetail = await $axios.$post("auth/NweProductDetail", {
            pk_product: params.id,
        });
        store.commit("Product", productDetail.product);
        return { productDetail };
    },

    data() {
        return {
            productKeywords: [],
            productDetail:{},

            schemaData: {
                "@context": "https://schema.org",
                "@type": "Product",
                "description": this.$store.getters.Product.descriptions,
                "name": this.$store.getters.Product.product,
                "image": this.imager(this.$store.getters.Product.image),
                "offers": {
                    "@type": "Offer",
                    "price": this.$store.getters.Product.price,
                    "priceCurrency": "IRR"
                },
            },

            productKeywordsString: '',
            gallery: false,
            count: 1,
        }
    },
    created:function(){
        const vm = this

        /*this.$axios.$post("auth/NweProductDetail", { pk_product: this.$route.params.id })
            .then((res) => {
                vm.productDetail = res
                vm.$store.commit("Product", res.product);

                var newUrl = "/product/" + vm.$store.getters.Product.pk_product + "/" + vm.$store.getters.Product.product
                window.history.replaceState({}, '', newUrl);
            })*/
    },
    mounted: function () {
        if (this.$auth.loggedIn) {
            this.salesUpdate(this.$store.state.ordered, 'setSales');
            this.counter();
        }

        //this.getProductKeywords()

        var newUrl = "/product/" + this.$store.getters.Product.pk_product + "/" + this.$store.getters.Product.product
        window.history.replaceState({}, '', newUrl);
    },

    methods: {
        getProductKeywords() {
            const vm = this

            this.$axios.$post("auth/ProductKeywords", { pk_product: this.$route.query.pk_product })
                .then((res) => {
                    vm.productKeywords = res
                    vm.productKeywordsString = res.map(a => a.keyword).toString();
                })
        },
        saleChecker(fk_product) {
            let saleFinder = this.$store.state.sales.find(sale => sale.fk_product === fk_product);

            if (saleFinder !== undefined)
                return true;
            else
                return false;
        },
        counter() {
            let pk_product = parseInt(this.$route.params.id);
            let saleFinder = this.$store.state.sales.find(sale => sale.fk_product === pk_product);

            if (saleFinder !== undefined) {
                this.count = saleFinder.count;
            }
        },

        // create or update basket in clicking on product sale

        changer() {
            if (this.$auth.loggedIn)
                this.salesUpdate(
                    [
                        {
                            fk_product: this.$route.params.id,
                            count: this.count,
                            product: this.$route.params.product,
                            fk_invoice: null
                        }
                    ],
                    'setSales',
                    'changed'
                );
            else
                this.addOrder({
                    fk_product: this.$route.params.id,
                    count: this.count,
                    product: this.$route.params.product,
                    fk_invoice: null
                });

            this.setBasketNumberIconAnimate()

        },

    },
};
</script>