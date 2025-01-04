<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import BackToTop from './components/BackToTop.vue'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <div class="app">
    <template v-if="!isAdminRoute">
      <Navbar />
      <main class="main-content">
        <router-view />
      </main>
      <Footer />
      <BackToTop />
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<style>
/* Global CSS Reset */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Global Font Settings */
:root {
  --font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

html {
  font-family: var(--font-family);
  line-height: 1.5;
  font-size: 16px;
}

body {
  color: #1f2937;
  background-color: #f3f4f6;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-family);
  line-height: 1.2;
  font-weight: 700;
}

input, button, textarea, select {
  font-family: var(--font-family);
}

/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* Selection Color */
::selection {
  background-color: #6366f1;
  color: white;
}

/* App Layout */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
