<template>
  <div>
    <h1 class="text-center my-5 font-bold text-4xl">{{ id_name }}</h1>
    <div v-auto-animate class="ml-5 mr-5 grid gap-2 grid-cols-5 justify-center align-middle">
      <div v-for="manga in allMangas" :key="manga.mal_id" class="manga-item mt-5">
        <div class="border-gray-600 flex flex-col items-center">
          <img class="w-40 h-50 rounded-2xl" :src="manga.images.jpg.image_url" alt="" />
          <h3 class="sm:text-lg justify-center">{{ manga.title }}</h3>
          <!-- <p>{{ manga.synopsis.slice(0, 200)}}</p> -->
        </div>
      </div>
    </div>

    </div>
</template>

<script setup>
const mang = ref([]);

const { id } = useRoute().params;

const id_number = id.split("&")[1];
const id_name = id.split("&")[0];

const fetchManga = async () => {
  const genreId = id;
  let currentPage = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const url = `https://api.jikan.moe/v4/manga?q=&genres=${id_number}&page=${currentPage}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (Array.isArray(data.data)) {
        mang.value = [...mang.value, ...data.data];
      } else {
        console.error("Unexpected data format:", data);
        break;
      }

      hasNextPage = data.pagination.has_next_page;
      if (hasNextPage) {
        currentPage++;
        // Wait for 1 second before the next request
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error("Error fetching manga:", error);
      break;
    }
  }
};
const allMangas = computed(() => mang.value);

onMounted(fetchManga);
</script>

<style  scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Adjust minmax values as needed */
  gap: 1rem; /*Space between grid items */
  padding: 1rem; 
  /* Padding around the grid */
  
}

.manga-item {
  /* Styles for each manga item */
  align-items: center;

}
.tt{
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    /* margin-top: 0.5rem; */
    margin-bottom: 0.5rem;
    /* color: #111827; */
    text-align: center;
}
</style>
