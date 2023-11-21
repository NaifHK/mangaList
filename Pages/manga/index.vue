<template>
  <div>
    <h1 class="text-center my-5 font-bold text-4xl">Genres</h1>
    <UInput
      v-model="query"
      icon="i-heroicons-magnifying-glass-20-solid"
      size="lg"
      class="w-fit flex justify-center my-5 mx-auto"
      color="violet"
      trailing
      placeholder="Search for a genre.."
    />
    <div class="grid mx-2 my-0">
      <button
        v-for="genre in allgenres"
        :key="genre.mal_id"
        class="bg-slate-800 rounded-lg w-full flex justify-center cursor-pointer p-5"
      >
        <NuxtLink :to="`/manga/${genre.name}&${genre.mal_id}`">{{
          genre.name
        }}</NuxtLink>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const genval = ref([]);
const query = ref("");

const excludedGenres = [28, 26, 12, 49];

const allgenres = computed(() => {
  const filteredGenres = genval.value.filter((genre) => {
    return !excludedGenres.includes(genre.mal_id);
  });
  if (query.value) {
    return search_genres.value;
  }
  return filteredGenres;
});

const search_genres = computed(() => {
  return genval.value
    .filter((genre) => !excludedGenres.includes(genre.mal_id))
    .filter((genre) =>
      genre.name.toLowerCase().includes(query.value.toLowerCase())
    );
});

const fetchGenres = async () => {
  const url = "https://api.jikan.moe/v4/genres/manga";
  try {
    const response = await fetch(url);
    const data = await response.json();
    genval.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchGenres();
});
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  row-gap: 1rem;
  column-gap: 1rem;
}

/* .genre-button {
  width: 100%;
  padding: 20px;
  text-align: center;
  background-color: #3e3f7c;
  border-radius: 5px;
} */
</style>
