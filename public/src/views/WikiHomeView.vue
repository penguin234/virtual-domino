<script setup>
import CircularController from '@/components/CircularController.vue'
</script>

<template>
  <h2> Wiki </h2>

  <router-link to='/wiki/domino'> domino </router-link> <br>
  <router-link to='/wiki/dominoframe'> dominoframe </router-link> <br>
  <router-link to='/wiki/dominomove'> dominomove </router-link> <br>

  <router-view></router-view>
</template>