<script setup>
    import { useUserStore } from '@/services/userstore';
    import { useRouter } from 'vue-router';
    
    const router = useRouter();
    const {user, disconnect} = useUserStore();
    function deconnexion(){
        disconnect();
        router.push({name: "acceuil"});
    }
</script>
<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <h3 class="navbar-brand">{{!user ? "Welcome" : `Hey ${user['username']}`}}</h3>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav" style="flex-grow: 1;">
                    <li class="nav-item">
                        <RouterLink class="nav-link active" to="/">Acceuil</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link active" :to="{name: 'about'}">A propos</RouterLink>
                    </li>
                    <li class="nav-item" v-if="user">
                        <RouterLink class="nav-link active" :to="{name: 'todo'}">Crud</RouterLink>
                    </li>
                    <li class="nav-item ms-auto" v-if="!user">
                        <RouterLink class="nav-link" :to="{name: 'login'}">Login</RouterLink>
                    </li>
                    <li class="nav-item" v-if="!user">
                        <RouterLink class="nav-link" :to="{name: 'register'}">Register</RouterLink>
                    </li>
                    <li class="nav-item ms-auto" v-if="user">
                        <RouterLink class="nav-link" :to="{name: 'moncompte'}">Mon compte</RouterLink>
                    </li>
                    <li class="nav-item" v-if="user">
                        <button class="btn btn-danger" @click="deconnexion()">Déconnexion</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<style scoped>
</style>