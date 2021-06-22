<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-button @click="loginAction">登录</el-button>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <el-button type="primary">登录</el-button>
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
import { defineComponent, Ref } from '@vue/composition-api';
import {
  useNamespacedState,
  useNamespacedActions,
} from 'vuex-composition-helpers';
import HelloWorld from '@/components/HelloWorld.vue';
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

    return {
      loginPending,
      userInfo,
      loginAction,
    };
  },
});
</script>
