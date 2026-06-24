<script setup>
import LazyMediaBackground from './LazyMediaBackground.vue'

defineProps({
  destination: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <router-link
    :to="`/destinations/${destination.slug}`"
    class="destination-card border-gold-gradient"
  >
    <div class="card-visual">
      <LazyMediaBackground
        :image="destination.image"
        :video="destination.video"
        :alt="destination.cardTitle"
      />
      <div class="card-shine" aria-hidden="true" />
      <div class="card-content">
        <span class="card-era">{{ destination.era }}</span>
        <h3 class="card-title">{{ destination.cardTitle }}</h3>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.destination-card {
  display: block;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.7s var(--ease-natural),
    box-shadow 0.7s var(--ease-natural);
  background:
    linear-gradient(transparent, transparent) padding-box,
    var(--gradient-gold) border-box;
}

.destination-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(255, 157, 28, 0.28);
}

.card-visual {
  position: relative;
  min-height: clamp(220px, 55vw, 300px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1.5rem 1rem;
  overflow: hidden;
}

.card-visual :deep(.lazy-media-image),
.card-visual :deep(.lazy-media-video) {
  transition: transform 0.8s var(--ease-natural);
}

.destination-card:hover .card-visual :deep(.lazy-media-image),
.destination-card:hover .card-visual :deep(.lazy-media-video) {
  transform: scale(1.06);
}

.card-shine {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    135deg,
    rgba(255, 201, 51, 0) 40%,
    rgba(255, 201, 51, 0.12) 50%,
    rgba(255, 201, 51, 0) 60%
  );
  transform: translateX(-120%);
  transition: transform 0.8s var(--ease-natural);
  pointer-events: none;
}

.destination-card:hover .card-shine {
  transform: translateX(120%);
}

.card-content {
  position: relative;
  z-index: 2;
  text-align: center;
  width: 100%;
  text-shadow: var(--text-shadow-media);
  transition: transform 0.7s var(--ease-natural);
}

.destination-card:hover .card-content {
  transform: translateY(-4px);
}

.card-era {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--gold-text);
  margin-bottom: 0.4rem;
  transition: letter-spacing 0.7s var(--ease-natural);
}

.destination-card:hover .card-era {
  letter-spacing: 0.18em;
}

.card-title {
  font-family: var(--font-sans);
  font-size: clamp(0.95rem, 4vw, 1.25rem);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
  text-transform: none;
}

@media (min-width: 768px) {
  .card-visual {
    min-height: 420px;
    padding: 2rem 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .destination-card,
  .card-visual :deep(.lazy-media-image),
  .card-visual :deep(.lazy-media-video),
  .card-shine,
  .card-content,
  .card-era {
    transition: none;
  }

  .destination-card:hover {
    transform: none;
  }

  .destination-card:hover .card-visual :deep(.lazy-media-image),
  .destination-card:hover .card-visual :deep(.lazy-media-video) {
    transform: none;
  }
}
</style>
