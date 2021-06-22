import { StoreModuleType } from '@/utils/store';
import { Action, Mutation } from 'vuex';

// 模拟的登录api
const fakeLogin = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: '张三' });
    }, 300);
  });
};

/**
 * 用户信息
 */
export interface Userinfo {
  /**
   * 姓名
   */
  name: string;
}

/**
 * Vuex状态
 */
export interface StateType {
  /**
   * 是否登录
   */
  loginPending: boolean;
  /**
   * 用户信息
   */
  userInfo: Userinfo | null;
}

/**
 * User模块
 */
export interface ModuleType extends StoreModuleType<StateType> {
  /**
   * 状态
   */
  state: StateType;
  /**
   * Vuex mutation
   */
  mutations: {
    /**
     * 设置登录状态
     */
    setLoginPending: Mutation<StateType>;
    /**
     * 设置用户信息
     */
    setUserInfo: Mutation<StateType>;
  };
  /**
   * Vuex action
   */
  actions: {
    /**
     * 登录
     */
    loginAction: Action<StateType, StateType>;
    /**
     * 登出
     */
    logoutAction: Action<StateType, StateType>;
  };
}

const initState: StateType = {
  loginPending: false,
  userInfo: null,
};

const StoreModel: ModuleType = {
  namespaced: true,
  state: initState,
  mutations: {
    setLoginPending: (state, payload) => {
      state.loginPending = payload;
    },
    setUserInfo: (state, payload) => {
      state.userInfo = payload;
    },
  },
  actions: {
    loginAction: async ({ commit, state }): Promise<any> => {
      if (state.loginPending) {
        return;
      }
      try {
        commit('setLoginPending', true);
        const res = await fakeLogin();
        commit('setUserInfo', res);
        commit('setLoginPending', false);
      } catch (exp) {
        commit('setLoginPending', false);
        console.error('error: ', exp);
        throw exp;
      }
    },
    logoutAction: () => {
      console.log('this is logout');
    },
  },
};

export default StoreModel;
