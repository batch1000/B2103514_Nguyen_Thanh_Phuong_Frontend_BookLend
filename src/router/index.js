import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/homeAdmin',
    component: () => import('../views/HomeAdmin.vue'),
    children: [
      {
        path: 'addBook',
        component: () => import('../views/AddBook.vue'),
      },
      {
        path: 'updateBook',
        component: () => import('../views/UpdateBook.vue'),
      },
      {
        path: 'deleteBook',
        component: () => import('../views/DeleteBook.vue'),
      },
      {
        path: '',
        redirect: 'addBook'
      }
    ]
  }
  ,
  {
    path: '/library',
    name: 'Library',
    component: () => import('../views/Library.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('_id')
  const role = localStorage.getItem('role')

  if (to.path === '/' && isLoggedIn) {
    if (role === 'Admin') return next('/homeAdmin/addBook')
    return next('/home')
  }

  const publicPages = ['/', '/signup']
  const isPublic = publicPages.includes(to.path)

  if (!isLoggedIn && !isPublic) {
    return next('/')
  }

  next()
})

export default router
