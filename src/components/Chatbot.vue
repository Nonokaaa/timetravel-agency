<script setup>
import { ref, nextTick } from 'vue'
import { getWelcomeMessage, sendChatMessage } from '../services/chatbotService.js'

const isOpen = ref(false)
const messages = ref([])
const input = ref('')
const isTyping = ref(false)
const chatBody = ref(null)

const quickPrompts = [
  'Quelle destination me conseillez-vous ?',
  'Quels sont les tarifs ?',
  'Est-ce sécurisé ?',
  'Comment réserver ?',
]

function toggleChat() {
  isOpen.value = !isOpen.value
  if (isOpen.value && messages.value.length === 0) {
    messages.value.push({ role: 'bot', text: getWelcomeMessage() })
  }
}

function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
}

async function addBotMessage(text) {
  isTyping.value = true
  await new Promise((r) => setTimeout(r, 400))
  isTyping.value = false
  messages.value.push({ role: 'bot', text })
  await scrollToBottom()
}

async function sendMessage(text) {
  const msg = (text || input.value).trim()
  if (!msg || isTyping.value) return

  messages.value.push({ role: 'user', text: msg })
  input.value = ''
  await scrollToBottom()

  isTyping.value = true
  const { text: reply } = await sendChatMessage(messages.value.slice(0, -1), msg)
  isTyping.value = false
  messages.value.push({ role: 'bot', text: reply })
  await scrollToBottom()
}

async function scrollToBottom() {
  await nextTick()
  if (chatBody.value) {
    chatBody.value.scrollTop = chatBody.value.scrollHeight
  }
}
</script>

<template>
  <div class="chatbot">
    <transition name="chat-slide">
      <div v-if="isOpen" class="chat-panel">
        <div class="chat-header">
          <div class="chat-header-info">
            <span class="chat-avatar" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 00-10 10c0 1.9.53 3.68 1.45 5.2L2 22l4.95-1.38A9.96 9.96 0 0012 22a10 10 0 000-20zm0 2a8 8 0 018 8 8 8 0 01-8 8c-1.25 0-2.43-.29-3.48-.8l-.32-.16-2.89.8.78-2.82-.18-.31A8 8 0 0112 4z" />
              </svg>
            </span>
            <div>
              <p class="chat-name">Assistant</p>
              <p class="chat-status">Time Travel Agency · En ligne</p>
            </div>
          </div>
          <button class="chat-close" aria-label="Fermer le chat" @click="toggleChat">✕</button>
        </div>

        <div ref="chatBody" class="chat-body">
          <div
            v-for="(msg, i) in messages"
            :key="i"
            class="chat-message"
            :class="msg.role"
          >
            <div class="message-bubble" v-html="formatMessage(msg.text)" />
          </div>
          <div v-if="isTyping" class="chat-message bot">
            <div class="message-bubble typing">
              <span /><span /><span />
            </div>
          </div>
        </div>

        <div v-if="messages.length <= 2" class="quick-prompts">
          <button
            v-for="prompt in quickPrompts"
            :key="prompt"
            class="quick-btn"
            @click="sendMessage(prompt)"
          >
            {{ prompt }}
          </button>
        </div>

        <form class="chat-input" @submit.prevent="sendMessage()">
          <input
            v-model="input"
            type="text"
            placeholder="Posez-moi vos questions sur les voyages temporels..."
            autocomplete="off"
            :disabled="isTyping"
          />
          <button
            type="submit"
            class="send-btn"
            aria-label="Envoyer"
            :disabled="!input.trim() || isTyping"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>
      </div>
    </transition>

    <button
      class="chat-fab"
      :class="{ 'is-open': isOpen }"
      :aria-label="isOpen ? 'Fermer le chat' : 'Ouvrir le chat'"
      @click="toggleChat"
    >
      <svg v-if="!isOpen" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
      </svg>
      <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.chatbot {
  position: fixed;
  bottom: max(1rem, env(safe-area-inset-bottom));
  right: max(1rem, env(safe-area-inset-right));
  z-index: 2000;
}

