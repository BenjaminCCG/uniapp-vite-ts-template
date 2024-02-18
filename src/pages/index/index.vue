<script setup lang="ts">
import { useQueue } from 'wot-design-uni';
import { useTitle } from '@/hooks/useTitle';
import { useUserStore } from '@/store';
import { forward } from '@/utils/router';

const { closeOutside } = useQueue();
const show = ref<boolean>(false);
function handleChange({ show }) {
  console.log(show);
}
const { title, changeTitle } = useTitle();

function goTest() {
  forward('test', {
    a: 1
  });
}
const userStore = useUserStore();
const handleClick = () => {
  userStore.setUserInfo({
    id: Math.random(),
    token: 'xxxx'
  });
};
</script>

<template>
  <view class="content">
    222
    <view @click="closeOutside">
      <wd-popover v-model="show" content="这是一段信息。" @change="handleChange">
        <wd-button>点击展示</wd-button>
      </wd-popover>
    </view>
    <wd-button type="success" loading>成功按钮1</wd-button>
    <image class="logo mb-4" src="/static/logo.png" @click="handleClick" />
    <view class="text-area bg-blue-300">
      <text class="title">{{ title }}</text>
      <br />
      <text>
        {{ userStore.user.id }}
      </text>
    </view>
    <view @click="changeTitle">changeTitle</view>
    <button @click="goTest">测试页跳转</button>
  </view>
  <tabbar :selected="0" />
</template>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .logo {
    border-radius: 50%;
  }
}
.logo {
  margin-left: auto;
  margin-right: auto;
  margin-top: 200rpx;
  margin-bottom: 50rpx;
  width: 200rpx;
  height: 200rpx;
}
.text-area {
  display: flex;
  justify-content: center;
}
.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
