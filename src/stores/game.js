import { ref } from "vue";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useCollectionStore } from "./collection";

export const useGameStore = defineStore("game", () => {
  const authStore = useAuthStore();
  const collectionStore = useCollectionStore();

  const gameDifficulty = ref("easy");

  return { gameDifficulty };
});
