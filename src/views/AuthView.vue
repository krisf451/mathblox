<template>
  <div
    class="h-[calc(100vh-48px)] w-full bg-green-500 flex justify-center items-center"
  >
    <div class="w-[500px] p-8 bg-white shadow-lg rounded-xl">
      <form @submit.prevent="handleAuth" class="flex flex-col gap-6">
        <div v-if="isSignup" class="flex gap-2">
          <div>
            <label for="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              v-model="authStore.signUpFields.first_name"
              class="w-full border h-12 rounded-md pl-2"
            />
            <p v-if="errors.first_name">{{ errors.first_name }}</p>
          </div>
          <div>
            <label for="last_name">Last Name</label>
            <input
              id="last_name"
              type="text"
              v-model="authStore.signUpFields.last_name"
              class="w-full border h-12 rounded-md pl-2"
            />
            <p v-if="errors.first_name">{{ errors.first_name }}</p>
          </div>
        </div>
        <div>
          <label for="email">Email</label>
          <input
            v-if="isSignup"
            id="email"
            type="email"
            v-model="authStore.signUpFields.email"
            class="w-full border h-12 rounded-md pl-2"
          />
          <input
            v-else
            id="email"
            type="email"
            v-model="authStore.signInFields.email"
            class="w-full border h-12 rounded-md pl-2"
          />
          <p v-if="errors.email">{{ errors.email }}</p>
        </div>
        <div class="relative">
          <label for="password">Password</label>
          <input
            v-if="isSignup"
            id="password"
            :type="!showPassword ? 'password' : 'text'"
            v-model="authStore.signUpFields.password"
            class="w-full border h-12 rounded-md pl-2"
          />
          <input
            v-else
            id="password"
            :type="!showPassword ? 'password' : 'text'"
            v-model="authStore.signInFields.password"
            class="w-full border h-12 rounded-md pl-2"
          />
          <img
            v-if="!showPassword"
            @click="showPassword = true"
            :src="Visibility"
            alt="eye"
            class="absolute top-[38px] right-3 w-6 h-6 cursor-pointer"
          />
          <img
            v-else
            @click="showPassword = false"
            :src="VisibilityOff"
            alt="eye"
            class="absolute top-[38px] right-3 w-6 h-6 cursor-pointer"
          />
          <p v-if="errors.password">{{ errors.password }}</p>
        </div>
        <div v-if="isSignup" class="relative">
          <label for="confirm_password">Confirm Password</label>
          <input
            id="confirm_password"
            :type="!showPassword ? 'password' : 'text'"
            v-model="authStore.signUpFields.password"
            class="w-full border h-12 rounded-md pl-2"
          />
          <img
            v-if="!showConfirmPassword"
            @click="showConfirmPassword = true"
            :src="Visibility"
            alt="eye"
            class="absolute top-[38px] right-3 w-6 h-6 cursor-pointer"
          />
          <img
            v-else
            @click="showConfirmPassword = false"
            :src="VisibilityOff"
            alt="eye"
            class="absolute top-[38px] right-3 w-6 h-6 cursor-pointer"
          />
          <p v-if="errors.confirmPassword">{{ errors.confirmPassword }}</p>
        </div>

        <button type="submit" class="bg-blue-500 text-white rounded-md p-4">
          Submit
        </button>
        <p v-if="!isSignup">
          Don't have an account?
          <span @click="isSignup = true" class="text-blue-500 cursor-pointer"
            >Sign Up</span
          >
        </p>
        <p v-else>
          Already have an account?
          <span @click="isSignup = false" class="text-blue-500 cursor-pointer"
            >Sign in</span
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

import { Visibility, VisibilityOff } from "../assets/Icons";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const isSignup = ref(true);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const errors = reactive({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
});

const handleAuth = async () => {
  try {
    let user;
    if (isSignup.value) {
      user = await authStore.signUp();
      if (user && authStore.currentUser.id) {
        await authStore.insertAccountOnSignUp(authStore.currentUser.id);
      }
    } else {
      console.log("we get here");
      user = await authStore.signIn();
      console.log(user);
    }
    if (user) {
      router.push("/");
    }
  } catch (e) {
    console.log("error with authentication", e);
  }
};
</script>
