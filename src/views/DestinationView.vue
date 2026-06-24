<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getDestinationBySlug } from '../data/destinations.js'
import LazyMediaBackground from '../components/LazyMediaBackground.vue'
import DestinationVideoGallery from '../components/DestinationVideoGallery.vue'
import ScrollReveal from '../components/ScrollReveal.vue'

const route = useRoute()
const router = useRouter()

const destination = computed(() => getDestinationBySlug(route.params.slug))

function goToBooking() {
  router.push({ path: '/booking', query: { destination: destination.value.slug } })
}
</script>

<template>
  <div v-if="destination" class="destination-detail">
    <section class="detail-hero">
      <div class="detail-hero-visual border-gold-gradient">
        <LazyMediaBackground
          :image="destination.image"
          :video="destination.video"
          :alt="destination.title"
          eager
        />
        <div class="detail-hero-overlay">
          <div class="container detail-hero-content">
            <router-link to="/#destinations" class="back-link hero-enter" style="--enter-i: 0">← Toutes les destinations</router-link>
            <p class="detail-era hero-enter" style="--enter-i: 1">{{ destination.era }}</p>
            <h1 class="detail-title hero-enter" style="--enter-i: 2">{{ destination.title }}</h1>
            <p class="detail-tagline hero-enter" style="--enter-i: 3">{{ destination.tagline }}</p>
            <div class="detail-meta hero-enter" style="--enter-i: 4">
              <span class="meta-badge">{{ destination.difficulty }}</span>
              <span class="meta-badge">{{ destination.duration }}</span>
              <span class="meta-badge">{{ destination.priceRange }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container detail-body">
      <ScrollReveal>
        <DestinationVideoGallery
          :image="destination.image"
          :video="destination.video"
          :title="destination.title"
        />
      </ScrollReveal>

      <ScrollReveal :delay="80">
      <section class="detail-section panel border-gold-gradient">
        <p class="section-label">APERÇU</p>
        <p class="detail-text">{{ destination.shortDescription }}</p>
      </section>
      </ScrollReveal>

      <ScrollReveal :delay="100">
      <section class="detail-section panel border-gold-gradient">
        <h2>Histoire</h2>
        <p class="detail-text">{{ destination.history }}</p>
      </section>
      </ScrollReveal>

      <ScrollReveal :delay="100">
      <section class="detail-section panel border-gold-gradient">
        <h2>À quoi s'attendre</h2>
        <ul class="detail-list">
          <li v-for="(item, i) in destination.whatToExpect" :key="i">{{ item }}</li>
        </ul>
      </section>
      </ScrollReveal>

      <ScrollReveal :delay="100">
      <section class="detail-section panel border-gold-gradient">
        <h2>Points forts</h2>
        <div class="highlights">
          <span
            v-for="(h, i) in destination.highlights"
            :key="i"
            class="highlight-tag"
          >
            {{ h }}
          </span>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal :delay="100">
      <section class="detail-section panel border-gold-gradient safety">
        <h2>Consignes de sécurité</h2>
        <ul class="detail-list safety-list">
          <li v-for="(note, i) in destination.safetyNotes" :key="i">{{ note }}</li>
        </ul>
      </section>
      </ScrollReveal>

      <ScrollReveal :delay="120">
      <section class="detail-section">
        <h2 class="faq-heading">Questions fréquentes</h2>
        <div class="faq-list">
          <div v-for="(item, i) in destination.faq" :key="i" class="faq-item border-gold-gradient">
            <h3>{{ item.q }}</h3>
            <p>{{ item.a }}</p>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal :delay="80">
      <div class="detail-cta">
        <button class="btn btn-primary" @click="goToBooking">
          RÉSERVER CETTE DESTINATION
        </button>
      </div>
      </ScrollReveal>
    </div>
  </div>

  <div v-else class="not-found container">
    <p class="section-label">ERREUR</p>
    <h1>Destination introuvable</h1>
    <p class="not-found-text">Cette coordonnée temporelle n'existe pas dans notre catalogue.</p>
    <router-link to="/" class="btn btn-primary">Retour à l'accueil</router-link>
  </div>
</template>

<style scoped>
.detail-hero {
  padding: 0 var(--page-gutter) 1rem;
}

.detail-hero-visual {
  position: relative;
  min-height: clamp(280px, 65vw, 480px);
  overflow: hidden;
  background:
    linear-gradient(transparent, transparent) padding-box,
    var(--gradient-gold) border-box;
}

.detail-hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  background: linear-gradient(
    to top,
    rgba(12, 12, 10, 0.98) 0%,
    rgba(12, 12, 10, 0.75) 45%,
    rgba(12, 12, 10, 0.35) 100%
  );
}

