<template>
    <h3>Home</h3>
</template>

<script>
import axios from "axios";
export default {
    name: "Home",
    async created() {
        const response = await axios.get("user/profile", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
        console.log(response);
    },
};
</script>

<style></style>
