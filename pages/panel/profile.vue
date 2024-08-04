<template>
    <section class="mt-3 py-4 px-4">
        <h1 class="is-size-3 has-text-centered my-5 box">پروفایل کاربری</h1>
        <div class="columns is-multiline">
            <div class="column is-one-quarter pb-0 pt-0">
                <div class="field">
                    <label class="label">نام</label>
                    <div class="control">
                        <input class="input" v-model="formData.name" :disabled="formData.name" required>
                    </div>
                </div>
            </div>
            <div class="column is-one-quarter pb-0 pt-0">
                <div class="field">
                    <label class="label">نام خانوادگی</label>
                    <div class="control">
                        <input class="input" v-model="formData.lastname" :disabled="formData.lastname" required>
                    </div>
                </div>
            </div>
            <div class="column is-one-quarter pb-0 pt-0">
                <div class="field">
                    <label class="label">کد ملی</label>
                    <div class="control">
                        <input class="input" v-model="formData.nationalcode" :disabled="formData.nationalcode">
                    </div>
                </div>
            </div>
            <div class="column is-one-quarter pb-0 pt-0">
                <div class="field">
                    <label class="label">موبایل</label>
                    <div class="control">
                        <input class="input" v-model="formData.mobile" disabled required>
                    </div>
                </div>
            </div>
            <div class="column is-one-quarter pb-0 pt-0">
                <div class="field">
                    <label class="label">ایمیل</label>
                    <div class="control">
                        <input class="input" v-model="formData.email" required>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <hr>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>آدرس</th>
                    <th>حذف</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in userAddresses" :key="row.address">
                    <td>{{ row.address }}</td>
                    <td>
                        <span class="icon has-text-danger">
                            <i class="fas fa-trash"></i>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="columns is-flex is-justify-content-center">
            <div class="column is-6">
                <div class="field">
                    <label class="label">آدرس</label>
                    <div class="control">
                        <textarea class="textarea" maxlength="5000" v-model="address"></textarea>
                    </div>
                </div>
            </div>
            <div class="column is-2">
                <button class="button is-light" @click="submit">افزودن</button>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: ["mode", "formdata"],

    created: function () {
        this.formData = this.$auth.user
        this.getUserAddress(this.$auth.user.id)
    },
    data() {
        return {
            genders: {},
            persontypes: {},

            formData: {},

            formData: {},
            userAddresses: [],
            address: '',
        };
    },

    methods: {
        componentcellclicked(row, column, rowIndex, columnIndex) {
            if (columnIndex === 1) {
                this.$buefy.dialog.confirm({
                    message: 'از حذف اطمینان دارید؟',
                    cancelText: 'خیر',
                    confirmText: 'بله',
                    onConfirm: () => {
                        console.log(row)
                        this.destroy(row.pk_useraddress)
                    }
                })
            }
        },
        submit() {
            const vm = this
            if (!this.address)
                vm.$toast.error('آدرس را انتخاب نمائید');
            else {
                this.$axios.$post('CreateAddressOnForm',
                    {
                        address: this.address,
                        fk_user: this.formData.id
                    }
                )
                    .then((response) => {
                        vm.$toast.error(response.message, "success");
                        vm.getUserAddress(this.formData.id)
                    })
                    .catch((error) => {
                        vm.$toast.error(error.response.data.error);
                    })
            }
        },
        destroy(pk) {
            const vm = this

            this.$axios.$post('addressDestroy', { pk_useraddress: pk })
                .then((response) => {
                    vm.$toast.success(response.message);
                    vm.getUserAddress(this.formData.id)
                })
                .catch((error) => {
                    vm.$toast.error(error.response.data.error);
                })
        },

        //submit form data

        submitForm(mode) {

            //validation

            if (!this.formData.nationalcode)
                this.$toast.error("کد ملی را وارد نمائید");
            else if (!this.nationalCodeChecker(this.formData.nationalcode))
                this.$toast.error("کد ملی را به شکل صحیح وارد نمائید");
            else if (!this.formData.name)
                this.$toast.error("نام را وارد نمائید");
            else if (!this.formData.lastname)
                this.$toast.error("نام خانوادگی را وارد نمائید");
            else if (!this.formData.en_name)
                this.$toast.error("نام لاتین را انتخاب نمائید");
            else if (!this.formData.en_name)
                this.$toast.error("نام خانوادگی لاتین را انتخاب نمائید");

            else {
                let vm = this;

                this.$axios.$post(mode + "User", this.formData)
                    .then(function (response) {
                        vm.$toast.success(response.message,);
                    })
                    .catch(function (error) {
                        vm.$toast.error("مقادیر صحیح وارد نمائید");
                    });
            }
        },
        getUserAddress(id) {
            const vm = this

            this.$axios.$post("UserAdresses", { userid: id })
                .then((res) => {
                    vm.userAddresses = res
                })
        },
        nationalCodeChecker(code) {
            var L = code.length;

            if (L < 8 || parseInt(code, 10) == 0) return false;
            code = ('0000' + code).substr(L + 4 - 10);
            if (parseInt(code.substr(3, 6), 10) == 0) return false;
            var c = parseInt(code.substr(9, 1), 10);
            var s = 0;
            for (var i = 0; i < 9; i++)
                s += parseInt(code.substr(i, 1), 10) * (10 - i);
            s = s % 11;
            return (s < 2 && c == s) || (s >= 2 && c == (11 - s));
            return true;
        },
    },

};
</script>


