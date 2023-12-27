import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/Index.vue';
import Dashboard from '../views/dashboard/Dashboard.vue';
import NotFoundPage from '../views/NotFoundPage.vue';
import { useAuthStore } from '../stores/auth';
import { jwtDecode } from "jwt-decode";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Index,
    meta: { 
      requiresAuth: false,
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { 
      requiresAuth: true,
    }
  },
  { 
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: NotFoundPage,
  meta: { 
      requiresAuth: false,
    }
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  const auth = useAuthStore();

    if (to.meta.requiresAuth) {
      if (!auth.username || !auth.token) {
        auth.logout();
      }

      const decoded = jwtDecode(auth.token)

      if (new Date(decoded.exp*1000) < new Date() || decoded.sub != auth.username) {
        auth.logout();
      }
  }

})

export default router