.chat-fab {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: var(--gradient-gold);
  color: var(--text-on-gold);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--glow-gold);
  transition:
    transform 0.5s var(--ease-natural),
    box-shadow 0.5s var(--ease-natural);
}

.chat-fab:hover {
  transform: scale(1.06);
  box-shadow: 0 8px 32px rgba(255, 157, 28, 0.45);
}

.chat-fab.is-open {
  transform: rotate(0deg);
}

.chat-panel {
  position: fixed;
  bottom: calc(74px + max(1rem, env(safe-area-inset-bottom)));
  right: max(1rem, env(safe-area-inset-right));
  left: max(1rem, env(safe-area-inset-left));
  width: auto;
  height: min(540px, calc(100vh - var(--header-height) - 6rem));
  border: 1px solid transparent;
  background:
    linear-gradient(var(--bg-gradient-end), var(--bg-gradient-end)) padding-box,
    var(--gradient-gold) border-box;
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--shadow);
}

@media (min-width: 480px) {
  .chat-panel {
    position: absolute;
    bottom: 74px;
    left: auto;
    right: 0;
    width: min(400px, calc(100vw - 2rem));
    height: 540px;
  }
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: var(--gradient-gold);
  color: var(--text-on-gold);
}

.chat-header-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.chat-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(26, 20, 8, 0.12);
}

.chat-name {
  font-weight: 700;
  font-size: 0.9rem;
}

.chat-status {
  font-size: 0.7rem;
  color: var(--text-on-gold-muted);
}

.chat-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--text-on-gold);
  border-radius: 50%;
  transition: background var(--transition);
}

.chat-close:hover {
  background: rgba(0, 0, 0, 0.1);
}

.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.chat-message {
  display: flex;
}

.chat-message.user {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 88%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-size: 0.85rem;
  line-height: 1.55;
}

.chat-message.bot .message-bubble {
  background: var(--bg-card);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--text-primary);
}

.chat-message.user .message-bubble {
  background: var(--gradient-gold);
  color: var(--text-on-gold);
}

.typing {
  display: flex;
  gap: 4px;
  padding: 0.75rem 1rem;
}

.typing span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-muted);
  animation: bounce 1.4s infinite ease-in-out;
}

.typing span:nth-child(2) { animation-delay: 0.2s; }
.typing span:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}

.quick-prompts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0 1rem 0.5rem;
}

.quick-btn {
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.4rem 0.75rem;
  border: 1px solid transparent;
  background:
    linear-gradient(rgba(12, 12, 10, 0.75), rgba(12, 12, 10, 0.75)) padding-box,
    var(--gradient-gold) border-box;
  border-radius: 20px;
  color: var(--text-primary);
  transition: all var(--transition);
}

.quick-btn:hover {
  background:
    linear-gradient(rgba(255, 201, 51, 0.15), rgba(255, 201, 51, 0.15)) padding-box,
    var(--gradient-gold) border-box;
  color: var(--gold-text);
}

.chat-input {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.chat-input input {
  flex: 1;
  padding: 0.65rem 0.75rem;
  background: rgba(12, 12, 10, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius);
  color: var(--text-primary);
  font-size: 0.85rem;
  outline: none;
  transition: border-color var(--transition);
}

.chat-input input:focus {
  border-color: var(--gold-text);
}

.chat-input input::placeholder {
  color: var(--text-muted);
}

.chat-input input:disabled {
  opacity: 0.6;
}

.send-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-gold);
  color: var(--text-on-gold);
  border-radius: var(--radius);
  transition: opacity var(--transition);
}

.send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.chat-slide-enter-active,
.chat-slide-leave-active {
  transition:
    opacity 0.5s var(--ease-natural),
    transform 0.5s var(--ease-natural);
}

.chat-slide-enter-from,
.chat-slide-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.96);
}
</style>
