<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-button @click="loginAction">登录</el-button>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <el-button type="primary" @click="onLogin">登录</el-button>
  </div>
</template>

<script lang="ts">
// import { Component, Vue } from 'vue-property-decorator';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

// @Component({
//   components: {
//     HelloWorld,
//   },
// })
// export default class Home extends Vue {}
import { defineComponent, onMounted, Ref } from '@vue/composition-api';
import {
  useNamespacedState,
  useNamespacedActions,
} from 'vuex-composition-helpers';
import HelloWorld from '@/components/HelloWorld.vue';
import { useRoute, useRouter } from '@/composables/useVueRouter';
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

    return {
      loginPending,
      userInfo,
      loginAction,
      onLogin,
    };
  },
});
</script>
