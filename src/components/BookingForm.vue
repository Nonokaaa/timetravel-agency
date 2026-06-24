<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { destinations } from '../data/destinations.js'

const emit = defineEmits(['submitted'])

const route = useRoute()
const preselectedSlug = computed(() => route.query.destination || '')

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  destination: '',
  startDate: '',
  endDate: '',
  travelers: 1,
  notes: '',
})

const errors = ref({})
const submitted = ref(false)

watch(preselectedSlug, (slug) => {
  if (slug) form.value.destination = slug
}, { immediate: true })

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validate() {
  const e = {}

  if (!form.value.firstName.trim()) {
    e.firstName = 'Le prénom est obligatoire.'
  }
  if (!form.value.lastName.trim()) {
    e.lastName = 'Le nom est obligatoire.'
  }
  if (!form.value.email.trim()) {
    e.email = 'L\'adresse e-mail est obligatoire.'
  } else if (!validateEmail(form.value.email)) {
    e.email = 'Veuillez saisir une adresse e-mail valide.'
  }
  if (!form.value.destination) {
    e.destination = 'Veuillez sélectionner une destination.'
  }
  if (!form.value.startDate) {
    e.startDate = 'La date de départ est obligatoire.'
  }
  if (!form.value.endDate) {
    e.endDate = 'La date de retour est obligatoire.'
  }
  if (form.value.startDate && form.value.endDate) {
    const start = new Date(form.value.startDate)
    const end = new Date(form.value.endDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (start < today) {
      e.startDate = 'La date de départ ne peut pas être dans le passé.'
    }
    if (end <= start) {
      e.endDate = 'La date de retour doit être postérieure à la date de départ.'
    }
    const diffDays = (end - start) / (1000 * 60 * 60 * 24)
    if (diffDays > 30) {
      e.endDate = 'La durée maximale du voyage est de 30 jours.'
    }
  }
  if (!form.value.travelers || form.value.travelers < 1) {
    e.travelers = 'Au moins 1 voyageur est requis.'
  } else if (form.value.travelers > 8) {
    e.travelers = 'Maximum 8 voyageurs par réservation.'
  }

  errors.value = e
  return Object.keys(e).length === 0
}

function handleSubmit() {
  if (!validate()) return
  submitted.value = true
  emit('submitted', { ...form.value })
}
</script>

<template>
  <div class="booking-form-wrapper">
    <div v-if="submitted" class="success-message border-gold-gradient">
      <span class="success-icon">✓</span>
      <h3>Demande de consultation reçue</h3>
      <p>
        Merci, {{ form.firstName }} ! Nos coordinateurs temporels vous contacteront à
        {{ form.email }} sous 48 heures pour finaliser votre voyage.
      </p>
    </div>

    <form v-else class="booking-form border-gold-gradient" novalidate @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group">
          <label for="firstName">Prénom *</label>
          <input
            id="firstName"
            v-model="form.firstName"
            type="text"
            :class="{ error: errors.firstName }"
            placeholder="Marie"
          />
          <span v-if="errors.firstName" class="error-msg">{{ errors.firstName }}</span>
        </div>
        <div class="form-group">
          <label for="lastName">Nom *</label>
          <input
            id="lastName"
            v-model="form.lastName"
            type="text"
            :class="{ error: errors.lastName }"
            placeholder="Curie"
          />
          <span v-if="errors.lastName" class="error-msg">{{ errors.lastName }}</span>
        </div>
      </div>

      <div class="form-group">
        <label for="email">E-mail *</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          :class="{ error: errors.email }"
          placeholder="voyageur@exemple.com"
        />
        <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="destination">Destination *</label>
        <select
          id="destination"
          v-model="form.destination"
          :class="{ error: errors.destination }"
        >
          <option value="" disabled>Choisissez votre époque</option>
          <option
            v-for="dest in destinations"
            :key="dest.id"
            :value="dest.slug"
          >
            {{ dest.cardTitle }} ({{ dest.era }})
          </option>
        </select>
        <span v-if="errors.destination" class="error-msg">{{ errors.destination }}</span>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="startDate">Date de départ *</label>
          <input
            id="startDate"
            v-model="form.startDate"
            type="date"
            :class="{ error: errors.startDate }"
          />
          <span v-if="errors.startDate" class="error-msg">{{ errors.startDate }}</span>
        </div>
        <div class="form-group">
          <label for="endDate">Date de retour *</label>
          <input
            id="endDate"
            v-model="form.endDate"
            type="date"
            :class="{ error: errors.endDate }"
          />
          <span v-if="errors.endDate" class="error-msg">{{ errors.endDate }}</span>
        </div>
      </div>

      <div class="form-group">
        <label for="travelers">Nombre de voyageurs *</label>
        <input
          id="travelers"
          v-model.number="form.travelers"
          type="number"
          min="1"
          max="8"
          :class="{ error: errors.travelers }"
        />
        <span v-if="errors.travelers" class="error-msg">{{ errors.travelers }}</span>
      </div>

      <div class="form-group">
        <label for="notes">Demandes particulières</label>
        <textarea
          id="notes"
          v-model="form.notes"
          rows="3"
          placeholder="Régime alimentaire, accessibilité, rencontres souhaitées..."
        />
      </div>

      <button type="submit" class="btn btn-primary submit-btn">
        DEMANDER UNE CONSULTATION
      </button>
    </form>
  </div>
</template>

<style scoped>
.booking-form-wrapper {
  max-width: 600px;
  margin: 0 auto;
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 2rem 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-primary);
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem 1rem;
  background: rgba(12, 12, 10, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: var(--radius);
  color: var(--text-primary);
  font-size: 0.9rem;
  font-family: var(--font-sans);
  outline: none;
  transition: border-color var(--transition);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--gold-text);
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
  border-color: #e74c3c;
}

.form-group select {
  cursor: pointer;
}

.form-group select option {
  background: var(--bg-gradient-end);
}

.error-msg {
  font-size: 0.75rem;
  color: #e74c3c;
}

.submit-btn {
  width: 100%;
  margin-top: 0.5rem;
}

.success-message {
  text-align: center;
  padding: 3rem 2rem;
}

.success-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--gradient-gold);
  color: var(--text-on-gold);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.success-message h3 {
  margin-bottom: 0.75rem;
}

.success-message p {
  color: var(--text-secondary);
  line-height: 1.7;
}

@media (min-width: 480px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
  }

  .booking-form {
    padding: 2.5rem 2rem;
  }
}
</style>
