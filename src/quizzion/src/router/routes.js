
const routes = [
  {
    path: '/',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      { path: '/login', component: () => import('pages/Login.vue')} ,
      { path: '/addQuizQuestions', component: () => import('pages/AddQuizz.vue')}
      { path: '/answer', component: () => import('pages/AnswerForm.vue') }
      { path: '', component: () => import('components/DashboardRight.vue') },
      { path: "/AddQuiz", component: () => import('components/AddQuizz.vue') }
      //Todo: check with team if we need layout for login or not
      // { path:'login',component:()=>import('pages/Login.vue')}
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
