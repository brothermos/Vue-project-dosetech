<template>
   <div class="container">
      <form @submit.prevent="submitForm">
         <!-- <error v-if="error" v-bind:error="error" /> -->
         <div class="close-icon">
            <uil-times />
         </div>
         <div class="form-style">
            <div class="header">
               <div class="register-icon">
                  <h3>ลงทะเบียน</h3>
                  <img
                     src="https://cdn-icons-png.flaticon.com/512/59/59549.png"
                     alt=""
                  />
               </div>
            </div>
         </div>

         <!--กรอก username-->
         <div class="form-style">
            <label>อีเมล <span class="text-danger">*</span></label>
            <input
               type="username"
               placeholder="อีเมล"
               v-model="form.username"
            />
            <div
               class="text-danger"
               v-if="!$v.form.username.required || !$v.form.username.email"
            >
               โปรดระบุ Email
            </div>
         </div>

         <!--กรอก password-->
         <div class="form-style">
            <label>รหัสผ่าน <span class="text-danger">*</span></label>
            <input
               type="password"
               placeholder="รหัสผ่าน"
               v-model="form.password"
            />
            <span
               v-if="!$v.form.password.required && $v.form.password.$dirty"
               class="text-danger"
               >โปรดระบุ Password</span
            >

            <span
               v-if="
                  !$v.form.password.minLength &&
                  !$v.form.password.passwordRegex &&
                  $v.form.password.$dirty
               "
               class="text-danger"
               >รหัสผ่านควรมีความยาวไม่ต่ำกว่า
               {{ $v.form.password.$params.minLength.min }} ตัวอักษร</span
            >
            <br />
            <b-form-text id="password-help-block"
               >*รหัสผ่านจะต้องประกอบด้วยตัวอักษร a-z และ 1-9
               ควรมีความยาวไม่ต่ำกว่า 6 ตัว*</b-form-text
            >
         </div>

         <!--confirm password-->
         <div class="form-style">
            <label>ยืนยันรหัสผ่าน <span class="text-danger">*</span></label>
            <input
               type="password"
               placeholder="ยืนยันรหัสผ่าน"
               v-model="form.password_confirm"
            />
            <span
               v-if="!$v.form.password_confirm.sameAsPassword"
               class="text-danger"
               >รหัสผ่านไม่ตรงกัน</span
            >
         </div>

         <!--วันเกิด-->
         <div class="form-style">
            <label>วันเกิด <span class="text-danger">*</span></label>
            <div class="birthday-date">
               <select name="day" id="day" v-model="form.day" ref="month">
                  <option value="0">วัน</option>
                  <option
                     v-for="(day, index) in list.day"
                     :key="index"
                     :value="day"
                  >
                     {{ day.text }}
                  </option>
               </select>
               <select name="month" id="month" v-model="form.month">
                  <option value="0">เดือน</option>
                  <option
                     v-for="(month, index) in list.month"
                     :key="index"
                     :disabled="form.day.value > month.days && month.days != 0"
                  >
                     {{ month.text }}
                  </option>
               </select>
               <select name="year" id="year" v-model="form.year">
                  <option value="0">ปี</option>
                  <option v-for="(year, index) in getYear()" :key="index">
                     {{ year }}
                  </option>
               </select>
            </div>
         </div>

         <!--เพศ-->
         <div class="form-style">
            <div class="gender-style">
               <label>เพศ *</label>
               <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                     v-model="form.gender"
                     :options="options"
                     :aria-describedby="ariaDescribedby"
                     name="plain-inline"
                     plain
                  ></b-form-radio-group>
               </b-form-group>
            </div>
         </div>

         <!--ยอมรับเงื่อนไข-->
         <div class="form-style">
            <b-form-checkbox
               id="checkbox-1"
               v-model="form.status"
               name="checkbox-1"
               value="true"
               unchecked-value="false"
            >
               ยอมรับข้อกำหนดและเงื่อนไขในการใช้งาน
               <a href="">เพิ่มเติม</a>
            </b-form-checkbox>
            <span
               v-if="!$v.form.status.required && $v.form.status.$dirty"
               class="text-danger"
               >โปรดยอมรับเงื่อนไข</span
            >
         </div>

         <!--ปุ่มลงทะเบียน-->
         <div class="form-style">
            <b-button>ลงทะเบียน</b-button>
            <div class="register-container">
               <b-form-text>เป็นสมาชิกแล้ว?</b-form-text>
               <router-link to="/login">เข้าสู่ระบบ</router-link>
            </div>
         </div>
      </form>
   </div>
</template>

<script>
import { UilTimes } from "@iconscout/vue-unicons";
import {
   required,
   minLength,
   email,
   sameAs,
   helpers,
} from "vuelidate/lib/validators";
import { UserApiService } from "@/services/user-api.service";
import moment from "moment";

const passwordRegex = helpers.regex(
   "passwordRegex",
   /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/
); // import Error from "../Error/Error.vue";

