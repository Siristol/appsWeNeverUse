<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center px-4 py-12">
    <div v-if="app" class="w-full max-w-lg bg-white/10 rounded-3xl shadow-xl p-8 flex flex-col items-center">
      <img :src="app.icon" :alt="app.name" class="w-32 h-32 rounded-2xl object-cover mb-6" />
      <h1 class="text-4xl font-bold text-white mb-2">{{ app.name }}</h1>
      <div class="text-gray-300 text-lg mb-4">{{ app.year }}</div>
      <div class="text-white text-base mb-4">{{ app.description }}</div>
      <div class="flex flex-wrap gap-4 mb-4">
        <span class="bg-pink-500/80 text-white px-3 py-1 rounded-full text-sm font-semibold">⭐ {{ app.rating }}</span>
        <span class="bg-blue-500/80 text-white px-3 py-1 rounded-full text-sm font-semibold">📅 {{ app.year }}</span>
      </div>
      <div v-if="app.screenshots && app.screenshots.length" class="w-full mb-4">
        <div class="text-white font-semibold mb-2">Skjermbilder:</div>
        <div class="flex gap-2 overflow-x-auto">
          <img v-for="(shot, i) in app.screenshots" :key="i" :src="shot" class="h-32 rounded-lg border border-white/20" />
        </div>
      </div>
      <div class="text-gray-200 italic text-center mt-4">{{ app.commentary }}</div>
      <NuxtLink to="/" class="mt-8 inline-block text-purple-300 hover:text-pink-400 font-bold">← Tilbake</NuxtLink>
    </div>
    <div v-else class="text-white text-2xl">Appen ble ikke funnet.</div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { apps } from '~/data/apps.js'

const route = useRoute()
const appId = computed(() => Number(route.params.id))
const app = computed(() => apps.find(a => a.id === appId.value))
</script>
