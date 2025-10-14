<template>
  <DefaultLayout />
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Connexion</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- Champ email -->
        <div>
          <label class="block text-gray-600 mb-1">Adresse e-mail</label>
          <input v-model="form.email" type="email"
            class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="exemple@email.com" required />
        </div>

        <!-- Champ mot de passe -->
        <div>
          <label class="block text-gray-600 mb-1">Mot de passe</label>
          <input v-model="form.password" type="password"
            class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Votre mot de passe" required />
        </div>

        <!-- Bouton connexion -->
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Se connecter
        </button>

        <!-- Lien vers inscription -->
        <p class="text-center text-gray-500 mt-4">
          Pas encore de compte ?
          <router-link to="/register" class="text-blue-600 hover:underline">
            Créez-en un
          </router-link>
        </p>
      </form>

      <!-- Message d'erreur -->
      <p v-if="errorMessage" class="text-red-500 text-center mt-4">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DefaultLayout from '@/layouts/defaultLayout.vue'
import { login } from '@/api/auth.api'

const router = useRouter()

const form = ref({
  email: '',
  password: '',
})

const errorMessage = ref('')

const handleLogin = async () => {
  await login(form.value)
  // Vérifie les identifiants de connexion
  router.push('/dashboard')
}
</script>
