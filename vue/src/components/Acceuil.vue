<script setup>
    import { computed, ref } from 'vue';
    const title = ref('Hello World !');
    const titleMaj = computed(() => {
        return title.value.toUpperCase();
    })
</script>
<template>
    <h1>{{title}}</h1>
    <p>{{titleMaj}}</p>
</template>