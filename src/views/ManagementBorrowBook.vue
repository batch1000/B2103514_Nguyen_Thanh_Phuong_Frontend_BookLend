<template>
  <div class="borrow-book">
    <div class="borrow-book__util">
      <div class="borrow-book__util-search">
        <div class="search-box">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            class="search-input"
            v-model="searchKeyword"
          />
          <button class="search-button">
            <i class="fas fa-search"></i>
          </button>
        </div>

        <input type="date" class="search-date ml-2" v-model="selectedDate" />
      </div>

      <div class="borrow-book__util-all-status">
        <select class="status-select" v-model="selectedStatus">
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

    <table
      class="borrow-book__list-require-borrow mt-4 table w-100"
      v-if="currentTab === 'require'"
    >
      <thead>
        <tr>
          <th class="borrow-book__list-require-borrow-title">Mã Độc Giả</th>
          <th class="borrow-book__list-require-borrow-title">Độc Giả</th>
          <th class="borrow-book__list-require-borrow-title">Sách</th>
          <th class="borrow-book__list-require-borrow-title">Ngày Yêu Cầu</th>
          <th class="borrow-book__list-require-borrow-title">Trạng thái</th>
          <th class="borrow-book__list-require-borrow-title">Xử Lý</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredTrackBorrowList" :key="item._id">
          <td class="borrow-book__list-require-borrow-content">
            {{ item.MaDocGia?.MaDocGia }}
          </td>
          <td class="borrow-book__list-require-borrow-content">
            {{ item.MaDocGia?.HoLot }} {{ item.MaDocGia?.Ten }}
          </td>
          <td class="borrow-book__list-require-borrow-content">
            {{ item.MaSach?.TenSach }}
          </td>
          <td class="borrow-book__list-require-borrow-content">
            {{ new Date(item.createdAt).toLocaleDateString("vi-VN") }}
          </td>
          <td class="borrow-book__list-require-borrow-content">
            <div
              :class="{
                'borrow-book__list-require-borrow-status-waiting':
                  item.TrangThai === 'pending',
                'borrow-book__list-require-borrow-status-approved':
                  item.TrangThai === 'approved',
                'borrow-book__list-require-borrow-status-denied':
                  item.TrangThai === 'denied',
              }"
            >
              {{
                item.TrangThai === "pending"
                  ? "Chờ Duyệt"
                  : item.TrangThai === "approved"
                  ? "Đã Duyệt"
                  : "Đã Từ Chối"
              }}
            </div>
          </td>
          <td class="borrow-book__list-require-borrow-content">
            <template v-if="item.TrangThai === 'pending'">
              <button
                type="button"
                class="borrow-book__list-require-borrow-btn-accept"
                @click="approveRequest(item._id)"
              >
                Duyệt
              </button>
              <button
                type="button"
                class="borrow-book__list-require-borrow-deny"
                @click="denyRequest(item._id)"
              >
                Từ chối
              </button>
            </template>
            <template v-else>
              <div class="borrow-book__list-require-borrow-btn-done">
                Đã xử lý
              </div>
            </template>
          </td>
        </tr>
      </tbody>
    </table>

    <table
      class="borrow-book__list-borrowed mt-4 table w-100"
      v-if="currentTab === 'borrowed'"
    >
      <thead>
        <tr>
          <th class="borrow-book__list-borrowed-title">Mã Độc Giả</th>
          <th class="borrow-book__list-borrowed-title">Độc Giả</th>
          <th class="borrow-book__list-borrowed-title">Sách</th>
          <th class="borrow-book__list-borrowed-title">Ngày Mượn</th>
          <th class="borrow-book__list-borrowed-title">Hạn Trả</th>
          <th class="borrow-book__list-borrowed-title">Tình Trạng</th>
          <th class="borrow-book__list-borrowed-title">Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredTrackBorrowList" :key="item._id">
          <td class="borrow-book__list-borrowed-content">
            {{ item.MaDocGia?.MaDocGia }}
          </td>
          <td class="borrow-book__list-borrowed-content">
            {{ item.MaDocGia?.HoLot }} {{ item.MaDocGia?.Ten }}
          </td>
          <td class="borrow-book__list-borrowed-content">
            {{ item.MaSach?.TenSach }}
          </td>
          <td class="borrow-book__list-borrowed-content">
            {{ new Date(item.NgayMuon).toLocaleDateString("vi-VN") }}
          </td>
          <td class="borrow-book__list-borrowed-content">
            {{ new Date(item.NgayTra).toLocaleDateString("vi-VN") }}
          </td>
          <td class="borrow-book__list-borrowed-content">
            <div
              :class="{
                'borrow-book__list-borrowed-status-borrowing':
                  item.TrangThai === 'approved',
                'borrow-book__list-borrowed-status-overdue':
                  item.TrangThai === 'overdue',
                'borrow-book__list-borrowed-status-returned':
                  item.TrangThai === 'returned',
              }"
            >
              {{
                item.TrangThai === "approved"
                  ? "Đang Mượn"
                  : item.TrangThai === "overdue"
                  ? "Quá Hạn"
                  : "Đã Trả"
              }}
            </div>
          </td>
          <td class="borrow-book__list-borrowed-content">
            <template
              v-if="
                item.TrangThai === 'approved' || item.TrangThai === 'overdue'
              "
            >
              <button
                type="button"
                class="borrow-book__list-borrowed-btn-return"
                @click="markAsReturned(item._id)"
              >
                Đã trả
              </button>
              <button
                type="button"
                class="borrow-book__list-borrowed-btn-extend"
                @click="handleExtendBorrow(item)"
              >
                Gia hạn
              </button>
            </template>
            <template v-else>
              <div class="borrow-book__list-borrowed-btn-completed">
                Hoàn thành
              </div>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { bookService } from "../services/book/book.service";
