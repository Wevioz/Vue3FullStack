<script setup>
    import { onMounted, ref } from 'vue';
    import axios from 'axios';

    const chaine = ref('');
    const getAllChaines = ref([]);

    // function addToList(){
    //     if (nom.value && prenom.value) {
    //         tab.value.push(listObject.value[listObject.value.length-1].id+1);
    //         listObject.value.push({id: listObject.value[listObject.value.length-1].id+1, nom: nom.value, prenom: prenom.value});
    //     }
    // }
    // function removeToList(id){
    //     listObject.value.splice(listObject.value.indexOf(listObject.value.find(elm => elm.id === id)), 1);
    //     tab.value.splice(tab.value.indexOf(id), 1);
    // }
    async function getAllTodo(){ 
        const response = await axios.get('http://localhost:3001/task').then(res => res).catch(err => err);
        if (response.status !== 200) return null;
        console.log(response.data);
        return response.data;
        
    }
    onMounted(() => {
        getAllChaines.value = getAllTodo();
    });
</script>

<template>
    <p>Todo :</p>
    <ul>
        <li v-for="obj in getAllChaines" :key="obj.description">
            <p>{{obj}}</p>
        </li>
    </ul>
    <label>Rajouter dans le crud :</label>
    <input type="text" v-model="todo"/>
    <button @click="addToList">Ajouter</button>
    <hr/>
</template>

<style scoped>
li{
    cursor: pointer;
}
</style>