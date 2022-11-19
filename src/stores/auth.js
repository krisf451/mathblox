import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import * as Realm from "realm-web";
import { useCollectionStore } from "./collection";

export const useAuthStore = defineStore("auth", () => {
  const collectionStore = useCollectionStore();

  const signUpFields = reactive({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const signInFields = reactive({
    email: "",
    password: "",
  });

  const currentUser = ref(null);

  function getAppInstance() {
    var app = Realm.App.getApp(import.meta.env.VITE_REALM_APP_ID);
    if (app == null) {
      app = new Realm.App({ id: import.meta.env.VITE_REALM_APP_ID });
    }
    return app;
  }

  async function signUp() {
    let app = getAppInstance();

    try {
      let email = signUpFields.email.toLowerCase();
      let password = signUpFields.password;

      await app.emailPasswordAuth.registerUser({ email, password });
      const credentials = Realm.Credentials.emailPassword(
        signUpFields.email.toLowerCase(),
        signUpFields.password
      );
      await app.logIn(credentials);
      currentUser.value = app.currentUser;
      collectionStore.setMongodbInstance();
      return true;
    } catch (err) {
      return false;
    }
  }

  async function signIn() {
    let app = getAppInstance();

    try {
      const credentials = Realm.Credentials.emailPassword(
        signInFields.email.toLowerCase(),
        signInFields.password
      );

      let user = await app.logIn(credentials);
      currentUser.value = user;
      // Make sure we set the mongodb instance before any db operations
      collectionStore.setMongodbInstance();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async function insertAccountOnSignUp(currentUserId) {
    let accountToInsert = {
      user_id: currentUserId,
      first_name: this.signUpFields.first_name,
      last_name: this.signUpFields.last_name,
      email: this.signUpFields.email.toLowerCase(),
      phone: "",
      address: "",
      country: "United States",
      city: "",
      state: "",
      zip_code: "",
      created_date: new Date(),
    };

    try {
      return await collectionStore.accountCollection.insertOne(accountToInsert);
    } catch (e) {
      console.error(e);
    }
  }

  return {
    getAppInstance,
    signIn,
    signUp,
    insertAccountOnSignUp,
    currentUser,
    signInFields,
    signUpFields,
  };
});
