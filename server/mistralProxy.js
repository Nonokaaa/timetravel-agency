function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}

export function createMistralProxy(env) {
  return async (req, res, next) => {
    const url = req.url?.split('?')[0]
    if (url !== '/api/chat' || req.method !== 'POST') {
      next()
      return
    }

    try {
      const rawBody = await readRequestBody(req)
      const { messages } = JSON.parse(rawBody || '{}')

      if (!Array.isArray(messages) || messages.length === 0) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Messages invalides.' }))
        return
      }

      const apiKey = env.MISTRAL_API_KEY
      if (!apiKey) {
        res.statusCode = 503
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'MISTRAL_API_KEY non configurée.' }))
        return
      }

      const apiUrl = 'https://api.mistral.ai/v1/chat/completions'
      const model = env.MISTRAL_MODEL || 'mistral-small-latest'

      const mistralResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.65,
          max_tokens: 900,
        }),
      })

      const data = await mistralResponse.json()

      if (!mistralResponse.ok) {
        res.statusCode = mistralResponse.status
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({
          error: data.message || data.detail || 'Erreur API Mistral.',
        }))
        return
      }

      const reply = data.choices?.[0]?.message?.content?.trim()
      if (!reply) {
        res.statusCode = 502
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Réponse Mistral vide.' }))
        return
      }

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ reply }))
    } catch (error) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: error.message || 'Erreur serveur.' }))
    }
  }
}
