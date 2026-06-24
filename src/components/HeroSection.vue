<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FilmModal from './FilmModal.vue'

const router = useRouter()
const filmModal = ref(null)

function scrollToDestinations() {
  if (router.currentRoute.value.path === '/') {
    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })
  } else {
    router.push('/').then(() => {
      setTimeout(() => {
        document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    })
  }
}

function watchFilm() {
  filmModal.value?.open()
}
</script>

<template>
  <section class="hero">
    <div class="hero-content container">
      <p class="hero-label hero-enter" style="--enter-i: 0">CERTAINS VOYAGENT À TRAVERS LES CONTINENTS.</p>
      <h1 class="hero-title">
        <span class="hero-title-line hero-enter" style="--enter-i: 1">NOUS VOYAGEONS</span>
        <span class="hero-title-line hero-enter" style="--enter-i: 2">À TRAVERS LES SIÈCLES.</span>
      </h1>
      <p class="hero-sub hero-enter" style="--enter-i: 3">
        Découvrez Paris à son apogée, Florence à son zénith et la Terre avant l'humanité.
      </p>

      <div class="hero-actions hero-enter" style="--enter-i: 4">
        <button class="btn btn-primary" @click="scrollToDestinations">
          EXPLORER LES DESTINATIONS
        </button>
        <button class="btn btn-ghost" @click="watchFilm">
          VOIR LE FILM
        </button>
      </div>

      <div class="hero-tagline hero-enter" style="--enter-i: 5">
        <p>Tous les âges d'or ne sont pas perdus.</p>
        <div class="gold-divider" />
      </div>
    </div>
    <FilmModal ref="filmModal" />
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0 0.5rem;
}

.hero-content {
  text-align: center;
  width: 100%;
}

.hero-enter {
  opacity: 0;
  transform: translateY(22px);
  animation: heroReveal 0.75s var(--ease-natural) forwards;
  animation-delay: calc(0.1s + var(--enter-i) * 0.1s);
}

.hero-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--gold-text);
  margin-bottom: 1rem;
}

.hero-title {
  font-size: clamp(1.85rem, 9.5vw, 4.25rem);
  color: var(--text-primary);
  margin-bottom: 1rem;
  line-height: 1.1;
}

.hero-title-line {
  display: block;
}

.hero-sub {
  font-family: var(--font-sans);
  font-size: clamp(0.8rem, 3.5vw, 1.05rem);
  color: var(--text-primary);
  max-width: 22rem;
  margin: 0 auto 1.75rem;
  line-height: 1.6;
  letter-spacing: 0.02em;
  text-transform: none;
}

.hero-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  margin: 0 auto 2rem;
}

.hero-tagline p {
  font-family: var(--font-display);
  font-size: clamp(0.85rem, 3vw, 1rem);
  color: var(--text-primary);
  letter-spacing: 0.04em;
  margin-bottom: 0.25rem;
  text-transform: none;
}

.hero-tagline .gold-divider {
  margin-top: 1rem;
}

@keyframes heroReveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-enter {
    opacity: 1;
    transform: none;
    animation: none;
  }
}

@media (min-width: 768px) {
  .hero {
    min-height: calc(100vh - var(--header-height) - 120px);
    padding: 3rem 0 2rem;
  }

  .hero-label {
    font-size: 0.72rem;
    letter-spacing: 0.22em;
    margin-bottom: 1.25rem;
  }

  .hero-title {
    margin-bottom: 1.25rem;
  }

  .hero-sub {
    max-width: 520px;
    margin-bottom: 2.5rem;
  }

  .hero-actions {
    flex-direction: row;
    justify-content: center;
    width: auto;
    gap: 1rem;
    margin-bottom: 2.5rem;
  }
}
</style>
