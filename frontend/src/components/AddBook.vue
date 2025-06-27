<script setup lang="ts">
import {ref} from "vue";
import store from "@/store";

interface BookForm {
  title: string;
  author: string;
  year: null | number;
}

const newBook = ref<BookForm>({
  title: '',
  author: '',
  year: null,
});

function addBook() {
  if (newBook.value.year !== null) {
    store.dispatch('addBook', newBook.value);
  }
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
input {
  margin-right: 10px;
  width: 150px;
}
</style>