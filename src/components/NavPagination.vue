<template>
  <nav aria-label="pagination w-100">
    <ul class="pagination justify-content-center">
      <li
        class="page-item"
        v-if="page != 1"
        @click="$emit('reducePage')"
      >
        <span class="page-link" role="button">Назад</span>
      </li>
      <li
        class="page-item"
        :class="{
          disabled: page === pageNumber,
        }"
        v-for="pageNumber in pages"
        @click="$emit('setPage', pageNumber)"
        :key="pageNumber"
      >
        <span class="page-link" role="button"> {{ pageNumber }}</span>
      </li>
      <li
        class="page-item cursor-pointer"
        @click="$emit('increasePage')"
        v-if="page < pages.length"
      >
        <span class="page-link" role="button">Вперед</span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavPagination",
  props: ["pages", "page"],
  emits: ['reducePage', 'increasePage', 'setPage']
};
</script>