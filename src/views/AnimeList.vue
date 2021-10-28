<template>
  <v-container>
    <h1 class="display-2 mt-10 mb-2 font-weight-thin">Anime list</h1>
    <div v-if="loading"></div>
    <div v-else-if="animeInfo != null">
      <div>
        <div class="mb-2" style="display: flex; align-items: center; gap: 10px">
          <div>
            <v-text-field v-model="filter.title" label="Name" />
          </div>
          <div>
            <v-text-field v-model="filter.year" label="Year" />
          </div>
          <div class="font-weight-light">Genres</div>

          <v-select multiple v-model="filter.genres" :items="genres">
          </v-select>
          <v-btn color="primary" @click="load">Filter</v-btn>
        </div>
        <v-card class="font-weight-light">
          <v-list>
            <v-list-item
              :to="{ name: 'ShowAnime', params: { id: item.id } }"
              v-for="item in animeInfo.data.documents"
              :key="item.anilist_id"
            >
              <v-list-item-content>
                {{ item.titles.en }}
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </div>
      <v-pagination
        class="mt-5"
        v-model="page"
        :total-visible="10"
        :length="animeInfo.data.last_page"
      />
    </div>
    <div v-else>Server error</div>
  </v-container>
</template>
<script>
import http from "@/plugins/http";
export default {
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

      if (this.filter.title != "") {
        filter.title = this.filter.title;
      }
      if (this.filter.year != "") {
        filter.year = this.filter.year;
      }
      if (this.filter.genres.length > 0) {
        filter.genres = this.filter.genres.join(",");
      }
      const list = http.get(`https://api.aniapi.com/v1/anime`, {
        params: {
          page: this.page,
          ...filter,
        },
      });

      const genres = http.get(`https://api.aniapi.com/v1/resources/1.0/0`);
      Promise.all([list, genres])
        .then(([listresponse, genresresponse]) => {
          this.animeInfo = listresponse.data;
          this.genres = genresresponse.data.data.genres;
        })
        .finally(() => (this.loading = false));
    },
    changePage(newPage) {
      this.page = newPage;
    },
  },
};
</script>
<style scoped>
.backg {
  background: url("../assets/yourImage.jpg");
  background-size: cover;
}
</style> <!-- Не работает -->