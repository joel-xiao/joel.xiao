<script setup lang="ts">
function toTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const { y: scroll } = useWindowScroll()
</script>

<template>
  <header class="header z-40">
    <RouterLink
      style="z-index: 2;"
      class="w-12 h-12 absolute xl:fixed m-5 select-none outline-none"
      to="/"
      focusable="false"
    >
      <Logo />
    </RouterLink>
    <button
      title="Scroll to top"
      fixed right-3 bottom-3 w-10 h-10 hover:op100 rounded-full
      hover-bg-hex-8883 transition duration-300 z-100 print:hidden
      :class="scroll > 300 ? 'op30' : 'op0! pointer-events-none'"
      @click="toTop()"
    >
      <div i-ri-arrow-up-line />
    </button>
    <nav class="nav">
      <div class="spacer" />
      <div class="right" print:op0>
        <RouterLink to="/3d-portfolio" title="3D Portfolio">
          <span class="lt-md:hidden">3D Portfolio</span>
          <div i-ri-blender-line class="md:hidden" />
        </RouterLink>
        <a href="https://blog.csdn.net/XLL20001022" target="_blank" title="Blog">
          <span class="lt-md:hidden">Blog</span>
          <div i-ri-article-line md:hidden />
        </a>
        <RouterLink to="/projects" title="Projects">
          <span class="lt-md:hidden">Projects</span>
          <div i-ri-lightbulb-line class="md:hidden" />
        </RouterLink>
        <RouterLink to="/books" title="Books">
          <span class="lt-md:hidden">Books</span>
          <div i-ri-book-shelf-line class="md:hidden" />
        </RouterLink>
        <RouterLink to="/ai-portfolio" title="AI Chart">
          <div i-ri-message-ai-3-line />
        </RouterLink>
        <RouterLink to="/photos" title="Photos">
          <div i-ri-camera-3-line />
        </RouterLink>
        <a href="https://www.douyin.com/user/MS4wLjABAAAAkej6XwMY9kQbtT_jwMR5-gNcXPi7yIc2JTb_LF8ChNupKFUFNJvBI2NcNEIaEZ9H" target="_blank" title="Tiktok" class="lt-md:hidden">
          <div i-ri-tiktok-line />
        </a>
        <a href="https://space.bilibili.com/429725209" target="_blank" title="Bilibili" class="lt-md:hidden">
          <div i-ri-bilibili-line />
        </a>
        <a href="https://github.com/joel-xiao" target="_blank" title="GitHub" class="lt-md:hidden">
          <div i-uil-github-alt />
        </a>

        <!-- <RouterLink to="/posts" title="Blog"> -->
        <!--   <span class="lt-md:hidden">Blog</span> -->
        <!--   <div i-ri-article-line md:hidden /> -->
        <!-- <RouterLink to="/talks" class="lt-md:hidden" title="Talks"> -->
        <!--   Talks -->
        <!-- </RouterLink> -->
        <!-- <RouterLink to="/sponsors-list" title="Sponsors"> -->
        <!--   <span class="lt-md:hidden">Sponsors</span> -->
        <!--   <div i-ri-heart-line class="md:hidden" /> -->
        <!-- </RouterLink> -->
        <!-- <RouterLink to="/podcasts" class="lt-md:hidden" title="Podcasts"> -->
        <!--   <div i-ri-mic-line /> -->
        <!-- </RouterLink> -->
        <!-- <RouterLink to="/demos" title="Demos"> -->
        <!--   <div i-ri-screenshot-line /> -->
        <!-- </RouterLink> -->
        <!-- <RouterLink to="/chat" title="Let's Chat">
          <div i-ri-chat-1-line />
        </RouterLink> -->
        <!-- <a href="https://bsky.app/profile/antfu.me" target="_blank" title="Bluesky" class="lt-md:hidden"> -->
        <!--   <div i-ri-bluesky-line /> -->
        <!-- </a> -->
        <!-- <a href="/feed.xml" target="_blank" title="RSS" class="lt-md:hidden"> -->
        <!--   <div i-la-rss-square style="font-size:1.25rem; margin: 0 -0.125rem;" /> -->
        <!-- </a> -->
        <ToggleTheme />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  height: 88px;
}
.header h1 {
  margin-bottom: 0;
}

.logo {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

.nav {
  position: absolute;
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
  z-index: 1;
}

.nav > * {
  margin: auto;
}

.nav img {
  margin-bottom: 0;
}

.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
}

.nav a:hover {
  opacity: 1;
  text-decoration-color: inherit;
}

.nav .right {
  display: grid;
  grid-gap: 1.2rem;
  grid-auto-flow: column;
}

.nav .right > * {
  margin: auto;
}
</style>
