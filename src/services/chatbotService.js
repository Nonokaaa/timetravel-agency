import { buildSystemPrompt } from '../data/chatbotContext.js'
import { destinations } from '../data/destinations.js'
import { AGENCY_PRICING } from '../data/chatbotContext.js'

const GREETINGS = [
  'Bienvenue chez Time Travel Agency. Je suis votre assistant virtuel, passionné d\'histoire et de voyages temporels. Paris 1889, Florence 1504 ou le Crétacé — dites-moi ce qui vous attire et je vous conseillerai la destination idéale.',
  'Bonjour ! Ravi de vous accompagner dans le choix de votre prochain voyage temporel. Art, nature préhistorique ou Belle Époque : quels sont vos envies ?',
]

const GENERAL_FAQ = [
  {
    patterns: ['book', 'booking', 'reserve', 'reservation', 'schedule', 'consultation', 'réserver', 'réservation', 'reserver', 'rendez-vous', 'reservation'],
    response:
      'Vous pouvez réserver une consultation gratuite via notre page de réservation. Sélectionnez votre destination et vos dates — nous validons vos coordonnées temporelles sous 48 h. Cliquez sur « Réserver une consultation » dans le menu.',
  },
  {
    patterns: ['price', 'cost', 'expensive', 'how much', 'fee', 'pricing', 'prix', 'coût', 'cout', 'combien', 'tarif', 'cher', 'coûte', 'coute', 'tarifs'],
    response: `Nos tarifs indicatifs :\n• **Paris** : dès ${AGENCY_PRICING.paris.packages[0].price} (3 jours)\n• **Florence** : dès ${AGENCY_PRICING.florence.packages[0].price} (5 jours)\n• **Crétacé** : dès ${AGENCY_PRICING.dinosaurs.packages[0].price} (2 jours)\n\nConsultation gratuite. Réduction −15 % à partir de 4 voyageurs.`,
  },
  {
    patterns: ['safe', 'safety', 'danger', 'risk', 'dangerous', 'sûr', 'sur', 'sécurité', 'securite', 'risque', 'dangereux', 'sécurisé', 'securise'],
    response:
      'La sécurité est notre priorité. Paris et Florence sont accessibles avec combinaisons temporelles complètes. Le Crétacé se fait uniquement depuis des bunkers certifiés. Briefing obligatoire pour tous les voyageurs.',
  },
  {
    patterns: ['how', 'work', 'science', 'technology', 'temporal', 'time travel', 'chronos', 'comment', 'fonctionne', 'science', 'technologie', 'voyage temporel'],
    response:
      'Notre technologie Chronos-7 crée des trous de ver stables ancrés à des coordonnées historiques précises, avec navigation quantique et prévention des paradoxes.',
  },
  {
    patterns: ['membership', 'member', 'loyal', 'frequent', 'adhésion', 'adhesion', 'membre', 'abonnement'],
    response: `L'adhésion Timeline Platinum coûte ${AGENCY_PRICING.membership.split(':')[1].trim()} : réservation prioritaire, époques exclusives et surclassements offerts.`,
  },
  {
    patterns: ['hello', 'hi', 'hey', 'greetings', 'bonjour', 'salut', 'coucou', 'bonsoir'],
    response:
      'Bonjour ! Je suis l\'assistant de Time Travel Agency. Destinations, tarifs, conseils d\'époque ou réservation — que puis-je faire pour vous ?',
  },
  {
    patterns: ['thank', 'thanks', 'merci'],
    response:
      'Je vous en prie. Si vous avez d\'autres questions, je reste à votre disposition. Bon voyage à travers les siècles.',
  },
  {
    patterns: ['help', 'what can you', 'options', 'destinations', 'where', 'aide', 'aider', 'options', 'où', 'ou', 'quoi', 'conseil', 'conseille', 'recommand'],
    response:
      'Je peux vous aider sur :\n• Le choix d\'une époque\n• Les tarifs détaillés\n• La sécurité et les FAQ\n• La réservation\n\nPosez votre question ou utilisez les suggestions ci-dessous.',
  },
]

function matchDestination(message) {
  const lower = message.toLowerCase()
  for (const dest of destinations) {
    if (dest.keywords.some((kw) => lower.includes(kw))) {
      return dest
    }
    if (lower.includes(dest.slug.replace(/-/g, ' ')) || lower.includes(dest.title.toLowerCase())) {
      return dest
    }
  }
  return null
}

function matchGeneralFaq(message) {
  const lower = message.toLowerCase()
  for (const faq of GENERAL_FAQ) {
    if (faq.patterns.some((p) => lower.includes(p))) {
      return faq.response
    }
  }
  return null
}

