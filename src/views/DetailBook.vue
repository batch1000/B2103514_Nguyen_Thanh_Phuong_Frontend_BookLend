<template>
  <Header />

  <div class="detailbook container">
    <div class="row">
      <div class="col-lg-6">
        <div class="detailbook__image-book">
          <img :src="book.Image" alt="" />
        </div>
      </div>

      <div class="col-lg-6">
        <div class="detailbook__information-book">
          <div class="detailbook__information-book-header">
            <div class="detailbook__information-book-title">
              {{ book.TenSach }} ({{ book.MaSach }})
            </div>
            <div class="detailbook__information-book-header-wrapper">
              <div class="detailbook__information-book-author">
                <span class="title">Tác giả: </span>
                <span class="content">{{ book.TacGia }}</span>
              </div>

              <div class="detailbook__information-book-star-wrapper">
                <div class="rating">
                  <span class="star filled">★</span>
                  <span class="star filled">★</span>
                  <span class="star filled">★</span>
                  <span class="star filled">★</span>
                  <span class="star filled">★</span>
                </div>
                <div class="number-start">5</div>
              </div>

              <div class="detailbook__information-book-quantity-wrapper">
                <div class="detailbook__information-book-quantity-title">
                  <span class="title">Số quyển: </span>{{ book.SoQuyen }}
                </div>
              </div>
            </div>
          </div>

          <div class="detailbook__information-book-price-and-info">
            <div class="detailbook__information-book-price">
              {{ formatPrice(book.DonGia) }}
            </div>
            <div class="detailbook__information-book-description">
              {{ book.MoTaSach }}
            </div>
          </div>

          <div class="detailbook__information-book-publishing">
            <div class="detailbook__information-book-publishing-title">
              Nhà Xuất Bản:
            </div>
            <div class="detailbook__information-book-publishing-content">
              {{ book.MaNXB?.TenNXB }}
            </div>
            <div class="detailbook__information-book-publishing-title">
              Năm xuất bản:
            </div>
            <div class="detailbook__information-book-publishing-content">
              {{ book.NamXuatBan }}
            </div>
            <div class="detailbook__information-book-publishing-title">
              Thể loại:
            </div>
            <div class="detailbook__information-book-publishing-content">
              {{ book.MaTheLoai?.TenTheLoai || "N/A" }}
            </div>
          </div>

          <div
            v-if="book.SoQuyen > 0"
            class="detailbook__information-book-quantity-selector"
          >
            <div class="quantity-selector-wrapper">
              <span class="quantity-label">Số lượng mượn:</span>
              <div class="quantity-controls">
                <button
                  type="button"
                  class="quantity-btn"
                  @click="decreaseQuantity"
                  :disabled="borrowQuantity <= 1"
                >
                  -
                </button>
                <span class="quantity-display">{{ borrowQuantity }}</span>
                <button
                  type="button"
                  class="quantity-btn"
                  @click="increaseQuantity"
                  :disabled="borrowQuantity >= maxBorrowQuantity"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="detailbook__information-book-btn-borrow"
            :class="{
              'borrowed-success': hasBorrowed,
              'out-of-stock': book.SoQuyen === 0,
            }"
            @click="lendBook"
            :disabled="hasBorrowed || book.SoQuyen === 0"
          >
            {{ getButtonText() }}
          </button>
        </div>
      </div>
    </div>

    <div class="detailbook__relate-book">
      <div class="detailbook__relate-book-header">Sách Liên Quan</div>

      <div class="detailbook__relate-book-content">
        <div class="row g-5 home__feature-book-list">
          <div
            class="col-lg-4 home__feature-book-element"
            v-for="relatedBook in relatedBooks"
            :key="relatedBook._id"
          >
            <div
              class="home__feature-book-element-image detailbook__relate-book-image"
              @click="goToBookDetail(relatedBook._id)"
            >
              <img :src="relatedBook.Image" alt="" />
            </div>

            <div class="home__feature-book-element-information">
              <div
                class="home__feature-book-element-title"
                @click="goToBookDetail(relatedBook._id)"
              >
                {{ relatedBook.TenSach }}
              </div>
              <div class="home__feature-book-element-author">
                {{ relatedBook.TacGia }}
              </div>
              <div class="rating">
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star">☆</span>
                <span class="star">☆</span>
                <span class="star">☆</span>
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
import { userState } from "../assets/js/userState";

