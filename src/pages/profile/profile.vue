<script lang="ts" setup>
import { useInit } from '@/hooks/useInit';
import { useUserStore } from '@/store';

onLoad(() => {
  const { pageName, pagePath, pageQuery } = useInit();
  console.log(pageName, pagePath, pageQuery, 'pageName,pagePath, pageQuery');
});
const userStore = useUserStore();
</script>

<template>
  <view> profile,{{ userStore.user.id }} </view>
  <tabbar :selected="1" />
</template>
