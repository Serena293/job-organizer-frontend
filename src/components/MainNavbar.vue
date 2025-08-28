<script setup>
  import { RouterLink } from 'vue-router';


</script>

<template>
 <nav class="flex justify-between bg-gray-900 p-5 text-white">
    <div>Logo</div>
    <ul class="flex space-x-6">
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/jobs">Jobs</RouterLink></li>
        <li><RouterLink to="/jobs/add">Add Job</RouterLink></li>
    </ul>
 </nav>
</template>