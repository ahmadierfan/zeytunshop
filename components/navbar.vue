<template>
  <srction>
    <div class="columns my-0 is-mobile overflow-visible">
      <div class="column py-0 overflow-visible">
        <div class="columns overflow-visible is-mobile">
          <nuxt-link to="/" class="column is-1 is-2-mobile pb-0 is-flex">
            <img alt="بهترین مرجع فروش زیتون خارجی" src="/img/zeytunshop-white-logo.png" class="fifty-px-icon" />
          </nuxt-link>
          <div class="column is-3 py-5 is-hidden-touch overflow-visible">
            <div class="container overflow-visible">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#d6d6d6" width="20" height="20" viewBox="0 0 24 24"
                style="position: absolute;z-index: 2;left: 5px;top: 6px;">
                <path
                  d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z">
                </path>
              </svg>
              <autocomplete />
            </div>
          </div>
          <nuxt-link to="/special-sales" class="column pb-0 is-flex nuxt-link-exact-active nuxt-link-active pt-5">
            <p class="has-background-danger has-text-white mb-5 px-3 pt-1 is-rounded-twenty-px">فروش ویژه</p>
          </nuxt-link>
        </div>
      </div>
      <div v-if="$auth.loggedIn" @click="logout"
        class="is-clickable is-position-absolute pl-4 pr-2 has-text-danger exit-text">
        خروج
      </div>
      <div class="column has-text-left pb-0 card-profile-icon has-background-beuty-green">
        <nuxt-link class="pl-4 pr-2" to="/panel">
          <img alt="پروفایل" src="/img/newweb/user.jpg" class="thirty-px-icon">
        </nuxt-link>
        <nuxt-link class="pl-4" to="/store/card">
          <input type="text" disabled="disabled" value="0" class="has-text-centered p-0 has-background-white"
            :class="{ 'basket-number-animate': $store.getters.cardNumberAnimate }"
            v-model="$store.getters.OrdersAndSalesNumber"
            style="width: 20px;border-radius: 40px;position: absolute;left: 10px;height: 20px;">
          <img alt="سبد خرید" src="/img/newweb/basket.jpg" class="thirty-px-icon">
        </nuxt-link>
      </div>
    </div>
    <div class="is-hidden-desktop px-6 pb-4 pt-5 overflow-visible">
      <div class="container overflow-visible">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#d6d6d6" width="20" height="20" viewBox="0 0 24 24"
          style="position: absolute;z-index: 2;left: 5px;top: 6px;">
          <path
            d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z">
          </path>
        </svg>
        <autocomplete />
      </div>
    </div>
    <div class="has-background-beuty-green menu-radius-style pt-3 pb-6 overflow-visible has-text-centered">
      <nuxt-link class="pt-1 px-4 menu-text-shadow has-text-white font-seventeen is-position-relative" to="/"
        style="top: 2px;">
        خانه
      </nuxt-link>
      <div class="dropdown is-hoverable overflow-visible" v-for="(item, index) in menusforshop">
        <div class="dropdown-trigger" @click.preven>
          <div class="is-clickable" aria-haspopup="true" aria-controls="dropdown-menu4">
            <span class="pl-1 menu-text-shadow has-text-white font-seventeen "> {{ item.menuforshop }}</span>
            <i class="arrow-down"></i>
            <span class="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </div>
        </div>
        <div class="dropdown-menu overflow-visible" id="dropdown-menu4" role="menu">
          <div class="dropdown-content">
            <div class="dropdown-item">
              <nuxt-link class="navbar-item px-0" :to="'/category/' + item.menuurl + '/' + item.pk_menuforshop">
                محصولات {{ item.menuforshop }}
              </nuxt-link>
              <hr class="my-0" />
              <nuxt-link class="navbar-item" v-for="(subitem, subindex) in submenusforshop"
                :to="'/category/' + subitem.menuurl + '/' + subitem.pk_menuforshop"
                v-if="subitem.fk_menuforshop == item.pk_menuforshop" :key="subindex">
                {{ subitem.menuforshop }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </srction>

</template>

<script>
export default {
  data() {
    return {
      menusforshop: [],
      submenusforshop: [],
      basketColumns: [
        {
          field: "product",
        },
        {
          field: "count",
        },
      ],

      fixedtop: true,
      shadow: false,
      boxed: true,
      collapsible: true,

    };
  },

  methods: {
    menusForShop() {
      const vm = this

      this.$axios.$get("auth/MenusForShop")
        .then((response) => {
          var menusforshop = response

          menusforshop.forEach(element => {
            if (element.fk_menuforshop)
              vm.submenusforshop.push(element)
            else
              vm.menusforshop.push(element)
          });
        })
    },
  },

  created: function () {
    this.menusForShop()
  },
};
</script>

<style>
</style>
