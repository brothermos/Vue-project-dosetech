<template>
    <div class="container">
        <form>
            <div class="form-style">
                <div class="changepassword-icon">
                    <h3>ตั้งรหัสผ่านใหม่</h3>
                    <!-- <img src="https://cdn-icons-png.flaticon.com/512/59/59549.png" alt="" /> -->
                </div>
            </div>

            <!-- password -->
            <div class="form-style">
                <label>รหัสผ่าน <span class="text-danger">*</span></label>
                <input type="password" placeholder="รหัสผ่าน" />
            </div>

            <!-- confirm_password -->
            <div class="form-style">
                <label>ยืนยันรหัสผ่าน <span class="text-danger">*</span></label>
                <input type="password" placeholder="ยืนยันรหัสผ่าน" />
            </div>

            <!-- reset_button -->
            <button>รีเซ็ต</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "ChangePassword",
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
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
</style>
