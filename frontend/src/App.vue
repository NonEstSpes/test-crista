<script setup lang="ts">
  import {ref} from 'vue';

  const books = ref([
    {id: 1, title: 'Война и мир', author: 'Л.Н. Толстой', year: 1869},
    {id: 2, title: 'Преступление и наказание', author: 'Ф.М. Достоевский', year: 1866},
    {id: 3, title: 'Мастер и Маргарита', author: 'М.А. Булгаков', year: 1967}
  ]);

  const editingBook = ref(null);

  function generateId() {
    return books.value.reduce((max, book) => Math.max(max, book.id), 0) + 1;
  }

  function addBook() {
    if (!newBook.value.title || !newBook.value.author || !newBook.value.year) {
      alert('Заполните все поля');
      return;
    }

    const bookToAdd = {
      ...newBook.value,
      id: generateId()
    };

    books.value.push(bookToAdd);
    newBook.value = {title: '', author: '', year: null};
  }

  function editBook(book) {
    editingBook.value = {...book};
  }

  function saveBook() {
    const index = books.value.findIndex(b => b.id === editingBook.value.id);
    if (index > -1) {
      books.value[index] = {...editingBook.value};
      editingBook.value = null;
    }
  }

  function cancelEdit() {
    editingBook.value = null;
  }

  function deleteBook(id) {
    books.value = books.value.filter(book => book.id !== id);
  }
</script>

<template>
  <div>
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
      <tr
          v-for="book in books"
          :key="book.id"
          :class="{ active: editingBook && editingBook.id === book.id }"
      >
        <td>
          <input
              type="text"
              v-if="editingBook && editingBook.id === book.id"
              v-model="editingBook.title"
          />
          <span v-else>{{ book.title }}</span>
        </td>
        <td>
          <input
              type="text"
              v-if="editingBook && editingBook.id === book.id"
              v-model="editingBook.author"
          />
          <span v-else>{{ book.author }}</span>
        </td>
        <td>
          <input
              type="number"
              v-if="editingBook && editingBook.id === book.id"
              v-model.number="editingBook.year"
          />
          <span v-else>{{ book.year }}</span>
        </td>
        <td>
          <div v-if="editingBook && editingBook.id === book.id">
            <button @click="saveBook">Сохранить</button>
            <button @click="cancelEdit">Отмена</button>
          </div>
          <div v-else>
            <button @click="editBook(book)">Редактировать</button>
            <button @click="deleteBook(book.id)">Удалить</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
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

  input {
    width: 100%;
    box-sizing: border-box;
  }

  .active {
    background-color: #f0f0f0;
  }

  button {
    margin-right: 5px;
  }

  div[style*="margin-bottom"] input {
    margin-right: 10px;
    width: 150px;
  }
</style>