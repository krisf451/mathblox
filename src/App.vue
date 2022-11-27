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
import { onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";

import { useAuthStore } from "./stores/auth";
import { useCollectionStore } from "./stores/collection";

const authStore = useAuthStore();
const collectionStore = useCollectionStore();

onMounted(() => {
  if (authStore.getAppInstance().currentUser) {
    authStore.currentUser = authStore.getAppInstance().currentUser;
    collectionStore.setMongodbInstance();
  } else {
    authStore.currentUser = null;
  }
});
</script>
