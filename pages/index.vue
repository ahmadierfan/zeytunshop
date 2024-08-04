<template>
  <div>
    <a href="tell:+989125002817" class="is-flex Message-number is-hidden-mobile mt-2 px-6">
      0912-5002817
      <img src="/img/newweb/icons-message.png" class="mr-2" alt="تماس با زیتون شاپ">
    </a>
    <img src="/img/olive-banner2.jpg" alt="معتبرترین برندهای روغتزیتو و زیتون" class="mt-3 w-100">
    <section class="columns is-justify-content-center mt-n1">
      <div class="box is-justify-content-center py-6 is-flex is-hidden-mobile column is-8" v-if="$device.isDesktop">
        <div>
          <div class="is-flex is-multiline columns">
            <nuxt-link v-for="(item, index) in store.menus" :key="index"
              :to="'/category/' + item.thisval + '/' + item.thisid" class="is-3 column has-text-centered">
              <img :src="imager(item.image)" class="mb-3" :alt="item.thisval">
              <p class="is-size-5 has-text-weight-bold has-text-grey">{{ item.thisval }}</p>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="is-hidden-desktop mt-6" v-else>
        <div class="columns is-flex mr-0 is-multiline is-mobile mx-0">
          <nuxt-link v-for="(item, index) in store.menus" :key="index"
            :to="'/category/' + item.thisval + '/' + item.thisid" class="column is-6 p-5">
            <div class="has-background-grey-lighter is-rounded-twenty-px">
              <div class="columns m-0 is-mobile pt-1">
                <div class="column m-0 p-0">
                  <img :src="imager(item.image)" :alt="item.thisval" />
                </div>
                <div class="column has-text-dark m-0 mt-4 p-0 pr-2 pt-5">
                  {{ item.thisval }}
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </section>

    <!---- -->

    <section v-if="store.products && store.products.length > 0">
      <div v-for="(item, index) in list">
        <h3 class="is-flex pt-6">
          <nuxt-link class="pr-4 is-size-4 has-text-dark column is-3 pb-0"
            :to="store.products[item.name][0].categoryurl">
            {{ store.products[item.name][0].category }}
          </nuxt-link>
        </h3>
        <hr class="mb-0 mt-1 mr-3 has-background-primary width-one-houndred-px" />
        <hr class="mb-5 mt-1 mr-3 has-background-primary width-one-houndred-fifty-px" />
        <div class="columns is-flex mr-0 w-100 overflow-x-auto">
          <div class="column mx-4 has-text-centered is-half-mobile"
            v-for="(prooductitem, productindex) in store.products[item.name]">
            <div :key="productindex">
              <nuxt-link :to="'/product/' + prooductitem.thisid + '/' + prooductitem.thisval">
                <div class="sketelon">
                  <div></div>
                </div>
                <img class="lazy max-width-fifty-percent" :data-srcset="imager(prooductitem.image)" :alt="prooductitem.thisval" />
              </nuxt-link>
              <svg fill="green" v-show="saleChecker(prooductitem.thisid)" height="26px" width="24px" version="1.1"
                id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                y="0px" viewBox="0 0 117.72 117.72" style="enable-background:new 0 0 117.72 117.72"
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
              <svg v-show="!saleChecker(prooductitem.thisid)"
                @click="changer(prooductitem.thisid, prooductitem.thisval)" fill="#ff0000" height="26px" width="24px"
                version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" class="is-clickable"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490 490" xml:space="preserve">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
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
              <nuxt-link :to="'/product/' + prooductitem.thisid + '/' + prooductitem.thisval">
                <h2 class="pt-3 has-text-centered has-text-grey min-height-fourty-five">
                  {{ prooductitem.thisval }}
                </h2>
              </nuxt-link>
              <nuxt-link :to="'/product/' + prooductitem.thisid + '/' + prooductitem.thisval"
                class="is-justify-content-center is-flex">
                <p class="pt-4 px-1 has-text-danger font-seventeen">
                  {{ lastcharthreecomma(prooductitem.price) }}
                </p>
                <div class="flex pt-4 mt-1">
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
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="columns is-justify-content-center">
      <div class="column is-7">
        <div class="my-6 box is-size-4 has-text-centered">
          <h1>
            فروشنده بهترین مارک های روغن زیتون خارجی و زیتون خارجی
          </h1>
          <p class="p-4 has-text-justified">
            زیتون شاپ با بیش از 20 سال سابقه در فروش انواع محصولات زیتون و روغن زیتون خارجی در بازار بزرگ تهران، با
            ایجاد
            بستر فروش اینترنتی محصولات اعم از زیتون خارجی و روغن زیتون خارجی سعی بر جلب رضایت مشتریان عزیز خود دارد.
            فروشگاه
            ما معتبر ترین برند های اصل زیتون و روغن زیتون را از کشور های ایتالیا، اسپانیا و سایر کشور های فعال در این
            حوزه
            برای خرید مشتریان فراهم نموده است. ما از ابتدای فعالیت بر اصل مشتری مداری پایبند بوده ایم و تمام محصولات
            فروشگاه
            در صورت نارضایتی مشتری قابل بازگشت می باشد.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  auth: false,
  async asyncData({ $axios }) {
    const store = await $axios.$get("auth/NewWebHomePage");
    return { store };
  },
  data() {
    return {
      list: [
        {
          name: 'first'
        },
        {
          name: 'second'
        },
        {
          name: 'third'
        },
      ],
      store:[],
      
      cardNumberAnimate: false,
    }
  },
  created: function () {
    if (this.$auth.loggedIn)
      this.salesUpdate(this.$store.state.ordered, 'setSales');
  },
  mounted: function () {
    if (this.$route.query.source)
      this.sourceSetter(this.$route.query.source)

    document.removeEventListener("DOMContentLoaded", this.lazyloader());
    document.addEventListener("DOMContentLoaded", this.lazyloader());
  },
  methods: {
    sourceSetter(source) {
      const vm = this

      this.$axios
        .$post("auth/IncomeUserSourceSetter", { 'source': source })
    },
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
    changer(fk_product, product) {
      let count = 1

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
    sourceSetter(source) {
      const vm = this

      this.$axios
        .$post("auth/IncomeUserSourceSetter", { 'source': source })
        .then(() => {
          vm.getProductSearch()
        })
    },
  },
}
</script>