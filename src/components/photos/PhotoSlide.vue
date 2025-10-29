<script setup lang="ts">
import type { Photo } from '../../../photos/data'
import { blurhashToGradientCssObject } from '@unpic/placeholder'
import { ref } from 'vue'

defineProps<{
  photos: Photo[]
}>()

const container = useTemplateRef<HTMLDivElement>('container')
let hasHorizontalScroll = false

function handleWheel(e: WheelEvent) {
  if (hasHorizontalScroll)
    return
  if (e.deltaX !== 0) {
    hasHorizontalScroll = true
    return
  }
  if (!container.value)
    return
  if (container.value.scrollLeft <= 0 && e.deltaY <= 0)
    return
  if (container.value.scrollLeft >= container.value.scrollWidth - container.value.clientWidth && e.deltaY > 0)
    return

  container.value?.scrollTo({
    left: container.value.scrollLeft + e.deltaY,
  })
  e.preventDefault()
}

// Live photo management
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
  <div
    ref="container"
    class="photos flex gap-4 py3" w-screen of-x-auto
    style="margin-left: calc(var(--prose-margin) * -1); padding-left: var(--prose-margin); padding-right: var(--prose-margin);"
    @wheel="handleWheel"
  >
    <div
      v-for="(photo, idx) in photos"
      :key="idx"
      :lang="photo.lang"
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
        loading="lazy"
        w-80 h-80 max-w-80 max-h-80 min-w-80 min-h-80
        :style="photo.blurhash ? blurhashToGradientCssObject(photo.blurhash) as any : ''"
        object-cover
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
        w-80 h-80 max-w-80 max-h-80 min-w-80 min-h-80
        absolute top-0 left-0
        object-cover
      />

      <LiveBadge v-if="photo.isLive" class="absolute top-2 left-2" />

      <div text-sm op75 mt2>
        {{ photo.text }}
      </div>
    </div>
  </div>
</template>
