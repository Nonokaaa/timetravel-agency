<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const menuOpen = ref(false)

const navLinks = [
  { label: 'DESTINATIONS', href: '/#destinations' },
  { label: 'EXPÉRIENCES', href: '/#experiences' },
  { label: 'LA SCIENCE', href: '/#science' },
  { label: 'ADHÉSION', href: '/#membership' },
]

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function navigateTo(href) {
  closeMenu()
  if (href.startsWith('/#')) {
    const id = href.slice(2)
    if (router.currentRoute.value.path === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push('/').then(() => {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      })
    }
  } else {
    router.push(href)
  }
}

function goToBooking() {
  closeMenu()
  router.push('/booking')
}
</script>

<template>
  <header class="header" :class="{ 'menu-open': menuOpen }">
    <div class="header-mobile">
      <router-link to="/" class="logo-mobile" @click="closeMenu">
        TIME TRAVEL<br />AGENCY
      </router-link>
      <button
        class="chevron-btn"
        :aria-label="menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
        @click="toggleMenu"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path v-if="!menuOpen" d="M6 9l6 6 6-6" />
          <path v-else d="M6 6l12 12M6 18L18 6" />
        </svg>
      </button>
    </div>

    <div class="header-desktop container">
      <router-link to="/" class="logo" @click="closeMenu">
        TIME TRAVEL AGENCY
      </router-link>

      <nav class="nav-desktop">
        <button
          v-for="link in navLinks"
          :key="link.label"
          class="nav-link"
          @click="navigateTo(link.href)"
        >
          {{ link.label }}
        </button>
      </nav>

      <button class="btn btn-ghost header-cta" @click="goToBooking">
        RÉSERVER UNE CONSULTATION
      </button>
    </div>

    <transition name="slide">
      <nav v-if="menuOpen" class="mobile-menu">
        <button
          v-for="link in navLinks"
          :key="link.label"
          class="mobile-nav-link"
          @click="navigateTo(link.href)"
        >
          {{ link.label }}
        </button>
        <button class="btn btn-primary mobile-cta" @click="goToBooking">
          RÉSERVER UNE CONSULTATION
        </button>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
}

.header-mobile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  min-height: var(--header-height);
  padding: 0 var(--page-gutter);
  background: var(--gradient-gold);
  color: var(--text-on-gold);
}

.logo-mobile {
  font-family: var(--font-display);
  font-size: clamp(0.85rem, 4.2vw, 1.1rem);
  line-height: 1.15;
  letter-spacing: 0.04em;
  color: var(--text-on-gold);
}

.chevron-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  color: var(--text-on-gold);
}

.header-desktop {
  display: none;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  height: var(--header-height);
  background: rgba(26, 26, 24, 0.94);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 201, 51, 0.2);
}

.logo {
  font-family: var(--font-display);
  font-size: clamp(1rem, 2vw, 1.35rem);
  letter-spacing: 0.06em;
  color: var(--text-primary);
  transition: color var(--transition);
  white-space: nowrap;
  flex-shrink: 0;
}

.logo:hover {
  color: var(--gold-text);
}

.nav-desktop {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(0.5rem, 1.5vw, 1.5rem);
}

.nav-link {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-primary);
  transition: color var(--transition);
  padding: 0.25rem 0;
}

.nav-link:hover {
  color: var(--gold-text);
}

.header-cta {
  flex-shrink: 0;
  font-size: 0.65rem;
  padding: 0.65rem 1rem;
}

.mobile-menu {
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(49, 49, 49, 0.98) 0%, rgba(80, 80, 72, 0.98) 100%);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 1rem;
  padding: 2rem var(--page-gutter);
}

.mobile-nav-link {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--text-primary);
  padding: 0.75rem 1rem;
  text-align: center;
  transition: color var(--transition);
}

.mobile-nav-link:hover {
  color: var(--gold-text);
}

.mobile-cta {
  margin-top: 0.5rem;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (min-width: 1024px) {
  .header-mobile {
    display: none;
  }

  .header-desktop {
    display: flex;
  }
}
</style>
