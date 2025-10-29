<script setup lang="ts">
interface Props {
  size?: number
  color?: string
}

const { size, color } = withDefaults(defineProps<Props>(), {
  size: 32,
  color: 'text-white',
})
</script>

<template>
  <div class="inline-flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
    <svg
      :width="size * 0.5"
      :height="size * 0.5"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      :class="color"
    >
      <circle
        cx="8"
        cy="8"
        r="6.5"
        stroke="currentColor"
        stroke-width="1"
        fill="none"
      />
      <circle
        cx="8"
        cy="8"
        r="2"
        fill="currentColor"
      />
      <circle
        cx="8"
        cy="8"
        r="4"
        stroke="currentColor"
        stroke-width="0.5"
        fill="none"
      />
    </svg>
    <span :class="`text-white ${size > 24 ? 'text-xs' : 'text-[10px]'}`">
      Live
    </span>
  </div>
</template>
