<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Gestion des Catégories</h1>

    <form @submit.prevent="saveCategory" class="space-y-3 mb-6">
      <div>
        <label class="block font-semibold mb-1">Titre</label>
        <input
          v-model="form.title"
          type="text"
          placeholder="Nom de la catégorie"
          class="border rounded w-full p-2"
          required
        />
      </div>

      <div>
        <label class="block font-semibold mb-1">Description</label>
        <textarea
          v-model="form.description"
          placeholder="Brève description"
          class="border rounded w-full p-2"
        ></textarea>
      </div>

      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {{ form._id ? 'Modifier' : 'Ajouter' }}
      </button>
      <button
        v-if="form._id"
        @click="resetForm"
        type="button"
        class="ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
      >
        Annuler
      </button>
    </form>

    <!-- ✅ Tableau des catégories -->
    <table class="w-full border">
      <thead class="bg-gray-100">
        <tr>
          <th class="border p-2 text-left">Titre</th>
          <th class="border p-2 text-left">Description</th>
          <th class="border p-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cat in categories" :key="cat._id" class="hover:bg-gray-50">
          <td class="border p-2">{{ cat.title }}</td>
          <td class="border p-2">{{ cat.description }}</td>
          <td class="border p-2 text-center">
            <button
              @click="editCategory(cat)"
              class="text-blue-600 hover:underline mr-3"
            >
              Modifier
            </button>
            <button
              @click="deleteCategory(cat._id)"
              class="text-red-600 hover:underline"
            >
              Supprimer
            </button>
          </td>
        </tr>
        <tr v-if="!categories.length">
          <td colspan="3" class="p-4 text-center text-gray-500">
            Aucune catégorie trouvée.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const categories = ref([])
const form = ref({ id: null, title: '', description: '' })

// Charger les catégories
const fetchCategories = async () => {
  console.log('Récup des données... !!')
}

// Sauvegarder ou modifier
const saveCategory = async () => {
  
}

// Supprimer
const deleteCategory = async (id) => {
 
}

// Éditer
const editCategory = (cat) => {
}

// Réinitialiser le formulaire
const resetForm = () => {
  form.value = { id: null, title: '', description: '' }
}

onMounted(fetchCategories)
</script>
