<script setup>
import { RouterView } from 'vue-router'

</script>

<template>
  <div>
    <Suspense>
      <RouterView />
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </div>
</template>

