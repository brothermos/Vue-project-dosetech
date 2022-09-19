<template>
    <div class="container">
        <form @submit.prevent="submitForm">
            <div class="form-style">
                <div class="forgot-password-icon">
                    <h3>ลืมรหัสผ่าน</h3>
                    <img src="https://cdn-icons-png.flaticon.com/512/59/59549.png" alt="" />
                </div>
            </div>

            <!-- Reset_email -->
            <div class="form-style">
                <label>อีเมล <span class="text-danger">*</span></label>
                <input type="email" placeholder="อีเมล" />
            </div>

            <!-- Login_button -->
            <div class="form-style">
                <button>รีเซ็ตรหัสผ่าน</button>
                <div class="reset-container">
                    <b-form-text>เป็นสมาชิกอยู่แล้ว?</b-form-text>
                    <a href="#/login">เข้าสู่ระบบ</a>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    methods: {
        submitForm() {
            this.$router.push("/changepassword");
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    margin-top: 325px;
}
form {
    border: 1px solid #16274a;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    width: 400px;
    padding: 20px 20px;
    background-color: white;
}
.form-style {
    display: flex;
    flex-direction: column;
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
    margin-top: 10px;
    background-color: #16274a;
    color: white;
}
.reset-container {
    display: flex;
    justify-content: center;
}

.reset-container a {
    padding-left: 10px;
}
a {
    color: black;
}

.forgot-password-icon {
    display: flex;
}

img {
    width: 65%;
    height: 2.5rem;
    padding-left: 1rem;
}
</style>
