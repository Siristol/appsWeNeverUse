<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center px-4 py-20 relative">
    <!-- Top left back button -->
    <NuxtLink to="/" class="absolute left-0 top-0 mt-8 ml-8 text-3xl text-purle-300 hover:text-pink-400 font-extrabold underline underline-offset-8 z-20">← Tilbake</NuxtLink>
    <div v-if="app" class="w-full max-w-3xl flex flex-col items-center">
      <!-- Top: Logo and Name -->
      <div class="flex flex-col items-center mb-40">
        <img :src="app.icon" :alt="app.name" class="w-52 h-52 md:w-96 md:h-96 rounded-3xl object-cover mb-10" />
        <h1 class="text-6xl md:text-8xl font-extrabold text-white mb-4 drop-shadow-2xl text-center leading-tight">{{ app.name }}</h1>
      </div>
      <!-- Scroll-revealed content -->
      <div v-intersect.fade-up class="w-full max-w-3xl flex flex-col items-center mb-16">
        <div class="text-gray-300 text-3xl mb-8 font-bold tracking-wide">{{ app.year }}</div>
        <!-- Description scroll-reveal -->
        <div
          class="text-white text-2xl md:text-3xl mb-10 leading-relaxed text-center"
          v-intersect.fade-up="onDescriptionReveal"
          ref="descRef"
        >
          {{ app.description }}
        </div>
        <!-- Screenshots: reveal one by one as you scroll -->
        <div v-if="app.screenshots && app.screenshots.length" class="w-full mb-10 flex flex-col gap-10">
          <div style="height: 120px;"></div> <!-- Spacer to require more scroll before screenshots -->
          <img
            v-for="(shot, i) in app.screenshots"
            :key="i"
            :src="shot"
            :class="[
              'w-full max-w-2xl rounded-2xl border-2 border-white/30 shadow-xl transition-all duration-500',
              i % 2 === 0 ? 'md:translate-x-50 md:self-end' : 'md:-translate-x-50 md:self-start'
            ]"
            v-intersect.fade-up
          />
        </div>
        <div class="text-gray-200 italic text-2xl text-center mt-8 mb-8">{{ app.commentary }}</div>
        <NuxtLink to="/" class="mt-12 inline-block text-3xl text-purle-300 hover:text-pink-400 font-extrabold underline underline-offset-8">← Tilbake</NuxtLink>
      </div>
    </div>
    <div v-else class="text-white text-4xl font-bold">Appen ble ikke funnet.</div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { apps } from '~/data/apps.js'
import { useAppRevealsStore } from '~/stores/appReveals.js'
import { storeToRefs } from 'pinia'

const appRevealsStore = useAppRevealsStore()
const { reveals } = storeToRefs(appRevealsStore)

const route = useRoute()
const router = useRouter()
const appId = computed(() => Number(route.params.id))
const app = computed(() => {
  const base = apps.find(a => a.id === appId.value)
  const reveal = reveals.value.find(r => r.id === appId.value)
  return base && reveal ? { ...base, ...reveal } : base
})

// Stop ice song if leaving the Ice app page (id=11) to any other page
// Always stop the music when leaving this page, regardless of appId
onUnmounted(() => {
  if (typeof window !== 'undefined' && window.iceAudio) {
    window.iceAudio.pause()
    window.iceAudio.currentTime = 0
    window.iceAudio = null
  }
})

// No reveal logic needed for screenshots; each will reveal itself as it scrolls into view
const descRef = ref(null)
const onDescriptionReveal = () => {} // still used for fade-up, but no state needed
</script>

<script>
// Simple fade-up directive for scroll-reveal
export default {
  directives: {
    intersect: {
      mounted(el, binding) {
        el.style.opacity = 0;
        el.style.transform = 'translateY(40px)';
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              el.style.transition = 'opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)';
              el.style.opacity = 1;
              el.style.transform = 'translateY(0)';
              observer.disconnect();
            }
          },
          { threshold: 0.15 }
        );
        observer.observe(el);
      }
    }
  }
}
</script>

<style scoped>
.fade-up {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
}
</style>
