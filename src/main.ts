import "./public-path";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

let instance: any = null;
function render(props: any = {}) {
  const { container } = props;

  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");
}

// 独立运行时
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render();
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function mount(props: any) {
  console.log("[vue] props from main framework", props);
  render(props);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
  // router = null;
}
