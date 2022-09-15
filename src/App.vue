<template>
    <div id="app">
        <Navbar />
        <!-- <div class="auth-wrapper"> -->
        <router-view />
        <!-- </div> -->
    </div>
</template>

<script>
import Navbar from "./components/Navbar/Navbar.vue";
// import Home from "./components/Home.vue";
// import Register from "./components/Register.vue";
// import Login from "./components/Login.vue";
export default {
    name: "App",
    components: {
        Navbar,
        // Home,
        // Register,
        // Login,
    },
};
</script>

<style>
* {
    box-sizing: border-box;
}

body {
    background: #1c8ef9 !important;
    /* min-height: 100vh; */
}

body,
html,
#app {
    height: 100%;
}

/* #app {
    text-align: center;
} */

.auth-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

/* .auth-inner {
    width: 450px;
    margin: auto;
    background: #ffffff;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
    padding: 40px 55px 45px 55px;
    border-radius: 15px;
} */
</style>
