<template>
  <Header />

  <div class="book__library">
    <div class="container-fluid">
      <div class="row d-flex align-items-start">
        <div class="col-lg-3 book__library-filter-wrapper">
          <div class="book__library-filter">
            <div class="book__library-filter-title">Thể loại</div>
            <div class="book__library-filter-content">
              <div class="form-check" v-for="genre in genres" :key="genre._id">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :value="genre._id"
                  :id="'genre' + genre._id"
                  v-model="selectedGenres"
                />
                <label class="form-check-label" :for="'genre' + genre._id">
                  {{ genre.TenTheLoai }}
                </label>
              </div>
            </div>
          </div>

          <div class="book__library-filter">
            <div class="book__library-filter-title">Đánh giá</div>
            <div class="book__library-filter-content">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="5"
                  id="rating5"
                />
                <label class="form-check-label" for="rating5">
                  <div class="rating">
                    <span class="star filled">★</span>
                    <span class="star filled">★</span>
                    <span class="star filled">★</span>
                    <span class="star filled">★</span>
                    <span class="star filled">★</span>
                  </div>
                </label>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="4"
                  id="rating4"
                />
                <label class="form-check-label" for="rating4">
                  <div class="rating">
                    <span class="star filled">★</span>
                    <span class="star filled">★</span>
                    <span class="star filled">★</span>
                    <span class="star filled">★</span>
                    <span class="star">☆</span>
                  </div>
                </label>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="3"
                  id="rating3"
                />
                <label class="form-check-label" for="rating3">
                  <div class="rating">
                    <span class="star filled">★</span>
                    <span class="star filled">★</span>
                    <span class="star filled">★</span>
                    <span class="star">☆</span>
                    <span class="star">☆</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-9 book__library-list-wrapper">
          <div class="book__library-list">
            <div class="book__library-list-toolbar">
              <div class="book__library-list-toolbar-search">
                <span class="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Tìm theo mã hoặc tên sách..."
                  v-model="searchKeyword"
                />
              </div>

              <div class="book__library-list-toolbar-sort">
                <label for="sort">Sắp xếp:</label>
                <select id="sort" v-model="sortOption">
                  <option value="popular">Phổ biến nhất</option>
                  <option value="new">Mới nhất</option>
                  <option value="title">Tên sách (A–Z)</option>
                </select>
              </div>
            </div>

            <div class="book__library-list-book">
              <div class="row book__library-list-book-row">
                <div
                  class="col-lg-3 book__library-list-book-element-wrapper"
                  v-for="book in paginatedBooks"
                  :key="book._id"
                >
                  <div class="book__library-list-book-element">
                    <div
                      class="book__library-list-book-element-image"
                      @click="goToBookDetail(book._id)"
                    >
                      <img :src="book.Image" alt="" />

                      <div class="home__book-action-icon">
                        <div class="home__book-action-favorite-icon">
                          <i class="fa-regular fa-heart"></i>
                        </div>

                        <div class="home__book-action-preview-icon">
                          <i class="fa-regular fa-eye"></i>
                        </div>

                        <div class="home__book-action-borrow-icon">
                          <i class="fa-solid fa-book-medical"></i>
                        </div>
                      </div>
                    </div>

                    <div class="book__library-list-book-element-information">
                      <div
                        class="book__library-list-book-element-title"
                        @click="goToBookDetail(book._id)"
                      >
                        {{ book.TenSach }}
                      </div>

                      <div class="rating">
                        <span class="star filled">★</span>
                        <span class="star filled">★</span>
                        <span class="star filled">★</span>
                        <span class="star filled">★</span>
                        <span class="star">☆</span>
                      </div>

                      <div class="book__library-list-book-element-author">
                        {{ book.TacGia }}
                      </div>

                      <div class="book__library-list-book-element-price">
                        {{ formatPrice(book.DonGia) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="book__library-list-book-navigation-page"
                v-if="sortedBooks.length > 0"
              >
                <ul class="pagination">
                  <li
                    class="page-item"
                    :class="{ disabled: currentPage === 1 }"
                  >
                    <a class="page-link" href="#" @click.prevent="goToPage(1)"
                      >«</a
                    >
                  </li>

                  <li
                    class="page-item"
                    :class="{ disabled: currentPage === 1 }"
                  >
                    <a
                      class="page-link"
                      href="#"
                      @click.prevent="goToPage(currentPage - 1)"
                      >‹</a
                    >
                  </li>

                  <li class="page-item active">
                    <a class="page-link" href="#" @click.prevent>{{
                      currentPage
                    }}</a>
                  </li>

                  <li
                    class="page-item"
                    :class="{ disabled: currentPage === totalPages }"
                  >
                    <a
                      class="page-link"
                      href="#"
                      @click.prevent="goToPage(currentPage + 1)"
                      >›</a
                    >
                  </li>

                  <li
                    class="page-item"
                    :class="{ disabled: currentPage === totalPages }"
                  >
                    <a
                      class="page-link"
                      href="#"
                      @click.prevent="goToPage(totalPages)"
                      >»</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

import { bookService } from "../services/book/book.service";

export default {
  name: "Library",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      genres: [],
      books: [],
      currentPage: 1,
      pageSize: 12,
      sortOption: "popular",
      selectedGenres: [],
      searchKeyword: "",
    };
  },
  async mounted() {
    const pageFromURL = parseInt(this.$route.query.page);
    if (!isNaN(pageFromURL) && pageFromURL >= 1) {
      this.currentPage = pageFromURL;
    }

    const genreFromURL = this.$route.query.genre;
    if (genreFromURL) {
      this.selectedGenres = [genreFromURL];
    }

    this.fetchGenres();

    try {
      const response = await bookService.getAllBook();
      if (Array.isArray(response)) {
        this.books = response;
      }
    } catch (error) {
      alert("Lỗi khi lấy sách!");
    }
  },
  methods: {
    formatPrice(value) {
      if (typeof value !== "number") return value;
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.$router.push({ query: { ...this.$route.query, page: page } });
      }
    },

    async fetchGenres() {
      try {
        const response = await bookService.getAllGenre();
        this.genres = response;
      } catch (error) {
        console.error("Lỗi khi tải danh sách thể loại:", error);
      }
    },

    goToBookDetail(bookId) {
      this.$router.push({ name: "DetailBook", params: { id: bookId } });
    },
  },
  computed: {
    filteredBooks() {
      let result = this.books;

      // Filter theo search keyword
      if (this.searchKeyword.trim()) {
        const keyword = this.searchKeyword.toLowerCase().trim();
        result = result.filter((book) => {
          const tenSach = book.TenSach.toLowerCase();
          const maSach = book.MaSach.toLowerCase();
          return tenSach.includes(keyword) || maSach.includes(keyword);
        });
      }

      // Filter theo thể loại đã chọn
      if (this.selectedGenres.length > 0) {
        result = result.filter((book) => {
          // Kiểm tra nếu MaTheLoai là object hoặc chuỗi
          const genreId = book.MaTheLoai?._id
            ? book.MaTheLoai._id.toString()
            : book.MaTheLoai?.toString();
          return genreId && this.selectedGenres.includes(genreId);
        });
      }

      return result;
    },

    sortedBooks() {
      if (this.sortOption === "new") {
        return [...this.filteredBooks].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      } else if (this.sortOption === "title") {
        return [...this.filteredBooks].sort((a, b) =>
          a.TenSach.localeCompare(b.TenSach, "vi", { sensitivity: "base" })
        );
      } else {
        return this.filteredBooks;
      }
    },

    paginatedBooks() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.sortedBooks.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.sortedBooks.length / this.pageSize);
    },
  },
  watch: {
    "$route.query.page"(newPage) {
      const page = parseInt(newPage);
      if (!isNaN(page) && page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },

    "$route.query.genre"(newGenre) {
      if (newGenre) {
        this.selectedGenres = [newGenre];
      } else {
        this.selectedGenres = [];
      }
    },

    sortOption() {
      this.goToPage(1);
    },

    searchKeyword() {
      this.goToPage(1);
    },

    selectedGenres() {
      this.goToPage(1);
    },
  },

  beforeRouteEnter(to, from, next) {
    next(() => {
      window.scrollTo(0, 0);
    });
  }
};
</script>

