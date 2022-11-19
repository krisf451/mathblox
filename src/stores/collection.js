import { ref } from "vue";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useCollectionStore = defineStore("collection", () => {
  const authStore = useAuthStore();

  const accountCollection = ref(null);
  const gameSessionCollection = ref(null);

  function setMongodbInstance() {
    let dbName = import.meta.env.VITE_REALM_DB_NAME;
    let mongodb = authStore.currentUser.mongoClient("mongodb-atlas");
    accountCollection.value = mongodb.db(dbName).collection("Accounts");
    gameSessionCollection.value = mongodb.db(dbName).collection("GameSessions");
  }

  return { setMongodbInstance, accountCollection, gameSessionCollection };
});
