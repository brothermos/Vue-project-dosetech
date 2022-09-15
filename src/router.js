import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home/Home.vue";
import Login from "./components/Login/Login.vue";
import Register from "./components/Login/Register.vue";
import ForgotPassword from "./components/Login/ForgotPassword.vue";
import ChangePassword from "./components/Login/ChangePassword.vue";
import User from "./components/User/User.vue";
import UserProfile from "./components/User/UserProfile.vue";
import UserChangePassword from "./components/User/UserChangePassword.vue";
import UserAddress from "./components/User/UserAddress.vue";
Vue.use(Router);

export default new Router({
    routes: [
        { path: "/", component: Home },
        { path: "/login", component: Login },
        { path: "/signup", component: Register },
        { path: "/forgot", component: ForgotPassword },
        { path: "/changepassword", component: ChangePassword },
        { path: "/user", component: User },
        { path: "/user/profile", component: UserProfile },
        { path: "/user/changepassword", component: UserChangePassword },
        { path: "/user/address", component: UserAddress },
    ],
});
