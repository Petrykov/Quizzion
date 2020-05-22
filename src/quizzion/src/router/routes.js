
const routes = [
  {
    path: '/',
    component: () => import('pages/AddQuizz.vue'),
    children: [
      { 
        path: '', 
        component: () => import('pages/Index.vue') 
      },

      { 
        path: '/addQuizz', 
        component: () => import('pages/AddQuizz.vue') 
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
