<template>
  <div class="borrow-book">
    <div class="borrow-book__util">
      <div class="borrow-book__util-search">
        <div class="search-box">
          <input type="text" placeholder="Tìm kiếm..." class="search-input" />
          <button class="search-button">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>

      <div class="borrow-book__util-all-status">
  <select class="status-select">
    <option
      v-for="option in statusOptions"
      :key="option.value"
      :value="option.value"
    >
      {{ option.text }}
    </option>
  </select>
</div>
    </div>

    <div class="borrow-book__tabs">
      <div
        class="borrow-book__tab"
        :class="{ active: currentTab === 'require' }"
        @click="currentTab = 'require'"
      >
        Danh Sách Yêu Cầu Mượn
      </div>
      <div
        class="borrow-book__tab"
        :class="{ active: currentTab === 'borrowed' }"
        @click="currentTab = 'borrowed'"
      >
        Danh Sách Đã Mượn
      </div>
    </div>

    <div class="borrow-book__list-require-borrow mt-4" v-if="currentTab === 'require'">
      <div class="borrow-book__list-require-borrow-title">Mã Độc Giả</div>
      <div class="borrow-book__list-require-borrow-title">Độc Giả</div>
      <div class="borrow-book__list-require-borrow-title">Sách</div>
      <div class="borrow-book__list-require-borrow-title">Ngày Yêu Cầu</div>
      <div class="borrow-book__list-require-borrow-title">Hạn trả</div>
      <div class="borrow-book__list-require-borrow-title">Trạng thái</div>
      <div class="borrow-book__list-require-borrow-title">Xử Lý</div>

      <div class="borrow-book__list-require-borrow-content">D001</div>
      <div class="borrow-book__list-require-borrow-content">Nguyễn Văn A</div>
      <div class="borrow-book__list-require-borrow-content">Nhà Giả Kim</div>
      <div class="borrow-book__list-require-borrow-content">01/01/1999</div>
      <div class="borrow-book__list-require-borrow-content">01/01/1999</div>
      <div class="borrow-book__list-require-borrow-content">
        <div class="borrow-book__list-require-borrow-status-waiting">
          Chờ Duyệt
        </div>
      </div>
      <div class="borrow-book__list-require-borrow-content">
        <button
          type="button"
          class="borrow-book__list-require-borrow-btn-accept"
        >
          Duyệt
        </button>
        <button type="button" class="borrow-book__list-require-borrow-deny">
          Từ chối
        </button>
      </div>

      <div class="borrow-book__list-require-borrow-content">D001</div>
      <div class="borrow-book__list-require-borrow-content">Nguyễn Văn A</div>
      <div class="borrow-book__list-require-borrow-content">Nhà Giả Kim</div>
      <div class="borrow-book__list-require-borrow-content">01/01/1999</div>
      <div class="borrow-book__list-require-borrow-content">01/01/1999</div>
      <div class="borrow-book__list-require-borrow-content">
        <div class="borrow-book__list-require-borrow-status-approved">
          Đã Duyệt
        </div>
      </div>
      <div class="borrow-book__list-require-borrow-content">
        <div class="borrow-book__list-require-borrow-btn-done">Đã xử lý</div>
      </div>

      <div class="borrow-book__list-require-borrow-content">D001</div>
      <div class="borrow-book__list-require-borrow-content">Nguyễn Văn A</div>
      <div class="borrow-book__list-require-borrow-content">Nhà Giả Kim</div>
      <div class="borrow-book__list-require-borrow-content">01/01/1999</div>
      <div class="borrow-book__list-require-borrow-content">01/01/1999</div>
      <div class="borrow-book__list-require-borrow-content">
        <div class="borrow-book__list-require-borrow-status-denied">
          Đã Từ Chối
        </div>
      </div>
      <div class="borrow-book__list-require-borrow-content">
        <div class="borrow-book__list-require-borrow-btn-done">Đã xử lý</div>
      </div>
    </div>

    <div class="borrow-book__list-borrowed mt-4" v-if="currentTab === 'borrowed'">
      <!-- Tiêu đề các cột -->
      <div class="borrow-book__list-borrowed-title">Mã Độc Giả</div>
      <div class="borrow-book__list-borrowed-title">Độc Giả</div>
      <div class="borrow-book__list-borrowed-title">Sách</div>
      <div class="borrow-book__list-borrowed-title">Ngày Mượn</div>
      <div class="borrow-book__list-borrowed-title">Hạn Trả</div>
      <div class="borrow-book__list-borrowed-title">Tình Trạng</div>
      <div class="borrow-book__list-borrowed-title">Thao Tác</div>

      <!-- Dòng dữ liệu 1: Sách đang mượn -->
      <div class="borrow-book__list-borrowed-content">D002</div>
      <div class="borrow-book__list-borrowed-content">Trần Thị B</div>
      <div class="borrow-book__list-borrowed-content">Đắc Nhân Tâm</div>
      <div class="borrow-book__list-borrowed-content">15/07/2023</div>
      <div class="borrow-book__list-borrowed-content">30/07/2023</div>
      <div class="borrow-book__list-borrowed-content">
        <div class="borrow-book__list-borrowed-status-borrowing">Đang Mượn</div>
      </div>
      <div class="borrow-book__list-borrowed-content">
        <button type="button" class="borrow-book__list-borrowed-btn-return">
          Đã trả
        </button>
        <button type="button" class="borrow-book__list-borrowed-btn-extend">
          Gia hạn
        </button>
      </div>

      <!-- Dòng dữ liệu 2: Sách quá hạn -->
      <div class="borrow-book__list-borrowed-content">D003</div>
      <div class="borrow-book__list-borrowed-content">Lê Văn C</div>
      <div class="borrow-book__list-borrowed-content">
        Tuổi Trẻ Đáng Giá Bao Nhiêu
      </div>
      <div class="borrow-book__list-borrowed-content">01/07/2023</div>
      <div class="borrow-book__list-borrowed-content">15/07/2023</div>
      <div class="borrow-book__list-borrowed-content">
        <div class="borrow-book__list-borrowed-status-overdue">Quá Hạn</div>
      </div>
      <div class="borrow-book__list-borrowed-content">
        <button type="button" class="borrow-book__list-borrowed-btn-return">
          Đã trả
        </button>
      </div>

      <!-- Dòng dữ liệu 3: Sách đã trả -->
      <div class="borrow-book__list-borrowed-content">D004</div>
      <div class="borrow-book__list-borrowed-content">Phạm Thị D</div>
      <div class="borrow-book__list-borrowed-content">Nhà Giả Kim</div>
      <div class="borrow-book__list-borrowed-content">10/06/2023</div>
      <div class="borrow-book__list-borrowed-content">25/06/2023</div>
      <div class="borrow-book__list-borrowed-content">
        <div class="borrow-book__list-borrowed-status-returned">Đã Trả</div>
      </div>
      <div class="borrow-book__list-borrowed-content">
        <div class="borrow-book__list-borrowed-btn-completed">Hoàn thành</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManagementBorrowBook",
  data() {
    return {
      currentTab: "require",
      statusOptions: []
    };
  },

  watch: {
    currentTab(newVal) {
      if (newVal === 'require') {
        this.statusOptions = [
          { value: 'all', text: 'Tất cả trạng thái' },
          { value: 'waiting', text: 'Chờ duyệt' },
          { value: 'approved', text: 'Đã duyệt' },
          { value: 'denied', text: 'Từ chối' }
        ];
      } else if (newVal === 'borrowed') {
        this.statusOptions = [
          { value: 'all', text: 'Tất cả trạng thái' },
          { value: 'borrowing', text: 'Đang Mượn' },
          { value: 'overdue', text: 'Quá Hạn' },
          { value: 'returned', text: 'Đã Trả' }
        ];
      }
    }
  },

  mounted() {
    this.statusOptions = [
      { value: 'all', text: 'Tất cả trạng thái' },
      { value: 'waiting', text: 'Chờ duyệt' },
      { value: 'approved', text: 'Đã duyệt' },
      { value: 'denied', text: 'Từ chối' }
    ];
  }
};

