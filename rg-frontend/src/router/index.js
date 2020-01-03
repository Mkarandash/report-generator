import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import SelectProject from '@/views/SelectProject'
import User from '@/views/User'
import EditProjects from '@/views/EditProjects'
import Settings from '@/views/Settings'
import Login from '@/views/Login'
import Register from '@/views/Register'
import SelectTemplate from '@/views/SelectTemplate'
import SearchTemplate from '@/views/SearchTemplate'
import AddProject from '@/views/AddProject'
import FindProjects from '@/views/FindProjects'
import EditProject from '@/views/EditProject'
import AddTemplate from '@/views/AddTemplate'
import EditTemplate from '@/views/EditTemplate'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/search/projects',
      component: SelectProject,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user/:userId',
      component: User,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/projects',
      component: EditProjects,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/add/projects/new',
      component: AddProject,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/add/projects/find',
      component: FindProjects,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/projects/:projectId',
      component: EditProject,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      component: Settings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/search/projects/:projectId/templates',
      component: SelectTemplate,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/search/projects/:projectId/templates/:templateId',
      component: SearchTemplate,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/projects/:projectId/templates/new',
      component: AddTemplate,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/projects/:projectId/templates/:templateId',
      component: EditTemplate,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*', redirect: '/search/projects'
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
