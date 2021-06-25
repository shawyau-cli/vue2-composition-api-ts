import {
  ComponentInternalInstance,
  computed,
  getCurrentInstance,
  reactive,
  Ref,
} from '@vue/composition-api';
import VueRouter, { Route } from 'vue-router';
import Vue from 'vue';

export function getVueInstance(): ComponentInternalInstance {
  const instance = getCurrentInstance();
  if (instance) {
    return instance;
  }
  throw new Error('Vue instance is missing');
}

export function useRoute(): Ref<Route> {
  const { proxy } = getVueInstance();
  return computed<Route>(() => proxy.$route);
}

export function useRouter(): VueRouter {
  const { proxy } = getVueInstance();
  return proxy.$router;
}

export default {
  getVueInstance,
  useRoute,
  useRouter,
};
