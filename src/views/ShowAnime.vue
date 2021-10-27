<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="anime != null">
      <h1>{{ anime.data.titles.en }} | {{ anime.data.titles.jp }}</h1>
      <img v-if="anime.data.cover_image" :src="anime.data.cover_image" width="350" :alt="anime.data.titles.en"/>
      <ul>
        <li>Season: {{ anime.data.season_year }} year.</li>
        <li>Type: ({{ anime.data.episodes_count }} ep.) {{ anime.data.episode_duration }} min.</li>
        <li>Genres: <span v-for="item in anime.data.genres" :key="item.anilist_id">{{ item }}, </span></li>
        <li>Score: {{anime.data.score}}/100.</li>
      </ul>
    </div>
    <div v-else>Not found</div>
  </div>
</template>
<script>
import http from "@/plugins/http";
export default {
  data: () => ({
    loading: false,
    anime: null,
  }),
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      http
        .get(`https://api.aniapi.com/v1/anime/${this.id}`)
        .then((response) => {
          this.anime = response.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
