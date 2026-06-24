<script setup>
import { ref } from 'vue'
import { destinations } from '../data/destinations.js'

const isOpen = ref(false)
const activeIndex = ref(0)

const films = destinations.map((dest) => ({
  title: dest.cardTitle,
  era: dest.era,
  image: dest.image,
  video: dest.video,
}))

function open() {
  activeIndex.value = 0
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

function selectFilm(index) {
  activeIndex.value = index
}

defineExpose({ open })
</script>

<template>
  <Teleport to="body">
    <transition name="film-fade">
      <div v-if="isOpen" class="film-modal" @click.self="close">
        <div class="film-panel border-gold-gradient">
          <div class="film-header">
            <div>
              <p class="film-label">CINÉMATOGRAPHE TEMPOREL</p>
              <h2 class="film-title">{{ films[activeIndex].title }}</h2>
              <p class="film-era">{{ films[activeIndex].era }}</p>
            </div>
            <button class="film-close" aria-label="Fermer" @click="close">✕</button>
          </div>

          <div class="film-player">
            <video
              :key="films[activeIndex].video"
              class="film-video"
              :src="films[activeIndex].video"
              :poster="films[activeIndex].image"
              controls
              playsinline
              autoplay
            />
          </div>

          <div class="film-tabs">
            <button
              v-for="(film, index) in films"
              :key="film.title"
              class="film-tab"
              :class="{ active: index === activeIndex }"
              @click="selectFilm(index)"
            >
              {{ film.title }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.film-modal {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--page-gutter);
  background: rgba(0, 0, 0, 0.85);
}

.film-panel {
  width: min(900px, 100%);
  background: var(--bg-gradient-end);
  padding: 1.25rem;
}

.film-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.film-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--gold-text);
  margin-bottom: 0.35rem;
}

.film-title {
  font-size: clamp(1.1rem, 4vw, 1.5rem);
  margin-bottom: 0.25rem;
}

.film-era {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--gold-text);
}

.film-close {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  color: var(--text-primary);
  font-size: 1.1rem;
}

.film-player {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #000;
}

.film-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.film-tabs {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.film-tab {
  padding: 0.65rem 0.75rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-align: left;
  color: var(--text-secondary);
  border: 1px solid transparent;
  background:
    linear-gradient(rgba(12, 12, 10, 0.75), rgba(12, 12, 10, 0.75)) padding-box,
    var(--gradient-gold) border-box;
  transition: color var(--transition), background var(--transition);
}

.film-tab.active,
.film-tab:hover {
  color: var(--text-primary);
  background:
    linear-gradient(rgba(255, 201, 51, 0.15), rgba(255, 201, 51, 0.15)) padding-box,
    var(--gradient-gold) border-box;
}

.film-fade-enter-active,
.film-fade-leave-active {
  transition: opacity 0.3s ease;
}

.film-fade-enter-from,
.film-fade-leave-to {
  opacity: 0;
}

@media (min-width: 768px) {
  .film-panel {
    padding: 1.5rem;
  }

  .film-tabs {
    flex-direction: row;
  }

  .film-tab {
    flex: 1;
    text-align: center;
  }
}
</style>
