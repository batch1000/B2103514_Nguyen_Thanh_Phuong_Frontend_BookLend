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
          <router-link to="/myBook" class="book__header-link">My books</router-link>
        </div>

        <div class="book__header-unity-bar">
          <div class="book__header-my-account">
            <i class="fa-regular fa-circle-user"></i>
            <span class="book__header-name-user">{{
              userState.hoTen || "User"
            }}</span>

            <div class="book__header-dropdown">
              <div class="book__header-logout" @click="handleLogout">
                Đăng xuất
              </div>
            </div>
          </div>

          <div class="util-btn util-btn--notif-wrapper" ref="notifArea">
            <button
              class="util-btn util-btn--notif"
              @click="toggleNotifications"
            >
              <i class="fa-regular fa-bell"></i>
              <span v-if="unreadCount > 0" class="badge">{{
                unreadCount
              }}</span>
            </button>

            <div v-show="showNotifications" class="notif-dropdown">
              <div class="notif-dropdown__header">Thông báo</div>
              <ul class="notif-list">
                <li
                  v-for="notif in notifications"
                  :key="notif.id"
                  class="notif-item"
                  :class="[
                    'notif-item',
                    'notif--' + notif.type,
                    { 'notif--unread': !isReadNotification(notif.id) },
                  ]"
                >
                  <!-- icon và nội dung notification -->
                  <div class="notif-item__icon">
                    <i
                      v-if="notif.type === 'success'"
                      class="fa-solid fa-circle-check"
                    ></i>
                    <i
                      v-else-if="notif.type === 'error'"
                      class="fa-solid fa-circle-exclamation"
                    ></i>
                    <i
                      v-else-if="notif.type === 'warning'"
                      class="fa-solid fa-triangle-exclamation"
                    ></i>
                    <i v-else class="fa-solid fa-info-circle"></i>
                  </div>
                  <div class="notif-item__content">
                    <div class="notif-item__title">{{ notif.title }}</div>
                    <div class="notif-item__msg">{{ notif.message }}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { bookService } from "../services/book/book.service";
import { userState } from "../assets/js/userState";

export default {
  name: "Header",
  data() {
    return {
      userState,
      genres: [],
      showNotifications: false,
      unreadCount: 3,
      notifications: [
        {
          id: 1,
          title: "Yêu cầu mượn sách đã được duyệt",
          message: 'Admin đã duyệt cho bạn mượn sách "JavaScript cơ bản"',
          type: "success", // ✅ Đã duyệt
        },
        {
          id: 2,
          title: "Sách quá hạn",
          message: 'Sách "Vue.js từ A-Z" đã quá hạn 3 ngày',
          type: "error", // ❌ Quá hạn
        },
        {
          id: 3,
          title: "Nhắc nhở trả sách",
          message: 'Sách "React Native" sẽ hết hạn vào ngày mai',
          type: "warning", // ⚠️ Nhắc nhở
        },
      ],

      readNotificationIds: [],
    };
  },
  async mounted() {
    document.addEventListener("click", this.handleClickOutside);
    await this.fetchGenres();
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    handleLogout() {
      // Xóa localStorage
      localStorage.removeItem("_id");
      localStorage.removeItem("role");
      localStorage.removeItem("hoTen");

      this.userState._id = null;
      this.userState.role = null;
      this.userState.hoTen = null;

      // Chuyển hướng về trang đăng nhập
      this.$router.push("/login");
    },
    handleClickOutside(event) {
      const notifArea = this.$refs.notifArea;
      if (notifArea && !notifArea.contains(event.target)) {
        this.showNotifications = false;

        this.notifications.forEach((notif) => {
          if (!this.readNotificationIds.includes(notif.id)) {
            this.readNotificationIds.push(notif.id);
          }
        });
        this.unreadCount = 0;
      }

      const bellArea = this.$refs.bellArea;

      if (bellArea && !bellArea.contains(event.target)) {
        this.showNotifications = false;
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

    goToLibraryWithGenre(genreId) {
      this.$router.push({
        name: "Library",
        query: { genre: genreId },
      });
    },

    isReadNotification(notifId) {
      return this.readNotificationIds.includes(notifId);
    },

    toggleNotifications() {
      this.showNotifications = !this.showNotifications;

      // Nếu vừa đóng dropdown thì đánh dấu là đã đọc
      if (!this.showNotifications) {
        this.notifications.forEach((notif) => {
          if (!this.readNotificationIds.includes(notif.id)) {
            this.readNotificationIds.push(notif.id);
          }
        });
      }
    },
  },
};
</script>