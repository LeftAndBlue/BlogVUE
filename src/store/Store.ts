// stores/counter.js
import { defineStore } from "pinia";
export const user = defineStore("userInfo", {
  state: () => ({
    data: { id: "", Name: "", token: "", Email: "" },
  }),
  actions: {
    setData(payload: any) {
      this.data = payload;
    },
  },
});
