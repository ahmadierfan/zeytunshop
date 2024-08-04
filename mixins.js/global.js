const ProductsCounts = require("@/assets/json/count.json");

export default {
    data() {
        return {
            ProductsCounts,
            baseLaraURL: 'https://laraapi.zeytunshop.com',
        }
    },
    methods: {
        lazyloader() {
            var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

            if ("IntersectionObserver" in window) {
                let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            let lazyImage = entry.target;

                            let parentElement = lazyImage.parentElement;
                            if (parentElement.querySelector('.sketelon'))
                                var firstChildOfParent = parentElement.querySelector('.sketelon');

                            if (firstChildOfParent)
                                firstChildOfParent.classList.remove("sketelon");

                            lazyImage.srcset = lazyImage.dataset.srcset;
                            lazyImage.classList.remove("lazy");
                            lazyImageObserver.unobserve(lazyImage);
                        }
                    });
                });

                lazyImages.forEach(function (lazyImage) {
                    lazyImageObserver.observe(lazyImage);
                });
            }
        },
        toEnglishDigits(str) {

            // convert persian digits [۰۱۲۳۴۵۶۷۸۹]
            var e = '۰'.charCodeAt(0);
            str = str.replace(/[۰-۹]/g, function (t) {
                return t.charCodeAt(0) - e;
            });

            // convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
            e = '٠'.charCodeAt(0);
            str = str.replace(/[٠-٩]/g, function (t) {
                return t.charCodeAt(0) - e;
            });
            return str;
        },
        logout() {
            const vm = this;

            this.$store.commit('saleEmptier')
            this.$auth.logout().then(function () {
                vm.$toast.error('از حساب کاربری خارج شدید')
                vm.$store.commit('orderEmptier')
                vm.$router.push({
                    path: "/",
                })
            });
        },


        //for create, update and delete sales

        saleDestroy(pk_sale, fk_invoice, mutation) {
            const vm = this;

            this.$axios.$post('SaleDestroy', { pk_sale: pk_sale })
                .then(function () {
                    vm.salesUpdate([{ 'fk_invoice': fk_invoice }], mutation);
                    vm.$toast.success('کالا حذف شد')
                })
        },

        addOrder(obj) {
            this.$store.commit("addOrder", obj);
            this.$toast.success('سبد خرید بروز شد')
            this.$store.commit('basketActive')
            setTimeout(() => {
                this.$store.commit('basketActive')
            }, 2000);
        },

        salesUpdate(productObject, mutation, ischange = null,) {
            const vm = this;
            this.$axios
                .$post("CreateUpdateSales", productObject)
                .then(function (response) {
                    vm.$store.commit(mutation, response.sales)
                    vm.$store.commit('orderEmptier')
                    vm.$store.commit('sumOfOrdersAndSales')
                })
                .then(function () {
                    if (ischange != null)
                        vm.$toast.success('سبد خرید بروز شد')
                })
                .then(function () {
                    vm.$store.commit('basketActive')
                    setTimeout(() => {
                        vm.$store.commit('basketActive')
                    }, 2000);
                })

        },

        //methods for forms

        threecomma(oldv) {
            let newv = oldv.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return newv
        },
        lastcharthreecomma(oldv) {
            let newv = Math.floor(oldv / 10);
            let newvv = newv.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return newvv
        },

        imager(image) {
            return this.baseLaraURL + "/storage/" + image;
        },

        setBasketNumberIconAnimate() {
            const vm = this

            this.$store.commit('setCardNumberAnimate', true)

            setTimeout(() => {
                vm.$store.commit('setCardNumberAnimate', false)
            }, 1500)

        },
    },
}