<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <span class="fontColor">5656</span>
    <el-button @click="loginAction">登录</el-button>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <el-button type="primary" @click="onLogin">登录</el-button>
    <el-color-picker size="medium" @change="changeColor"> </el-color-picker>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref } from '@vue/composition-api';
import {
  useNamespacedState,
  useNamespacedActions,
} from 'vuex-composition-helpers';
import HelloWorld from '@/components/HelloWorld.vue';
import { useRoute, useRouter } from '@/composables/useVueRouter';
import { changeThemeColor } from '@/utils/themeColorClient';
export default defineComponent({
  components: { HelloWorld },
  setup() {
    const {
      loginPending,
      userInfo,
    }: {
      loginPending: Ref<boolean>;
      userInfo: Ref<{ name: string } | null>;
    } = useNamespacedState('user', ['loginPending', 'userInfo']);

    const { loginAction } = useNamespacedActions('user', ['loginAction']);

    const route = useRoute();
    const router = useRouter();

    onMounted(() => {
      console.log(route);
    });

    const onLogin = (): void => {
      router.push({ name: 'About' });
    };

    const changeColor = (newColor: string): void => {
      console.log(newColor, 'newColor');

      changeThemeColor(newColor).then(() => {
        console.log('success');
      });
    };

    return {
      loginPending,
      userInfo,
      loginAction,
      onLogin,
      changeColor,
    };
  },
});
</script>

<style lang="scss">
.fontColor {
  color: $--color-primary-dark-1;
}
</style>