<style scoped>
.book__library {
  margin-top: 20px;
  overflow: hidden;
}

.book__library-filter-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.book__library-filter {
  width: 90%;
  border-radius: 15px;
  border: 1px solid #e6e6e6;
  padding: 25px 0 40px 0;
  margin-bottom: 25px;
}

.book__library-filter-title {
  font-size: 1.6rem;
  font-weight: bold;
  border-bottom: 1px solid #e6e6e6;
  padding: 0 40px 15px 40px;
}

.book__library-filter-content {
  padding: 15px 40px 0 40px;
}

.form-check-label {
  font-size: 1.6rem;
  font-weight: 400;
}

.form-check {
  margin-top: 10px;
  margin-bottom: 10px;
}

.book__library-filter-content .rating {
  position: relative;
  top: -1px;
}

.book__library-list {
  width: 100%;
  padding-right: 20px;
}

.book__library-list-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.book__library-list-toolbar-search {
  position: relative;
  width: 100%;
  max-width: 300px;
}

.book__library-list-toolbar-search .search-icon {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  font-size: 16px;
  color: #888;
  pointer-events: none;
}

.book__library-list-toolbar-search input {
  padding: 10px 14px 10px 36px;
  border: 1px solid #ccc;
  border-radius: 36px;
  font-size: 15px;
  width: 100%;
  transition: border 0.3s, box-shadow 0.3s;
}

