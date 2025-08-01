<template>
  <div class="book__header-wrapper">
    <div class="container">
      <div class="book__header">
        <div class="book__header-brand">
          <img src="/image/brand.png" alt="" />
        </div>

        <div class="book__header-navigation">
          <router-link to="/home" class="book__header-link">Home</router-link>

          <div class="book__dropdown-catagories">
            <a href="#" class="book__header-link">Categories</a>
            <div class="book__dropdown-catagories-menu">
              <a
                href="#"
                v-for="genre in genres"
                :key="genre._id"
                @click.prevent="goToLibraryWithGenre(genre._id)"
              >
                {{ genre.TenTheLoai }}
              </a>
            </div>
          </div>

          <router-link to="/library" class="book__header-link"
            >Library</router-link
          >
          <a href="#" class="book__header-link">My books</a>
        </div>

        <div class="book__header-unity-bar">
          <div class="book__header-my-account">
            <i class="fa-regular fa-circle-user"></i>
          </div>

          <div class="book__header-notification">
            <i class="fa-regular fa-bell"></i>
          </div>

          <div class="book__header-search-book">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { bookService } from "../services/book/book.service";

export default {
  name: "Header",
  data() {
    return {
      genres: [],
    };
  },
  async mounted() {
    await this.fetchGenres();
  },
  methods: {
    async fetchGenres() {
      try {
        const response = await bookService.getAllGenre();
        this.genres = response;
      } catch (error) {
        console.error("Lỗi khi tải danh sách thể loại:", error);
      }
    },

    goToLibraryWithGenre(genreId) {
      this.$router.push({
        name: "Library",
        query: { genre: genreId },
      });
    },
  },
};
</script>