export default {
   name: "Register",
   components: {
      // Error,
      UilTimes,
   },
   data: () => ({
      userApiService: new UserApiService(),
      form: {
         username: "",
         password: "",
         password_confirm: "",
         gender: "man",
         day: { value: 0, text: "00" },
         month: { value: 0, text: "00", days: 0 },
         year: { value: 0, text: "year" },
         birthday: "",
         telephone: "",
      },
      list: {
         day: [
            { value: 1, text: "01" },
            { value: 2, text: "02" },
            { value: 3, text: "03" },
            { value: 4, text: "04" },
            { value: 5, text: "05" },
            { value: 6, text: "06" },
            { value: 7, text: "07" },
            { value: 8, text: "08" },
            { value: 9, text: "09" },
            { value: 10, text: "10" },
            { value: 11, text: "11" },
            { value: 12, text: "12" },
            { value: 13, text: "13" },
            { value: 14, text: "14" },
            { value: 15, text: "15" },
            { value: 16, text: "16" },
            { value: 17, text: "17" },
            { value: 18, text: "18" },
            { value: 19, text: "19" },
            { value: 20, text: "20" },
            { value: 21, text: "21" },
            { value: 22, text: "22" },
            { value: 23, text: "23" },
            { value: 24, text: "24" },
            { value: 25, text: "25" },
            { value: 26, text: "26" },
            { value: 27, text: "27" },
            { value: 28, text: "28" },
            { value: 29, text: "29" },
            { value: 30, text: "30" },
            { value: 31, text: "31" },
         ],
         month: [
            { value: 1, text: "01", days: 31 },
            { value: 2, text: "02", days: 29 },
            { value: 3, text: "03", days: 31 },
            { value: 4, text: "04", days: 30 },
            { value: 5, text: "05", days: 31 },
            { value: 6, text: "06", days: 30 },
            { value: 7, text: "07", days: 31 },
            { value: 8, text: "08", days: 31 },
            { value: 9, text: "09", days: 30 },
            { value: 10, text: "10", days: 31 },
            { value: 11, text: "11", days: 30 },
            { value: 12, text: "12", days: 31 },
         ],
         year: [{ value: 0, text: "year" }],
      },
      options: [
         { text: "ชาย", value: "man" },
         { text: "หญิง", value: "woman" },
      ],
      status: false,
      error: "",
   }),
   validations: {
      form: {
         username: {
            required,
            email,
         },
         password: {
            required,
            minLength: minLength(6),
            passwordRegex,
         },
         password_confirm: {
            required,
            sameAsPassword: sameAs("password"),
            passwordRegex,
         },
         day: { required },
         month: { required },
         year: { required },

         status: {
            required,
         },
      },
   },
   methods: {
      async submitForm() {
         // format ค่าวันเกิด
         const birthday = moment(
            this.form.day + "/" + this.form.month + 1 + "/" + this.form.year,
            "D/M/YYYY"
         ).format();
         console.log("birthday", birthday);

         this.form.birthday = birthday;
         console.log(this.form);

         // method validate
         this.$v.form.$touch();
         if (this.$v.form.$error) {
            return;
         }

         //ยิง axios
         await this.userApiService.register(this.form);
         this.$router.push("/login");
      },

      // fucntion ปี
      getYear() {
         let year = [];
         for (let i = 1950; i <= 2021; i++) {
            year.push(i);
         }
         // console.log(year);
         return year;
      },

      //   handleChangeDay(val) {
      //      if (val.value > this.form.month.days)
      //         this.form.month = { value: 0, text: "00", days: 0 };

      //      if (
      //         val.value == 29 &&
      //         this.form.month.value == 2 &&
      //         (this.form.year.value % 4 == 0 &&
      //            !this.form.year.value % 100 == 0 &&
      //            !this.form.year.value % 400 == 0) == false
      //      )
      //         this.form.year = { value: 0, text: "year" };
      //   },

      //   handleChangeMonth(val) {
      //      if (
      //         this.form.day.value == 29 &&
      //         val.value == 2 &&
      //         (this.form.year.value % 4 == 0 &&
      //            !this.form.year.value % 100 == 0 &&
      //            !this.form.year.value % 400 == 0) == false
      //      )
      //         this.form.year = { value: 0, text: "year" };
      //   },
      //alert success register
      makeToast(variant = null) {
         this.$bvToast.toast("Register", {
            title: `Register ${variant || "default"}`,
            variant: variant,
            solid: true,
         });
      },
   },

   created() {
      this.submitted = true;
      return this.$v.$touch();
   },
   computed: {
      isDisabled() {
         return this.$v.$invalid;
      },
   },
};
</script>

<style scoped>
* {
   box-sizing: border-box;
}

.container {
   margin-top: 140px;
   border: 1px solid #16274a;
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
   width: 400px;
   background-color: white;
   display: flex;
   justify-content: center;
}

form {
   padding: 5px 20px;
}

.form-style {
   position: relative;
   margin-bottom: 10px;
   padding-bottom: 10px;
}

.form-style label {
   display: block;
}

.form-style input {
   width: 100%;
   padding: 5px 5px;
}
.close-icon {
   text-align: right;
   margin-top: 1rem;
}

.birthday-date {
   display: flex;
   justify-content: space-around;
}

.birthday-date select {
   width: 100%;
   padding: 5px 0;
}

#day,
#month {
   margin-right: 15px;
}

.gender-style {
   display: flex;
}

.gender-style label {
   padding-right: 15px;
}

button {
   width: 100%;
   border: none;
   padding-top: 8px;
   padding-bottom: 8px;
   background-color: #16274a;
   color: white;
}

a {
   color: black;
}

.register-container {
   display: flex;
   justify-content: center;
}

.register-container a {
   padding-left: 10px;
}

.register-icon {
   display: flex;
}
img {
   width: 68%;
   height: 2.5rem;
   padding-left: 1rem;
}
</style>
