<template>
  <div>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum vero,
      reiciendis iste recusandae veniam eius similique aliquam in ad asperiores
      molestiae maiores sit facere expedita odio blanditiis quasi ut sint?
    </p>
  </div>
</template>
<script setup lang="ts">
import { user } from "@/store/Store";
import { getUserInfo } from "@/common/api";
const userStore = user(); // 实例化 store
const res = async () => {
  await getUserInfo(userStore.data.id);
};
console.log(res);
</script>
<style scoped></style>
