<template>
    <section>
        <div class="py-2 my-2 is-flex is-justify-content-center is-flex-direction-column">
            <div class="column is-4 pb-6 has-text-gray has-text-centered has-background-white has-text-right">
                <h1 class="is-size-4">
                    فروش ویژه زیتون شاپ
                </h1>
            </div>
            <div class="my-6 columns is-multiline is-mobile is-flex is-flex-direction-row is-justify-content-center">
                <div v-for="(item, index) in $store.getters.Products.pricedProducts" :key="index"
                    class="column is-one-quarter-desktop is-half-mobile my-5">
                    <div class="px-6">
                        <NuxtLink :to="'/product/' + item.pk_product + '/' + item.product">
                            <div class="columns is-flex is-justify-content-center">
                                <div class="column has-text-centered">
                                    <div class="sketelon">
                                        <div></div>
                                    </div>
                                    <img class="lazy" :alt="item.product" :data-srcset="imager(item.image)"
                                        style="max-width: 80%;" />
                                </div>
                            </div>
                            <h3 class="has-text-centered has-text-dark" style="height: 50px;">
                                {{ item.product }}
                            </h3>
                        </NuxtLink>
                        <div v-if="item.isavailable == 1">
                            <div class="is-justify-content-center is-flex pb-4">
                                <div v-if="item.discount != 0" class="columns px-4 pt-4">
                                    <div class="column px-1 has-text-gray p-0" style="text-decoration: line-through;">
                                        {{ lastcharthreecomma(item.price) }}
                                    </div>
                                    <div class="column px-3 has-text-danger p-0" style="font-size: 17px;">
                                        {{ lastcharthreecomma(item.price - (item.price * item.discount / 100)) }}
                                    </div>
                                </div>
                                <div class="px-1 has-text-danger" style="font-size: 17px;" v-else>
                                    {{ lastcharthreecomma(item.price) }}
                                </div>
                                <div class="flex mt-1">
                                    <svg style="width: 16px; height: 16px; fill: gray;">
                                        <use xlink:href="#toman">
                                            <symbol id="toman" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                                                <path fill-rule="evenodd"
                                                    d="M3.057 1.742L3.821 1l.78.75-.776.741-.768-.749zm3.23 2.48c0 .622-.16 1.111-.478 1.467-.201.221-.462.39-.783.505a3.251 3.251 0 01-1.083.163h-.555c-.421 0-.801-.074-1.139-.223a2.045 2.045 0 01-.9-.738A2.238 2.238 0 011 4.148c0-.059.001-.117.004-.176.03-.55.204-1.158.525-1.827l1.095.484c-.257.532-.397 1-.419 1.403-.002.04-.004.08-.004.12 0 .252.055.458.166.618a.887.887 0 00.5.354c.085.028.178.048.278.06.079.01.16.014.243.014h.555c.458 0 .769-.081.933-.244.14-.139.21-.383.21-.731V2.02h1.2v2.202zm5.433 3.184l-.72-.7.709-.706.735.707-.724.7zm-2.856.308c.542 0 .973.19 1.293.569.297.346.445.777.445 1.293v.364h.18v-.004h.41c.221 0 .377-.028.467-.084.093-.055.14-.14.14-.258v-.069c.004-.243.017-1.044 0-1.115L13 8.05v1.574a1.4 1.4 0 01-.287.863c-.306.405-.804.607-1.495.607h-.627c-.061.733-.434 1.257-1.117 1.573-.267.122-.58.21-.937.265a5.845 5.845 0 01-.914.067v-1.159c.612 0 1.072-.082 1.38-.247.25-.132.376-.298.376-.499h-.515c-.436 0-.807-.113-1.113-.339-.367-.273-.55-.667-.55-1.18 0-.488.122-.901.367-1.24.296-.415.728-.622 1.296-.622zm.533 2.226v-.364c0-.217-.048-.389-.143-.516a.464.464 0 00-.39-.187.478.478 0 00-.396.187.705.705 0 00-.136.449.65.65 0 00.003.067c.008.125.066.22.177.283.093.054.21.08.352.08h.533zM9.5 6.707l.72.7.724-.7L10.209 6l-.709.707zm-6.694 4.888h.03c.433-.01.745-.106.937-.29.024.012.065.035.12.068l.074.039.081.042c.135.073.261.133.379.18.345.146.67.22.977.22a1.216 1.216 0 00.87-.34c.3-.285.449-.714.449-1.286a2.19 2.19 0 00-.335-1.145c-.299-.457-.732-.685-1.3-.685-.502 0-.916.192-1.242.575-.113.132-.21.284-.294.456-.032.062-.06.125-.084.191a.504.504 0 00-.03.078 1.67 1.67 0 00-.022.06c-.103.309-.171.485-.205.53-.072.09-.214.14-.427.147-.123-.005-.209-.03-.256-.076-.057-.054-.085-.153-.085-.297V7l-1.201-.5v3.562c0 .261.048.496.143.703.071.158.168.296.29.413.123.118.266.211.43.28.198.084.42.13.665.136v.001h.036zm2.752-1.014a.778.778 0 00.044-.353.868.868 0 00-.165-.47c-.1-.134-.217-.201-.35-.201-.18 0-.33.103-.447.31-.042.071-.08.158-.114.262a2.434 2.434 0 00-.04.12l-.015.053-.015.046c.142.118.323.216.544.293.18.062.325.092.433.092.044 0 .086-.05.125-.152z"
                                                    clip-rule="evenodd">
                                                </path>
                                            </symbol>
                                        </use>
                                    </svg>
                                </div>
                            </div>
                            <div class="columns is-mobile">
                                <div class="column has-text-left">
                                    <div>
                                        <select class="is-size-5 select has-background-white is-rounded-twenty"
                                            :ref="'count' + item.pk_product" placeholder="تعداد"
                                            :value="counter(item.pk_product)">
                                            <option v-for="option in ProductsCounts" :value="option.key"
                                                :key="option.key">
                                                {{ option.value }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="column pt-5">
                                    <div @click="changer(item.pk_product, item.product)">
                                        <svg class="is-clickable" fill="#ff0000" height="24px" width="24px"
                                            version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490 490"
                                            xml:space="preserve">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                stroke-linejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <g>
                                                    <g>
                                                        <g>
                                                            <path
                                                                d="M227.8,174.1v53.7h-53.7c-9.5,0-17.2,7.7-17.2,17.2s7.7,17.2,17.2,17.2h53.7v53.7c0,9.5,7.7,17.2,17.2,17.2 s17.1-7.7,17.1-17.2v-53.7h53.7c9.5,0,17.2-7.7,17.2-17.2s-7.7-17.2-17.2-17.2h-53.7v-53.7c0-9.5-7.7-17.2-17.1-17.2 S227.8,164.6,227.8,174.1z">
                                                            </path>
                                                            <path
                                                                d="M71.7,71.7C25.5,118,0,179.5,0,245s25.5,127,71.8,173.3C118,464.5,179.6,490,245,490s127-25.5,173.3-71.8 C464.5,372,490,310.4,490,245s-25.5-127-71.8-173.3C372,25.5,310.5,0,245,0C179.6,0,118,25.5,71.7,71.7z M455.7,245 c0,56.3-21.9,109.2-61.7,149s-92.7,61.7-149,61.7S135.8,433.8,96,394s-61.7-92.7-61.7-149S56.2,135.8,96,96s92.7-61.7,149-61.7 S354.2,56.2,394,96S455.7,188.7,455.7,245z">
                                                            </path>
                                                        </g>
                                                    </g>
                                                    <g> </g>
                                                    <g> </g>
                                                    <g> </g>
                                                    <g> </g>
                                                    <g> </g>
                                                    <g> </g>
                                                    <g> </g>
                                                    <g> </g>
                                                    <g> </g>
                                                    <g> </g>
                                                    <g> </g>
                                                    <g> </g>
                                                    <g> </g>
                                                    <g> </g>
                                                    <g> </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                                <div class="column is-flex is-justify-content-center is-align-items-center"
                                    v-if="saleChecker(item.pk_product)">
                                    <nuxt-link class="has-text-white" to="/store/card" exact-active-class="is-active">
                                        <icon icon="basket" type="is-grey" size="is-medium"></icon>
                                    </nuxt-link>
                                </div>
                                <p v-if="item.discount != 0" style="width: 50px; border-radius: 30px;height: 30px;"
                                    class="has-text-light has-background-danger has-text-centered pt-2">
                                    {{ item.discount }}%
                                </p>
                            </div>
                        </div>
                        <p class="has-text-danger has-text-centered" v-else>موجود نمی باشد</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { mapMutations } from "vuex";

import _find from "lodash/find";

export default {
    auth: false,
    head() {
        return {
            title: this.$store.getters.Products.ProductCategory.productcategory,
        }
    },
    mounted: function () {
        document.removeEventListener("DOMContentLoaded", this.lazyloader());
        document.addEventListener("DOMContentLoaded", this.lazyloader());
    },

    async asyncData({ store, params, $axios }) {
        const Products = await $axios.$post("auth/SpecialOffer", {
            id: params.id,
        });
        store.commit("Products", Products);
    },

    methods: {

        getProducts() {
            const vm = this

            this.$axios.$get('auth/Products?pk_productcategory=' + this.$route.query.pk_productcategory)
                .then((res) => {
                    vm.$store.commit("Products", res);

                    if (vm.$auth.loggedIn)
                        vm.salesUpdate(vm.$store.state.ordered, 'setSales');
                })
        },

        //add product to favorite product

        ProductFavoriter(pk_product) {
            const vm = this

            this.$axios.$post('CreateFavProduct', { pk_product: pk_product })
                .then((response) => {
                    vm.$toast.success(response.message);
                })
                .catch((error) => {
                    vm.$toast.error(error.message);
                });
        },

        // Checks if the product is in the cart?

        saleChecker(fk_product) {
            var res = false

            let orderFinder = this.$store.state.sales.find(sale => sale.fk_product === fk_product);
            let saleFinder = this.$store.state.ordered.find(sale => sale.fk_product === fk_product);

            if (orderFinder !== undefined)
                res = true
            else {
                if (saleFinder !== undefined)
                    res = true
                else
                    res = false
            }

            return res
        },

        // create or update basket in clicking on product sale

        changer(fk_product, product) {
            let count = event.target.parentNode.parentNode.parentNode.getElementsByTagName(
                "select"
            )[0].value;

            if (this.$auth.loggedIn)
                this.salesUpdate(
                    [
                        {
                            fk_product: fk_product,
                            count: count,
                            product: product,
                            fk_invoice: null
                        }
                    ],
                    'setSales',
                    'changed'

                );

            else
                this.addOrder({
                    fk_product: fk_product,
                    count: count,
                    product: product,
                    fk_invoice: null
                });

            this.setBasketNumberIconAnimate()

        },

        //Display the number of products purchased or number 1

        counter(fk_product) {
            let saleFinder = _find(this.$store.state.sales, {
                fk_product: fk_product,
            });
            if (saleFinder != undefined) return saleFinder.count;
            else return 1;
        },
    },
};
</script>