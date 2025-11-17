import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import FeedbackSubmit from "../pages/FeedbackSubmit.vue";
import FeedbackThankYou from "../pages/FeedbackThankYou.vue";
import Dashboard from "../pages/Dashboard.vue";
import ReviewManagement from "../pages/ReviewManagement.vue";
import Login from "../pages/Login.vue";
import Settings from "../pages/Settings.vue";
import About from "../pages/About.vue";
import { auth } from "../services/firebase";

const routes = [
  { path: "/", component: Home },
  { path: "/feedback", component: FeedbackSubmit },
  { path: "/thankyou", component: FeedbackThankYou },
  { path: "/about", component: About },

  // 🔒 Admin-only
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  {
    path: "/reviews",
    component: ReviewManagement,
    meta: { requiresAuth: true },
  },
  { path: "/settings", component: Settings, meta: { requiresAuth: true } },

  { path: "/login", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔑 Global navigation guard
router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  if (to.meta.requiresAuth && !user) {
    // Not logged in → redirect to login
    next("/login");
  } else {
    next();
  }
});

export default router;
