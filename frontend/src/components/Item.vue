<script setup lang="ts">
import {Book} from "@/model/book";
import store from "@/store";
import {ref, defineProps, computed} from 'vue';

const props = defineProps<{
  book: Book
}>();

const isEditing = computed<boolean>(() => store.getters.editingId === props.book.id)
const editingBook = ref<boolean>({...props.book})

function saveBook(): void {
  store.dispatch('updateBook', editingBook.value);
}

function cancelEdit(): void {
  store.dispatch('cancelEdit')
}

function editBook(): void {
  store.dispatch('editBook', props.book.id)
}

function deleteBook(): void {
  store.dispatch('deleteBook', props.book.id);
}
</script>

<template>
  <tr :class="{ active: isEditing }">
    <td>
      <input
          type="text"
          v-if="isEditing"
          v-model="editingBook.title"
      />
      <span v-else>{{ editingBook.title }}</span>
    </td>
    <td>
      <input
          type="text"
          v-if="isEditing"
          v-model="editingBook.author"
      />
      <span v-else>{{ editingBook.author }}</span>
    </td>
    <td>
      <input
          type="number"
          v-if="isEditing"
          v-model.number="editingBook.year"
      />
      <span v-else>{{ editingBook.year }}</span>
    </td>
    <td>
      <div v-if="isEditing">
        <button @click="saveBook">Сохранить</button>
        <button @click="cancelEdit">Отмена</button>
      </div>
      <div v-else>
        <button @click="editBook">Редактировать</button>
        <button @click="deleteBook">Удалить</button>
      </div>
    </td>
  </tr>
</template>

<style scoped>
.active {
  background-color: #f0f0f0;
}

button {
  margin-right: 5px;
}
</style>