const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Dashboard.vue'),
        children: [
          {
            path: '',
            component: () => import('components/DashboardRight.vue')
          },
          {
            path: "/AddQuiz", component: () => import('components/AddQuizz.vue')
          }
        ]
      },
      {
        path: '/questions/:quizzId',
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
    path: '/quizzes/:quizId/questions/:questionId',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/AnswerForm.vue')
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
