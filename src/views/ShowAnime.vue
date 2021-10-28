<template>
  <v-container>
    <div v-if="loading"></div>
    <div v-else-if="anime != null">
      <h1 class="mt-5 mb-10 display-1 font-weight-thin">
        {{ anime.data.titles.en }} | {{ anime.data.titles.jp }}
      </h1>
      <v-img
        :lazy-src="anime.data.cover_image"
        max-height="500"
        max-width="360"
        :src="anime.data.cover_image"
        :alt="anime.data.titles.en"
      />

      <v-card>
        <div class="d-flex">
          <v-card-text class="font-weight-light">
            <div class="text-caption text-decoration-underline">Season</div>
            <div>{{ anime.data.season_year }} year.</div>

            <div class="text-caption text-decoration-underline">Type</div>
            <div>
              ({{ anime.data.episodes_count }} ep.)
              {{ anime.data.episode_duration }} min.
            </div>

            <div class="text-caption text-decoration-underline">Genres</div>
            <div>
              <span v-for="item in anime.data.genres" :key="item.anilist_id"
                >{{ item }},
              </span>
            </div>
            <div class="text-caption text-decoration-underline">Score</div>
            <div>{{ anime.data.score }}/100.</div>
            <div class="text-caption text-decoration-underline">Trailer</div>
            <section>
              <iframe
                width="560"
                height="315"
                :src="anime.data.trailer_url"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </section>
          </v-card-text>
        </div>
      </v-card>
    </div>
    <div v-else>Not found</div>
  </v-container>
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
