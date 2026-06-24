<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="footer-brand">Time Travel Agency</p>
      <p class="footer-copy">
        © 2024 Time Travel Agency Holdings. Tous les fuseaux horaires réservés.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: auto;
  width: 100%;
  background: var(--gradient-gold);
  color: var(--text-on-gold);
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  padding: 1.25rem var(--page-gutter);
  text-align: center;
}

.footer-brand {
  font-family: var(--font-sans);
  font-size: clamp(0.95rem, 3.5vw, 1.1rem);
  font-weight: 700;
  letter-spacing: 0.04em;
}

.footer-copy {
  font-size: clamp(0.55rem, 2.5vw, 0.65rem);
  letter-spacing: 0.04em;
  color: var(--text-on-gold-muted);
  max-width: 20rem;
  line-height: 1.4;
}

@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.5rem 2rem;
  }

  .footer-copy {
    max-width: none;
    text-align: right;
  }
}
</style>
