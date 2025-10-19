<script setup>
// 可在这里添加 props 控制 logo 尺寸或颜色
</script>

<template>
  <div class="logo" style="transform: scale(8) translate(-4px, -3px); transform-origin: top left;">
    <svg
      viewBox="0 0 400 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="w-full max-w-2xl h-auto text-gray-900 dark:text-gray-100"
    >
      <title>Joel Xiao 肖文龙</title>
      <path
        class="signature-path-1"
        d="M 40 85 Q 35 60 35 50 Q 35 30 40 25 C 42 23 45 25 45 30 Q 45 50 42 70 Q 40 85 38 100 Q 36 115 32 120"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <circle class="signature-path-2" cx="40" cy="15" r="3" fill="currentColor" />
      <path
        class="signature-path-3"
        d="M 65 55 Q 55 45 55 50 Q 55 65 65 70 Q 75 70 80 65 Q 80 50 70 45 Q 65 45 65 55"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <path
        class="signature-path-4"
        d="M 95 55 L 115 55 Q 115 45 105 45 Q 95 45 95 55 Q 95 70 105 70 Q 112 70 115 68"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <path
        class="signature-path-5"
        d="M 130 25 L 130 70 Q 130 75 135 75"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <path
        class="signature-path-6"
        d="M 135 75 Q 150 80 165 75"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
        opacity="0.7"
      />
      <path
        class="signature-path-7"
        d="M 170 45 Q 185 55 200 70 Q 210 80 215 85"
        stroke="currentColor"
        stroke-width="3.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <path
        class="signature-path-8"
        d="M 215 45 Q 205 55 190 70 Q 180 80 175 85"
        stroke="currentColor"
        stroke-width="3.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <path
        class="signature-path-9"
        d="M 230 50 L 230 75"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <circle class="signature-path-10" cx="230" cy="42" r="2.5" fill="currentColor" />
      <path
        class="signature-path-11"
        d="M 265 50 Q 250 50 245 60 Q 245 70 255 73 Q 265 73 268 68 L 268 50 L 268 75"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <path
        class="signature-path-12"
        d="M 285 55 Q 275 50 275 57 Q 275 68 285 73 Q 295 73 298 68 Q 298 57 290 50 Q 285 50 285 55"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <path
        class="signature-path-13"
        d="M 25 95 Q 100 88 200 92 Q 280 95 315 90"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  </div>
</template>

<style scoped>
@media (prefers-reduced-motion) {
  [class^='signature-path-'] {
    animation: none !important;
    stroke-dasharray: unset !important;
  }
}
@media print {
  [class^='signature-path-'] {
    animation: none !important;
    stroke-dasharray: unset !important;
  }
}

@keyframes signature-draw {
  0% {
    stroke-dashoffset: 1px;
    stroke-dasharray: 0 500px;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  50% {
    stroke-dasharray: 500px 0;
  }
  90% {
    stroke-dasharray: 500px 0;
    opacity: 1;
  }
  100% {
    stroke-dasharray: 0 500px;
    opacity: 0;
  }
}

@keyframes signature-dot {
  0%,
  10% {
    opacity: 0;
    transform: scale(0);
  }
  15% {
    opacity: 1;
    transform: scale(1);
  }
  90% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
}

.signature-path-1 {
  animation: signature-draw 8s ease-in-out forwards infinite;
  animation-delay: 0s;
}
.signature-path-2 {
  animation: signature-dot 8s ease-in-out forwards infinite;
  animation-delay: 0.3s;
  transform-origin: center;
}
.signature-path-3 {
  animation: signature-draw 8s ease-in-out forwards infinite;
  animation-delay: 0.4s;
}
.signature-path-4 {
  animation: signature-draw 8s ease-in-out forwards infinite;
  animation-delay: 0.7s;
}
.signature-path-5 {
  animation: signature-draw 8s ease-in-out forwards infinite;
  animation-delay: 1s;
}
.signature-path-6 {
  animation: signature-draw 8s ease-in-out forwards infinite;
  animation-delay: 1.2s;
}
.signature-path-7 {
  animation: signature-draw 8s ease-in-out forwards infinite;
  animation-delay: 1.4s;
}
.signature-path-8 {
  animation: signature-draw 8s ease-in-out forwards infinite;
  animation-delay: 1.7s;
}
.signature-path-9 {
  animation: signature-draw 8s ease-in-out forwards infinite;
  animation-delay: 2s;
}
.signature-path-10 {
  animation: signature-dot 8s ease-in-out forwards infinite;
  animation-delay: 2.1s;
  transform-origin: center;
}
.signature-path-11 {
  animation: signature-draw 8s ease-in-out forwards infinite;
  animation-delay: 2.3s;
}
.signature-path-12 {
  animation: signature-draw 8s ease-in-out forwards infinite;
  animation-delay: 2.6s;
}
.signature-path-13 {
  animation: signature-draw 8s ease-in-out forwards infinite;
  animation-delay: 3s;
}
</style>
