import confetti from 'canvas-confetti'

export default defineNuxtPlugin(() => {
  if (typeof window !== 'undefined') {
    window.confetti = confetti
  }
})
