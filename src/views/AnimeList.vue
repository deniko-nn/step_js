<template>
  <div>
      <div v-if="animeInfo!=null">
      <div v-for="item in animeInfo.data.documents" :key="item.anilist_id">
          {{item.titles.en}}
      </div>
      </div>
  </div>
</template>
<script>
import http from "@/plugins/http";
export default {
  data: () => ({
    loading: false,
    animeInfo: null,
    page: 1,
  }),
  mounted() {
    this.load();
  },
  watch: {
    page() {
      this.load();
    },
  },
  methods: {
    load() {
      this.loading = true;

      http
        .get(`https://api.aniapi.com/v1/anime`)
        .then((response) => {
          this.animeInfo = response.data;
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>