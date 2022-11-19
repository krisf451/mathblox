<template>
  <header>
    <nav class="bg-red-500 h-12 flex items-center gap-4">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/auth">Auth</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
