<template>
  <div>
    <button v-if="current_page > 1" @click="goToPage(1)">First</button>
    <button v-if="current_page > 1" @click="goToPage(current_page - 1)">
      Prev
    </button>
    | Page {{ current_page }} |
    <button v-if="current_page < last_page" @click="goToPage(current_page + 1)">
      Next
    </button>
    <button v-if="current_page < last_page" @click="goToPage(last_page)">
      Last
    </button>
  </div>
</template>

<script>
export default {
  props: ["current_page", "last_page"],
  methods: {
    goToPage(page) {
      this.$emit("page-changed", page);
    },
  },
};
</script>