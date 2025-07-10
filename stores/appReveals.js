import { defineStore } from 'pinia'
import { apps as sharedApps } from '~/data/apps.js'

export const useAppRevealsStore = defineStore('appReveals', {
  state: () => ({
    reveals: sharedApps.map(app => ({ id: app.id, revealed: false, justRevealed: false }))
  }),
  actions: {
    revealApp(id) {
      const app = this.reveals.find(a => a.id === id)
      if (app && !app.revealed) {
        app.revealed = true
        app.justRevealed = true
        setTimeout(() => { app.justRevealed = false }, 1000)
      }
    },
    resetReveals() {
      this.reveals.forEach(app => {
        app.revealed = false
        app.justRevealed = false
      })
    }
  }
})
