// stores/manga.js
import { defineStore } from "pinia";

export const useMangaStore = defineStore("manga", {
  state: () => ({
    myManga: [],
  }),

  actions: {
    initManga() {
        this.myManga = JSON.parse(localStorage.getItem("my_manga")) || [];
      return this.myManga;
    },
    addManga(manga) {
      this.myManga.push({
        id: manga.mal_id,
        title: manga.title,
        image: manga.images.jpg.image_url,
        totalChapters: manga.chapters,
        readedChapters: 0,
      });
      this.updateLocalStorage();
    },
    removeManga(manga) {
        this.myManga = this.myManga.filter((m) => m.id !== manga.id);
        this.updateLocalStorage();
        },
    increaseReadChapters(manga) {
      manga.readedChapters++;
      this.updateLocalStorage();
    },

    decreaseReadChapters(manga) {
      if (manga.readedChapters > 0) {
        manga.readedChapters--;
        this.updateLocalStorage();
      }
    },
    updateLocalStorage() {
      if (typeof window !== "undefined") {
        localStorage.setItem("my_manga", JSON.stringify(this.myManga));
      }
    },
  },
});
