<script setup lang="ts">
const route = useRoute()

const imageModel = ref<HTMLImageElement>()
const imageAlt = ref<string>()

function setImageModel(img: HTMLImageElement) {
  imageModel.value = img
  imageAlt.value = img.alt
  const figure = img.closest('figure')
  if (figure) {
    const caption = figure.querySelector('figcaption')
    if (caption?.textContent)
      imageAlt.value ||= caption.textContent
  }
}

useEventListener('click', async (e) => {
  const path = Array.from(e.composedPath())
  const first = path[0] as HTMLImageElement
  if (!(first instanceof HTMLElement))
    return
  if (!['IMG', 'VIDEO'].includes(first.tagName))
    return
  if (first.classList.contains('no-preview'))
    return
  if (path.some(el => el instanceof HTMLElement && ['A', 'BUTTON'].includes(el.tagName)))
    return
  if (!path.some(el => el instanceof HTMLElement && (el.classList.contains('prose') || el.classList.contains('photos'))))
    return

  // Do not open image when they are moving. Mainly for mobile to avoid conflict with hovering behavior.
  const pos = first.getBoundingClientRect()
  await new Promise(resolve => setTimeout(resolve, 50))
  const newPos = first.getBoundingClientRect()
  if (pos.left !== newPos.left || pos.top !== newPos.top)
    return

  setImageModel(first)
})

onKeyStroke('ArrowRight', (e) => {
  if (!imageModel.value || imageModel.value.dataset.photoIndex == null)
    return

  const index = Number.parseInt(imageModel.value.dataset.photoIndex)
  const nextIndex = index + 1
  const nextImg = document.querySelector(`img[data-photo-index="${nextIndex}"]`) as HTMLImageElement | null
  if (nextImg) {
    setImageModel(nextImg)
    e.preventDefault()
  }
})

onKeyStroke('ArrowLeft', (e) => {
  if (!imageModel.value || imageModel.value.dataset.photoIndex == null)
    return

  const index = Number.parseInt(imageModel.value.dataset.photoIndex)
  const prevIndex = index - 1
  const prevImg = document.querySelector(`img[data-photo-index="${prevIndex}"]`) as HTMLImageElement | null
  if (prevImg) {
    setImageModel(prevImg)
    e.preventDefault()
  }
})

onKeyStroke('Escape', (e) => {
  if (imageModel.value) {
    imageModel.value = undefined
    e.preventDefault()
  }
})

const currentLayout = computed(() => route.meta.layout)

const MainClass = computed(() => {
  switch (currentLayout.value) {
    case 'full-width':
    case 'main-only':
      return { 'px-7': false, 'py-10': false }
    default:
      return { 'px-7': true, 'py-10': true }
  }
})

const FooterClass = computed(() => {
  switch (currentLayout.value) {
    case 'full-width':
      return { 'px-7': true }
    case 'main-only':
      return { 'lt-md:hidden': true }
    default:
      return {}
  }
})
</script>

<template>
  <NavBar />
  <main :class="MainClass" class="of-x-hidden">
    <RouterView />
    <Footer :key="route.path" :class="FooterClass" />
  </main>
  <Transition name="fade">
    <div v-if="imageModel" fixed top-0 left-0 right-0 bottom-0 z-500 backdrop-blur-7 @click="imageModel = undefined">
      <div absolute top-0 left-0 right-0 bottom-0 bg-black:50 z--1 />
      <img
        v-if="imageModel.tagName === 'IMG'"
        :src="imageModel.src"
        :alt="imageModel.alt"
        :class="imageModel.className"
        max-w-screen max-h-screen w-full h-full object-contain
      >

      <video
        v-else
        :src="imageModel.src"
        autoplay
        loop
        muted
        playsinline
        max-w-screen max-h-screen w-full h-full object-contain
      />

      <div v-if="imageAlt" text-white bg-black:50 absolute right-5 bottom-5 px2 py1 flex justify-center items-center>
        {{ imageAlt }}
      </div>
    </div>
  </Transition>
</template>
