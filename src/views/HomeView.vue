<template>
  <Modal
    :open="isOpen"
    @toggle-modal="isOpen = false"
    @handle-confirm="handleStartGame"
  />

  <main class="flex flex-col gap-10 justify-center items-center">
    <div
      class="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5 bg-red-500 max-w-6xl mx-auto w-full"
    >
      <ExploreCard
        v-for="world in exploreWorlds"
        :key="world.id"
        :active="isActiveWorld"
        :world="world"
        :imgUrl="world.imgUrl"
        @set-active-world="setActiveWorld"
      />
    </div>
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
      @click="router.push('/game')"
      type="button"
      class="bg-blue-500 rounded-lg p-4 text-white"
    >
      Start Game
    </button>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { exploreWorlds } from "../constants";
import { useGameStore } from "../stores/game";
import Modal from "../components/Modal.vue";
import ExploreCard from "../components/ExploreCard.vue";

const router = useRouter();
const gameStore = useGameStore();

const isOpen = ref(false);
const isActiveWorld = ref("world-2");

const handleStartGame = async () => {
  console.log("submitting, start the game");
  // await gameStore.startGame();
};

const setActiveWorld = (id) => {
  console.log(id, "TEST WHAT WE GET BACK FROM EMIT");
  isActiveWorld.value = id;
  console.log(isActiveWorld.value, "AFTER CHANGE");
};
</script>
