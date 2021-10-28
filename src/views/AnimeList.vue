<template>
  <v-container>
    <h1>Anime list</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="animeInfo != null">
      <div>
        <div>Name</div>
        <input v-model="filter.title" type="text" placeholder="Name..." /> |
        <input v-model="filter.year" type="text" placeholder="Year..." /> |
        <div>Genres</div>
        <select multiple v-model="filter.genres"> 
          <option v-for="genre in genres" :key="genre">
            {{genre}} 
          </option>
        </select>
      </div>
        <button @click="load">Filter</button>
      <div v-for="item in animeInfo.data.documents" :key="item.anilist_id">
        <router-link :to="{ name: 'ShowAnime', params: { id: item.id } }">
          {{ item.titles.en }}
        </router-link>
      </div>
      <pagination
        @page-changed="changePage"
        :current_page="page"
        :last_page="animeInfo.data.last_page"
      />
    </div>
    <div v-else>Server error</div>
  </v-container>
</template>
<script>
import http from "@/plugins/http";
import Pagination from "../components/Pagination.vue";
export default {
  components: { Pagination },
  data: () => ({
    loading: false,
    animeInfo: null,
    page: 1,
    filter: {
      title: "",
      year: "",
      genres: [],
    },
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
      const filter = {};

      if(this.filter.title!=''){
          filter.title = this.filter.title;
      }
      if(this.filter.year != ''){
        filter.year = this.filter.year;
      }
      if(this.filter.genres.length > 0){
        filter.genres = this.filter.genres.join(',');
      }
     const list = http
        .get(`https://api.aniapi.com/v1/anime`, {
          params: {
            page: this.page,
            ... filter,
          },
        });

        const genres = http.get(`https://api.aniapi.com/v1/resources/1.0/0`);
        Promise.all([list, genres]).then(([listresponse, genresresponse]) => {
            this.animeInfo = listresponse.data;
            this.genres = genresresponse.data.data.genres;
          }).finally(()=> this.loading = false);
        
    },
    changePage(newPage) {
      this.page = newPage;
    },
  },
};
</script>