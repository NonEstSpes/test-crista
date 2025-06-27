<script setup lang="ts">
import {ref} from "vue";
import api from "@/services/api.ts";

const newBook = ref({
  title: '',
  author: '',
  year: null
});

function addBook(newBook) {
  api.createBook(newBook).then(() => {
    alert('Книга добавлена');
  })
}
</script>

<template>
  <div style="margin-bottom: 20px;">
    <h3>Добавить новую книгу</h3>
    <input v-model="newBook.title" placeholder="Название"/>
    <input v-model="newBook.author" placeholder="Автор"/>
    <input v-model.number="newBook.year" type="number" placeholder="Год"/>
    <button @click="addBook">Добавить</button>
  </div>
</template>

<style scoped>

</style>