<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <div class="flex flex-col flex-1">
      <Topbar />
      <main class="flex-1 p-6 overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import Topbar from '../components/Topbar.vue'
</script>
