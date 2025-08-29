import {createRouter, createWebHistory} from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import JobsView from '@/views/JobsView.vue';
import JobDetail from '@/views/JobDetail.vue';
import AddJob from '@/views/AddJob.vue';

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
        name: 'job',
        component: JobDetail
    },
    {
        path:'/jobs/add',
        name:'add-job',
        component: AddJob

    }
]
})

export default router;