<template>
  <DefaultLayout />
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Créer un compte</h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- Champ email -->
        <div>
          <label class="block text-gray-600 mb-1">Adresse email</label>
          <input v-model="form.email" type="email"
            class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
            placeholder="exemple@email.com" autocomplete="email" required />
        </div>

        <!-- Nom d'utilisateur -->
        <div>
          <label class="block text-gray-600 mb-1">Nom d'utilisateur</label>
          <input v-model="form.username" type="text"
            class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
            placeholder="Choisissez un nom d'utilisateur" autocomplete="username" required />
        </div>

        <!-- Mot de passe -->
        <div>
          <label class="block text-gray-600 mb-1">Mot de passe</label>
          <input v-model="form.password" type="password"
            class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
            placeholder="Votre mot de passe" required autocomplete="new-password" />
        </div>

        <!-- Confirmation mot de passe -->
        <div>
          <label class="block text-gray-600 mb-1">Confirmer le mot de passe</label>
          <input v-model="form.password_confirmation" type="password"
            class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
            placeholder="Confirmez le mot de passe" required autocomplete="new-password" />
        </div>

        <!-- Bouton -->
        <button type="submit" class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
          S'inscrire
        </button>

        <!-- Lien -->
        <p class="text-center text-gray-500 mt-4">
          Déjà un compte ?
          <router-link to="/login" class="text-green-600 hover:underline">
            Connectez-vous
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
import axios from 'axios'
import { useRouter } from 'vue-router'
import DefaultLayout from '@/layouts/defaultLayout.vue'
import axiosClient from '@/api/axiosClient'
import { register } from '@/api/auth.api'

const router = useRouter()
const apiUrl = import.meta.env.VITE_API_URL

const form = ref({
  email: '',
  username: '',
  password: '',
  password_confirmation: ''
})

const errorMessage = ref('')

const handleRegister = async () => {
  await register(form.value)
}

// onMounted(async () => {
//   const response = await axios.post(`${apiUrl}/register`);
//   console.log(form.value);


//   console.log(response);

// })
</script>