</script>

<style scoped>
.book__admin-navigation-option {
  padding: 11px 20px;
  display: grid;
  grid-template-columns: 20px auto;
  font-size: 1.5rem;
  font-weight: 400;
  cursor: pointer;
}

.book__admin-navigation-option:hover {
  background-color: #ff713d;
  color: #fff;
  border-radius: 8px;
}

.book__admin-navigation-option--choosing {
  background-color: #ff713d;
  color: #fff;
  border-radius: 8px;
}

.book__admin-navigation {
  padding-left: 5px;
  padding-top: 3px;
}

.book__admin-information {
  position: relative;
  padding: 15px 20px;
  font-size: 1.4rem;
  cursor: pointer;
  margin-bottom: 10px;
  border-bottom: 1px solid #000;
}

.admin-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
  font-weight: 500;
  position: relative;
  left: -4px;
}

.admin-info i {
  font-size: 2rem;
}

.admin-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 6px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: none;
  z-index: 1000;
  min-width: 120px;
  overflow: hidden;
  transition: opacity 0.2s ease;
}

.book__admin-information:hover .admin-dropdown,
.admin-dropdown:hover {
  display: block;
}

.logout-button {
  padding: 8px 12px;
  font-size: 1.3rem;
  color: #333;
  background-color: white;
  transition: background 0.25s ease;
  width: 100%;
  box-sizing: border-box;
}

