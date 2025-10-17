<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <div class="flex flex-col flex-1">
      <Topbar />
      <main class="flex-1 p-6 overflow-y-auto">
          <router-view />

        {{ {testData} }}
      </main>
    </div>
  </div>
</template>

<script setup>
import axiosClient from '@/api/axiosClient';
// import { useAuth } from '../../composables/auth';
import Sidebar from '../components/Sidebar.vue'
import Topbar from '../components/Topbar.vue'

// const auth = useAuth()

const testData = await axiosClient.post('/auth/test')
</script>
