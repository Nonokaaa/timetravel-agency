<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  delay: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 28,
  },
  once: {
    type: Boolean,
    default: true,
  },
})

const root = ref(null)
const visible = ref(false)

let observer = null

onMounted(() => {
  if (!root.value) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    visible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true
        if (props.once) observer?.disconnect()
      } else if (!props.once) {
        visible.value = false
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
  )

  observer.observe(root.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div
    ref="root"
    class="scroll-reveal"
    :class="{ 'is-visible': visible }"
    :style="{
      '--reveal-delay': `${delay}ms`,
      '--reveal-y': `${y}px`,
    }"
  >
    <slot />
  </div>
</template>
