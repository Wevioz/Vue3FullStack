<script setup>
import Header from './components/Header.vue';
import { useUserStore } from './services/userstore';
    
    const {autoConnect} = useUserStore();
    autoConnect();
    
</script>

<template>
    <Header></Header>
    <RouterView/>
</template>

<style>
@import "bootstrap/dist/css/bootstrap.min.css";
</style>
