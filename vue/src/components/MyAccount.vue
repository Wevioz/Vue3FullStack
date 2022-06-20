<script setup>
    import { onMounted, ref } from 'vue';
    import axios from 'axios';

    const tokenSaved = ref("");
    const user = ref(null);
    if (localStorage.getItem('cours-token')) {
        tokenSaved.value = localStorage.getItem('cours-token');
    }

    axios.interceptors.request.use(function (config) {
        config.headers.common["x-auth-token"] = tokenSaved.value || "";
        return config;
    });

    async function getAccountInfo(){
        const response = await axios.post('http://localhost:3001/moncompte').then(res => res).catch(err => err);
        if (response.status !== 200) {
            return null;
        }
        user.value = response.data.user;
    }
    onMounted(() => {
        getAccountInfo();
    });
</script>
<template>
    <h1>Mon compte</h1>
    <p v-if="user">Email : {{user.email}}</p>
    <p v-if="user">Nom : {{user.name}}</p>
</template>
<style scoped>
</style>