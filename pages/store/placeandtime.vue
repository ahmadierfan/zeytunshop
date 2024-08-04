<template>
  <section>

    <div class="columns pt-6">
      <div class="column is-9 box">
        <div class="columns pt-6">
          <div class="column is-6">
            <p class="is-size-3 has-tet-centered p-6">انتخاب از آدرس ها / افزودن آدرس جدید</p>
            <button class="button is-size-5 is-info is-light is-rounded" @click="manualAddress()"
              style="font-size: 1rem;">
              افزودن آدرس دستی
            </button>
            <button class="button is-size-5 is-success is-light is-rounded" @click="isMapActive = true"
              style="font-size: 1rem;">
              انتخاب از روی نقشه
            </button>
          </div>
          <div class="column is-6">
            <div v-if="isMapActive">
              <div class="is-clickable button is-success is-light is-rounded" @click="getLocation">
                نمایش موقعیت من روی نقشه
              </div>
              <button class="button is-success " :class="{ 'is-loading': $store.getters.BtnLoading }"
                @click="wichGetAddress = 1; createAddress()">
                ثبت آدرس
              </button>
              <div class="py-3" style="height: 375px; width: 375px; position: relative;">
                <img src="/img/gps.png" width="40px"
                  style="position: absolute; top: 212.5px; left: 167.5px; z-index: 1;" alt="Foreverliving image" />
                <vl-map :load-tiles-while-animating="true" data-projection="EPSG:4326"
                  :load-tiles-while-interacting="true" style="height: 375px !important;width:375px !important;">
                  <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>
                  <vl-layer-tile id="osm">
                    <vl-source-osm></vl-source-osm>
                  </vl-layer-tile>
                </vl-map>
              </div>
            </div>
          </div>
        </div>
        <p class="is-size-3 has-tet-centered p-6">آدرس های ثبت شده</p>
        <div class="box" v-for="(item, index) in userAdresses" :key="index">
          <div class="columns">
            <div class="column is-12">
              <div class="columns">
                <div class="column is-1">
                  <input type="radio" v-model="formData.fk_useraddress" name="address" :value="item.pk_useraddress"
                    style="margin-top: 0.5rem;">
                </div>
                <div class="column is-10">
                  <p class="is-size-6 has-text-centered my-4">
                    {{ item.address }}
                  </p>
                </div>
                <div class="column is-1 my-4 has-text-left">
                  <button class="delete" @click="addressDestroy(item.pk_useraddress)" aria-label="close"></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-3 box">
        <h3 class="is-light p-5">اطلاعات فردی</h3>
        <div class="py-4 box">
          <label class="label">نام</label>
          <input class="input" :disabled="$auth.user.name" v-model="authuserdata.name" required>
          <label class="label">نام خانوادگی</label>
          <input class="input" :disabled="$auth.user.lastname" v-model="authuserdata.lastname" required>
        </div>
      </div>
    </div>
    <div class="columns pt-6 is-flex is-justify-content-center">
      <div class="column is-6 is-flex is-justify-content-center">
        <button class="button is-large is-success is-rounded" @click="orderFinalSubmit()" id="beforepay"
          :disabled="$store.getters.BtnLoading">
          پرداخت
        </button>
        <form ref="payForm" action="https://rt.sizpay.ir/Route/Payment" method="POST" style="display:none;">
          <input type="text" name="MerchantID" value="500118991200026">
          <input type="text" name="TerminalID" value="18000475">
          <input type="text" id="paytoken" name="Token">
        </form>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': isFinalMapAddressModalActive }">
      <div class="modal-background" @click="isFinalMapAddressModalActive = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">تکمیل آدرس</p>
          <button class="delete" aria-label="close" @click="isFinalMapAddressModalActive = false"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">آدرس</label>
            <div class="control">
              <input class="input" v-model="address.address" disabled>
            </div>
          </div>
          <div class="field">
            <label class="label">پلاک</label>
            <div class="control">
              <input class="input" v-model="address.plaque">
            </div>
          </div>
          <div class="field">
            <label class="label">کد پستی - اختیاری</label>
            <div class="control">
              <input class="input" v-model="address.postal_code">
            </div>
          </div>
          <div class="field">
            <label class="label">طبقه / واحد</label>
            <div class="control">
              <input class="input" v-model="address.floorunit">
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary" @click="wichGetAddress = 11; createAddress()"
            :disabled="$store.getters.BtnLoading">
            ثبت
          </button>
        </footer>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': isManualAddressModalActive }">
      <div class="modal-background" @click="isManualAddressModalActive = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">ثبت آدرس دستی</p>
          <button class="delete" aria-label="close" @click="isManualAddressModalActive = false"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">استان</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="address.province">
                  <option value="" disabled>انتخاب استان</option>
                  <option v-for="(provinceitem, provinceindex) in provinces" :key="provinceindex"
                    :value="provinceitem.province">
                    {{ provinceitem.province }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">شهر</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="address.city" required>
                  <option value="" disabled>انتخاب شهر</option>
                  <option v-for="(cityitem, cityindex) in cities" :key="cityindex" :value="cityitem.city">
                    {{ cityitem.city }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">آدرس</label>
            <div class="control">
              <input class="input" v-model="address.address">
            </div>
          </div>
          <div class="field">
            <label class="label">پلاک</label>
            <div class="control">
              <input class="input" v-model="address.plaque">
            </div>
          </div>
          <div class="field">
            <label class="label">کد پستی-اختیاری</label>
            <div class="control">
              <input class="input" v-model="address.postal_code">
            </div>
          </div>
          <div class="field">
            <label class="label">طبقه / واحد</label>
            <div class="control">
              <input class="input" v-model="address.floorunit">
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary" :class="{ 'is-loading': $store.getters.BtnLoading }"
            @click="wichGetAddress = 2; createAddress()" :disabled="$store.getters.BtnLoading">
            ثبت
          </button>
        </footer>
      </div>
    </div>


  </section>
</template>
<script>
export default {
  head() {
    return {
      title: "انتخاب زمان و مکان",
    };
  },

  data() {
    return {
      userAdresses: [],
      deliveryTypes: [],
      paymentTypes: [],
      cities: [],
      provinces: [],
      center: [51.36351572950854, 35.71823437922596],

      address: {},
      authuserdata: {},
      formData: {
        fk_deliverytype: 2,
        fk_paymenttype: 1
      },


      location: null,
      errorStr: null,

      gettingLocation: false,
      isMapActive: false,
      isManualAddressModalActive: false,
      isFinalMapAddressModalActive: false,

      province: '',
      city: '',
      wichGetAddress: '',



      //for map
      zoom: 10,
      rotation: 0,
      geolocPosition: undefined,
    }
  },

  mounted: function () {
    this.authuserdata.name = this.$auth.user.name
    this.authuserdata.lastname = this.$auth.user.lastname

    this.getUserAdresses()
    //this.getDeliveryTypes()
    //this.getPaymentTypes()
  },

  methods: {
    getLocation() {
      if (!("geolocation" in navigator)) {
        this.errorStr = 'Geolocation is not available.';
        return;
      }

      this.gettingLocation = true;
      // get position
      navigator.geolocation.getCurrentPosition(pos => {
        this.gettingLocation = false;
        this.location = pos;
        this.zoom = 16
        this.center = [pos.coords.longitude, pos.coords.latitude]
      }, err => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      })
    },
    provinceSelect(e) {
      this.getCitiesOfProvince(e)
    },
    getCitiesOfProvince(fk_province) {
      const vm = this

      this.$axios.$post("CitiesOfProvince", { fk_province: fk_province })
        .then((res) => {
          vm.cities = res
        })
    },
    orderFinalSubmit() {
      const vm = this

      if (!this.formData.fk_useraddress)
        this.$toast.error('آدرس را صحیح وارد نمائید');
      else if (!this.authuserdata.name || !this.authuserdata.lastname)
        this.$toast.error('نام و نام خانوادگی را صحیح وارد نمائید');
      else {
        this.$axios.$post('CreateStoreProformanvoice', this.formData)
          .then((response) => {
            //vm.$toast.success(response);

            if (response === 1) {
              vm.$toast.success('سفارش با موفقیت ثبت گردید');
              vm.$router.push("/store/bankaccounts");
            }

            document.getElementById("paytoken").value = response

            if (paytoken.value != '' && paytoken.value != null && paytoken.value != 1)
              if (!vm.$auth.user.name || !vm.$auth.user.lastname) {
                vm.$axios.$post("UpdateName", vm.authuserdata)
                  .then((res) => {
                    vm.$refs.payForm.submit()
                  })
              }
              else
                vm.$refs.payForm.submit()

          })
          .catch((error) => {
            vm.indefinteToast = vm.$buefy.toast.open({
              indefinite: true,
              message: error.response.data.error + ` <a href="/panel/customers/orders">صفحه سفارشات</a>`,
              type: 'is-warning',
              duration: 10000
            })
          })
      }

    },

    manualAddress() {
      this.isManualAddressModalActive = true
      this.isFinalMapAddressModalActive = false
      this.isMapActive = false
      this.getProvinces()
      this.getCities()
    },

    createAddress() {
      const vm = this

      if (this.wichGetAddress === 1) {
        fetch('https://map.ir/reverse/no?' + "lat=" + this.center[1] + "&lon=" + this.center[0], {
          method: 'GET',
          headers: {
            'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjZkMjgzMjk0MDljYThhYmMzMTY5ZjM3YjE0NDdhZjE0ODI1MDQ5ZTk3ZjM0YzBkNTgxNTZiNTRlNTQ0MmUzM2Y1NzQyNjI2ZmQ1MzM0YWYzIn0.eyJhdWQiOiIxMjUxMCIsImp0aSI6IjZkMjgzMjk0MDljYThhYmMzMTY5ZjM3YjE0NDdhZjE0ODI1MDQ5ZTk3ZjM0YzBkNTgxNTZiNTRlNTQ0MmUzM2Y1NzQyNjI2ZmQ1MzM0YWYzIiwiaWF0IjoxNjExNjU1MTk2LCJuYmYiOjE2MTE2NTUxOTYsImV4cCI6MTYxNDE2MDc5Niwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.GyGG-KOFjQMecMRrUhLq23MYuG4k1Z6SN0CtfBtWzQCaIXYmxEJNEiX1WX6-vbPxnAPJUDGF2ulc49-AEKMCpBKNT4_BZHnFzFvQxPWUTZJ5tD6JErtdzs6BQGlzYT_n4Bg02UEFcIrrcv6PXqAbh96EHJQZOQa392xK0CCCXbbrgABqRvXQpyfAN3fIj7s_N0sjDGDNAtLbWE9kJAhgi3myRSSHJPGOF5bR4B1ES7EROILpFnvum9Bk0YZo4-zpX0lXTU81nlLuAav4fLsrlEYvq5ZFrE33WtfKTSxra6IViOA9qWVkOcrDAIKHVhGcCarqeoMDZGCbwMbrt1s8PA'
          }
        })
          .then(function (response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
            }
            // Examine the text in the response
            response.json()
              .then(function (data) {
                data.lon = data.geom.coordinates[0]
                data.lat = data.geom.coordinates[1]

                vm.address = data

                vm.isManualAddressModalActive = false
                vm.isFinalMapAddressModalActive = true
                vm.isMapActive = false
              });
          }
          )
          ;
      }
      else if (this.wichGetAddress === 11) {
        const vm = this

        if (!this.address.plaque || !this.address.floorunit) {
          vm.$toast.error('اطلاعات را وارد نمائید');
          return false;
        }

        this.$axios.$post('CreateAddress', vm.address)
          .then((response) => {
            vm.$toast.success(response.message);
            vm.getUserAdresses()

            vm.isMapActive = false
            vm.isFinalMapAddressModalActive = false
            vm.address = {}
          })
          .catch((error) => {
            vm.$toast.error(error.response.data.message);
          });
      }
      else if (this.wichGetAddress === 2) {
        if (!this.address.province || !this.address.city || !this.address.plaque || !this.address.address)
          vm.$toast.error('تمام مقادیر را وارد نمائید');
        else {
          this.$axios.$post('CreateAddress', this.address)
            .then((response) => {
              vm.$toast.success(response.message);
              vm.getUserAdresses()
              vm.isManualAddressModalActive = false
              vm.isMapActive = false
              vm.address = {}
            })
            .catch((error) => {
              vm.$toast.error(error.response.data.message);
            });
        }
      }

    },

    getDeliveryTypes() {
      const vm = this

      this.$axios.$post("DeliveryTypes")
        .then((res) => {
          vm.deliveryTypes = res
        })
    },

    getProvinces() {
      const vm = this

      this.$axios.$get("Provinces")
        .then((res) => {
          vm.provinces = res
        })
    },

    getCities() {
      const vm = this

      this.$axios.$get("Cities")
        .then((res) => {
          vm.cities = res
        })
    },

    getPaymentTypes() {
      const vm = this

      this.$axios.$post("PaymentTypes")
        .then((res) => {
          vm.paymentTypes = res
        })
    },

    getUserAdresses() {
      const vm = this

      this.$axios.$post("UserAdresses")
        .then((res) => {
          vm.userAdresses = res
          if (vm.userAdresses[0])
            vm.formData.fk_useraddress = vm.userAdresses[vm.userAdresses.length - 1].pk_useraddress
        })
    },

    addressDestroy(pk_useraddress) {
      const vm = this

      let text = "از حذف آدرس اطمینان دارید؟";

      if (confirm(text) == true) {
        this.$axios.$post('addressDestroy', { 'pk_useraddress': pk_useraddress })
          .then((res) => {
            vm.$toast.error(res.message);
            vm.getUserAdresses()
          })
          .catch((error) => {
            vm.$toast.error('امکان حذف آدرس به دلیل وجود وابستگی در خرید ها وجود ندارد');
          })
      }
    },

  },

};
</script>