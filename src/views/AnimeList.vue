<template>
  <div>
    <h1>Anime list</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="animeInfo != null">
      <div v-for="item in animeInfo.data.documents" :key="item.anilist_id">
        <router-link :to="{name: 'ShowAnime', params: {id: item.id}}">
                  {{item.titles.en}}
          </router-link>
      </div>
      <pagination 
          @page-changed="changePage"
          :current_page="page" 
          :last_page="animeInfo.data.last_page" 
      />
    </div>
    <div v-else>Server error</div>
  </div>
</template>
<script>
import http from "@/plugins/http";
import Pagination from '../components/Pagination.vue';
export default {
  components: {Pagination,},
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
        .get(`https://api.aniapi.com/v1/anime`, {params: {page: this.page}})
        .then((response) => {
          this.animeInfo = response.data;
        })
        .finally(() => (this.loading = false));
    },
    changePage(newPage){
          this.page = newPage;
    }
  },
};
</script>