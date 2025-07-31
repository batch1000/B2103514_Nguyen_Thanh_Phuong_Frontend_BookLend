<template>
  <div class="detailbook">
    <div class="row">
      <div class="col-lg-6">
        <div class="detailbook__image-book">
          <div class="detailbook__image-book-input-wrapper">
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              @change="onFileChange"
              style="display: none"
            />

            <label for="fileInput" class="camera-label">
              <div class="camera-icon">
                <i class="fas fa-camera"></i>
              </div>
            </label>
          </div>

          <img v-if="imagePreview" :src="imagePreview" alt="Preview" />
        </div>
      </div>

      <div class="col-lg-6">
        <div class="detailbook__information-book">
          <div class="detailbook__information-book-header">
            <span class="title">Tên sách: </span>
            <input
              type="text"
              class="detailbook__information-book-title"
              placeholder="Nhập tên sách"
              v-model="title"
            />

            <div class="detailbook__information-book-header-wrapper">
              <div class="detailbook__information-book-author">
                <span class="title">Tác giả: </span>
                <input
                  type="text"
                  placeholder="Nhập tên tác giả"
                  v-model="author"
                />
              </div>

              <div class="detailbook__information-book-quantity-wrapper">
                <div class="detailbook__information-book-quantity-title">
                  <span class="title">Số quyển: </span>
                  <input
                    type="text"
                    placeholder="Nhập số quyển"
                    v-model="quantity"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="detailbook__information-book-price-and-info">
            <span class="title">Giá sách (VD: 50000 = 50.000đ): </span>
            <input type="text" placeholder="Nhập giá sách" v-model="price" />

            <span class="title">Mô tả sách: </span>
            <textarea
              class="detailbook__information-book-description"
              rows="4"
              placeholder="Nhập mô tả sách"
              v-model="description"
            ></textarea>
          </div>

          <div class="detailbook__information-book-publishing">
            <div class="detailbook__information-book-publishing-title">
              Nhà xuất bản:
            </div>
            <input
              type="text"
              class="detailbook__information-book-publishing-content"
              placeholder="Nhập tên nhà xuất bản"
              v-model="publisher"
            />

            <div class="detailbook__information-book-publishing-title">
              Năm xuất bản:
            </div>
            <input
              type="text"
              class="detailbook__information-book-publishing-content"
              placeholder="Nhập năm xuất bản"
              v-model="publicationYear"
            />

            <div class="detailbook__information-book-publishing-title">
              Địa chỉ xuất bản:
            </div>
            <input
              type="text"
              class="detailbook__information-book-publishing-content"
              placeholder="Nhập địa chỉ xuất bản"
              v-model="publisherAddress"
            />

            <div class="detailbook__information-book-publishing-title">
              Thể loại:
            </div>
            <select v-model="genre" name="genre" required>
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
              class="detailbook__information-book-btn"
              @click="handleAddBook"
            >
              Thêm Sách
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

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
  name: "AddBook",
  data() {
    return {
      title: "",
      author: "",
      quantity: "",
      price: "",
      description: "",
      publisher: "",
      publicationYear: "",
      publisherAddress: "",
      genre: "",
      imageFile: null,
      imagePreview: null,
      isLoading: false,
      loadingGif,
      genres: [],
    };
  },
  mounted() {
    this.fetchGenres();
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageFile = file;
        this.imagePreview = URL.createObjectURL(file);
      }
    },

    async handleAddBook() {
      if (
        !this.title ||
        !this.author ||
        !this.quantity ||
        !this.price ||
        !this.description ||
        !this.publisher ||
        !this.publicationYear ||
        !this.publisherAddress ||
        !this.genre ||
        !this.imageFile
      ) {
        alert("Vui lòng nhập đầy đủ tất cả các thông tin!");
        return;
      }

      try {
        this.isLoading = true;

        const formData = new FormData();
        formData.append("title", this.title);
        formData.append("author", this.author);
        formData.append("quantity", this.quantity);
        formData.append("price", this.price);
        formData.append("description", this.description);
        formData.append("publisher", this.publisher);
        formData.append("publicationYear", this.publicationYear);
        formData.append("publisherAddress", this.publisherAddress);
        formData.append("genre", this.genre);
        if (this.imageFile) {
          formData.append("image", this.imageFile);
        }

        const response = await bookService.addBook(formData);
        alert("Thêm sách thành công!");

        this.title = "";
        this.author = "";
        this.quantity = "";
        this.price = "";
        this.description = "";
        this.publisher = "";
        this.publicationYear = "";
        this.publisherAddress = "";
        this.genre = "";
        this.imageFile = null;
        this.imagePreview = null;

        const fileInput = document.getElementById("fileInput");
        if (fileInput) {
          fileInput.value = null;
        }
      } catch (error) {
        const message =
          error.response?.data?.message || error.message || "Không rõ lỗi";

        alert("Lỗi khi thêm sách: " + message);
      } finally {
        this.isLoading = false;
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
  height: 120vh;
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
  height: 120vh;
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
</style>