<template>
  <section>
    <navbar />
    <nuxt />
    <footer-org />
    <div v-show="$store.getters.BtnLoading"
      class="has-text-centered has-background-white is-position-fixed loading-gif ">
    </div>
  </section>
</template>
<script>
import Vue from "vue";
import global from "~/mixins.js/global.js"
Vue.mixin(global);

export default {
  mixins: [global],
  layout: "default",
};
</script>
