<template>
    <div class="main-container">
        <b-row class="sub-container">
            <!-- -->
            <div class="profile-header">
                <h2>บัญชีผู้ใช้</h2>
                <img src="https://cdn-icons-png.flaticon.com/512/59/59549.png" alt="" />
            </div>

            <!-- เมนู sidebar -->
            <b-col col-4>
                <div class="menu-sidebar">
                    <div class="menu-sidebar-menu">
                        <li>เมนู</li>
                    </div>
                    <div class="my-profile-bar">
                        <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="" />
                        <li><router-link to="/user/profile">บัญชีของฉัน</router-link></li>
                    </div>
                    <div class="change-password-bar">
                        <img src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png" alt="" />
                        <li>
                            <router-link to="/user/changepassword">เปลี่ยนรหัสผ่าน</router-link>
                        </li>
                    </div>
                    <div class="change-address-bar">
                        <img src="https://cdn-icons-png.flaticon.com/512/8472/8472483.png" alt="" />
                        <li><router-link to="/user/address">ที่อยู่จัดส่ง</router-link></li>
                    </div>
                    <div class="logout-bar">
                        <img src="https://cdn-icons-png.flaticon.com/512/3889/3889524.png" alt="" />
                        <li>ออกจากระบบ</li>
                    </div>
                </div>
            </b-col>

            <!-- ฟอร์มบัญชีของฉัน -->
            <b-col cols="8" class="form-my-user-profile">
                <!-- ส่วน header -->
                <div class="form-detail-header">
                    <h4>เปลี่ยนรหัสผ่าน</h4>
                    <img src="https://cdn-icons-png.flaticon.com/512/59/59549.png" alt="" />
                </div>

                <!-- ส่วน detail -->
                <form>
                    <!-- container ก้อนที่ 1 รหัสผ่านปัจุบัน -->
                    <div class="detail-container1">
                        <div class="detail-container1-password">
                            <label>รหัสผ่านปัจุบัน <span class="text-danger">*</span></label>
                            <input type="password" placeholder="รหัสผ่านปัจุบัน" />
                        </div>
                    </div>

                    <!-- container ก้อนที่ 2 รหัสผ่านใหม่ -->
                    <div class="detail-container2">
                        <!-- รหัสผ่านใหม่ -->
                        <div class="detail-container2-newpassword">
                            <label>รหัสผ่านใหม่ <span class="text-danger">*</span></label>
                            <input type="password" placeholder="รหัสผ่านใหม่" />
                        </div>
                        <!-- ยืนยันรหัสผ่าน -->
                        <div class="detail-container2-confirmpassword">
                            <label>ยืนยันรหัสผ่าน <span class="text-danger">*</span></label>
                            <input type="password" placeholder="ยืนยันรหัสผ่าน" />
                        </div>
                    </div>

                    <div class="button-style">
                        <button>บันทึก</button>
                    </div>
                </form>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: "UserChangePassword",
    
};
</script>

<style scoped>
a {
    text-decoration: none;
    color: black;
}
.main-container {
    display: flex;
    justify-content: center;
    margin-top: -30px;
}
.sub-container {
    border: 1px solid black;
    margin-top: 200px;
    background-color: white;
    width: 60%;
    padding: 50px 20px;
}

.profile-header {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
}

.profile-header img {
    width: 87%;
    margin-left: 15px;
}

.menu-sidebar-menu {
    color: gold;
    font-size: 25px;
    border-top: 1px solid rgb(190, 181, 181);
}

.menu-sidebar-menu li {
    margin-left: 25px;
}

.my-profile-bar,
.change-password-bar,
.change-address-bar,
.logout-bar {
    display: flex;
    align-items: center;
    border-top: 1px solid rgb(190, 181, 181);
}
.my-profile-bar img,
.change-address-bar img,
.logout-bar img {
    margin-left: 25px;
}

.change-password-bar {
    border-left: 5px solid #16274a;
}

.change-password-bar img {
    margin-left: 21px;
}
.logout-bar {
    border-bottom: 1px solid rgb(190, 181, 181);
}

img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}
li {
    list-style: none;
    font-size: 25px;
    padding: 10px 0;
    /* border-top: 1px solid black; */
}

.form-my-user-profile {
    border-left: 1px solid grey;
}

input {
    width: 346px;
    height: 50px;
}

label {
    font-size: 25px;
}
.form-detail-header {
    display: flex;
    align-items: center;
}
.form-detail-header img {
    width: 77%;
    margin-left: 15px;
}
.detail-container1 {
    display: flex;
    margin-top: 20px;
}

.detail-container2 {
    display: flex;
    margin-top: 20px;
}

.detail-container1-password,
.detail-container1-last,
.detail-container2-newpassword,
.detail-container2-confirmpassword {
    display: flex;
    flex-direction: column;
}

.detail-container1-password,
.detail-container2-newpassword {
    margin-right: 30px;
}

button {
    margin-top: 50px;
    width: 15%;
    border: none;
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: #16274a;
    color: white;
}

.button-style {
    text-align: center;
}
</style>
