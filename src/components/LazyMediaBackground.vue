<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  eager: {
    type: Boolean,
    default: false,
  },
})

const root = ref(null)
const videoEl = ref(null)
const videoSrc = ref('')
const isVideoReady = ref(false)
const isInView = ref(false)

let observer = null

function loadVideo() {
  if (!props.video || videoSrc.value) return
  videoSrc.value = props.video
}

async function startPlayback() {
  await nextTick()
  const video = videoEl.value
  if (!video) return

  video.preload = 'auto'

  try {
    await video.play()
    isVideoReady.value = true
  } catch {
    isVideoReady.value = true
  }
}

function pauseVideo() {
  videoEl.value?.pause()
}

function handleIntersect([entry]) {
  isInView.value = entry.isIntersecting

  if (entry.isIntersecting) {
    loadVideo()
  } else {
    pauseVideo()
  }
}

watch(videoSrc, (src) => {
  if (src && (props.eager || isInView.value)) {
    startPlayback()
  }
})

onMounted(() => {
  if (props.eager) {
    isInView.value = true
    loadVideo()
    return
  }

  observer = new IntersectionObserver(handleIntersect, {
    rootMargin: '120px',
    threshold: 0.1,
  })

  if (root.value) observer.observe(root.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div ref="root" class="lazy-media">
    <img
      :src="image"
      :alt="alt"
      class="lazy-media-image"
      :class="{ 'is-hidden': isVideoReady }"
      loading="lazy"
      decoding="async"
    />
    <video
      v-if="videoSrc"
      ref="videoEl"
      class="lazy-media-video"
      :class="{ 'is-visible': isVideoReady }"
      :src="videoSrc"
      :poster="image"
      muted
      loop
      playsinline
      autoplay
      preload="none"
      @loadeddata="startPlayback"
    />
    <div class="lazy-media-overlay" />
  </div>
</template>

<style scoped>
.lazy-media {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.lazy-media-image,
.lazy-media-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lazy-media-image {
  transition: opacity 0.6s ease;
}

.lazy-media-image.is-hidden {
  opacity: 0;
}

.lazy-media-video {
  opacity: 0;
  transition: opacity 0.6s ease;
}

.lazy-media-video.is-visible {
  opacity: 1;
}

.lazy-media-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(12, 12, 10, 0.98) 0%,
    rgba(12, 12, 10, 0.82) 30%,
    rgba(12, 12, 10, 0.45) 55%,
    rgba(12, 12, 10, 0.2) 100%
  );
  pointer-events: none;
}
</style>
