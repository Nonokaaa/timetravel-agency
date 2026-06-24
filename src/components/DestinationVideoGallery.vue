<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
})

const root = ref(null)
const videoSrc = ref('')
const isLoaded = ref(false)

let observer = null

function loadVideo() {
  if (videoSrc.value) return
  videoSrc.value = props.video
}

function handleIntersect([entry]) {
  if (entry.isIntersecting) {
    loadVideo()
  }
}

onMounted(() => {
  observer = new IntersectionObserver(handleIntersect, {
    rootMargin: '80px',
    threshold: 0.2,
  })

  if (root.value) observer.observe(root.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <section ref="root" class="video-gallery border-gold-gradient">
    <p class="section-label">APERÇU IMMERSIF</p>
    <div class="video-gallery-player">
      <img
        v-if="!isLoaded"
        :src="image"
        :alt="title"
        class="video-gallery-poster"
        loading="lazy"
        decoding="async"
      />
      <video
        v-if="videoSrc"
        class="video-gallery-video"
        :src="videoSrc"
        :poster="image"
        controls
        playsinline
        preload="none"
        @loadeddata="isLoaded = true"
      />
    </div>
  </section>
</template>

<style scoped>
.video-gallery {
  padding: 1.25rem 1rem;
  margin-bottom: 1rem;
}

.section-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--gold-text);
  margin-bottom: 0.75rem;
}

.video-gallery-player {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.35);
}

.video-gallery-poster,
.video-gallery-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (min-width: 768px) {
  .video-gallery {
    padding: 1.5rem;
  }
}
</style>
