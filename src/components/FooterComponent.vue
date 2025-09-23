<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer" role="contentinfo" aria-label="Footer">
    <a
      href="https://github.com/Serena293"
      target="_blank"
      rel="noopener noreferrer"
      class="footer-link"
      aria-label="GitHub profile"
    >
      <i class="fab fa-github" aria-hidden="true"></i>
    </a>

    <p class="footer-text">&copy; {{ year }} - Serena Ferraro</p>
  </footer>
</template>

