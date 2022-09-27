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
                        <li>
                            <router-link to="/user/profile">บัญชีของฉัน</router-link>
                        </li>
                    </div>
                    <div class="change-password-bar">
                        <img src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png" alt="" />
                        <li>
                            <router-link to="/user/changepassword">เปลี่ยนรหัสผ่าน</router-link>
                        </li>
                    </div>
                    <div class="change-address-bar">
                        <img src="https://cdn-icons-png.flaticon.com/512/8472/8472483.png" alt="" />
                        <li>ที่อยู่จัดส่ง</li>
                    </div>
                    <div class="logout-bar">
                        <img src="https://cdn-icons-png.flaticon.com/512/3889/3889524.png" alt="" />
                        <li>ออกจากระบบ</li>
                    </div>
                </div>
            </b-col>

            <!-- ฟอร์มที่อยู่ -->
            <b-col cols="8" class="form-my-address">
                <div class="form-detail-header">
                    <h4>ที่อยู่จัดส่ง</h4>
                    <img src="https://cdn-icons-png.flaticon.com/512/59/59549.png" alt="" />
                </div>
                <div class="create-address-button">
                    <button @click="$refs.ModalAddress.show()">สร้างที่อยู่ใหม่</button>
                </div>

                <!-- โชว์ข้อมูลที่อยู่ -->
                <div class="row">
                    <div class="col-lg-12">
                        <table class="table table-bordered table-striped">
                            <thead>
                                <tr class="text-center bg-primary text-light">
                                    <th>รายละเอียดที่อยู่</th>
                                    <th>แก้ไข</th>
                                    <th>ลบ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="address in addressList" :key="address.id">
                                    <td>
                                        {{ address.firstName }}
                                        {{ address.lastName }}
                                        {{ address.street }}
                                        {{ address.province }}
                                        {{ address.district }}
                                        {{ address.subDistrict }}
                                        {{ address.zipCode }}
                                    </td>
                                    <td class="text-center">
                                        <span @click="$refs.ModalAddress.show(address)">แก้ไข</span>
                                    </td>
                                    <td class="text-center">
                                        <span @click="deleteAddress(address.id)"> ลบ </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="overflow-auto">
                    <b-pagination
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        align="right"
                    >
                    </b-pagination>
                </div>
            </b-col>
        </b-row>
        <div>
            <ModalAddress ref="ModalAddress" :getAddressList="getAddressList" />
        </div>
    </div>
</template>

<script>
import ModalAddress from "../Modal/ModalAddress.vue";
import { UserApiService } from "@/services/user-api.service";
export default {
    name: "UserAddress",
    components: { ModalAddress },
    data: () => ({
        userApiService: new UserApiService(),
        addressList: [],
        currentPage: 1,
        rows: 0,
        perPage: 10,
        // filters: {
        //    keyword: null,
        //    page: 1,
        //    limit: 10,
        // },
    }),
    methods: {
        async getAddressList() {
            const params = {
                page: this.currentPage,
                limit: this.perPage,
                keyword: null,
            };
            const res = await this.userApiService.getAddresses(params);
            this.addressList = res.data.detail.userAddresses;
            this.rows = res.data.detail.total;
        },
        async deleteAddress(id) {
            const confirm = await this.$bvModal.msgBoxConfirm(
                "Please confirm that you want to delete everything.",
                {
                    title: "Please Confirm",
                    size: "sm",
                    buttonSize: "sm",
                    okVariant: "danger",
                    okTitle: "YES",
                    cancelTitle: "NO",
                    footerClass: "p-2",
                    hideHeaderClose: false,
                    centered: true,
                }
            );
            if (confirm) {
                await this.userApiService.deleteAddress(id);
                await this.getAddressList();
                this.$bvModal.msgBoxOk("ลบข้อมูลเรียบร้อยแล้ว", {
                    title: "Confirmation",
                    size: "sm",
                    buttonSize: "sm",
                    okVariant: "success",
                    headerClass: "p-2 border-bottom-0",
                    footerClass: "p-2 border-top-0",
                    centered: true,
                });
            }
        },
    },
    watch: {
        currentPage(value) {
            this.currentPage = value;
            this.getAddressList();
            // console.log('value', value)
            // console.log('oldValue', oldValue)
        },
    },
    created() {
        this.getAddressList();
    },
};
</script>

<style scoped>
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
.change-password-bar img,
.logout-bar img {
    margin-left: 25px;
}

.change-address-bar {
    border-left: 5px solid #16274a;
}

.change-address-bar img {
    margin-left: 21px;
}

a {
    text-decoration: none;
    color: black;
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

span:hover {
    cursor: pointer;
    color: rgb(36, 36, 55);
    text-decoration: underline;
}
.form-detail-header {
    display: flex;
    align-items: center;
}
.form-detail-header img {
    width: 84%;
    margin-left: 15px;
}
.create-address-button {
    display: flex;
    justify-content: right;
    margin-right: 10px;
}

.create-address-button button {
    margin-top: 10px;
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
