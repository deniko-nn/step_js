<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-title class="font-weight-light"> AniList </v-app-bar-title>

      <v-spacer />

      <v-btn class="font-weight-light" plain :to="{ name: 'Home' }">Home</v-btn>
      <v-btn class="font-weight-light" plain :to="{ name: 'Anime' }"
        >Anime</v-btn
      >

      <v-spacer />
    </v-app-bar>

    <v-main app>
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>