<template>
  <wd-tabbar :modelValue="props.selected" fixed bordered safeAreaInsetBottom placeholder @change="tabChange">
    <wd-tabbar-item v-for="item in list" :key="item.icon" :title="item.title" :icon="item.icon"></wd-tabbar-item>
  </wd-tabbar>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    selected?: number;
  }>(),
  {
    selected: 0
  }
);

interface ListItem {
  pagePath: string;
  title: string;
  icon: string;
}

const list = ref<ListItem[]>([
  {
    pagePath: '/pages/index/index',
    title: '首页',
    icon: 'home'
  },
  {
    pagePath: '/pages/profile/profile',
    title: '分类',
    icon: 'cart'
  },
  {
    pagePath: '/pages/demo/index',
    title: '我的',
    icon: 'user'
  }
]);

const tabChange = ({ value }: { value: number }) => {
  const url = list.value[value].pagePath;
  uni.switchTab({
    url
  });
};
</script>
