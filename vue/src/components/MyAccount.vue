<script setup>
    import {ref } from 'vue';
    import axios from 'axios';

    import { useUserStore } from '@/services/userstore';
    
    const {user} = useUserStore();

    const tokenSaved = ref("");

    if (localStorage.getItem('cours-token')) {
        tokenSaved.value = localStorage.getItem('cours-token');
    }

    axios.interceptors.request.use(function (config) {
        config.headers.common["x-auth-token"] = tokenSaved.value || "";
        return config;
    });

</script>
<template>
    <h1>Mon compte</h1>
    <p v-if="user">Email : {{user['email']}}</p>
    <p v-if="user">Nom : {{user['username']}}</p>
</template>
<style scoped>
</style>