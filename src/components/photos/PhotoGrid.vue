<script setup lang="ts">
import type { Photo } from '../../../photos/data'
import { blurhashToGradientCssObject } from '@unpic/placeholder'
import { onMounted, ref } from 'vue'

defineProps<{
  photos: Photo[]
  view?: 'cover' | 'contain'
}>()

const activeLiveIndex = ref<number | null>(null)
const isMobile = ref(false)

onMounted(() => {
  isMobile.value = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
})

function handleMouseEnter(idx: number) {
  if (!isMobile.value) {
    activeLiveIndex.value = idx
  }
}

function handleMouseLeave() {
  if (!isMobile.value) {
    activeLiveIndex.value = null
  }
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
    >
      <img
        :src="photo.url"
        :alt="photo.text"
        :data-photo-index="idx"
        :style="photo.blurhash && view !== 'contain' ? blurhashToGradientCssObject(photo.blurhash) as any : ''"
        loading="lazy"
        w-full
        :class="view === 'contain' ? 'object-contain sm:aspect-square' : 'object-cover aspect-square'"
      >

      <video
        v-if="photo.isLive && photo.liveUrl && (isMobile || activeLiveIndex === idx)"
        :src="photo.liveUrl"
        :poster="photo.url"
        :data-photo-index="idx"
        autoplay
        loop
        playsinline
        w-full
        absolute
        top-0
        left-0
        :class="view === 'contain' ? 'object-contain sm:aspect-square' : 'object-cover aspect-square'"
        :style="{
          opacity: isMobile ? (activeLiveIndex === idx ? 1 : 0) : 1,
        }"
      />

      <LiveBadge v-if="photo.isLive" class="absolute top-2 left-2" />
    </div>
  </div>
</template>
