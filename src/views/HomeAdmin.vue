<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-2 wrapper-column-1">
        <div class="book__admin-navigation">
          <div class="book__admin-information">
            <div class="admin-info">
              <i class="fa-solid fa-circle-user"></i>
              <span class="admin-name">Admin</span>

              <div class="admin-dropdown">
                <div class="logout-button">Đăng xuất</div>
              </div>
            </div>
          </div>

          <!-- Các mục menu -->
          <router-link
            to="/homeAdmin/managementBorrowBook"
            class="book__admin-navigation-option"
            :class="{
              'book__admin-navigation-option--choosing':
                $route.path.includes('managementBorrowBook'),
            }"
          >
            <div class="book__admin-navigation-icon">
              <i class="fa-solid fa-book-open-reader"></i>
            </div>
            <div class="book__admin-navigation-title">Borrow Book</div>
          </router-link>

          <router-link
            to="/homeAdmin/addBook"
            class="book__admin-navigation-option"
            :class="{
              'book__admin-navigation-option--choosing':
                $route.path.includes('addBook'),
            }"
          >
            <div class="book__admin-navigation-icon">
              <i class="fa-solid fa-book-medical"></i>
            </div>
            <div class="book__admin-navigation-title">Add Book</div>
          </router-link>

          <router-link
            to="/homeAdmin/updateBook"
            class="book__admin-navigation-option"
            :class="{
              'book__admin-navigation-option--choosing':
                $route.path.includes('updateBook'),
            }"
          >
            <div class="book__admin-navigation-icon">
              <i class="fa-solid fa-pen-to-square"></i>
            </div>
            <div class="book__admin-navigation-title">Update Book</div>
          </router-link>

          <router-link
            to="/homeAdmin/deleteBook"
            class="book__admin-navigation-option"
            :class="{
              'book__admin-navigation-option--choosing':
                $route.path.includes('deleteBook'),
            }"
          >
            <div class="book__admin-navigation-icon">
              <i class="fa-solid fa-trash"></i>
            </div>
            <div class="book__admin-navigation-title">Delete Book</div>
          </router-link>
        </div>
      </div>

      <div class="col-lg-10 wrapper-column-2 mt-5">
        <router-view />
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: "HomeAdmin",
  components: {
  }
};
</script>

<style scoped>
.book-admin-nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 0 auto 40px auto;
  flex-wrap: wrap;
}

.nav-button {
  padding: 8px 22px;
  font-size: 16px;
  font-weight: 500;
  border: 2px solid transparent;
  border-radius: 30px;
  background-color: #f7f7f7;
  color: #333;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.nav-button:hover {
  background-color: #3f51b5;
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 5px 10px rgba(63, 81, 181, 0.4);
}

.nav-button.active {
  background-color: #3f51b5;
  color: white;
  border-color: #3f51b5;
  font-weight: 600;
  box-shadow: 0 6px 12px rgba(63, 81, 181, 0.4);
  transform: translateY(-2px);
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

.container-fluid {
    overflow: hidden;
}
</style>