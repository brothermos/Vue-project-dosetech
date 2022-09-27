<template>
   <div class="container">
      <form @submit.prevent="submitForm">
         <error v-if="error" v-bind:error="error" />
         <div class="form-style">
            <div class="login-icon">
               <h3>เข้าสู่ระบบ</h3>
               <img
                  src="https://cdn-icons-png.flaticon.com/512/59/59549.png"
                  alt=""
               />
            </div>
         </div>

         <!-- login_username -->
         <div class="form-style">
            <label for="login-username-input"
               >อีเมล <span class="text-danger">*</span></label
            >
            <input type="email" placeholder="อีเมล" v-model="username" />
            <div class="text-danger" v-if="!$v.username.required">โปรดระบุ email</div>
         </div>

         <!-- login_password -->
         <div class="form-style">
            <label for="login-password-input"
               >รหัสผ่าน <span class="text-danger">*</span></label
            >
            <input type="password" placeholder="รหัสผ่าน" v-model="password" />
            <div class="text-danger" v-if="!$v.password.required">โปรดระบุ password</div>
         </div>

         <!-- Forgot_password -->
         <b-form-text class="form-style">
            <div class="forgot-password">
               <router-link to="/forgot">ลืมรหัสผ่าน ?</router-link>
            </div>
         </b-form-text>

         <!-- Login_button -->
         <div class="form-style">
            <button>เข้าสู่ระบบ</button>
            <div class="register-container">
               <b-form-text>ลูกค้าใหม่?</b-form-text>
               <router-link to="/signup">สมัครสมาชิก</router-link>
            </div>
         </div>
      </form>
   </div>
</template>

<script>
import axios from "axios";
import Error from "../Error/Error.vue";
import { required } from "vuelidate/lib/validators";
export default {
    name: "Login",
    components: {
        Error,
    },
    data() {
        return {
            username: "",
            password: "",
            error: "",
        };
    },
    methods: {
        async submitForm() {
            const data = {
                username: this.username,
                password: this.password,
            };
            this.$emit("save", data);
            try {
                const response = await axios.post("login", data, {
                    headers: { "API-KEY": "cDoog8B7yP04T9uJ" },
                });

                localStorage.setItem("token", response.data.detail.token);
                this.$router.push("/user");
            } catch (e) {
                this.error = "อีเมล/รหัสผ่านไม่ถูกต้อง";
            }
        },
    },
    validations: {
        username: {
            required
        },
        password: {
            required
        }
    }
};
</script>

<style scoped>
.container {
   display: flex;
   justify-content: center;
   margin-top: 300px;
}

form {
   border: 1px solid #16274a;
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
   width: 400px;
   padding: 20px 20px;
   background-color: white;
}

.form-style {
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

button {
   width: 100%;
   border: none;
   padding-top: 8px;
   padding-bottom: 8px;
   background-color: #16274a;
   color: white;
}

.register-container {
   display: flex;
   justify-content: center;
}

.register-container a {
   padding-left: 10px;
}

a {
   color: black;
}

.login-icon {
   display: flex;
}
img {
   width: 70%;
   height: 2.5rem;
   padding-left: 1rem;
}
</style>