import { userState } from "../assets/js/userState";

export default {
  name: "ManagementBorrowBook",
  data() {
    return {
      currentTab: "require",
      statusOptions: [],
      trackBorrowList: [],
      selectedStatus: "all",
      searchKeyword: "",
      selectedDate: "",
    };
  },

  watch: {
    currentTab(newVal) {
      if (newVal === "require") {
        this.statusOptions = [
          { value: "all", text: "Tất cả trạng thái" },
          { value: "pending", text: "Chờ duyệt" },
          { value: "approved", text: "Đã duyệt" },
          { value: "denied", text: "Từ chối" },
        ];
      } else if (newVal === "borrowed") {
        this.statusOptions = [
          { value: "all", text: "Tất cả trạng thái" },
          { value: "approved", text: "Đang Mượn" },
          { value: "overdue", text: "Quá Hạn" },
          { value: "returned", text: "Đã Trả" },
        ];
      }
    },
  },

  mounted() {
    this.statusOptions = [
      { value: "all", text: "Tất cả trạng thái" },
      { value: "pending", text: "Chờ duyệt" },
      { value: "approved", text: "Đã duyệt" },
      { value: "denied", text: "Từ chối" },
    ];

    this.fetchTrackBorrowList();
  },

  methods: {
    async fetchTrackBorrowList() {
      try {
        const response = await bookService.getTrackBorrowBook();
        const result = [];

        for (const item of response || []) {
          const updatedItem = await this.updateOverdueIfNeeded(item);
          result.push(updatedItem);
        }

        this.trackBorrowList = result;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách mượn:", error);
      }
    },

    async approveRequest(id) {
      try {
        await bookService.updateBorrowStatus({
          requestId: id,
          adminId: userState._id,
          status: "approved",
        });
        this.fetchTrackBorrowList();
      } catch (err) {
        console.error("Lỗi duyệt yêu cầu:", err);
      }
    },

    async denyRequest(id) {
      try {
        await bookService.updateBorrowStatus({
          requestId: id,
          adminId: userState._id,
          status: "denied",
        });
        this.fetchTrackBorrowList();
      } catch (err) {
        console.error("Lỗi từ chối yêu cầu:", err);
      }
    },

    async markAsReturned(id) {
      try {
        await bookService.updateBorrowStatus({
          requestId: id,
          adminId: userState._id,
          status: "returned",
        });
        this.fetchTrackBorrowList(); // Refresh lại danh sách
      } catch (err) {
        console.error("Lỗi đánh dấu đã trả:", err);
      }
    },

    async updateOverdueIfNeeded(item) {
      const now = new Date();
      const ngayTra = new Date(item.NgayTra);

      if (item.TrangThai === "approved" && ngayTra < now) {
        try {
          await bookService.updateBorrowStatus({
            requestId: item._id,
            adminId: userState._id,
            status: "overdue",
          });
          item.TrangThai = "overdue"; // Cập nhật local để hiển thị đúng
        } catch (err) {
          console.error(`Lỗi cập nhật quá hạn cho ${item._id}:`, err);
        }
      }

      return item;
    },

    async handleExtendBorrow(item) {
      const GIA_HAN_THEM_NGAY = 3;

      // Kiểm tra nếu đã gia hạn rồi
      const ngayMuon = new Date(item.NgayMuon);
      const ngayTra = new Date(item.NgayTra);
      const soNgay = Math.floor((ngayTra - ngayMuon) / (1000 * 60 * 60 * 24));

      if (soNgay > 7) {
        alert("Bạn chỉ được gia hạn 1 lần!");
        return;
      }

      const confirmExtend = confirm(
        `Bạn có chắc muốn gia hạn thêm ${GIA_HAN_THEM_NGAY} ngày không?`
      );
      if (!confirmExtend) return;

      try {
        const newDueDate = new Date(item.NgayTra);
        newDueDate.setDate(newDueDate.getDate() + GIA_HAN_THEM_NGAY);

        // Gửi API gọi backend (chưa làm ở bước này, bạn sẽ xử lý sau)
        await bookService.extendBorrowTime({
          requestId: item._id,
          adminId: userState._id,
          newDueDate: newDueDate.toISOString(),
        });

        alert(`Đã gia hạn đến ngày ${newDueDate.toLocaleDateString("vi-VN")}`);
        this.fetchTrackBorrowList(); // Load lại danh sách mượn
      } catch (error) {
        console.error("Gia hạn thất bại:", error);
        alert("Gia hạn thất bại. Vui lòng thử lại sau.");
      }
    },

    formatDateToYMD(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

  },

  computed: {
    filteredTrackBorrowList() {
      return this.trackBorrowList.filter((item) => {
        const keyword = this.searchKeyword.toLowerCase().trim();
        const status = this.selectedStatus;
        const selectedDate = this.selectedDate;

        // ✅ Lọc theo tab hiện tại
        const validStatusList =
          this.currentTab === "require"
            ? ["pending", "approved", "denied"]
            : ["approved", "overdue", "returned"];
        if (!validStatusList.includes(item.TrangThai)) return false;

        // ✅ Lọc theo trạng thái nếu không phải "all"
        if (status !== "all" && item.TrangThai !== status) return false;

        // ✅ Lọc theo keyword nếu có nhập
        if (keyword) {
          const hoTen = `${item.MaDocGia?.HoLot || ""} ${
            item.MaDocGia?.Ten || ""
          }`.toLowerCase();
          const maDocGia = item.MaDocGia?.MaDocGia?.toLowerCase() || "";
          const tenSach = item.MaSach?.TenSach?.toLowerCase() || "";

          const matched =
            hoTen.includes(keyword) ||
            maDocGia.includes(keyword) ||
            tenSach.includes(keyword);

          if (!matched) return false;
        }

        // ✅ Lọc theo ngày nếu có chọn
        if (selectedDate) {
          const targetDate =
            this.currentTab === "require"
              ? new Date(item.createdAt)
              : new Date(item.NgayMuon);

          const formattedTarget = this.formatDateToYMD(targetDate); // yyyy-mm-dd
          if (formattedTarget !== selectedDate) return false;
        }

        return true; // Nếu qua hết các điều kiện thì giữ lại
      });
    },
  },
};
</script>

<style scoped>
.search-date {
  padding: 10px 15px;
  font-size: 1.4rem;
  margin-top: 10px;
  border-radius: 20px;
  border: 1px solid #dedede;
}

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
  display: table-cell;
  vertical-align: middle;
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
  margin-left: 8px;
}

.borrow-book__list-require-borrow-deny:hover {
  background-color: #962d22;
}

.borrow-book__list-require-borrow-btn-done {
  padding: 5px 10px;
  font-size: 1.2rem;
  width: 96px;
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

.borrow-book__list-borrowed-title,
.borrow-book__list-borrowed-content {
  padding: 5px;
  font-size: 1.7rem;
  border-bottom: 1px solid #dfe2e6;
  font-weight: bold; /* Title vẫn bold */
  display: table-cell; /* ✅ DÙNG CHUẨN TRONG TABLE */
  vertical-align: middle;
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
  margin-left: 8px;
}

.borrow-book__list-borrowed-btn-extend:hover {
  background-color: #d35400;
}

.borrow-book__list-borrowed-btn-completed {
  padding: 5px 10px;
  font-size: 1.2rem;
  width: 96px;
  background-color: #fff;
  color: #a1a6ab;
  border: 1px solid #a1a6ab;
  border-radius: 7px;
  text-align: center;
}
</style>