function getPricingKey(slug) {
  if (slug.includes('paris')) return 'paris'
  if (slug.includes('florence')) return 'florence'
  return 'dinosaurs'
}

function getDestinationAdvice(dest, message) {
  const lower = message.toLowerCase()
  const pricing = AGENCY_PRICING[getPricingKey(dest.slug)]

  if (/recommend|suggest|best|which|recommand|conseil|conseille|suggère|suggere|meilleur|laquelle|lequel/.test(lower)) {
    return `Je vous recommande **${dest.title}** (${dest.era}).\n\n${dest.shortDescription}\n\n${dest.tagline}\n\nDifficulté : ${dest.difficulty} | Durée : ${dest.duration}`
  }

  if (/safe|danger|risk|sûr|sur|sécurité|securite|risque|dangereux/.test(lower)) {
    const notes = dest.safetyNotes.map((n) => `• ${n}`).join('\n')
    return `Consignes de sécurité — **${dest.title}** :\n${notes}`
  }

  if (/expect|do|see|experience|activity|attendre|faire|voir|expérience|experience|activité|activite|visiter/.test(lower)) {
    const items = dest.whatToExpect.map((i) => `• ${i}`).join('\n')
    return `À **${dest.title}**, vous pourrez :\n${items}`
  }

  if (/history|about|tell me|learn|histoire|parlez|parle|raconter|raconte|apprendre|savoir/.test(lower)) {
    return `**${dest.title}** (${dest.era})\n\n${dest.history}`
  }

  if (/price|cost|how much|prix|coût|cout|combien|tarif|cher|coûte|coute|tarifs/.test(lower)) {
    const packages = pricing.packages.map((p) => `• ${p.name} : **${p.price}**`).join('\n')
    return `Tarifs **${dest.title}** :\n${packages}\n\nInclus : ${pricing.includes}\n\nConsultation gratuite pour un devis personnalisé.`
  }

  if (/faq|question/.test(lower)) {
    const faqs = dest.faq.map((f) => `**Q :** ${f.q}\n**R :** ${f.a}`).join('\n\n')
    return `FAQ — **${dest.title}** :\n\n${faqs}`
  }

  return `**${dest.title}** (${dest.era})\n\n${dest.shortDescription}\n\n${dest.tagline}\n\nDemandez-moi les tarifs, la sécurité ou le programme.`
}

export function getChatbotResponse(message, messageCount = 0) {
  if (!message.trim()) {
    return 'Veuillez saisir un message pour que je puisse vous aider.'
  }

  if (messageCount === 0) {
    return GREETINGS[Math.floor(Math.random() * GREETINGS.length)]
  }

  const dest = matchDestination(message)
  if (dest) {
    return getDestinationAdvice(dest, message)
  }

  const general = matchGeneralFaq(message)
  if (general) {
    return general
  }

  if (/compare|versus|vs|difference|between|comparer|comparaison|différence|difference|entre/.test(message.toLowerCase())) {
    return `Chaque époque offre une expérience unique :\n\n**La Belle Époque à Paris (1870 - 1914)** — Glamour et fête. Idéal pour un premier voyage.\n\n**Florence à la Renaissance (1440 - 1550)** — Art et Médicis. Pour les passionnés d'histoire.\n\n**Les derniers jours des dinosaures (232 - 234 MA)** — Mégafaune depuis bunkers sécurisés. Pour les aventuriers.\n\nLaquelle vous attire ?`
  }

  return `Je n'ai pas bien compris. Je peux vous renseigner sur :\n\n• **La Belle Époque à Paris**\n• **Florence à la Renaissance**\n• **Les derniers jours des dinosaures**\n\nOu sur les tarifs, la sécurité et la réservation.`
}

export function getWelcomeMessage() {
  return GREETINGS[0]
}

function toApiHistory(messages) {
  return messages
    .filter((m) => m.role === 'user' || m.role === 'bot')
    .map((m) => ({
      role: m.role === 'bot' ? 'assistant' : 'user',
      content: m.text,
    }))
}

export async function sendChatMessage(previousMessages, userMessage) {
  const apiMessages = [
    { role: 'system', content: buildSystemPrompt() },
    ...toApiHistory(previousMessages),
    { role: 'user', content: userMessage },
  ]

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: apiMessages }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Erreur API')
    }

    return { text: data.reply, source: 'mistral' }
  } catch {
    const fallbackText = getChatbotResponse(userMessage, previousMessages.length + 1)
    return { text: fallbackText, source: 'fallback' }
  }
}
