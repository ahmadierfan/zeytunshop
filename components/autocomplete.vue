<!-- components/Autocomplete.vue -->
<template>
  <div class="autocomplete overflow-visible" ref="autocomplete">
    <input v-model="searchTerm" @input="filterData" class="input is-success" @focus="focusOnSearchBox"
      :class="{ 'is-loading': $store.getters.BtnLoading }" type="text" placeholder="جستجو..." />
    <div v-if="filteredData.length > 0 && dropdownVisible" class="autocomplete-dropdown overflow-visible"
      style="max-height: 170px;overflow-y: scroll;">
      <ul>
        <li v-for="item in filteredData" :key="item.pk_product">
          <nuxt-link :to="'/product/' + item.pk_product + '/' + item.product">
            {{ item.product }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataForSearch: [],
      filteredData: [],

      searchTerm: "",

      dropdownVisible: false,
    };
  },
  methods: {
    focusOnSearchBox() {
      const vm = this

      this.showDropdown()

      if (this.dataForSearch.length == 0)
        this.getProductSearch()
    },
    getProductSearch() {
      const vm = this

      this.$axios
        .$post("auth/ProductSearch")
        .then((response) => {
          vm.dataForSearch = response
        })
    },
    showDropdown() {
      this.dropdownVisible = true;

      document.addEventListener("click", this.closeDropdownOnClickOutside);
    },
    closeDropdownOnClickOutside(event) {
      if (!this.$refs.autocomplete.contains(event.target))
        this.hideDropdown();
    },
    hideDropdown() {
      this.dropdownVisible = false;
      document.removeEventListener("click", this.closeDropdownOnClickOutside);
    },
    beforeDestroy() {
      document.removeEventListener("click", this.closeDropdownOnClickOutside);
    },
    filterData() {
      this.filteredData = this.dataForSearch.filter((item) =>
        item.product.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    selectItem(item) {
      this.filteredData = [];
      console.log(item)
    },
  },
};
</script>

<style scoped>
.autocomplete {
  position: relative;
}

.input {
  width: 100%;
}

.autocomplete-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.autocomplete-dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.autocomplete-dropdown li {
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
}

.autocomplete-dropdown li:last-child {
  border-bottom: none;
}
</style>
