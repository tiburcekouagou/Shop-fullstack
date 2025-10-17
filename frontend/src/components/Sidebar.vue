<template>
  <div class="w-64 bg-white shadow-md flex flex-col">
    <div class="p-4 text-xl font-bold border-b">MonApp</div>
    <nav class="flex-1 p-4 space-y-2">
      <router-link
        v-for="item in menuItems"
        :key="item.key"
        :to="item.to"
        class="block px-4 py-2 rounded-lg font-medium transition"
        :class="[
          $route.path === item.to
            ? 'bg-blue-600 text-white'
            : 'text-gray-700 hover:bg-gray-200'
        ]"
      >
        {{ item.label }}
      </router-link>
    </nav>
  </div>
</template>

<script setup>
const menuItems = [
  { key: 'dashboard', label: 'Dashboard', to: {name: 'adminboard'} },
  { key: 'products', label: 'Produits', to: {name: 'products'} },
  { key: 'categories', label: 'Catégories', to: {name: 'categories'} },
  { key: 'users', label: 'Utilisateurs', to: { name: 'users'} }
]
</script>
