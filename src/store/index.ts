import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

import type { MainState } from "./types";

/*  
  Store variable name is "this.<id>Store"
    id: "main" --> this.mainStore
  Important! The id must be unique for every store.
*/
export const useMainStore = defineStore({
  id: "main",
  /*  
    --------------------------------------------------------------------------------------
    STATES
    --------------------------------------------------------------------------------------
  */
  state: (): MainState => ({
    metadatahub: {
      tokens: useLocalStorage<Record<string, string>>("metadatahub.tokens", {}),
    },
  }),

  /*  
    --------------------------------------------------------------------------------------
    GETTERS
    --------------------------------------------------------------------------------------
    Synchronous code only.
    
    In a component use as e.g.:
      :label = "this.mainStore.<getter_name>;
  */
  getters: {
    tokens(): Record<string, string> {
      return this.metadatahub.tokens;
    },
  },
  /*  
    --------------------------------------------------------------------------------------
    ACTIONS
    --------------------------------------------------------------------------------------
    Asynchronous & Synchronous code comes here (e.g. API calls and VueX mutations).
    To change a state use an action.

    In a component use as e.g.:
      @click = "this.mainStore.<action_name>();
  */
  actions: {
    getToken(provider: string): string | null {
      if (this.tokens[provider]) {
        return this.tokens[provider];
      }
      return null;
    },
    removeToken(provider: string) {
      const tokens = { ...this.tokens };
      delete tokens[provider];
      this.metadatahub.tokens = tokens;
    },
    storeToken(provider: string, token: string) {
      const tokens = { ...this.tokens };
      tokens[provider] = token;
      this.metadatahub.tokens = tokens;
    },
  },
});

export default useMainStore;
