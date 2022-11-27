<template>
  <div
    @click="handleSetActiveWorld"
    :class="`relative ${
      active === world.id ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'
    } flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer`"
  >
    <img
      :src="imgUrl"
      alt="planet-04"
      class="absolute w-full h-full object-cover rounded-[24px]"
    />

    <h3
      v-if="active !== world.id"
      class="font-semibold sm:text-[26px] text-[18px] text-white absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0]"
    >
      {{ world.title }}
    </h3>
    <div
      v-else
      class="absolute bottom-0 p-8 flex justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[24px]"
    >
      <div
        class="flex items-center justify-center w-[60px] h-[60px] rounded-[24px] glassmorphism mb-[16px]"
      >
        <img
          src="/headset.svg"
          alt="headset"
          className="w-1/2 h-1/2 object-contain"
        />
      </div>
      <p class="font-normal text-[16px] leading-[20.16px] text-white uppercase">
        Enter Metaverse
      </p>
      <h2 class="mt-[24px] font-semibold sm:text-[32px] text-[24px] text-white">
        {{ world.title }}
      </h2>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log("ExploreCard component mounted");
  console.log(props);
});

const props = defineProps({
  active: {
    type: String,
    required: true,
  },
  world: {
    type: Object,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["set-active-world"]);

const handleSetActiveWorld = () => {
  emit("set-active-world", props.world.id);
  console.log("props?", props.world.id);
};
</script>
