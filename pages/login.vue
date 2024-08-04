  <template>
  <section>
    <client-only>
      <div class="columns is-full-mobile px-6 is-centered my-6 py-5">
        <div class="column is-4 box" v-if="!codeIsSend">
          <div class="has-text-centered is-size-5 py-4">
            جهت خرید شماره موبایل خود را وارد نمائید
          </div>
          <div>
            <input v-model="mobile" class="input is-medium is-rounded" type="text" inputmode="numeric" pattern="[0-9]*"
              ref="refmobile" placeholder="9121234567">
            </input>
          </div>
          <div class="buttons mt-6 is-flex is-justify-content-center">
            <button class="button is-info is-light pb-5 pt-4 px-6 is-size-5 mx -4" @click="verifysmssender()">ارسال کد
            </button>
          </div>
          <div class="my-5 has-text-centered is-clickable" @click="isLawModalActive = !isLawModalActive">
            قوانین و مقررات
          </div>
        </div>
        <div class="column is-half box" v-if="codeIsSend">
          <div class="is-size-5  mb-5 mt-4 is-size-4 my-4 has-text-danger-dark">
            کد ارسالی به شماره
            {{ mobile }}
            را وارد نمائید
          </div>
          <div>
            <form>
              <input @input="verify" class="input is-medium is-rounded" inputmode="numeric" type="text" pattern="\d{6}"
                autocomplete="one-time-code" v-model="confirmationcode" ref="refconfirmationcode">
              </input>
            </form>
          </div>
          <div class="buttons mt-6 is-flex is-justify-content-center">
            <button class="button is-info is-light pb-5 pt-4 px-6 is-size-5 mx -4" @click="codeverificator()">
              ورود
            </button>
            <p class="px-5" v-if="!canResend" style="cursor: pointer;">جهت ارسال مجدد</p>
            <p class="px-5" v-if="!canResend">{{ counter }}</p>
            <button v-if="canResend" class="button is-info is-light px-6 is-size-5 mx -4" @click="verifysmssender()">
              ارسال مجدد
            </button>
          </div>
          <div class="columns mt-6 is-flex is-justify-content-center">
            <button class="button is-info is-light px-6 is-size-5 mx -4" @click="codeIsSend = !codeIsSend">
              ویرایش شماره موبایل
            </button>
          </div>
        </div>
      </div>
      <div class="modal" :class="{ 'is-active': isLawModalActive }">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">شرایط استفاده و حریم خصوصی</p>
            <button class="delete" @click="isLawModalActive = false" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            قوانین استفاده از خدمات اپلیکیشن زیتون شاپ
            <br />
            - با توجه به اینکه کلیه محصولات فروشگاه زیتون شاپ اصل می باشد، خریدار می تواند کلیه موارد مربوطه به بررسی
            اصالت کالا را با پشتیبانی فروشگاه در مراحل پیش از خرید مورد بررسی قرار دهد.
            <br />
            - باید تاکید شود که حفظ و نگهداری رمز عبور و نام کاربری بر عهده کاربران است و لذا برای جلوگیری از هرگونه
            سواستفاده احتمالی، کاربران نباید آن اطلاعات را برای شخص دیگری فاش کنند. در صورتی که کاربر شماره همراه خود
            را به فردی دیگر واگذار کرد، جهت جلوگیری از سواستفاده یا مشکلات احتمالی کاربران باید شماره موبایل خود را در
            پروفایل تغییر داده و شماره جدیدی ثبت نمایند.
            <br />
            - زیتون شاپ برای پردازش و ارسال سفارش، اطلاعاتی مانند آدرس، شماره تلفن و ایمیل را نیاز دارد و تمامی این
            اطلاعات نزد توسعه‌دهنده محفوظ است، به هیچ عنوان از آن‌ها سواستفاده نخواهد شد و در اختیار شخص یا سازمان
            ثالثی قرار نخواهد گرفت.
            <br />
            - زیتون شاپ برای حفاظت و نگهداری اطلاعات و حریم شخصی کاربران همه توان خود را به کار می‌گیرد و امیدوار است
            که تجربه خریدی امن، راحت و خوشایند را برای همه کاربران فراهم آورد.
          </section>
        </div>
      </div>
    </client-only>
  </section>
</template>
<script>
export default {
  head() {
    return {
      title: "زیتون شاپ - صفحه ورود",
    }
  },
  data() {
    return {
      mobile: "",
      confirmationcode: "",
      counter: "",
      canResend: false,
      codeIsSend: false,
      isLawModalActive: false,

      email: "",
      password: "",
    };
  },
  mounted: function () {
    const vm = this

    setTimeout(() => {
      vm.$refs.refmobile.focus();
    }, 2000);
  },
  methods: {
    verifysmssender() {
      this.$toast.success('در حال بررسی شماره موبایل');

      let vm = this;

      var mobile = this.mobile
      var firstchar = this.mobile.charAt(0)
      if (firstchar == "0" || firstchar == "۰")
        mobile = mobile.substring(1);
      mobile = this.toEnglishDigits(mobile)

      if (mobile.length != 10)
        this.$toast.error("شماره موبایل را صحیح وارد نمائید", "danger");
      else {
        this.$axios
          .$post("auth/VerifySmsSender", {
            mobile: mobile,
          })
          .then((response) => {
            vm.$toast.success(response.message);
            vm.countdown()
            vm.codeIsSend = true
          })
          .then(() => {
            vm.$refs.refconfirmationcode.focus();
          })
          .catch((error) => {
            vm.$toast.error('مشکل در ارسال کد', 'danger');
          });
      }
    },

    codeverificator() {
      this.$toast.success('در حال بررسی کد وارد شده');

      let vm = this;

      var mobile = this.mobile
      var firstchar = this.mobile.charAt(0)
      if (firstchar == "0" || firstchar == "۰")
        mobile = mobile.substring(1);
      mobile = this.toEnglishDigits(mobile)

      let confirmationcode = this.toEnglishDigits(this.confirmationcode)

      if (confirmationcode.length != 4)
        this.$toast.error("کد صحیح نمی باشد");
      else {
        this.$auth
          .loginWith("laravelJWT", {
            data: {
              confirmationcode: confirmationcode,
              mobile: mobile,
            }
          })
          .then((response) => {
            vm.$toast.success('به حساب کاربری وارد شدید');
            vm.$store.commit("saleEmptier");
            vm.codeIsSend = true
            vm.$router.push('/store/card');
          })
          .catch((error) => {
            vm.$toast.error(error.response.data.message)
          });
      }
    },

    verify() {
      const vm = this

      let confirmationcode = String(this.confirmationcode)

      if (confirmationcode.length === 4) {
        this.codeverificator()
      }
    },
    countdown() {
      let vm = this;
      vm.canResend = false
      vm.counter = '1:00';

      // Set the date we're counting down to
      var date = new Date();
      var yy = date.getFullYear();
      var mm = date.getMonth();
      var hh = date.getHours();
      var dd = date.getDate();
      var mt = date.getMinutes();
      var d = mt + 1
      var sec = date.getSeconds() + 1

      var countDownDate = new Date(yy, mm, dd, hh, d, sec).getTime();

      // Update the count down every 1 second
      var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        vm.counter = minutes + ":" + seconds
        // Output the result in an element with id="demo"
        /*document.getElementById("demo").innerHTML = days + "d " + hours + "h "
        +  + "m " + seconds + "s ";*/

        // If the count down is over, write some text 
        if (distance < 0) {
          clearInterval(x);
          vm.canResend = true
          //document.getElementById("demo").innerHTML = "EXPIRED";
        }
      }, 1000);
    },

  },
};
</script>
