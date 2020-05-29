import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/product',
    },
    {
      path: '/product',
      name: 'Product',
      component: () => import('@/modules/Product'),
    },
    {
      path: '/solution',
      name: 'Solution',
      component: () => import('@/modules/Solution'),
    },
    {
      path: '/task',
      name: 'Task',
      component: () => import('@/modules/Task'),
    },
    
  ]
});

router.beforeEach((to, from, next) => {
  next();
});



export default router;