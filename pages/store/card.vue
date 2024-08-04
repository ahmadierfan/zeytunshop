<template>
  <section>
    <div class="columns pt-6" v-if="$store.getters.OrdersAndSalesNumber > 0">
      <div class="column is-8">
        <div class="box" v-for="(item, index) in $store.getters.OrdersAndSales" :key="index">
          <div class="columns  is-mobile" v-if="item.fk_system == 1">
            <div class="column is-3 px-0">
              <img :src="imager(item.image)" style="max-width: 100px;width: 100%;" />
            </div>
            <div class="column is-9">
              <div class="columns is-mobile">
                <div class="column is-8">
                  <p class="is-size-5 has-text-centered my-4">
                    {{ item.product }}
                  </p>
                  <p class="has-text-centered my-3 has-text-success-dark">قیمت {{ lastcharthreecomma(item.price) }}
                    تومان</p>
                  <p v-if="item.discount != 0" class="has-text-danger">{{ item.discount }}% تخفیف</p>
                </div>
                <div class="buttons column is-4 my-4 has-text-left pl-5">
                  <div class="mb-4">
                    <button class="delete is-danger" @click="saleDestroy(item.pk_sale, null, 'setSales')"
                      aria-label=" close"></button>
                  </div>
                  <div class="has-text-right">
                    <div class="select">
                      <select v-model="item.count" @input="changer($event, item.fk_product)">
                        <option v-for="option in ProductsCounts" :value="option.key" :key="option.key">
                          {{ option.value }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="box">
          <p class="py-5 is-size-5 has-text-centered">جمع سبد خرید {{
              lastcharthreecomma($store.getters.sumOfOrdersAndSales)
          }} تومان</p>
          <nuxt-link class="buttons is-flex is-justify-content-center" to="/store/placeandtime">
            <button class="is-success is-medium button">
              ادامه ثبت سفارش
            </button>
          </nuxt-link>
          <p class="py-5 box has-text-centered has-text-primary-dark" style="line-height:3;">
            به سفارشات زیر
            {{ lastcharthreecomma(minAmountForCourier) }}
            تومان
            <br>
            مبلغ
            {{ lastcharthreecomma(courier) }}
            تومان
            <br>
            بعنوان هزینه پیک اضافه می گردد
          </p>
        </div>
      </div>
    </div>
    <div class="columns pt-6 is-flex is-justify-content-center" v-if="$store.getters.OrdersAndSalesNumber === 0">
      <div class="column is-3 has-text-centered">
        <nuxt-link class="button is-success is-light is-size-4" to="/">
          بازگشت به فروشگاه
        </nuxt-link>
        <p class="is-size-4 py-5 has-text-centered">
          -- سبد خرید شما خالی می باشد --
        </p>
        <img src="/img/blunkbasket.jpg" />
      </div>
    </div>
  </section>
</template>
<script>
export default {
  head() {
    return {
      title: "سبد خرید",
    };
  },

  data() {
    return {
      courier: '',
      minAmountForCourier: '',
    }
  },

  methods: {
    getCourier() {
      const vm = this

      this.$axios
        .$post("/Prices", {
          price: "4",
        })
        .then((res) => {
          vm.courier = res
        })
    },
    getminAmountForCourier() {
      const vm = this

      this.$axios
        .$post("/Prices", {
          price: "5",
        })
        .then(function (response) {
          vm.minAmountForCourier = response;
          vm.getCourier()
        });
    },
    changer(event, fk_product) {
      //get input value

      const count = event.target.value;

      this.salesUpdate(
        [
          {
            fk_product: fk_product,
            count: count,
            fk_invoice: null
          }
        ],
        'setSales',
        'changed'
      );
    }
  },
  created: function () {
    this.salesUpdate(
      this.$store.getters.Ordered,
      'setSales'
    );
    this.getminAmountForCourier()

  }
};
</script>