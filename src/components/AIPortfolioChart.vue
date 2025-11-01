<script setup lang="ts">
import { onMounted } from 'vue'
import { AI_MODELS } from '~/ai'
import { useAIChat } from '~/ai/useAIChat'

const {
  userInput,
  messages,
  sending,
  messageList,
  loadedFiles,
  loadStatus,
  selectedModelName,
  selectedModel,
  modelNames,
  keyInputVisible,
  keyInputValue,
  keyInputModelName,
  modelInputVisible,
  modelInputValue,
  modelInputModelName,
  currentKeySource,
  isModelFree,
  initialize,
  handleSend,
  switchModel,
  openKeyInput,
  saveKeyInput,
  cancelKeyInput,
  openModelInput,
  saveModelInput,
  cancelModelInput,
  resetModelInput,
} = useAIChat()

onMounted(async () => {
  await initialize()
})
</script>

<template>
  <div class="ai-portfolio-chart flex flex-col md:flex-row h-[calc(100vh-10rem)] md:h-[calc(100vh-12rem)] w-screen md:max-w-[1200px] mx-auto md:my-5 my-0 font-sans rounded-none md:rounded-xl shadow-lg bg-card relative">
    <div class="absolute inset-0 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] -z-10" />

    <aside class="hidden md:flex w-[260px] min-w-[260px] p-5 flex-col items-center border-r border-border">
      <div class="w-[100px] h-[100px] mb-3.5 rounded-full border-2 border-border overflow-hidden">
        <img src="/me_photos/xiao-v3-1.png" alt="AI Assistant Avatar" class="w-full h-full object-cover">
      </div>
      <div class="text-center">
        <h1 class="text-[1.3rem] mb-1.5 text-primary">
          Joel AI Assistant
        </h1>
        <p class="text-sm mb-2.5 text-secondary">
          Answer professional questions about Joel based on documents
        </p>
        <div v-if="loadedFiles.length" class="text-xs mb-1 text-tertiary">
          <span>Loaded Documents: </span>
          <span v-for="(file, i) in loadedFiles" :key="i">{{ file }}<span v-if="i < loadedFiles.length - 1">, </span></span>
        </div>
        <div class="text-xs text-tertiary-light">
          {{ loadStatus }}
        </div>
      </div>
    </aside>

    <main class="flex flex-col flex-1 bg-card min-h-0">
      <div class="px-5 py-2 bg-card-soft border-t border-border">
        <div class="flex items-center justify-between gap-3 mb-2">
          <div class="flex items-center gap-2 flex-1 min-w-0">
            <label class="text-xs text-tertiary whitespace-nowrap">Model:</label>
            <select
              :value="selectedModelName"
              class="flex-1 text-sm p-2 border border-border rounded-lg bg-card text-primary outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] min-w-0"
              @change="switchModel(($event.target as HTMLSelectElement).value)"
            >
              <option v-for="model in AI_MODELS" :key="model.name" :value="model.name">
                {{ model.label }}
              </option>
            </select>
          </div>
          <div class="flex gap-2">
            <button
              class="text-xs px-3 py-2 border border-border rounded-lg bg-card text-secondary hover:bg-card-soft transition-colors whitespace-nowrap"
              @click="openModelInput(selectedModelName)"
            >
              Edit Model
            </button>
            <button
              class="text-xs px-3 py-2 border border-border rounded-lg bg-card text-secondary hover:bg-card-soft transition-colors whitespace-nowrap"
              @click="openKeyInput(selectedModelName)"
            >
              Set API Key
            </button>
          </div>
        </div>
        <div class="flex items-center gap-2 text-xs mb-2">
          <span class="text-tertiary">Current Model:</span>
          <span class="text-secondary font-mono text-xs">{{ selectedModel?.model }}</span>
          <button
            v-if="modelNames[selectedModelName]"
            class="text-xs px-2 py-0.5 text-tertiary hover:text-primary transition-colors"
            @click="resetModelInput(selectedModelName)"
          >
            Reset
          </button>
        </div>
        <div class="flex items-center gap-2 text-xs">
          <span class="text-tertiary">Key Status:</span>
          <span :class="currentKeySource === 'user' ? 'text-primary' : 'text-tertiary-light'">
            {{ currentKeySource === 'user' ? 'User Key' : 'Default Key' }}
          </span>
          <span v-if="isModelFree" class="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs">
            Free
          </span>
        </div>
      </div>

      <div ref="messageList" class="flex-1 p-5 overflow-y-auto text-primary">
        <div class="w-full mb-3.5 text-left">
          <div class="inline-block max-w-[80%] animate-fadeIn bg-card-soft border border-border text-secondary shadow-md p-3.5 whitespace-pre-wrap leading-6 text-sm rounded-[18px] rounded-tl-[4px]">
            Hello! I can answer questions about Joel's resume details, project experience, tech stack, etc. Feel free to ask~
          </div>
        </div>

        <div v-for="(msg, idx) in messages" :key="idx" class="w-full mb-3.5" :class="msg.role === 'user' ? 'text-right' : 'text-left'">
          <div
            class="inline-block max-w-[80%] animate-fadeIn whitespace-pre-wrap leading-6 text-sm p-3.5 shadow-md"
            :class="msg.role === 'user'
              ? 'bg-primary text-white rounded-[18px] rounded-tr-[4px]'
              : 'bg-card-soft border border-border text-secondary rounded-[18px] rounded-tl-[4px]'"
          >
            <span v-html="msg.content" />
            <span v-if="msg.isThinking" class="block text-xs text-tertiary mt-1">Retrieving and organizing answer...</span>
            <span v-if="msg.isTyping" class="inline-block w-1.5 bg-primary ml-1 animate-blink" />
          </div>
        </div>
      </div>

      <div class="flex p-3.5 border-t border-border bg-card-soft">
        <input
          v-model="userInput"
          type="text"
          placeholder="e.g., What tech stack does Joel excel in? What are his core projects?"
          :disabled="sending"
          class="flex-1 p-3.5 border border-border rounded-[24px] mr-2.5 text-sm outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] bg-card text-primary placeholder:text-tertiary"
          @keydown.enter="handleSend"
        >
        <button
          :disabled="!userInput.trim() || sending"
          class="px-7 py-3 rounded-[24px] text-sm font-medium text-white disabled:bg-border disabled:cursor-not-allowed transition-all hover:bg-primary/90 active:translate-y-0.5 active:shadow-none bg-primary dark:bg-[#3b82f6] dark:hover:bg-[#2563eb]"
          @click="handleSend"
        >
          Send
        </button>
      </div>
    </main>

    <!-- Key Input Modal -->
    <div
      v-if="keyInputVisible"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      @click="cancelKeyInput"
    >
      <div
        class="bg-card border border-border rounded-xl shadow-lg p-5 w-full max-w-md"
        @click.stop
      >
        <h3 class="text-lg mb-2 text-primary">
          Set API Key
        </h3>
        <p class="text-sm mb-4 text-tertiary">
          {{ AI_MODELS.find(m => m.name === keyInputModelName)?.label }}
        </p>
        <input
          v-model="keyInputValue"
          type="password"
          placeholder="Enter API Key"
          class="w-full p-3 border border-border rounded-lg bg-card text-primary placeholder:text-tertiary mb-4 outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] font-mono text-sm"
          @keydown.enter="saveKeyInput"
          @keydown.esc="cancelKeyInput"
        >
        <div class="flex flex-col sm:flex-row gap-2 sm:justify-end">
          <button
            class="px-4 py-2 rounded-lg border border-border bg-card-soft text-secondary hover:bg-border transition-colors order-2 sm:order-1"
            @click="cancelKeyInput"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors order-1 sm:order-2"
            @click="saveKeyInput"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <!-- Model Input Modal -->
    <div
      v-if="modelInputVisible"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      @click="cancelModelInput"
    >
      <div
        class="bg-card border border-border rounded-xl shadow-lg p-5 w-full max-w-md"
        @click.stop
      >
        <h3 class="text-lg mb-2 text-primary">
          Edit Model
        </h3>
        <p class="text-sm mb-4 text-tertiary">
          {{ AI_MODELS.find(m => m.name === modelInputModelName)?.label }}
        </p>
        <div class="mb-3 p-2.5 rounded-lg bg-card-soft border border-border">
          <div class="text-xs text-tertiary mb-1">
            Default Model
          </div>
          <div class="text-sm font-mono text-secondary break-all">
            {{ AI_MODELS.find(m => m.name === modelInputModelName)?.model }}
          </div>
        </div>
        <input
          v-model="modelInputValue"
          type="text"
          placeholder="Enter Model ID (e.g., gpt-4, claude-3-opus)"
          class="w-full p-3 border border-border rounded-lg bg-card text-primary placeholder:text-tertiary mb-4 outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] font-mono text-sm"
          @keydown.enter="saveModelInput"
          @keydown.esc="cancelModelInput"
        >
        <div class="flex flex-col sm:flex-row gap-2 sm:justify-end">
          <button
            class="px-4 py-2 rounded-lg border border-border bg-card-soft text-secondary hover:bg-border transition-colors order-2 sm:order-1"
            @click="cancelModelInput"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors order-1 sm:order-2"
            @click="saveModelInput"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.ai-portfolio-chart .animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

