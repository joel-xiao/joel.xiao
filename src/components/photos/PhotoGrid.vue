<script setup lang="ts">
import type { Photo } from '../../../photos/data'
import { blurhashToGradientCssObject } from '@unpic/placeholder'
import { ref } from 'vue'

defineProps<{
  photos: Photo[]
  view?: 'cover' | 'contain'
}>()

const activeLiveIndex = ref<number | null>(null)
let longPressTimer: number | null = null

function handleMouseEnter(idx: number) {
  activeLiveIndex.value = idx
}

function handleMouseLeave() {
  activeLiveIndex.value = null
}

function handleTouchStart(idx: number) {
  longPressTimer = window.setTimeout(() => {
    activeLiveIndex.value = idx
  }, 400)
}

function handleTouchEnd() {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
  activeLiveIndex.value = null
}
</script>

<template>
  <div class="photos grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" max-w-500 mx-auto>
    <div
      v-for="photo, idx in photos"
      :key="idx"
      relative
      overflow-hidden
      @mouseenter="handleMouseEnter(idx)"
      @mouseleave="handleMouseLeave"
      @touchstart="handleTouchStart(idx)"
      @touchend="handleTouchEnd"
    >
      <img
        v-if="!(photo.isLive && photo.liveUrl && activeLiveIndex === idx)"
        :src="photo.url"
        :alt="photo.text"
        :data-photo-index="idx"
        :style="photo.blurhash && view !== 'contain' ? blurhashToGradientCssObject(photo.blurhash) as any : ''"
        loading="lazy"
        w-full
        :class="view === 'contain' ? 'object-contain sm:aspect-square' : 'object-cover aspect-square'"
      >

      <video
        v-else
        :src="photo.liveUrl"
        :poster="photo.url"
        :data-photo-index="idx"
        autoplay
        loop
        muted
        playsinline
        w-full
        absolute
        top-0
        left-0
        :class="view === 'contain' ? 'object-contain sm:aspect-square' : 'object-cover aspect-square'"
      />

      <LiveBadge v-if="photo.isLive" class="absolute top-2 left-2" />
    </div>
  </div>
</template>
