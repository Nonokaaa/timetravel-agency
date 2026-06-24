<script setup>
import { destinations } from '../data/destinations.js'
import DestinationCard from './DestinationCard.vue'
import ScrollReveal from './ScrollReveal.vue'
</script>

<template>
  <section id="destinations" class="gallery">
    <div class="container">
      <div class="gallery-grid">
        <ScrollReveal
          v-for="(dest, index) in destinations"
          :key="dest.id"
          :delay="index * 120"
        >
          <DestinationCard :destination="dest" />
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery {
  padding: 0 0 2rem;
}

.gallery-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

@media (min-width: 768px) {
  .gallery {
    padding-bottom: 4rem;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
}
</style>
