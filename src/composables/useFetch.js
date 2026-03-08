/* Los composables son funciones para compartir el estado entre componentes
   La diferencia con la store es que si el estado cambia solo ocurre en el componente que
   lo usa, no en todos los componentes que usan el estado.
   Ej. Componente A: quiere cambiar un color y componente B: quiere mantener el color
   original, cada uno tiene su propio estado y no se afecta el otro.

   En el estado cambia es todos los componentes que lo usen.
*/

import { reactive, onMounted } from 'vue'

export function useFetch(apiUrl = '', onSuccess = () => {}) {
  const state = reactive({
    error: null,
    isLoading: false,
    data: [],
  })

  const fetchGames = async () => {
    try {
      state.isLoading = true
      const response = await fetch(apiUrl)
      const json = await response.json()

      state.data = json

      onSuccess(json)
    } catch (error) {
      console.error('Error en fetchGames', error)
      state.error = error
    } finally {
      state.isLoading = false
    }
  }

  onMounted(() => {
    fetchGames()
  })

  return { state }
}
