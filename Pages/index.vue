<template>
  <main  v-auto-animate class="my-0 mx-auto">
    <h1 class="text-center font-bold m-5 text-4xl">Track Your Manga List</h1>

    <form
    v-auto-animate
      class="flex justify-center my-0 mx-auto"
      @submit.prevent="searchManga"
    >
      <UInput
      v-auto-animate
        v-model="query"
        @input="handelInput"
        @keypress="searchManga"
        icon="i-heroicons-magnifying-glass-20-solid"
        size="lg"
        class="w-fit z-10 relative"
        color="violet"
        trailing
        placeholder="Search for a Manga.."
      />
      <UButton class="ml-1" color="violet" type="submit" variant="solid">Search</UButton>
    </form>

    <div v-auto-animate class="results z-50" v-if="search_result.length > 0">
      <div v-for="manga in search_result" :key="manga.mal_id" class="result">
        <img :src="manga.images.jpg.image_url" alt="" />
        <div class="details">
          <h3>{{ manga.title }}</h3>
          <p :title="manga.synopsis" v-if="manga.synopsis">
            {{ manga.synopsis.slice(0, 150) }}...
          </p>
          <UButton color="violet" variant="outline" @click="addManga(manga)"
            >Add Manga</UButton
          >
        </div>
      </div>
    </div>

    <div v-auto-animate class="mymanga" v-if="mangaStore.myManga.length > 0">
      <h2 class="text-gray:75 mx-auto my-0">My Manga</h2>
      <div v-for="(manga, i) in my_manga_asc" :key="i" class="manga">
        <img :src="manga.image" alt="" />
        <h3>{{ manga.title }}</h3>
        <div class="flex-1"></div>
        <span class="episodes ml-8">
          {{ manga.readedChapters }} / {{ manga.totalChapters }}
        </span>
        <UButton
          v-if="manga.readedChapters"
          color="violet"
          variant="solid"
          @click="decreaseReadChapters(manga)"
          >-</UButton
        >
        <UButton
          v-if="manga.totalChapters !== manga.readedChapters"
          color="violet"
          class="ml-3 mr-2"
          variant="outline"
          @click="increaseReadChapters(manga)"
          >+</UButton
        >
        <UButton
          color="violet"
          size="lg"
          variant="link"
          @click="removeManga(manga)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="#888888"
              d="m9.4 15.808l2.6-2.6l2.6 2.6l.708-.708l-2.6-2.6l2.6-2.6l-.708-.708l-2.6 2.6l-2.6-2.6l-.708.708l2.6 2.6l-2.6 2.6l.708.708ZM7.615 20q-.69 0-1.152-.462Q6 19.075 6 18.385V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.152q-.463.463-1.153.463h-8.77Z"
            ></path>
          </svg>
        </UButton>
      </div>
    </div>

    <div v-auto-animate class="mymanga" v-if="finishedManga.length>0">
      <h2>You Finished this manga</h2>
      <div v-auto-animate v-for="(manga, i) in finishedManga" :key="i" class="manga">
        <img :src="manga.image" alt="" />
        <h3>{{ manga.title }}</h3>
        <div class="flex-1"></div>
        <span class="episodes ml-8">
          {{ manga.readedChapters }} / {{ manga.totalChapters }}
        </span>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useMangaStore } from "~/stores/mangaStore";
const mangaStore = useMangaStore(); // useMangaStore is a function that returns the store object
// Initialize the store data when the component is mounted
onMounted(() => {
  mangaStore.initManga();
});

const query = ref("");
const search_result = ref([]);

// Get a sorted manga list
const my_manga_asc = computed(() => {
  return [...mangaStore.myManga].sort((a, b) => a.title.localeCompare(b.title));
});

// Compute finishedManga based on my_manga_asc
const finishedManga = computed(() => {
  return my_manga_asc.value.filter(
    (manga) => manga.readedChapters === manga.totalChapters
  );
});

const searchManga = () => {
  const url = `https://api.jikan.moe/v4/manga?q=${query.value}&sort=asc&sfw=true&genres_exclude=28,26,12,49`;
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      search_result.value = res.data;
    })
    .catch((err) => console.log(err));
};

const handelInput = (e) => {
  if (!e.target.value) {
    search_result.value = [];
  }
};
const addManga = (manga) => {
  search_result.value = [];
  query.value = "";
  mangaStore.addManga(manga);
};

const increaseReadChapters = (manga) => {
  mangaStore.increaseReadChapters(manga);
};

const decreaseReadChapters = (manga) => {
  mangaStore.decreaseReadChapters(manga);
};
// const resetReadChapters = (manga) => {
//   manga.read_chapters = 0;
//   mangaStore.resetChapter(manga);
// };

const removeManga = (manga) => {
  mangaStore.removeManga(manga);
};

// const resetReadChapters = (manga) => {
//   manga.read_chapters = 0;
//   useMangaStore.resetChapter(manga);
// };
</script>

<style scoped>
main {
  max-width: 768px;
  padding: 1.5rem;
}
.results {
  /* background-color: #1a1717; */
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 480px;
  overflow-y: scroll;
  margin-bottom: 1.5rem;
}
.result {
  display: flex;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: 0.4s;
}
.result img {
  width: 100px;
  border-radius: 1rem;
  margin-right: 1rem;
}

.details {
  flex: 1 1 0%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.details h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.details p {
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.details .button {
  margin-left: auto;
}

.flex-1 {
  display: block;
  flex: 1 1 0%;
}

.mymanga h2 {
  color: #888;
  font-weight: 400;
  margin-bottom: 1.5rem;
}

.mymanga .manga {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  background-color: #312e41;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.manga img {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 1rem;
  margin-right: 1rem;
}

.manga h3 {
  color: #faf7f7;
  font-size: 1.125rem;
}

.manga .episodes {
  margin-right: 1rem;
  color: #888;
}

.manga .button:first-of-type {
  margin-right: 0.5rem;
}

.manga .button:last-of-type {
  margin-right: 0;
}
</style>
