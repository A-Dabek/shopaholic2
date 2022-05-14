import { createRouter, createWebHistory } from 'vue-router';
import PlanningView from '../features/planning/PlanningView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'planning',
      component: PlanningView,
    },
  ],
});

export default router;
