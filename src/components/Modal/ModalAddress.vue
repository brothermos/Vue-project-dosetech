<template>
    <div class="m-md-auto">
        <b-modal id="modal-lg" size="lg" v-model="showModal" hide-footer hide-header centered>
            <div class="main-container">
                <div>
                    <button type="button" aria-label="Close" class="close" @click="hide">×</button>
                </div>
                <div>
                    <div class="profile-header">
                        <h3>ที่อยู่จัดส่ง</h3>
                        <h4>─────────────────────────────────────</h4>
                    </div>
                    <form>
                        <!-- container ชื่อ-นามสกุล -->
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

                        <!-- รายละเอียดที่อยู่ -->
                        <div class="detail-container2">
                            <label>รายละเอียดที่อยู่ <span class="text-danger">*</span></label>
                            <textarea
                                name=""
                                id=""
                                cols="100%"
                                rows="10"
                                placeholder="รายละเอียดที่อยู่"
                            ></textarea>
                        </div>

                        <!-- จังหวัด-อำเภอ -->
                        <div class="detail-container3">
                            <div class="detail-container3-province">
                                <label>จังหวัด <span class="text-danger">*</span></label>
                                <select name="province" id="province">
                                    <option value="0">กรุณาเลือกจังหวัด</option>
                                </select>
                            </div>
                            <div class="detail-container3-district">
                                <label>เขต/อำเภอ <span class="text-danger">*</span></label>
                                <select name="district" id="district">
                                    <option value="">กรุณาเลือกเขต/อำเภอ</option>
                                </select>
                            </div>
                        </div>

                        <!-- ตำบล-รหัสไปรษณีย์ -->
                        <div class="detail-container4">
                            <div class="detail-container4-subdistrict">
                                <label>แขวง/ตำบล <span class="text-danger">*</span></label>
                                <select name="subdistrict" id="subdistrict">
                                    <option value="0">กรุณาเลือกแขวง/ตำบล</option>
                                </select>
                            </div>
                            <div class="detail-container4-postnumber">
                                <label>รหัสไปรษณีย์ <span class="text-danger">*</span></label>
                                <input type="number" placeholder="รหัสไปรษณีย์" />
                            </div>
                        </div>

                        <!-- ปุ่ม -->
                        <div class="detail-container5">
                            <button>ย้อนกลับ</button>
                            <button>บันทึก</button>
                        </div>
                    </form>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "ModalAddress",
    data() {
        return {
            showModal: false,
        };
    },
    methods: {
        show() {
            this.showModal = true;
        },
    },
};
</script>

<style scoped>
input {
    display: flex;
    width: 370px;
    height: 50px;
}
.profile-header {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    margin-top: 15px;
}

h4 {
    margin-left: 15px;
}

.detail-container1 {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.detail-container2 {
    margin-top: 10px;
}

.detail-container1-name,
.detail-container1-last,
.detail-container3-province,
.detail-container3-district,
.detail-container4-subdistrict,
.detail-container4-postnumber {
    display: flex;
    flex-direction: column;
}

.detail-container3 {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
}

#province,
#district,
#subdistrict {
    width: 370px;
    height: 50px;
}
.detail-container4 {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
}

.detail-container5 {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
}
</style>
