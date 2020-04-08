import Vue from "vue";
import VueRouter from "vue-router";
import TableList from "../views/TableList.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "TableList",
    component: TableList
  }

];

const router = new VueRouter({
  routes
});

export default router;
