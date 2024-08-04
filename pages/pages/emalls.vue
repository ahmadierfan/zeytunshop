<template>
    <section>
        <div class="columns has-background-white">
            <div class="column is-3 has-text-centered">
                نام محصول
            </div>
            <div class="column is-2 has-text-centered">
                قیمت محصول
            </div>
            <div class="column is-2 has-text-centered">
                تخفیف
            </div>
            <div class="column is-1 has-text-centered">
                موجود بودن
            </div>
            <div class="column is-3 has-text-centered">
                لینک
            </div>
        </div>
        <div class="columns" v-for="(item, index) in allProducts" :key="index">
            <div class="column is-3 has-text-centered">
                {{ item.product }}
            </div>
            <div class="column is-2 has-text-centered">
                {{ lastcharthreecomma(item.price) }} تومان
            </div>
            <div class="column is-2 has-text-centered">
                <p class="has-text-centered" v-if="item.discount != 0">
                    {{ item.discount }}
                </p>
                <p class="has-text-centered" v-else>
                    0
                </p>
            </div>
            <div class="column is-1 has-text-centered">
                <p v-if="item.isavailable == 1">
                    موجود می باشد
                </p>
                <p v-else>موجود نمی باشد</p>
            </div>
            <div class="column is-3 has-text-centered">
                {{ 'https://zeytunshop.com/product/' + item.pk_product + '/' + item.product
                }}
            </div>
        </div>
    </section>
</template>
<script>

export default {
    auth: false,
    head() {
        return {
            meta: [
                { hid: 'robots', name: 'robots', content: 'noindex' }
            ],
        };
    },
    async asyncData({ store, query, $axios }) {
        const allProducts = await $axios.$get("auth/AllProducts");
        return { allProducts };
    },
};
</script>