.logout-button:hover {
  background-color: #1e3a8a;
  color: white;
}

/* Borrow Book Section */
.container-fluid {
  overflow: hidden;
}

.borrow-book__list-require-borrow {
  display: grid;
  grid-template-columns: 120px repeat(6, 1fr);
}

.borrow-book__list-require-borrow-title {
  padding: 5px;
  font-size: 1.7rem;
  border-bottom: 1px solid #dfe2e6;
  font-weight: bold;
}

.borrow-book__list-require-borrow-content {
  padding: 5px;
  font-size: 1.7rem;
  border-bottom: 1px solid #dfe2e6;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
}

.borrow-book__list-require-borrow-status-waiting {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 1.2rem;
  font-weight: 500;
  display: inline-block;
  min-width: 100px;
  text-align: center;
  background: #fff3cd;
  color: #856404;
}

.borrow-book__list-require-borrow-status-approved {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 1.2rem;
  font-weight: 500;
  display: inline-block;
  min-width: 100px;
  text-align: center;
  background: #d4edda;
  color: #155724;
}

.borrow-book__list-require-borrow-status-denied {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 1.2rem;
  font-weight: 500;
  display: inline-block;
  min-width: 100px;
  text-align: center;
  background: #f8d7da;
  color: #721c24;
}

.borrow-book__list-require-borrow-btn-accept {
  padding: 5px 10px;
  font-size: 1.2rem;
  min-width: 80px;
  min-height: 30px;
  background-color: #16a085;
  color: #fff;
  border-radius: 7px;
}

.borrow-book__list-require-borrow-btn-accept:hover {
  background-color: #1d6b5b;
}

.borrow-book__list-require-borrow-deny {
  padding: 5px 10px;
  font-size: 1.2rem;
  min-width: 80px;
  min-height: 30px;
  background-color: #c0392b;
  color: #fff;
  border-radius: 7px;
}

.borrow-book__list-require-borrow-deny:hover {
  background-color: #962d22;
}

.borrow-book__list-require-borrow-btn-done {
  padding: 5px 10px;
  font-size: 1.2rem;
  min-width: 80px;
  min-height: 30px;
  background-color: #fff;
  color: #a1a6ab;
  border: 1px solid #a1a6ab;
  border-radius: 7px;
  text-align: center;
}

.borrow-book__util {
  display: flex;
  justify-content: space-between;
}

