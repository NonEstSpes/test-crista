<script setup lang="ts">
import {onMounted} from "vue";
import store from "@/store";
import Item from "@/components/Item.vue";
import AddBook from "@/components/AddBook.vue";

onMounted(async () => {
  await store.dispatch('fetchBooks')
})
</script>

<template>
  <AddBook/>
  <table border="1" cellpadding="10" cellspacing="0">
    <thead>
    <tr>
      <th>Название</th>
      <th>Автор</th>
      <th>Год</th>
      <th>Действия</th>
    </tr>
    </thead>
    <tbody>
      <Item
          v-for="book in store.getters.books"
          :book="book"
      />
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

td,
th {
  text-align: left;
}
</style>