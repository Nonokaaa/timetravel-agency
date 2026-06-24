<script setup>
import ScrollReveal from './ScrollReveal.vue'
</script>

<template>
  <ScrollReveal>
    <section id="experiences" class="agency">
      <div class="container">
        <div class="agency-grid">
          <div class="agency-text">
            <p class="section-label">L'AGENCE</p>
            <h2 class="section-title agency-title">Maîtres du voyage temporel</h2>
            <p class="agency-desc">
              Fondée en 2087, Time Travel Agency a transporté en toute sécurité plus de 12 000 voyageurs
              vers 847 coordonnées temporelles distinctes. Notre technologie Chronos-7 crée des trous de ver stables
              ancrés aux moments les plus extraordinaires de l'histoire.
            </p>
            <p class="agency-desc">
              Chaque voyage est conçu par des historiens temporels, des ingénieurs en sécurité et des spécialistes d'époque
              qui garantissent une expérience authentique, sécurisée et inoubliable.
            </p>
          </div>
          <div class="agency-stats">
            <div class="stat border-gold-gradient">
              <span class="stat-number">12K+</span>
              <span class="stat-label">Voyageurs</span>
            </div>
            <div class="stat border-gold-gradient">
              <span class="stat-number">847</span>
              <span class="stat-label">Coordonnées</span>
            </div>
            <div class="stat border-gold-gradient">
              <span class="stat-number">99.97%</span>
              <span class="stat-label">Taux de sécurité</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </ScrollReveal>

  <ScrollReveal :delay="100">
    <section id="science" class="science">
    <div class="container">
      <p class="section-label section-label-center">LA SCIENCE</p>
      <h2 class="section-title">Comment nous courbons le temps</h2>
      <div class="gold-divider" />
      <p class="section-subtitle">
        Notre technologie propriétaire de déplacement temporel utilise une navigation quantique intriquée
        et des algorithmes de prévention des paradoxes pour créer des voyages stables et réversibles dans le temps.
      </p>
      <div class="science-grid">
        <div class="science-card border-gold-gradient">
          <span class="science-icon">⧖</span>
          <h3>Moteur Chronos-7</h3>
          <p>Génération de trous de ver stables avec une précision de coordonnées sub-nanoseconde.</p>
        </div>
        <div class="science-card border-gold-gradient">
          <span class="science-icon">🛡</span>
          <h3>Bouclier anti-paradoxe</h3>
          <p>Des algorithmes avancés empêchent la contamination temporelle et les violations de causalité.</p>
        </div>
        <div class="science-card border-gold-gradient">
          <span class="science-icon">🧠</span>
          <h3>Implants neuronaux</h3>
          <p>Acquisition instantanée des langues et connaissances culturelles adaptées à l'époque.</p>
        </div>
      </div>
    </div>
    </section>
  </ScrollReveal>

  <ScrollReveal :delay="150">
    <section id="membership" class="membership">
    <div class="container">
      <div class="membership-card border-gold-gradient">
        <p class="section-label section-label-center">ADHÉSION</p>
        <h2 class="section-title">Adhésion Timeline Platinum</h2>
        <p class="section-subtitle membership-subtitle">
          Réservation prioritaire, accès exclusif aux époques restreintes et surclassements temporels offerts pour nos voyageurs les plus fidèles.
        </p>
        <router-link to="/booking" class="btn btn-primary membership-btn">
          REJOINDRE LA TIMELINE
        </router-link>
      </div>
    </div>
    </section>
  </ScrollReveal>
</template>

<style scoped>
.section-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--gold-text);
  margin-bottom: 0.75rem;
}

.section-label-center {
  text-align: center;
}

.agency {
  padding: 3rem 0;
}

.agency-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.agency-title {
  text-align: center;
  margin-bottom: 1.25rem;
}

.agency-desc {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.8;
  font-size: 0.9rem;
}

.agency-stats {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

.stat {
  text-align: center;
  padding: 1.25rem 1rem;
}

.stat-number {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 6vw, 1.75rem);
  color: var(--gold-text);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-secondary);
}

.science {
  padding: 3rem 0;
}

.science-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.science-card {
  padding: 1.75rem 1.25rem;
  text-align: center;
  transition:
    box-shadow 0.7s var(--ease-natural),
    transform 0.7s var(--ease-natural);
}

.science-card:hover {
  box-shadow: var(--glow-gold);
  transform: translateY(-4px);
}

.science-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 1rem;
}

.science-card h3 {
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.science-card p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.membership {
  padding: 1rem 0 3rem;
}

.membership-card {
  text-align: center;
  padding: 2rem 1.25rem;
}

.membership-subtitle {
  padding: 0;
  margin-bottom: 1.5rem;
}

.membership-btn {
  max-width: 20rem;
  margin: 0 auto;
}

@media (min-width: 480px) {
  .agency-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }

  .stat {
    padding: 1.25rem 0.5rem;
  }
}

@media (min-width: 768px) {
  .agency {
    padding: 4rem 0;
  }

  .agency-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 3rem;
    align-items: center;
  }

  .agency-title {
    text-align: left;
    margin-bottom: 1.5rem;
  }

  .science {
    padding: 4rem 0;
  }

  .science-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .membership {
    padding: 2rem 0 4rem;
  }

  .membership-card {
    padding: 3rem 2rem;
  }

  .agency-stats {
    gap: 1.5rem;
  }

  .stat {
    padding: 1.5rem 0.75rem;
  }
}
</style>
