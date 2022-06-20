<script setup>
import { useUserStore } from '@/services/userstore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const {register, user} = useUserStore();
const router = useRouter();
const email = ref('');
const username = ref('');
const password = ref('');
if (user.value) {
    router.push({name: "acceuil"});
}
async function inscription(){
    const response = await register(email.value, username.value, password.value);
    console.log(response)
    response && (router.push({name: "acceuil"}));
}
</script>
<template>
    <h1>Register</h1>
    <form @submit.prevent="inscription()">
        <div class="form-group mb-3">
            <label for="email">Email</label>
            <input type="text" v-model="email" class="form-control" id="email" placeholder="Enter email">
        </div>
        <div class="form-group mb-3">
            <label for="username">Username</label>
            <input type="text" v-model="username" class="form-control" id="username" placeholder="Enter name">
        </div>
        <div class="form-group mb-3">
            <label for="password">Password</label>
            <input type="password" v-model="password" class="form-control" id="password" placeholder="Enter name">
        </div>
        <button type="submit" class="btn btn-success">Connexion</button>
    </form>
</template>
<style>
</style>