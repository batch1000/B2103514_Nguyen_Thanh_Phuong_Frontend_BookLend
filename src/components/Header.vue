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
              <a href="#">Fiction</a>
              <a href="#">Non-fiction</a>
              <a href="#">Science</a>
              <a href="#">History</a>
              <a href="#">Fantasy</a>
              <a href="#">Romance</a>
              <a href="#">Romance</a>
              <a href="#">Romance</a>
              <a href="#">Romance</a>
              <a href="#">Romance</a>
            </div>
          </div>
          <router-link to="/library" class="book__header-link">Library</router-link>
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
export default {
  name: "Header",
};
</script>