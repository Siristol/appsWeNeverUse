<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
    <!-- Header -->
    <header class="text-center py-12 px-4">
      <h1 class="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
        Apper <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"> vi aldri bruker</span>
      </h1>
      <p class="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
        📱 En nostalgisk reise gjennom den digitale gravplassen for apper vi alle har – men aldri egentlig bruker – og de som en gang dominerte skjermene våre.
      </p>
      <p class="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
        Klikk på de uklare ikonene nedenfor for å avsløre glemte apper og gjenoppleve minnene! 🕹️
      </p>
    </header>

    <!-- Stats Section -->
    <div class="text-center mb-12">
      <div class="flex justify-center gap-8 md:gap-16 text-white">
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold text-pink-400">{{ appsRevealed }}</div>
          <div class="text-sm text-gray-400">Åpnede apper</div>
        </div>
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold text-purple-400">{{ totalApps }}</div>
          <div class="text-sm text-gray-400">Totale apper</div>
        </div>
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold text-blue-400">{{ Math.round((appsRevealed / totalApps) * 100) }}%</div>
          <div class="text-sm text-gray-400">Fremdrift</div>
        </div>
      </div>
    </div>

    <!-- App Grid -->
    <div class="container mx-auto px-4 pb-16">
      <div class="grid grid-cols-4 gap-8 max-w-5xl mx-auto">
        <div
          v-for="app in apps"
          :key="app.id"
          @click="handleAppClick(app)"
          class="app-card relative aspect-square rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          :class="{
            'blur-md grayscale': !app.revealed,
            'shadow-lg shadow-purple-500/25': app.revealed,
            'animate-shake': app.shaking
          }"
        >
          <!-- App Icon -->
          <div class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
            <img
              :src="app.icon"
              :alt="app.name"
            class="w-28 h-28 md:w-32 md:h-32 rounded-3xl object-cover"
              :class="{ 'filter blur-2xl grayscale contrast-50 brightness-75': !app.revealed }"
            />
            
            <!-- Overlay for unrevealed apps -->
            <div
              v-if="!app.revealed"
              class="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <div class="text-white text-center">
                <div class="text-2xl mb-1">❓</div>
                <div class="text-xs font-medium">Reveal</div>
              </div>
            </div>

            <!-- Revealed overlay -->
            <div
              v-else
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3"
            >
              <div class="text-white text-center">
                <div class="text-xs font-bold truncate">{{ app.name }}</div>
              </div>
            </div>
          </div>

          <!-- Click effect -->
          <div
            v-if="app.justRevealed"
            class="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 animate-pulse"
          ></div>
        </div>
      </div>
    </div>

    <!-- Bottom CTA -->
    <div class="text-center pb-16 px-4">
      <div class="max-w-2xl mx-auto">
        <h3 class="text-2xl md:text-3xl font-bold text-white mb-4">
          Husker du disse appene? 🏛️
        </h3>
        <p class="text-gray-300 mb-8">
          Hver app forteller en historie om ambisjon, innovasjon og noen ganger spektakulære fiaskoer. 
          Klikk for å avdekke mobilhistoriens opp- og nedturer!
        </p>
        <button
          @click="revealRandomApp"
          class="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          🎲 Åpne en tilfeldig app
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { apps as sharedApps } from '~/data/apps.js'
import { useAppRevealsStore } from '~/stores/appReveals.js'
import { storeToRefs } from 'pinia'

const appRevealsStore = useAppRevealsStore()
const { reveals } = storeToRefs(appRevealsStore)
import { ref } from 'vue'
const shakingAppId = ref(null)
const apps = computed(() => sharedApps.map(app => ({
  ...app,
  ...reveals.value.find(r => r.id === app.id),
  shaking: shakingAppId.value === app.id
})))

const appsRevealed = computed(() => reveals.value.filter(app => app.revealed).length)
const totalApps = computed(() => reveals.value.length)

const router = useRouter()

const playIceSong = () => {
  const audio = new Audio('/iceicebaby.mp3')
  audio.play()
}

const triggerConfetti = () => {
  // Simple confetti burst using canvas-confetti if available
  if (typeof window !== 'undefined' && window.confetti) {
    window.confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    })
  }
}

const handleAppClick = (app) => {
  if (app.id === 11) {
    playIceSong()
  }
  if (!app.revealed) {
    shakingAppId.value = app.id
    setTimeout(() => {
      shakingAppId.value = null
      appRevealsStore.revealApp(app.id)
      triggerConfetti()
    }, 1000)
  } else {
    goToApp(app)
  }
}

const goToApp = (app) => {
  router.push(`/app/${app.id}`)
}

const revealRandomApp = () => {
  const unrevealedApps = apps.value.filter(app => !app.revealed)
  if (unrevealedApps.length > 0) {
    const randomApp = unrevealedApps[Math.floor(Math.random() * unrevealedApps.length)]
    appRevealsStore.revealApp(randomApp.id)
  }
}
</script>

<style scoped>
.app-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.app-card:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
  border-color: rgba(255, 255, 255, 0.2);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes shake {
  10%, 90% { transform: translateX(-2px); }
  20%, 80% { transform: translateX(4px); }
  30%, 50%, 70% { transform: translateX(-8px); }
  40%, 60% { transform: translateX(8px); }
}
.animate-shake {
  animation: shake 0.9s cubic-bezier(.36,.07,.19,.97) both;
}
</style>

<style scoped>
.app-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.app-card:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
  border-color: rgba(255, 255, 255, 0.2);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
