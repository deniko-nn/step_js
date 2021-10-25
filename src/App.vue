<template>
  <div>
    <div>
      <router-link to="/">Home</router-link> |
      <router-link :to="{name: 'Anime'}">Anime</router-link>
    </div>
    <router-view/>
  </div>
</template>