@keyframes blink {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
.animate-blink {
  animation: blink 0.9s infinite;
}

.ai-portfolio-chart {
  --color-primary: #000000;
  --color-secondary: #333333;
  --color-tertiary: #666666;
  --color-tertiary-light: #999999;
  --color-border: #e0e0e0;
  --color-card: #ffffff;
  --color-card-soft: #f5f5f5;
}

.dark .ai-portfolio-chart {
  --color-primary: #ffffff;
  --color-secondary: #cccccc;
  --color-tertiary: #999999;
  --color-tertiary-light: #666666;
  --color-border: #333333;
  --color-card: #121212;
  --color-card-soft: #1e1e1e;
  --color-user-bg-dark: #3b82f6;
}

.ai-portfolio-chart .bg-primary {
  background-color: var(--color-primary);
}
.ai-portfolio-chart .text-primary {
  color: var(--color-primary);
}
.ai-portfolio-chart .text-secondary {
  color: var(--color-secondary);
}
.ai-portfolio-chart .text-tertiary {
  color: var(--color-tertiary);
}
.ai-portfolio-chart .text-tertiary-light {
  color: var(--color-tertiary-light);
}
.ai-portfolio-chart .border-border {
  border-color: var(--color-border);
}
.ai-portfolio-chart.bg-card,
.ai-portfolio-chart .bg-card {
  background-color: var(--color-card);
}
.ai-portfolio-chart .bg-card-soft {
  background-color: var(--color-card-soft);
}

.dark .ai-portfolio-chart .bg-primary {
  background-color: var(--color-user-bg-dark);
}
</style>
