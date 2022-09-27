<template>
    <div class="container">
        <b-modal id="success-modal" hide-footer hide-header>
            <div class="d-block text-center">
                <h3>ลงทะเบียนสำเร็จ</h3>
            </div>
            <b-button
                variant="success"
                class="mt-3 success"
                block
                @click="$bvModal.hide('success-modal')"
                >ปิด</b-button
            >
        </b-modal>

        <form @submit.prevent="submitForm">
            <!-- <error v-if="error" v-bind:error="error" /> -->

            <div class="close-icon">
                <uil-times />
            </div>
            <div class="form-style">
                <div class="header">
                    <div class="register-icon">
                        <h3>ลงทะเบียน</h3>
                        <img src="https://cdn-icons-png.flaticon.com/512/59/59549.png" alt="" />
                    </div>
                </div>
            </div>

            <!--กรอก username-->
            <div class="form-style">
                <label>อีเมล <span class="text-danger">*</span></label>
                <input type="username" placeholder="อีเมล" v-model="form.username" />
                <div class="text-danger" v-if="$v.form.username.$error || !$v.form.username.email">
                    โปรดระบุ Email
                </div>
            </div>

            <!--กรอก password-->
            <div class="form-style">
                <label>รหัสผ่าน <span class="text-danger">*</span></label>
                <input type="password" placeholder="รหัสผ่าน" v-model="form.password" />
                <span v-if="$v.form.password.$error" class="text-danger"
                    >รหัสผ่านจะต้องประกอบด้วยตัวอักษร a-z และ 1-9 ควรมีความยาวไม่ต่ำกว่า 6 ตัว</span
                >
                <br />
                <b-form-text id="password-help-block"
                    >*รหัสผ่านจะต้องประกอบด้วยตัวอักษร a-z และ 1-9 ควรมีความยาวไม่ต่ำกว่า 6
                    ตัว*</b-form-text
                >
            </div>

            <!--confirm password-->
            <div class="form-style">
                <label>ยืนยันรหัสผ่าน <span class="text-danger">*</span></label>
                <input
                    type="password"
                    placeholder="ยืนยันรหัสผ่าน"
                    v-model="$v.form.password_confirm.$model"
                />
                <span v-if="$v.form.password_confirm.$error" class="text-danger"
                    >รหัสผ่านไม่ตรงกัน</span
                >
            </div>

            <!--วันเกิด-->
            <div class="form-style">
                <label>วันเกิด <span class="text-danger">*</span></label>
                <div class="birthday-date">
                    <select name="day" id="day" v-model="form.day" ref="month">
                        <option value="0">วัน</option>
                        <option v-for="(day, index) in days" :key="index" :value="day">
                            {{ day.text }}
                        </option>
                        <div></div>
                    </select>
                    <select name="month" id="month" v-model="form.month">
                        <option value="0">เดือน</option>
                        <option v-for="(month, index) in months" :key="index" :value="month.value">
                            {{ month.text }}
                        </option>
                    </select>
                    <select name="year" id="year" v-model="form.year">
                        <option value="0">ปี</option>
                        <option v-for="(year, index) in years" :key="index">
                            {{ year }}
                        </option>
                    </select>
                </div>
                <span
                    v-if="$v.form.day.$error || $v.form.month.$error || $v.form.year.$error"
                    class="text-danger"
                    >โปรดเลือกวันเกิด</span
                >
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
                <span v-if="!$v.form.status.required && $v.form.status.$dirty" class="text-danger"
                    >โปรดยอมรับเงื่อนไข</span
                >
            </div>

            <!--ปุ่มลงทะเบียน-->
            <div class="form-style">
                <b-button type="submit">ลงทะเบียน</b-button>
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
import { required, minLength, email, sameAs, helpers } from "vuelidate/lib/validators";
import { UserApiService } from "@/services/user-api.service";
import moment from "moment";
import dayjs from "dayjs";
const passwordRegex = helpers.regex("password", /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/); // import Error from "../Error/Error.vue";

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
            day: "",
            month: "",
            year: "",
            birthday: "",
            telephone: "",
        },
        options: [
            { text: "ชาย", value: "man" },
            { text: "หญิง", value: "woman" },
        ],
        status: false,
        error: "",
    }),
    computed: {
        // ------------------------ใช้ DAY JS ------------------------ //
        months() {
            const maxMonth = 12;
            const months = Array.from(Array(maxMonth).keys()).map((item) => {
                const value = item + 1;
                const text = value < 10 ? `0${value}` : value;

                return { value, text };
            });

            return months;
        },
        days() {
            const { month, year } = this.form;
            const daysInMonth = dayjs()
                .set("month", month - 1)
                .set("year", year)
                .daysInMonth();

            const days = Array.from(Array(daysInMonth).keys()).map((item) => {
                const value = item + 1;

                //เช็คว่าถ้าน้อยกว่า 10 ให้ใส่ 0 นำหน้า
                const text = value < 10 ? `0${value}` : value;

                return { value, text };
            });
            console.log("log ~ days ~ days", days);
            return days;
        },
        years() {
            const startYear = 1950;
            const maxYear = dayjs().year();
            const range = maxYear - startYear;
            const years = Array.from(Array(range).keys()).map((value) => (value += startYear));

            return years;
        },

        // days() {
        //     // const
        // }
    },
    validations: {
        form: {
            username: {
                required,
                email,
            },
            password: {
                required,
                sameAsPassword: sameAs("password"),
                minLength: minLength(6),
                passwordRegex,
            },
            password_confirm: {
                required,
                sameAsPassword: sameAs("password"),
                minLength: minLength(6),
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
        submitForm() {
            // format date
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

            //alert success
            this.$bvModal.show("success-modal");
            
            //ยิง axios
            // await this.userApiService.register(this.form);
            // this.$router.push("/login");
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

        //   handleChangeDay(day) {
        //       console.log("day", day);

        //       // return day.splice(10)
        //   },
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

.form-style button {
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
