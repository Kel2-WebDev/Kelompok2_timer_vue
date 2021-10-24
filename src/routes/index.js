import { createWebHistory, createRouter } from "vue-router";
import TimerPageVue from "../components/TimerPage.vue";
import JoinVue from "../components/Join.vue";
import FormVue from "../components/Form.vue";
const routes = [
  {
    path: "/",
    name: "Form",
    component: FormVue
  },
  {
    path: "/join",
    name: "Join",
    component: JoinVue
  },
  {
    path: "/timer/:id",
    name: "TimerPage",
    component: TimerPageVue
  },
  {
    path: "/:catchAll(.*)",
    redirect: (to) => {
      // the function receives the target route as the argument
      // we return a redirect path/location here.
      return { path: "/" };
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
