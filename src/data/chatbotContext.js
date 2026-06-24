import { destinations } from './destinations.js'

export const AGENCY_PRICING = {
  paris: {
    name: 'La Belle Époque à Paris',
    era: '1870 - 1914',
    packages: [
      { name: 'Essentiel (3 jours)', price: '2 890 €' },
      { name: 'Signature (5 jours)', price: '4 200 €' },
      { name: 'Prestige (7 jours)', price: '6 800 €' },
    ],
    includes: 'Assurance temporelle, garde-robe d\'époque, implants linguistiques',
  },
  florence: {
    name: 'Florence à la Renaissance',
    era: '1440 - 1550',
    packages: [
      { name: 'Essentiel (5 jours)', price: '3 600 €' },
      { name: 'Signature (7 jours)', price: '5 400 €' },
      { name: 'Prestige (10 jours)', price: '8 900 €' },
    ],
    includes: 'Guide historien, accès ateliers d\'artistes, hébergement de prestige',
  },
  dinosaurs: {
    name: 'Les derniers jours des dinosaures',
    era: '232 - 234 MA',
    packages: [
      { name: 'Observation (2 jours)', price: '8 500 €' },
      { name: 'Expédition (3 jours)', price: '12 000 €' },
      { name: 'Documentaire (4 jours)', price: '18 500 €' },
    ],
    includes: 'Bunker temporel certifié, combinaison atmosphérique, briefing sécurité 24 h',
  },
  consultation: 'Gratuite — réponse sous 48 h',
  membership: 'Adhésion Timeline Platinum : 499 € / an (réservation prioritaire, époques exclusives)',
  groupDiscount: '−15 % à partir de 4 voyageurs',
}

export const AGENCY_FAQ = [
  {
    q: 'Comment fonctionne un voyage temporel ?',
    a: 'Nous ouvrons un trou de ver stable via la technologie Chronos-7, vous séjournerez dans l\'époque choisie, puis nous vous ramènons à votre présent. Tout est réversible et encadré.',
  },
  {
    q: 'La consultation est-elle obligatoire ?',
    a: 'Oui, chaque voyage commence par une consultation gratuite pour valider vos coordonnées temporelles, votre profil et vos contraintes.',
  },
  {
    q: 'Puis-je voyager en famille ?',
    a: 'Oui, jusqu\'à 8 voyageurs par réservation. Tarif groupe −15 % à partir de 4 personnes.',
  },
  {
    q: 'Que se passe-t-il en cas de paradoxe ?',
    a: 'Nos algorithmes anti-paradoxe et le bouclier Chronos-7 empêchent toute contamination temporelle. Vous restez observateur dans les zones sensibles.',
  },
  {
    q: 'Quels moyens de paiement acceptez-vous ?',
    a: 'Carte, virement et crédits temporels TTA (membres Platinum). Un acompte de 30 % confirme la réservation.',
  },
]

export const ERA_ADVICE = [
  {
    profile: 'Premier voyage / débutant',
    destination: 'La Belle Époque à Paris',
    reason: 'Accessible, ville lumineuse, infrastructure moderne pour l\'époque, ambiance festive et culturelle.',
  },
  {
    profile: 'Passionné d\'art et d\'histoire',
    destination: 'Florence à la Renaissance',
    reason: 'Michel-Ange, Médicis, ateliers vivants — l\'apogée de la création humaine.',
  },
  {
    profile: 'Aventurier / amoureux de la nature',
    destination: 'Les derniers jours des dinosaures',
    reason: 'Expérience unique depuis bunkers sécurisés — pour voyageurs ayant suivi le briefing avancé.',
  },
]

export const ASSISTANT_PERSONALITY = `Tu es l'assistant virtuel de Time Travel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.

Ton ton :
- Professionnel mais chaleureux
- Passionné d'histoire
- Toujours enthousiaste sans être trop familier
- Expertise en voyage temporel (fictif mais crédible)

Tu connais parfaitement :
- Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle)
- Crétacé −65 M (dinosaures, nature préhistorique)
- Florence 1504 (Renaissance, art, Michel-Ange)

Tu peux suggérer des destinations selon les intérêts du client.`

export function buildSystemPrompt() {
  const destinationBlock = destinations.map((d) => {
    const pricingKey = d.slug.includes('paris')
      ? 'paris'
      : d.slug.includes('florence')
        ? 'florence'
        : 'dinosaurs'
    const pricing = AGENCY_PRICING[pricingKey]

    return `
### ${d.title} (${d.era})
- Résumé : ${d.shortDescription}
- Tagline : ${d.tagline}
- Difficulté : ${d.difficulty}
- Durée conseillée : ${d.duration}
- Tarifs :
${pricing.packages.map((p) => `  • ${p.name} : ${p.price}`).join('\n')}
- Inclus : ${pricing.includes}
- Points forts : ${d.highlights.join(', ')}
- FAQ :
${d.faq.map((f) => `  Q: ${f.q}\n  R: ${f.a}`).join('\n')}
`
  }).join('\n')

  const agencyFaqBlock = AGENCY_FAQ.map((f) => `Q: ${f.q}\nR: ${f.a}`).join('\n\n')

  const adviceBlock = ERA_ADVICE.map(
    (a) => `• ${a.profile} → ${a.destination} : ${a.reason}`,
  ).join('\n')

  return `${ASSISTANT_PERSONALITY}

RÈGLES COMPLÉMENTAIRES :
- Réponds toujours en français.
- Reste concis (3 à 6 phrases), sauf si le client demande des détails.
- Ne propose que les destinations du catalogue ci-dessous.
- Utilise UNIQUEMENT les tarifs et informations fournis.
- Oriente vers la page /booking pour réserver une consultation gratuite.
- Si une question dépasse tes connaissances, propose une consultation avec nos coordinateurs temporels.

TARIFS GÉNÉRAUX :
- Consultation : ${AGENCY_PRICING.consultation}
- ${AGENCY_PRICING.membership}
- ${AGENCY_PRICING.groupDiscount}

CONSEILS PAR PROFIL :
${adviceBlock}

DESTINATIONS :
${destinationBlock}

FAQ AGENCE :
${agencyFaqBlock}
`
}
