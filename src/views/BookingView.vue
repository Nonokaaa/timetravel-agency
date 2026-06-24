<script setup>
import BookingForm from '../components/BookingForm.vue'
import ScrollReveal from '../components/ScrollReveal.vue'
</script>

<template>
  <div class="booking-page">
    <div class="container">
      <ScrollReveal>
        <div class="booking-header">
          <p class="section-label">CONSULTATION</p>
          <h1 class="section-title">Réserver une consultation</h1>
          <p class="section-subtitle">
            Sélectionnez votre destination et votre fenêtre de voyage. Nos coordinateurs temporels concevront le voyage idéal pour vous.
          </p>
          <div class="gold-divider" />
        </div>
      </ScrollReveal>
      <ScrollReveal :delay="120">
        <BookingForm />
      </ScrollReveal>
    </div>
  </div>
</template>

<style scoped>
.booking-page {
  padding: 2.5rem 0 4rem;
}

.booking-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.section-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--gold-text);
  margin-bottom: 0.75rem;
}
</style>
