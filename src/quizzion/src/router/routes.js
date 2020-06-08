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
          },
          {
            path: "/quizzes/:quizId", component: () => import('components/EditQuiz.vue')
          }
        ]
      },
      {
        path: '/quizzes/:quizId/questions',
        component: () => import('pages/AddQuizQuestions.vue')
      },
      {
        path: '/result/moderator/:quizId',
        component: () => import('pages/ResultPageForModerator.vue'),
      },
      {
        path:'/result/respondent/:resultId',
        component:()=>import('pages/ResultPageForRespondent.vue')
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
  },
  {
    path: '/quizzes/:quizId/invite',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Invitation.vue')
      }
    ]
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
