<template>
  <div class="detailbook container">
    <div class="wrapper-search">
      <div class="book__library-list-toolbar-search">
        <span class="search-icon">
          <i class="fas fa-search"></i>
        </span>
        <input type="text" placeholder="Tìm kiếm sách..." ref="searchInput" />
      </div>
      <button class="search-button" @click="handleSearch">Tìm kiếm</button>
    </div>

    <div class="row">
      <div class="col-lg-6">
        <div class="detailbook__image-book">
          <img v-if="imagePreview" :src="imagePreview" alt="Book Image" />
        </div>
      </div>

      <div class="col-lg-6">
        <div class="detailbook__information-book">
          <div class="detailbook__information-book-header">
            <div>
              <span class="title">Mã sách: </span>
              <input
                type="text"
                class="detailbook__information-book-title"
                v-model="bookCode"
                disabled
              />
            </div>

            <span class="title">Tên sách: </span>
            <input
              type="text"
              class="detailbook__information-book-title"
              v-model="bookTitle"
              disabled
            />
            <div class="detailbook__information-book-header-wrapper">
              <div class="detailbook__information-book-author">
                <span class="title">Tác giả: </span>
                <input
                  type="text"
                  v-model="bookAuthor"
                  disabled
                />
              </div>

              <div class="detailbook__information-book-quantity-wrapper">
                <div class="detailbook__information-book-quantity-title">
                  <span class="title">Số quyển: </span>
                  <input
                    type="text"
                    v-model="bookQuantity"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="detailbook__information-book-price-and-info">
            <span class="title">Giá sách (VD: 50000 = 50.000đ): </span>
            <input type="text" v-model="bookPrice" disabled />

            <span class="title">Mô tả sách: </span>
            <textarea
              class="detailbook__information-book-description"
              rows="4"
              v-model="bookDescription"
              disabled
            ></textarea>
          </div>

          <div class="detailbook__information-book-publishing">
            <div class="detailbook__information-book-publishing-title">
              Nhà xuất bản:
            </div>
            <input
              type="text"
              class="detailbook__information-book-publishing-content"
              v-model="bookPublisher"
              disabled
            />

            <div class="detailbook__information-book-publishing-title">
              Năm xuất bản:
            </div>
            <input
              type="text"
              class="detailbook__information-book-publishing-content"
              v-model="bookPublishYear"
              disabled
            />

            <div class="detailbook__information-book-publishing-title">
              Địa chỉ xuất bản:
            </div>
            <input
              type="text"
              class="detailbook__information-book-publishing-content"
              v-model="bookPublisherAddress"
              disabled
            />

            <div class="detailbook__information-book-publishing-title">
              Thể loại:
            </div>
            <select
              v-model="selectedGenre"
              name="genre"
              required
              disabled
            >
              <option disabled value="">-- Chọn thể loại --</option>
              <option
                v-for="genre in genres"
                :key="genre._id"
                :value="genre.TenTheLoai"
              >
                {{ genre.TenTheLoai }}
              </option>
            </select>
          </div>

          <div class="detailbook__information-book-button">
            <button
              type="button"
              class="detailbook__information-book-btn btn-danger"
              @click="deleteBook"
              :disabled="!isBookLoaded"
            >
              Xóa Sách
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading overlay -->
  <div
    v-if="isLoading"
    :style="{
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    }"
  >
    <img :src="loadingGif" alt="loading" style="width: 60px; height: 60px" />
  </div>
</template>

<script>
import { bookService } from "../services/book/book.service";
import loadingGif from "/image/loading.gif";

export default {
  name: "DeleteBook",
  data() {
    return {
      imagePreview: null,
      genres: [],
      selectedGenre: "",
      bookId: "",
      bookCode: "",
      bookTitle: "",
      bookAuthor: "",
      bookQuantity: "",
      bookPrice: "",
      bookDescription: "",
      bookPublisher: "",
      bookPublishYear: "",
      bookPublisherAddress: "",
      isBookLoaded: false,
      isLoading: false,
      loadingGif,
    };
  },
  mounted() {
    this.fetchGenres();
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

    async handleSearch() {
      const keyword = this.$refs.searchInput.value.trim();
      if (!keyword) {
        alert("Vui lòng nhập từ khóa tìm kiếm.");
        return;
      }

      try {
        this.isLoading = true;

        const book = await bookService.getOneBook(keyword);
        if (book) {
          this.bookId = book._id;
          this.bookCode = book.MaSach;
          this.bookTitle = book.TenSach;
          this.bookAuthor = book.TacGia;
          this.bookQuantity = book.SoQuyen.toString();
          this.bookPrice = book.DonGia.toString();
          this.bookDescription = book.MoTaSach;
          this.bookPublisher = book.MaNXB?.TenNXB || "";
          this.bookPublisherAddress = book.MaNXB?.DiaChi || "";
          this.bookPublishYear = book.NamXuatBan?.toString() || "";
          this.selectedGenre = book.MaTheLoai?.TenTheLoai || "";
          this.imagePreview = book.Image || "";

          this.isBookLoaded = true;
        } else {
          alert("Không tìm thấy sách nào.");
        }
      } catch (error) {
        console.error("Lỗi khi tìm sách:", error);
        alert("Đã xảy ra lỗi khi tìm sách.");
      } finally {
        this.isLoading = false;
      }
    },

    async deleteBook() {
      if (!confirm(`Bạn có chắc chắn muốn xóa sách "${this.bookTitle}"?`)) {
        return;
      }

      try {
        this.isLoading = true;

        await bookService.deleteBook(this.bookId);
        alert("Xóa sách thành công.");

        // Reset form sau khi xóa thành công
        this.resetForm();
      } catch (error) {
        console.error("Lỗi khi xóa sách:", error);
        alert("Đã xảy ra lỗi khi xóa sách.");
      } finally {
        this.isLoading = false;
      }
    },

    resetForm() {
      this.bookId = "";
      this.bookCode = "";
      this.bookTitle = "";
      this.bookAuthor = "";
      this.bookQuantity = "";
      this.bookPrice = "";
      this.bookDescription = "";
      this.bookPublisher = "";
      this.bookPublishYear = "";
      this.bookPublisherAddress = "";
      this.selectedGenre = "";
      this.imagePreview = null;
      this.isBookLoaded = false;
      this.$refs.searchInput.value = "";
    },
  },
};
</script>

