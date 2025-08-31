import {createRouter, createWebHistory} from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import JobsView from '@/views/JobsView.vue';
import JobDetail from '@/views/JobDetail.vue';
import AddJob from '@/views/AddJob.vue';
import EditView from '@/views/EditView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:
    [{
        path:'/',
        name: 'home',
        component: HomeView
    },
    {
        path:'/jobs',
        name: 'jobs',
        component: JobsView
    },
    {
        path: '/jobs/:id',
        name: 'job-detail',
        component: JobDetail
    },
    {
        path:'/jobs/add',
        name:'add-job',
        component: AddJob

    },
    {
        path: '/job/edit/:id',
        name: 'edit-job',
        component: EditView,

    },
    {
        path:'/login',
        name:'login',
        component: LoginView,
    },
    {
        path:'/register',
        name:'register',
        component: RegisterView,
    }
]
})

export default router;