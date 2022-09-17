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
                    <h4>บัญชีของฉัน</h4>
                    <img src="https://cdn-icons-png.flaticon.com/512/59/59549.png" alt="" />
                </div>

                <!-- ส่วน detail -->
                <form>
                    <!-- container ก้อนที่ 1 ชื่อ-นามสกุล -->
                    <div class="detail-container1">
                        <div class="detail-container1-name">
                            <label>ชื่อ <span class="text-danger">*</span></label>
                            <input type="text" placeholder="ชื่อ" />
                        </div>
                        <div class="detail-container1-last">
                            <label>นามสกุล <span class="text-danger">*</span></label>
                            <input type="text" placeholder="นามสกุล" />
                        </div>
                    </div>

                    <!-- container ก้อนที่ 2 อีเมล-เบอร์โทร -->
                    <div class="detail-container2">
                        <!-- อีเมล -->
                        <div class="detail-container2-email">
                            <label>อีเมล <span class="text-danger">*</span></label>
                            <input type="email" placeholder="อีเมล" />
                        </div>
                        <!-- เบอร์ -->
                        <div class="detail-container2-tel">
                            <label>เบอร์โทรศัพท์ <span class="text-danger">*</span></label>
                            <input type="text" placeholder="เบอร์โทรศัพท์" />
                        </div>
                    </div>

                    <!-- container ก้อนที่ 3 วันเกิด-เพศ -->
                    <div class="detail-container3">
                        <!-- วันเกิด -->
                        <div class="detail-container3-birth">
                            <label>วันเกิด <span class="text-danger">*</span></label>
                            <div class="birthday-date">
                                <select name="day" id="day">
                                    <option value="0">วัน</option>
                                    <option v-for="(day, index) in 31" :key="index">
                                        {{ day }}
                                    </option>
                                </select>
                                <select name="month" id="month">
                                    <option value="0">เดือน</option>
                                    <option v-for="(month, index) in 12" :key="index">
                                        {{ month }}
                                    </option>
                                </select>
                                <select name="year" id="year">
                                    <option value="0">ปี</option>
                                    <option v-for="(year, index) in getYear()" :key="index">
                                        {{ year }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <!-- เพศ -->
                        <div class="detail-container-gender">
                            <label>เพศ <span class="text-danger">*</span></label>
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
    name: "UserProfile",
    data() {
        return {
            options: [
                { text: "ชาย", value: "man" },
                { text: "หญิง", value: "woman" },
            ],
        };
    },
    methods: {
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

#li-color {
    color: gold;
    margin-left: 5px;
    font-size: 25px;
    border-top: 1px solid rgb(190, 181, 181);
}

.my-profile-bar,
.change-password-bar,
.change-address-bar,
.logout-bar {
    display: flex;
    align-items: center;
    border-top: 1px solid rgb(190, 181, 181);
}
.my-profile-bar img {
    margin-left: 21px;
}
.change-password-bar img,
.change-address-bar img,
.logout-bar img {
    margin-left: 25px;
}

.my-profile-bar {
    border-left: 5px solid #16274a;
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
    width: 80%;
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

.detail-container1-name,
.detail-container1-last,
.detail-container2-email,
.detail-container2-tel {
    display: flex;
    flex-direction: column;
}

.detail-container1-name,
.detail-container2-email {
    margin-right: 30px;
}

.detail-container3 {
    display: flex;
    margin-top: 20px;
}

.detail-container3-birth {
    margin-right: 30px;
}

.birthday-date {
    display: flex;
}

.birthday-date select {
    width: 102px;
    padding: 10px;
    height: 45px;
}

#day,
#month {
    margin-right: 20px;
}

.detail-container-gender label {
    margin-bottom: 22px;
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
