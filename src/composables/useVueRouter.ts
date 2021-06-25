import {
  ComponentInternalInstance,
  getCurrentInstance,
} from '@vue/composition-api';
import VueRouter, { Route } from 'vue-router';

export function getVueInstance(): ComponentInternalInstance {
  const instance = getCurrentInstance();
  if (instance) {
    return instance;
  }
  throw new Error('Vue instance is missing');
}

export function useRoute(): Route {
  const { proxy } = getVueInstance();
  return proxy.$route;
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