.borrow-book__util-search {
  width: 300px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 1.4rem;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.search-input:focus {
  border-color: #16a085;
  box-shadow: 0 0 0 3px rgba(22, 160, 133, 0.2);
}

.search-button {
  position: absolute;
  right: 5px;
  background: #16a085;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.search-button:hover {
  background: #1d6b5b;
  transform: scale(1.05);
}

.status-select {
  padding: 10px 15px;
  padding-right: 35px; /* Khoảng trống cho icon mũi tên */
  font-size: 1.1rem;
  border-radius: 20px;
  border: 1px solid #ddd;
  background-color: white;
  color: #555;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none; /* Ẩn style mặc định */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 15px;
  min-width: 200px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.status-select:hover {
  border-color: #a1c4d0;
}

.status-select:focus {
  outline: none;
  border-color: #16a085;
  box-shadow: 0 0 0 3px rgba(22, 160, 133, 0.2);
}

.status-select,
.status-select option {
  font-size: 1.4rem; /* ~22.4px */
  padding: 12px 20px; /* Tăng padding cho cân đối */
}

.borrow-book__tabs {
  display: flex;
  margin: 20px 0;
  border-bottom: 2px solid #e0e0e0;
}

.borrow-book__tab {
  padding: 12px 24px;
  font-size: 1.3rem;
  cursor: pointer;
  color: #555;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  font-weight: 500;
}

.borrow-book__tab:hover {
  color: #16a085;
}

.borrow-book__tab.active {
  color: #16a085;
  border-bottom-color: #16a085;
  background-color: #f0f9f7;
}

/* Tái sử dụng các class cũ (đổi tên) */
.borrow-book__list-borrowed {
  display: grid;
  grid-template-columns: 120px repeat(6, 1fr); /* Giữ nguyên 7 cột */
}

.borrow-book__list-borrowed-title,
.borrow-book__list-borrowed-content {
  padding: 5px;
  font-size: 1.7rem;
  border-bottom: 1px solid #dfe2e6;
  font-weight: bold; /* Title vẫn bold */
  display: flex;
  align-items: center;
  gap: 10px;
}

.borrow-book__list-borrowed-content {
  font-weight: 500; /* Content bình thường */
}

/* Trạng thái mới cho tab "Đã Mượn" */
.borrow-book__list-borrowed-status-borrowing {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 1.2rem;
  font-weight: 500;
  display: inline-block;
  min-width: 100px;
  text-align: center;
  background: #cbcbf1; /* Lavender nhạt */
  color: #4b4b8a;
}

.borrow-book__list-borrowed-status-overdue {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 1.2rem;
  font-weight: 500;
  display: inline-block;
  min-width: 100px;
  text-align: center;
  background: #f5c6cb; /* Màu đỏ nhạt */
  color: #721c24;
}

.borrow-book__list-borrowed-status-returned {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 1.2rem;
  font-weight: 500;
  display: inline-block;
  min-width: 100px;
  text-align: center;
  background: #bcf2d3; /* Xanh lá mint */
  color: #155724;
}

/* Nút thao tác mới */
.borrow-book__list-borrowed-btn-return {
  padding: 5px 10px;
  font-size: 1.2rem;
  min-width: 80px;
  min-height: 30px;
  background-color: #3498db; /* Màu xanh dương */
  color: #fff;
  border-radius: 7px;
}

.borrow-book__list-borrowed-btn-return:hover {
  background-color: #2980b9;
}

.borrow-book__list-borrowed-btn-extend {
  padding: 5px 10px;
  font-size: 1.2rem;
  min-width: 80px;
  min-height: 30px;
  background-color: #f39c12; /* Màu cam */
  color: #fff;
  border-radius: 7px;
}

.borrow-book__list-borrowed-btn-extend:hover {
  background-color: #d35400;
}

.borrow-book__list-borrowed-btn-completed {
  padding: 5px 10px;
  font-size: 1.2rem;
  min-width: 80px;
  min-height: 30px;
  background-color: #fff;
  color: #a1a6ab;
  border: 1px solid #a1a6ab;
  border-radius: 7px;
  text-align: center;
}
</style>