export default {
  name: "DetailBook",
  components: {
    Header,
    Footer,
  },
  props: ["id"],
  data() {
    return {
      book: {},
      relatedBooks: [],
      hasBorrowed: false,
      borrowQuantity: 1,
      lendInfo: null,
    };
  },
  async mounted() {
    window.scrollTo(0, 0);
    await this.fetchBookDetail();
  },
  methods: {
    async fetchBookDetail() {
      try {
        const response = await bookService.getBookById(this.id);
        this.book = response;

        // Reset số lượng mượn khi load sách mới
        this.borrowQuantity = 1;

        // Kiểm tra trạng thái mượn sách
        await this.checkLendStatus();

        await this.getRelatedBooks();
      } catch (error) {
        console.error("Lỗi khi tải thông tin sách:", error);
        alert("Không thể tải thông tin sách!");
      }
    },

    async getRelatedBooks() {
      try {
        if (this.book.MaTheLoai?._id) {
          // Lấy tất cả sách cùng thể loại
          const allBooks = await bookService.getAllBook();

          // Lọc sách cùng thể loại nhưng khác sách hiện tại
          const sameGenreBooks = allBooks.filter(
            (book) =>
              book.MaTheLoai?._id === this.book.MaTheLoai._id &&
              book._id !== this.book._id
          );

          // Random và lấy 3 sách
          const shuffled = sameGenreBooks.sort(() => 0.5 - Math.random());
          this.relatedBooks = shuffled.slice(0, 3);
        }
      } catch (error) {
        console.error("Lỗi khi tải sách liên quan:", error);
      }
    },

    goToBookDetail(bookId) {
      this.$router.push({ name: "DetailBook", params: { id: bookId } });
      window.scrollTo(0, 0);
    },

    formatPrice(value) {
      if (typeof value !== "number") return value;
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },

    async lendBook() {
  if (this.book.SoQuyen === 0) {
    alert("Sách đã hết!");
    return;
  }

  if (this.hasBorrowed) {
    alert("Bạn đã đăng ký mượn sách này rồi!");
    return;
  }

  try {
    const data = {
      MaSach: this.book._id,
      MaDocGia: userState._id,
      SoLuongMuon: this.borrowQuantity,
    };
    await bookService.lendBook(data);
    
    // Reload trạng thái sau khi mượn thành công
    await this.checkLendStatus();
    
    alert(`Đăng ký mượn ${this.borrowQuantity} cuốn sách thành công`);
  } catch (error) {
    alert("Đã xảy ra lỗi!");
  }
},

    increaseQuantity() {
      if (this.borrowQuantity < this.maxBorrowQuantity) {
        this.borrowQuantity++;
      }
    },

    // Giảm số lượng mượn
    decreaseQuantity() {
      if (this.borrowQuantity > 1) {
        this.borrowQuantity--;
      }
    },

    // Lấy text cho button
    getButtonText() {
  if (this.book.SoQuyen === 0) {
    return "Hết Sách";
  }
  
  if (this.hasBorrowed && this.lendInfo) {
    switch (this.lendInfo.TrangThai) {
      case 'pending':
        return "Chờ duyệt";
      case 'approved':
        return "Đã duyệt";
      case 'borrowing':
        return "Đang mượn";
      case 'returned':
        return "Đã trả";
      case 'overdue':
        return "Quá hạn";
      case 'denied':
        return "Bị từ chối";
      default:
        return "Đã gửi yêu cầu";
    }
  }
  
  return "Mượn Sách";
},

    async checkLendStatus() {
      try {
        const response = await bookService.getInfoLendBook({
          MaSach: this.book._id,
          MaDocGia: userState._id,
        });

        if (
          response &&
          (response.TrangThai === "pending" ||
            response.TrangThai === "approved" ||
            response.TrangThai === "borrowing")
        ) {
          this.hasBorrowed = true;
          this.lendInfo = response;
        } else {
          this.hasBorrowed = false;
          this.lendInfo = null;
        }
      } catch (error) {
        // Nếu không tìm thấy hoặc lỗi thì chưa mượn
        this.hasBorrowed = false;
        this.lendInfo = null;
      }
    },
  },

  watch: {
  id(newId) {
    if (newId) {
      this.hasBorrowed = false; // Reset trạng thái
      this.lendInfo = null;     // Reset thông tin mượn
      this.fetchBookDetail();

      this.$nextTick(() => {
        window.scrollTo(0, 0);
      });
    }
  },
},

  computed: {
    // Tính toán số lượng tối đa có thể mượn (tối đa 3 hoặc bằng SoQuyen nếu ít hơn 3)
    maxBorrowQuantity() {
      if (!this.book.SoQuyen) return 0;
      return Math.min(3, this.book.SoQuyen);
    },
  },
};
</script>

