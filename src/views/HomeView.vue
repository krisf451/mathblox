<template>
  <Modal
    :open="isOpen"
    @toggle-modal="isOpen = false"
    @handle-confirm="handleStartGame"
  />
  <main
    class="h-[calc(100vh-48px)] w-full bg-green-500 flex justify-center items-center"
  >
    <div class="flex flex-col gap-10 justify-center items-center">
      <!-- Select difficulty -->
      <div>
        <h3>Choose your difficulty</h3>
        <select v-model="gameStore.gameDifficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button
        @click="isOpen = true"
        type="button"
        class="bg-blue-500 rounded-lg p-4 text-white"
      >
        Start Game
      </button>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";

import { useGameStore } from "../stores/game";
import Modal from "../components/Modal.vue";

const gameStore = useGameStore();
const isOpen = ref(false);

const handleStartGame = async () => {
  console.log("submitting, start the game");
  // await gameStore.startGame();
};
</script>
