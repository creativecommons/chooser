import Vue from 'vue';
import Router from 'vue-router';
import ErrorPage from '../components/ErrorPage.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*', // Wildcard route for any unmatched routes
      name: 'error',
      component: ErrorPage // Show the ErrorPage component for 404
    }
  ]
});

export default router;
