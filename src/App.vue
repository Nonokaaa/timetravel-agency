<script setup>
import fondImage from './assets/Fond.png'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import Chatbot from './components/Chatbot.vue'
</script>

<template>
  <div class="app">
    <div class="app-bg" aria-hidden="true">
      <div class="app-bg-gradient" />
      <div class="app-bg-image" :style="{ backgroundImage: `url(${fondImage})` }" />
    </div>

    <AppHeader />
    <main class="main-content">
      <router-view v-slot="{ Component, route }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </router-view>
    </main>
    <AppFooter />
    <Chatbot />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  overflow-x: hidden;
}

.app-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.app-bg-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    var(--bg-gradient-start) 0%,
    var(--bg-gradient-end) 100%
  );
}

.app-bg-image {
  position: absolute;
  inset: -20px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.07;
  filter: blur(12px);
}

.main-content {
  flex: 1;
  padding-top: var(--header-height);
  position: relative;
  z-index: 1;
}
</style>
