import { createRouter, createWebHistory } from 'vue-router';
import PlanningView from '../views/PlanningView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'planning',
      component: PlanningView,
    },
    {
      path: '/shopping/:name',
      name: 'shopping',
      component: () => import('../views/ShoppingView.vue'),
    },
  ],
});

export default router;