<style scoped>
.out-of-stock {
  background-color: #95a5a6 !important;
  color: white !important;
  border: none;
  cursor: not-allowed;
}

/* Style cho phần chọn số lượng */
.detailbook__information-book-quantity-selector {
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e6e6e6;
}

.quantity-selector-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}

.quantity-label {
  font-size: 1.4rem;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 500;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-btn {
  width: 35px;
  height: 35px;
  border: 1px solid #ddd;
  background-color: #f8f9fa;
  color: #333;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quantity-btn:hover:not(:disabled) {
  background-color: #f55c4e;
  color: white;
  border-color: #f55c4e;
}

.quantity-btn:disabled {
  background-color: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
}

.quantity-display {
  font-size: 1.6rem;
  font-weight: bold;
  min-width: 30px;
  text-align: center;
  color: #333;
}

.borrowed-success {
  background-color: #2ecc71 !important; /* Xanh lá thành công */
  color: white !important;
  border: none;
  cursor: auto;
}

.home__book-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.home__book-header-title {
  font-size: 3.6rem;
  font-weight: bold;
}

.view-all-btn {
  height: 45px;
  width: 130px;
  padding: 12px 31px;
  background-color: #f55c4e;
  color: #fff;
  font-size: 1.4rem;
  border-radius: 30px;
}

.home__book-line {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.line {
  width: 80%;
  height: 1px;
  background-color: #e6e6e6;
}

.view-all-btn:hover {
  background-color: #eb4738;
}

.home__popular-book-content {
  margin-top: 35px;
}

.home__feature-book-element-image {
  position: relative;
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

.home__feature-book-element-image img {
  width: 100%;
  height: 295px;
  border-radius: 15px;
  cursor: pointer;
}

.home__feature-book-element-image:hover .home__book-action-icon {
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
}

.home__feature-book-element-information {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3px;
}

.home__feature-book-element-title {
  font-size: 1.6rem;
  font-weight: bold;
}

.home__feature-book-element-title:hover {
  color: #f65d4e;
  cursor: pointer;
}

.home__feature-book-element-author {
  font-size: 1.2rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
}

.home__feature-book-element-author:hover {
  color: #f65d4e;
  cursor: pointer;
}

.home__feature-group-book {
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 30px;
}

.home__book-of-the-day-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.home__book-of-the-day-title {
  font-size: 3.6rem;
  font-weight: bold;
}

.home__book-of-the-day-line {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home__book-of-the-day-three-dot {
  font-size: 0.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.home__book-of-the-day-three-dot i {
  cursor: pointer;
  color: #e6e6e6;
}

.home__book-of-the-day-three-dot i:hover {
  color: #f55c4e;
}

.home__book-of-the-day-three-dot .dot--active {
  color: #f55c4e;
}

.home__book-of-the-day-list-book {
  --bs-gutter-x: 8rem;
  margin-top: 35px;
}

.home__book-of-the-day-element {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.home__book-of-the-day-element:first-child {
  border-right: 1px solid #e6e6e6;
}

.home__book-of-the-day-element-image img {
  width: 190px;
  height: 270px;
  cursor: pointer;
  border-radius: 15px;
}

.home__book-of-the-day-element-title {
  max-width: 200px;
  font-size: 1.6rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.home__book-of-the-day-element-title:hover {
  color: #f65d4e;
  cursor: pointer;
}

.home__book-of-the-day-element-author {
  font-size: 1.2rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
}

.home__book-of-the-day-element-author:hover {
  color: #f65d4e;
  cursor: pointer;
}

.home__book-of-the-day-element-information {
  padding: 0 20px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3px;
}

.home__trending-book {
  margin-top: 35px;
}

.home__trending-book-content {
  margin-top: 35px;
}

.home__trending-book-content-image img {
  height: 415px;
}

.home__new-release {
  margin-top: 35px;
}

.home__middle-banner {
  overflow: hidden;
}

.home__middle-banner img {
  margin-top: 35px;
  width: 100%;
  height: 242px;
  border-radius: 15px;
  transition: transform 0.4s ease;
}

.home__middle-banner:hover img {
  transform: scale(1.05);
}

.home__new-release-content {
  margin-top: 35px;
}

.home__new-release-content-image img {
  height: 415px;
}

.home__top-book-wrapper {
  padding-left: 30px;
}

.home__top-10-week-book,
.home__top-most-view-book {
  padding: 35px 30px 15px 30px;
  background-color: #f0f1f5;
  border-radius: 15px;
  margin-bottom: 30px;
}

.home__top-book-header {
  font-size: 2rem;
  font-weight: bold;
  padding-bottom: 30px;
  border-bottom: 1px solid #ed4321;
}

.home__top-book-content {
  margin-top: 40px;
}

.home__top-book-element {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
}

.home__top-book-element-image {
  position: relative;
}

.home__top-book-element-rank-wrapper {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -4px;
  left: -9px;
}

.home__top-book-element-rank {
  width: 85%;
  height: 85%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
}

.rank-1 {
  background: linear-gradient(135deg, #ff416c, #ff4b2b);
  /* Hồng cam rực rỡ */
  color: #fff;
}

.rank-2 {
  background: linear-gradient(135deg, #f953c6, #b91d73);
  /* Hồng tím đậm */
  color: #fff;
}

.rank-3 {
  background: linear-gradient(135deg, #8e2de2, #4a00e0);
  /* Tím mộng mơ đậm chất premium */
  color: #fff;
}

.rank-4 {
  background: linear-gradient(135deg, #ff6a5b, #ff9472);
  /* Đỏ cam – đậm vừa */
  color: #fff;
}

.rank-5 {
  background: linear-gradient(135deg, #ff9472, #f2709c);
  /* Cam hồng – rực nhẹ */
  color: #fff;
}

.rank-6 {
  background: linear-gradient(135deg, #fbc2eb, #f6c0c0);
  /* Hồng pastel vừa phải */
  color: #000;
}

.rank-7 {
  background: linear-gradient(135deg, #fcd3a1, #fda085);
  /* Cam đào nhạt – ấm áp */
  color: #000;
}

.rank-8 {
  background: linear-gradient(135deg, #e0c3fc, #8ec5fc);
  /* Tím nhạt – xanh sương nhẹ */
  color: #000;
}

.rank-9 {
  background: linear-gradient(135deg, #d4fc79, #96e6a1);
  /* Xanh lá mát – dịu sáng */
  color: #000;
}

.rank-10 {
  background: linear-gradient(135deg, #fffbd5, #b7f8db);
  /* Vàng kem – xanh nhạt hài hòa */
  color: #000;
}

.home__top-book-element-image img {
  width: 100%;
  height: 110px;
  cursor: pointer;
  border-radius: 10px;
}

.home__top-book-element-title {
  font-size: 1.4rem;
  font-weight: bold;
}

.home__top-book-element-title:hover {
  color: #f55c4e;
  cursor: pointer;
}

.home__top-book-element-author {
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.5);
}

.home__top-book-element-author:hover {
  color: #f55c4e;
  cursor: pointer;
}

.home__featured-authors {
  padding: 80px 20px;
  text-align: center;
  background: url("../public/image/backgroundauthor.png") no-repeat center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.home__section-title {
  font-size: 36px;
  font-weight: 800;
  color: #2c2c2c;
  margin-bottom: 50px;
  letter-spacing: 0.5px;
  color: #fff;
}

.author-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  max-width: 1100px;
  margin: 0 auto;
}

.author-card {
  border-radius: 20px;
  padding: 30px 20px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid transparent;
  background: #fff;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.author-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid #e3e3e3;
  cursor: pointer;
}

.author-avatar {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  margin-bottom: 20px;
}

.author-content {
  text-align: center;
}

.author-name {
  font-size: 22px;
  font-weight: 700;
  color: #1e1e1e;
  margin-bottom: 4px;
  font-weight: 800;
}

.author-role {
  font-size: 14px;
  font-style: italic;
  color: #888;
  margin-bottom: 10px;
}

.author-sub {
  font-size: 14px;
  color: #555;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.detailbook {
  margin-bottom: 40px;
}

.detailbook__image-book {
  width: 100%;
  height: 100vh;
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
  height: 100vh;
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
  display: flex;
  gap: 3px;
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

.detailbook__information-book-btn-borrow {
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

.detailbook__information-book-btn-borrow:hover {
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

.detailbook__relate-book .rating {
  display: flex;
  gap: 3px;
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

.home__feature-book-element-information {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3px;
}

.home__feature-book-element-title {
  font-size: 1.6rem;
  font-weight: bold;
}

.home__feature-book-element-title:hover {
  color: #f65d4e;
  cursor: pointer;
}

.home__feature-book-element-author {
  font-size: 1.2rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
}

.home__feature-book-element-author:hover {
  color: #f65d4e;
  cursor: pointer;
}
</style>