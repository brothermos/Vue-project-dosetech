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
                <input type="username" placeholder="อีเมล" v-model="username" />
                <span
                    v-if="
                        (!$v.username.required || !$v.username.email) &&
                        $v.username.$dirty
                    "
                    class="text-danger"
                    >โปรดระบุ Email</span
                >
            </div>

            <!--กรอก password-->
            <div class="form-style">
                <label>รหัสผ่าน <span class="text-danger">*</span></label>
                <input
                    type="password"
                    placeholder="รหัสผ่าน"
                    v-model="password"
                />
                <span
                    v-if="!$v.password.required && $v.password.$dirty"
                    class="text-danger"
                    >โปรดระบุ Password</span
                >

                <span
                    v-if="!$v.password.minLength && $v.password.$dirty"
                    class="text-danger"
                    >รหัสผ่านควรมีความยาวไม่ต่ำกว่า
                    {{ $v.password.$params.minLength.min }} ตัวอักษร</span
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
                    v-model="password_confirm"
                />
                <span
                    v-if="!$v.password_confirm.sameAsPassword"
                    class="text-danger"
                    >รหัสผ่านไม่ตรงกัน</span
                >
            </div>

            <!--วันเกิด-->
            <div class="form-style">
                <label>วันเกิด <span class="text-danger">*</span></label>
                <div class="birthday-date">
                    <select name="day" id="day" v-model="day">
                        <option value="0">วัน</option>
                        <option v-for="(day, index) in 31" :key="index">
                            {{ day }}
                        </option>
                    </select>
                    <select name="month" id="month" v-model="month">
                        <option value="0">เดือน</option>
                        <option v-for="(month, index) in 12" :key="index">
                            {{ month }}
                        </option>
                    </select>
                    <select name="year" id="year" v-model="year">
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
                            v-model="selected"
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
                    v-model="status"
                    name="checkbox-1"
                    value="true"
                    unchecked-value="false"
                >
                    ยอมรับข้อกำหนดและเงื่อนไขในการใช้งาน
                    <a href="">เพิ่มเติม</a>
                </b-form-checkbox>
            </div>

            <!--ปุ่มลงทะเบียน-->
            <div class="form-style">
                <button>ลงทะเบียน</button>
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
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import axios from "axios";
// import Error from "../Error/Error.vue";
export default {
    name: "Register",
    components: {
        // Error,
        UilTimes,
    },
    data() {
        return {
            username: "",
            password: "",
            password_confirm: "",
            selected: "man",
            day: "0",
            month: "0",
            year: "0",
            options: [
                { text: "ชาย", value: "man" },
                { text: "หญิง", value: "woman" },
            ],
            status: false,
            error: "",
        };
    },
    validations: {
        username: {
            required,
            email,
        },
        password: {
            required,
            minLength: minLength(6),
        },
        password_confirm: {
            required,
            sameAsPassword: sameAs("password"),
        },
        status: {
            required,
        },
    },
    methods: {
        async submitForm() {
            const data = {
                username: this.username,
                password: this.password,
                password_confirm: this.password_confirm,
                day: this.day,
                month: this.month,
                year: this.year,
                selected: this.selected,
                status: this.status,
            };
            this.$emit("save", data);
            console.log(data);

            // axios ยิง api

            await axios.post("register", data, {
                headers: { "API-KEY": "cDoog8B7yP04T9uJ" },
            });
            this.$router.push("/login");

            // method validate
            this.$v.$touch();
            if (!this.$v.$invalid) {
                console.log();
            }
        },

        getYear() {
            let year = [];
            for (let i = 1950; i <= 2022; i++) {
                year.push(i);
            }
            // console.log(year);
            return year;
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
