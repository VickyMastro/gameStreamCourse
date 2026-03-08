<script setup>
import { ref } from 'vue'
import SharedSearch from '@/components/Shared/SharedSearch.vue'

const searchInput = ref('')

const emit = defineEmits(['setGameView'])

const { games } = defineProps({
  games: {
    type: Array,
    required: true,
  },
})

/* Evento para buscar juegos */
const onSearch = () => {
  const termSearch = searchInput.value.toLowerCase()

  const filteredGames = games.filter((game) => {
    return game.title.toLowerCase().includes(termSearch)
  })

  emit('setGameView', filteredGames)
}
</script>

<template>
  <section>
    <h2>Juegos recientes</h2>
    <div class="game-layout">
      <SharedSearch @search="onSearch" v-model="searchInput" id="probando" />
    </div>
    <slot />
  </section>
</template>

<style scoped>
.game-layout {
  display: grid;
  gap: 2rem;
  margin: 1rem auto;
  max-width: 90%;
}
</style>
