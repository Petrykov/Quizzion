const routes = [
  {
    path: '/',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {path: '', component: () => import('components/DashboardRight.vue')},

      //Todo: check with team if we need layout for login or not
      // { path:'login',component:()=>import('pages/Login.vue')}
    ]
  },
  {
    path: '/addQuizQuestions',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/AddQuizQuestions.vue')
      }
    ]
  },

  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Login.vue')
      }
    ]
  },

  {
    path: '/answer',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/AnswerForm.vue')
      }
    ]
  },

  {
    path: '/AddQuiz',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('components/AddQuizz.vue')
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
