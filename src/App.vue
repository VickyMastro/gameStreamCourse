<script setup>
import LayoutHero from '@/components/Layout/LayoutHero.vue'
import GameCard from '@/components/Games/GameCard.vue'
import GameLayout from '@/components/Games/GameLayout.vue'
import GameModal from '@/components/Games/GameModal.vue'
import SharedLoader from '@/components/Shared/SharedLoader.vue'
import { useFetch } from '@/composables/useFetch'
import { ref } from 'vue'

const API_URL = 'https://gamestreamapi.herokuapp.com/api/games'
const gamesView = ref([])

const { state } = useFetch(API_URL, (json) => {
  gamesView.value = json
})

const onSetGameView = (filteredGames) => {
  gamesView.value = filteredGames
}
</script>

<template>
  <LayoutHero />
  <main>
    <SharedLoader v-if="state.isLoading" />
    <GameLayout v-else :games="state.data" @set-game-view="onSetGameView">
      <div v-if="gamesView.length === 0" class="title-no-results">
        No hay juegos que coincidan con la búsqueda
      </div>
      <GameCard v-for="game in gamesView" :key="game.title" :game="game" />
    </GameLayout>
    <teleport to="body">
      <GameModal />
    </teleport>
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
}

.title-no-results {
  display: grid;
  gap: 2rem;
  margin: 1rem auto;
  padding: 3rem;
  max-width: 90%;
  justify-content: center;
}
</style>
