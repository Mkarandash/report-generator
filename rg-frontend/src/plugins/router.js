import Vue from 'vue'
import Router from 'vue-router'
import store from '@/plugins/vuex'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import ProjectsListPage from '@/pages/ProjectsListPage.vue'
import TemplatesListPage from '@/pages/TemplatesListPage.vue'
import SearchPage from '@/pages/SearchPage.vue'
import AdministrationPage from '@/pages/AdministrationPage.vue'
import CreateProjectPage from '@/pages/CreateProjectPage.vue'
import EditProjectPage from '@/pages/EditProjectPage.vue'
import CreateTemplatePage from '@/pages/CreateTemplatePage.vue'
import EditTemplatePage from '@/pages/EditTemplatePage.vue'
import UserProfilePage from '@/pages/UserProfilePage.vue'
//import SettingsPage from '@/pages/SettingsPage.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: LoginPage,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/register',
      component: RegisterPage,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/projects',
      component: ProjectsListPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/projects/:projectId',
      component: TemplatesListPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/projects/:projectId/:templateId',
      component: SearchPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/administration',
      component: AdministrationPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/administration/new',
      component: CreateProjectPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/administration/:projectId',
      component: EditProjectPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/administration/:projectId/new',
      component: CreateTemplatePage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/administration/:projectId/:templateId',
      component: EditTemplatePage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user',
      component: UserProfilePage,
      meta: {
        requiresAuth: true
      }
    },
   /* {
      path: '/settings',
      component: SettingsPage,
      meta: {
        requiresAuth: true
      }
    },*/
    {
      path: '*',
      redirect: '/projects'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    next('/login')
  } else if (to.matched.some(record => record.path.match('/login') || record.path.match('/register')) && store.getters.isLoggedIn) {
    next('/projects')
    return
  } else {
    next()
  }
})

export default router
