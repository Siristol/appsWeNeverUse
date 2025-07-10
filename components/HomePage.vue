<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
    <!-- Header -->
    <header class="text-center py-12 px-4">
      <h1 class="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
        Apper <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"> vi aldri bruker</span>
      </h1>
      <p class="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
        📱 En nostalgisk reise gjennom den digitale gravplassen for apper som en gang dominerte skjermene våre.
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
          @click="revealApp(app)"
          class="app-card relative aspect-square rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          :class="{
            'blur-md grayscale': !app.revealed,
            'shadow-lg shadow-purple-500/25': app.revealed
          }"
        >
          <!-- App Icon -->
          <div class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
            <img
              :src="app.icon"
              :alt="app.name"
            class="w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover"
              :class="{ 'filter blur-sm': !app.revealed }"
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
                <div class="text-xs text-gray-300">{{ app.year }}</div>
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
import { ref, computed } from 'vue'

// Sample discontinued apps data with placeholder icons
const apps = ref([
  { id: 1, name: 'Vine', icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="20" fill="%2300bf63"/><text x="50" y="50" text-anchor="middle" dy="0.3em" fill="white" font-family="sans-serif" font-size="16" font-weight="bold">VINE</text></svg>', year: '2013-2017', revealed: false, justRevealed: false },
  { id: 2, name: 'Google+', icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="20" fill="%23dd4b39"/><text x="50" y="50" text-anchor="middle" dy="0.3em" fill="white" font-family="sans-serif" font-size="20" font-weight="bold">G+</text></svg>', year: '2011-2019', revealed: false, justRevealed: false },
  { id: 3, name: 'Flappy Bird', icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="20" fill="%2370c5ce"/><text x="50" y="50" text-anchor="middle" dy="0.3em" font-size="30">🐦</text></svg>', year: '2013-2014', revealed: false, justRevealed: false },
  { id: 4, name: 'Path', icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="20" fill="%23ee3124"/><text x="50" y="50" text-anchor="middle" dy="0.3em" fill="white" font-family="sans-serif" font-size="16" font-weight="bold">PATH</text></svg>', year: '2010-2018', revealed: false, justRevealed: false },
  { id: 5, name: 'Yo', icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="20" fill="%239c27b0"/><text x="50" y="50" text-anchor="middle" dy="0.3em" fill="white" font-family="sans-serif" font-size="24" font-weight="bold">YO</text></svg>', year: '2014-2016', revealed: false, justRevealed: false },
  { id: 6, name: 'Clubhouse', icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="20" fill="%23f2c94c"/><text x="50" y="50" text-anchor="middle" dy="0.3em" font-size="30">🏠</text></svg>', year: '2020-2023', revealed: false, justRevealed: false },
  { id: 7, name: 'HQ Trivia', icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="20" fill="%23667eea"/><text x="50" y="50" text-anchor="middle" dy="0.3em" fill="white" font-family="sans-serif" font-size="20" font-weight="bold">HQ</text></svg>', year: '2017-2020', revealed: false, justRevealed: false },
  { id: 8, name: 'Musical.ly', icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="20" fill="%23ff006e"/><text x="50" y="50" text-anchor="middle" dy="0.3em" font-size="30">🎵</text></svg>', year: '2014-2018', revealed: false, justRevealed: false },
  { id: 9, name: 'QuizUp', icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="20" fill="%234ecdc4"/><text x="50" y="50" text-anchor="middle" dy="0.3em" fill="white" font-family="sans-serif" font-size="30" font-weight="bold">?</text></svg>', year: '2013-2019', revealed: false, justRevealed: false },
  { id: 10, name: 'Meerkat', icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="20" fill="%23ff9068"/><text x="50" y="50" text-anchor="middle" dy="0.3em" font-size="30">📹</text></svg>', year: '2015-2016', revealed: false, justRevealed: false },
  { id: 11, name: 'Draw Something', icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="20" fill="%23ffecd2"/><text x="50" y="50" text-anchor="middle" dy="0.3em" font-size="30">✏️</text></svg>', year: '2012-2014', revealed: false, justRevealed: false },
  { id: 12, name: 'Color', icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="20" fill="%23a8edea"/><text x="50" y="50" text-anchor="middle" dy="0.3em" font-size="30">🎨</text></svg>', year: '2011-2012', revealed: false, justRevealed: false },
  { id: 13, name: 'Ping', icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="20" fill="%23ff8a80"/><text x="50" y="50" text-anchor="middle" dy="0.3em" fill="white" font-family="sans-serif" font-size="16" font-weight="bold">PING</text></svg>', year: '2010-2012', revealed: false, justRevealed: false },
  { id: 14, name: 'Yik Yak', icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="20" fill="%23558b2f"/><text x="50" y="50" text-anchor="middle" dy="0.3em" fill="white" font-family="sans-serif" font-size="18" font-weight="bold">YY</text></svg>', year: '2013-2017', revealed: false, justRevealed: false },
  { id: 15, name: 'Foursquare', icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="20" fill="%230099e5"/><text x="50" y="50" text-anchor="middle" dy="0.3em" font-size="30">4️⃣</text></svg>', year: '2009-2019', revealed: false, justRevealed: false },
  { id: 16, name: 'Rdio', icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="20" fill="%23007ac1"/><text x="50" y="50" text-anchor="middle" dy="0.3em" font-size="30">📻</text></svg>', year: '2010-2015', revealed: false, justRevealed: false },
  { id: 17, name: 'Sunrise', icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="20" fill="%23ffc107"/><text x="50" y="50" text-anchor="middle" dy="0.3em" font-size="30">🌅</text></svg>', year: '2013-2015', revealed: false, justRevealed: false },
  { id: 18, name: 'Mailbox', icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="20" fill="%2329b6f6"/><text x="50" y="50" text-anchor="middle" dy="0.3em" font-size="30">📫</text></svg>', year: '2013-2015', revealed: false, justRevealed: false },
])

// Computed properties
const appsRevealed = computed(() => apps.value.filter(app => app.revealed).length)
const totalApps = computed(() => apps.value.length)

// Methods
const revealApp = (app) => {
  if (!app.revealed) {
    app.revealed = true
    app.justRevealed = true
    
    // Remove the just revealed effect after animation
    setTimeout(() => {
      app.justRevealed = false
    }, 1000)
    
    // Add some celebration
    console.log(`🎉 You revealed ${app.name}!`)
  }
}

const revealRandomApp = () => {
  const unrevealedApps = apps.value.filter(app => !app.revealed)
  if (unrevealedApps.length > 0) {
    const randomApp = unrevealedApps[Math.floor(Math.random() * unrevealedApps.length)]
    revealApp(randomApp)
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
</style>