.book__library-list-toolbar-search input:focus {
  border-color: #007bff;
  outline: none;
}

.book__library-list-toolbar-sort {
  display: flex;
  align-items: center;
  gap: 10px;
}

.book__library-list-toolbar-sort label {
  font-size: 14px;
  color: #333;
}

.book__library-list-toolbar-sort select {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  min-width: 180px;
  background-color: #fff;
  transition: border 0.3s, box-shadow 0.3s;
}

.book__library-list-toolbar-sort select:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
  outline: none;
}

.book__library-list-book-element-wrapper {
  padding: 0 12px;
  border-right: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  margin-top: 30px;
  padding-bottom: 20px;
}

.book__library-list-book-element-image {
  position: relative;
  cursor: pointer;
}

.book__library-list-book-element-image img {
  width: 100%;
  height: 300px;
  border-radius: 16px;
  object-fit: cover;
}

.book__library-list-book-element-title {
  font-size: 1.6rem;
  font-weight: bold;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book__library-list-book-element-title:hover {
  color: #f55d58;
  cursor: pointer;
}

.book__library-list-book-element-information {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 2px;
}

.book__library-list-book-element-information .rating {
  font-size: 1.3rem;
}

.book__library-list-book-element-author {
  font-size: 1.2rem;
  color: #a69da3;
  font-weight: 500;
}

.book__library-list-book-element-author:hover {
  color: #f55d58;
  cursor: pointer;
}

.book__library-list-book-element-price {
  font-size: 2rem;
  color: #f55d58;
}

.home__book-action-icon {
  position: absolute;
  right: 10px;
  bottom: 10px;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  display: flex;
  opacity: 0;
  transform: translateX(20px);
  pointer-events: none;
  transition: all 0.3s ease;
}

.home__book-action-favorite-icon,
.home__book-action-preview-icon,
.home__book-action-borrow-icon {
  background-color: #fff;
  border-radius: 50%;
  width: 37px;
  height: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}

.home__book-action-favorite-icon:hover,
.home__book-action-preview-icon:hover,
.home__book-action-borrow-icon:hover {
  background-color: #f55c4e;
  color: #fff;
  cursor: pointer;
}

.book__library-list-book-element-image:hover .home__book-action-icon {
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
}

.book__library-list-book-navigation-page {
  text-align: center;
  margin: 25px 0;
}

.pagination {
  display: inline-flex;
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #ddd;
  font-family: Arial, sans-serif;
}

.page-item {
  margin: 0;
}

.page-link {
  display: block;
  padding: 8px 14px;
  text-decoration: none;
  color: #333;
  background-color: #fff;
  border-right: 1px solid #ddd;
  transition: background-color 0.2s ease;
  font-size: 1.2rem;
}

.page-item:last-child .page-link {
  border-right: none;
}

.page-link:hover {
  background-color: #f2f2f2;
}

.page-item.active .page-link {
  background-color: #007bff;
  color: white;
  cursor: default;
}

.page-item.disabled .page-link {
  color: #aaa;
  background-color: #f9f9f9;
  cursor: not-allowed;
}
</style>