.detail-hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 1.5rem var(--page-gutter) 2rem;
  text-shadow: var(--text-shadow-media);
}

.hero-enter {
  opacity: 0;
  transform: translateY(18px);
  animation: detailHeroReveal 0.75s var(--ease-natural) forwards;
  animation-delay: calc(0.12s + var(--enter-i) * 0.09s);
}

@keyframes detailHeroReveal {
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

.back-link {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-primary);
  margin-bottom: 1rem;
  align-self: flex-start;
  transition: color var(--transition);
  text-shadow: none;
}

.back-link:hover {
  color: var(--gold-text);
}

.detail-era {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--gold-text);
  margin-bottom: 0.75rem;
}

.detail-title {
  font-size: clamp(1.75rem, 7vw, 3.5rem);
  margin-bottom: 0.75rem;
  max-width: 800px;
}

.detail-tagline {
  font-family: var(--font-display);
  font-size: clamp(0.95rem, 2.5vw, 1.15rem);
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  text-transform: none;
  letter-spacing: 0.04em;
}

.detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.meta-badge {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.45rem 0.9rem;
  border: 1px solid transparent;
  background:
    linear-gradient(rgba(12, 12, 10, 0.85), rgba(12, 12, 10, 0.85)) padding-box,
    var(--gradient-gold) border-box;
  color: var(--gold-text);
}

.detail-body {
  padding: 0.5rem var(--page-gutter) 3rem;
}

.detail-section {
  margin-bottom: 1rem;
}

.panel {
  padding: 1.25rem 1rem;
}

.section-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--gold-text);
  margin-bottom: 0.75rem;
}

.detail-section h2,
.faq-heading {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.faq-heading {
  text-align: center;
  margin-bottom: 1.5rem;
}

.detail-text {
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 0.9rem;
}

.detail-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-list li {
  position: relative;
  padding-left: 1.5rem;
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 0.9rem;
}

.detail-list li::before {
  content: '◆';
  position: absolute;
  left: 0;
  color: var(--gold-text);
  font-size: 0.6rem;
  top: 0.35rem;
}

.safety-list li::before {
  content: '⚠';
  font-size: 0.75rem;
}

.highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.highlight-tag {
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--text-primary);
  border: 1px solid transparent;
  background:
    linear-gradient(rgba(12, 12, 10, 0.75), rgba(12, 12, 10, 0.75)) padding-box,
    var(--gradient-gold) border-box;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  padding: 1.25rem 1.5rem;
}

.faq-item h3 {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  margin-bottom: 0.5rem;
  text-transform: none;
}

.faq-item p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.detail-cta {
  text-align: center;
  padding-top: 1.5rem;
}

.not-found {
  text-align: center;
  padding: 6rem 1.25rem;
}

.not-found h1 {
  margin-bottom: 1rem;
}

.not-found-text {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .detail-hero {
    padding: 0 2rem 1.5rem;
  }

  .detail-hero-visual {
    min-height: 480px;
  }

  .detail-body {
    max-width: 760px;
    margin: 0 auto;
    padding-bottom: 5rem;
  }

  .panel {
    padding: 2rem;
  }
}
</style>
