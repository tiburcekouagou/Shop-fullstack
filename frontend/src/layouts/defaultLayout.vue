<script setup>
import { useRoute } from 'vue-router'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Connexion', to: '/login' },
  { label: 'Register', to: '/register' }
]
const route = useRoute()
</script>

<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto flex items-center justify-between px-6 py-4">
      <!-- Logo -->
      <div class="flex items-center space-x-3">
        <!-- <img
          alt="Vue logo"
          src="@/assets/logo.svg"
          class="w-12 h-12"
        /> -->
      </div>

      <!-- Navigation -->
      <nav class="flex space-x-6">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to"
          class="text-gray-600 font-medium transition-colors duration-200" :class="{
            'text-blue-600 border-b-2 border-blue-600 pb-1': route.path === item.to,
            'hover:text-blue-500': route.path !== item.to
          }">
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </header>

  <div class="bg">
    <slot></slot>
  </div>
</template>