<style scoped>
.detailbook {
  margin-bottom: 40px;
}

.detailbook__image-book {
  position: relative;
  width: 100%;
  height: 127vh;
  border-radius: 15px;
  padding: 30px;
  border: 1px solid #e6e6e6;
}

.detailbook__image-book img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detailbook__information-book {
  width: 100%;
  height: 127vh;
  border-radius: 15px;
  padding: 30px;
  border: 1px solid #e6e6e6;
  font-weight: 400;
  font-size: 1.3rem;
}

.detailbook__information-book-title {
  font-size: 3.6rem;
  font-weight: 600;
}

.detailbook__information-book-header {
  padding-bottom: 15px;
  margin-bottom: 23px;
  border-bottom: 1px solid #e6e6e6;
}

.detailbook__information-book-header-wrapper {
  display: flex;
  align-items: center;
  gap: 25px;
}

.detailbook__information-book-author {
  border-right: 1px solid #e6e6e6;
  padding-right: 25px;
}

.detailbook__information-book-star-wrapper {
  display: flex;
  gap: 5px;
  align-items: center;
  border-right: 1px solid #e6e6e6;
  padding-right: 25px;
}

.detailbook__information-book-star-wrapper .rating {
  position: relative;
  top: -1px;
}

.detailbook__information-book-header-wrapper .title {
  color: rgba(0, 0, 0, 0.8);
}

.detailbook__information-book-header-wrapper .content:hover {
  cursor: pointer;
  color: #f55c4e;
}

.detailbook__information-book-star-wrapper .number-start {
  font-weight: bold;
}

.detailbook__information-book-price {
  font-size: 2rem;
  color: #f55c4e;
  font-weight: bold;
  margin-bottom: 15px;
}

.detailbook__information-book-description {
  font-size: 1.4rem;
  padding-bottom: 25px;
  border-bottom: 1px solid #e6e6e6;
}

.detailbook__information-book-publishing {
  margin-top: 25px;
  margin-bottom: 38px;
  display: grid;
  grid-template-columns: 130px 1fr;
  row-gap: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e6e6e6;
}

.detailbook__information-book-publishing-title {
  color: rgba(0, 0, 0, 0.8);
}

.detailbook__information-book-btn {
  height: 52px;
  width: 170px;
  padding: 17px 32px;
  background-color: #f65d4e;
  color: #fff;
  border-radius: 50px;
  font-size: 1.4rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}

.detailbook__information-book-btn:hover {
  background-color: #e63727;
}

.detailbook__information-book-button {
  display: flex;
  align-items: center;
  gap: 35px;
}

.detailbook__information-book-btn-favorite-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
}

.detailbook__information-book-btn-favorite-wrapper i {
  font-size: 1.9rem;
  color: #ccc;
}

.detailbook__information-book-btn-favorite-wrapper:hover i {
  color: red;
}

.detailbook__information-book-btn-favorite-wrapper:hover {
  cursor: pointer;
}

.detailbook__relate-book {
  margin-top: 32px;
}

.detailbook__relate-book-header {
  font-size: 3.6rem;
  font-weight: bold;
  margin-bottom: 35px;
}

.detailbook__relate-book-image img {
  height: 500px;
  object-fit: cover;
}

.detailbook input,
.detailbook textarea,
.detailbook select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1.3rem;
  margin-bottom: 10px;
  font-family: inherit;
}

.detailbook textarea {
  resize: none;
  max-height: 80px;
}

.detailbook__information-book-publishing-title {
  display: flex;
  align-items: center;
}

.detailbook__information-book-publishing-content {
  margin-bottom: 0;
}

.detailbook__information-book-publishing input,
.detailbook__information-book-publishing select {
  margin-bottom: 0;
}

.detailbook__image-book-input-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.camera-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.camera-icon {
  background-color: #000;
  color: white;
  border-radius: 50%;
  padding: 10px;
  font-size: 18px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  height: 38px;
  width: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.camera-icon:hover {
  background-color: #111;
  transform: scale(1.1);
}

.wrapper-search {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.book__library-list-toolbar-search {
  position: relative;
  width: 100%;
  max-width: 300px;
}

.book__library-list-toolbar-search input {
  width: 100%;
  padding: 10px 12px 10px 40px;
  border: 1px solid #ccc;
  border-radius: 36px;
  font-size: 15px;
  line-height: 1.5;
  box-sizing: border-box;
}

.book__library-list-toolbar-search .search-icon {
  position: absolute;
  left: 14px;
  top: 42%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #888;
  pointer-events: none;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button {
  padding: 10px 20px;
  background-color: #f55c4e;
  color: white;
  border: none;
  border-radius: 36px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-left: 10px;
  height: 42px;
  position: relative;
  top: -5px;
}

.search-button:hover {
  background-color: #d74a3f;
}

.detailbook__information-book-btn[disabled] {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
  border: 1px solid #aaa;
  opacity: 0.8;
}
</style>