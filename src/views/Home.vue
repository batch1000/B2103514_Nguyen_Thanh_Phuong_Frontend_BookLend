<template>
  <Header />

  <div class="home">
    <div class="home__banner">
      <!-- Slide Bootstrap 5 -->
      <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
        <!-- Nút tròn chuyển slide -->
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="0"
            class="active"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="1"
          ></button>
        </div>

        <!-- Nội dung từng slide -->
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="/image/banner1.jpg" class="d-block w-100" alt="Slide 1" />
            <div class="carousel-caption">
              <div class="title-slide-2">
                Once you learn to read, you will be forever free.
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img src="/image/banner2.jpg" class="d-block w-100" alt="Slide 2" />
            <div
              class="carousel-caption text-start d-flex align-items-center h-100"
            >
              <div class="title-slide-1">
                A room without books is like a body without a soul.
              </div>
            </div>
          </div>
        </div>

        <!-- Mũi tên trái/phải -->
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>

    <div class="home__popular-book">
      <div class="home__book-header">
        <div class="home__book-header-title">Sách Phổ Biến</div>
        <div class="home__book-line">
          <div class="line"></div>
        </div>
        <button type="button" class="view-all-btn">View All ></button>
      </div>
      <div class="home__popular-book-content">
        <div class="row g-3 home__feature-book-list">
          <div class="col-lg-2 home__feature-book-element">
            <div class="home__feature-book-element-image">
              <img src="/image/popularbook.jpg" alt="" />

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

            <div class="home__feature-book-element-information">
              <div class="home__feature-book-element-title">
                The Secret Deep
              </div>
              <div class="home__feature-book-element-author">
                LindSay Galvin
              </div>
              <div class="rating">
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
              </div>
            </div>
          </div>

          <div class="col-lg-2 home__feature-book-element">
            <div class="home__feature-book-element-image">
              <img src="/image/Giet_Con_Chim_Nhai.jpg" alt="" />

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

            <div class="home__feature-book-element-information">
              <div class="home__feature-book-element-title">
                Giết con chim nhại
              </div>
              <div class="home__feature-book-element-author">Harper Lee</div>
              <div class="rating">
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
              </div>
            </div>
          </div>

          <div class="col-lg-2 home__feature-book-element">
            <div class="home__feature-book-element-image">
              <img src="/image/Canh_Dong_Bat_Tan.jpg" alt="" />

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

            <div class="home__feature-book-element-information">
              <div class="home__feature-book-element-title">
                Cánh đồng bất tận
              </div>
              <div class="home__feature-book-element-author">
                Nguyễn Ngọc Tư
              </div>
              <div class="rating">
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
              </div>
            </div>
          </div>

          <div class="col-lg-2 home__feature-book-element">
            <div class="home__feature-book-element-image">
              <img src="/image/Tho_Han_Mac_Tu.jpg" alt="" />

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

            <div class="home__feature-book-element-information">
              <div class="home__feature-book-element-title">Thơ Hàn Mặc Tử</div>
              <div class="home__feature-book-element-author">Hàn Mặc Tử</div>
              <div class="rating">
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
              </div>
            </div>
          </div>

          <div class="col-lg-2 home__feature-book-element">
            <div class="home__feature-book-element-image">
              <img src="/image/Toi_Thay_Hoa_Vang_Tren_Co_Xanh.jpg" alt="" />

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

            <div class="home__feature-book-element-information">
              <div class="home__feature-book-element-title">
                Tôi thấy hoa vàng trên ...
              </div>
              <div class="home__feature-book-element-author">
                Nguyễn Nhật Ánh
              </div>
              <div class="rating">
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
              </div>
            </div>
          </div>

          <div class="col-lg-2 home__feature-book-element">
            <div class="home__feature-book-element-image">
              <img src="/image/Mat_biec.jpg" alt="" />

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

            <div class="home__feature-book-element-information">
              <div class="home__feature-book-element-title">
                Mắt biếc
              </div>
              <div class="home__feature-book-element-author">
                Nguyễn Nhật Ánh
              </div>
              <div class="rating">
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="home__feature-group-book">
      <div class="row align-items-start">
        <div class="col-lg-9 home__recommend-group-book">
          <div class="home__book-of-the-day">
            <div class="home__book-of-the-day-header">
              <div class="home__book-of-the-day-title">Sách Hôm Nay</div>
              <div class="home__book-of-the-day-line">
                <div class="line"></div>
              </div>
              <div class="home__book-of-the-day-three-dot">
                <i class="fa-solid fa-circle dot--active"></i>
                <i class="fa-solid fa-circle"></i>
                <i class="fa-solid fa-circle"></i>
              </div>
            </div>

            <div class="home__book-of-the-day-list-book row">
              <div class="col-lg-6 home__book-of-the-day-element">
                <div class="home__book-of-the-day-element-image">
                  <img src="/image/Tuong_Lai_Den_Nhanh_Hon_Ban_Nghi.jpg" alt="" />
                </div>

                <div class="home__book-of-the-day-element-information">
                  <div class="home__book-of-the-day-element-title">
                    Tương lai đến nhanh hơn bạn nghĩ
                  </div>
                  <div class="home__book-of-the-day-element-author">
                    Steven Kotler
                  </div>
                  <div class="rating">
                    <span class="star filled">★</span>
                    <span class="star filled">★</span>
                    <span class="star filled">★</span>
                    <span class="star filled">★</span>
                    <span class="star">☆</span>
                  </div>
                </div>
              </div>

              <div class="col-lg-6 home__book-of-the-day-element">
                <div class="home__book-of-the-day-element-image">
                  <img src="/image/Dung_Lua_Chon_An_Nhan.jpg" alt="" />
                </div>

                <div class="home__book-of-the-day-element-information">
                  <div class="home__book-of-the-day-element-title">
                    Đừng lựa chọn an nhàn khi còn trẻ
                  </div>
                  <div class="home__book-of-the-day-element-author">
                    Zena Hitz
                  </div>
                  <div class="rating">
                    <span class="star filled">★</span>
                    <span class="star filled">★</span>
                    <span class="star filled">★</span>
                    <span class="star filled">★</span>
                    <span class="star">☆</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="home__trending-book">
            <div class="home__book-header">
              <div class="home__book-header-title">Đang Xu Hướng</div>
              <div class="home__book-line">
                <div class="line"></div>
              </div>
              <button type="button" class="view-all-btn">View All ></button>
            </div>

            <div class="home__trending-book-content">
              <div class="row g-5 home__feature-book-list">
                <div class="col-lg-4 home__feature-book-element">
                  <div
                    class="home__feature-book-element-image home__trending-book-content-image"
                  >
                    <img src="/image/Khong_Gia_Dinh.jpg" alt="" />
                  </div>

                  <div class="home__feature-book-element-information">
                    <div class="home__feature-book-element-title">
                      Không Gia Đình
                    </div>
                    <div class="home__feature-book-element-author">
                      Hector Malot
                    </div>
                    <div class="rating">
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                      <span class="star">☆</span>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 home__feature-book-element">
                  <div
                    class="home__feature-book-element-image home__trending-book-content-image"
                  >
                    <img src="/image/De_Men_Phieu_Luu_Ky.jpg" alt="" />
                  </div>

                  <div class="home__feature-book-element-information">
                    <div class="home__feature-book-element-title">
                      Dế mèn phiêu lưu ký
                    </div>
                    <div class="home__feature-book-element-author">
                      Tô Hoài
                    </div>
                    <div class="rating">
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 home__feature-book-element">
                  <div
                    class="home__feature-book-element-image home__trending-book-content-image"
                  >
                    <img src="/image/Hieu_Ve_Trai_Tim.jpg" alt="" />
                  </div>

                  <div class="home__feature-book-element-information">
                    <div class="home__feature-book-element-title">
                      Hiểu về trái tim
                    </div>
                    <div class="home__feature-book-element-author">
                      Minh Niệm
                    </div>
                    <div class="rating">
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="home__middle-banner">
            <img src="/image/banner-mid.jpg" alt="" />
          </div>

          <div class="home__new-release">
            <div class="home__book-header">
              <div class="home__book-header-title">Mới Ra Mắt</div>
              <div class="home__book-line">
                <div class="line"></div>
              </div>
              <button type="button" class="view-all-btn">View All ></button>
            </div>

            <div class="home__new-release-content">
              <div class="row g-5 home__feature-book-list">
                <div class="col-lg-4 home__feature-book-element">
                  <div
                    class="home__feature-book-element-image home__new-release-content-image"
                  >
                    <img src="/image/buocchamlaigiuathegianvoiva.jpg" alt="" />
                  </div>

                  <div class="home__feature-book-element-information">
                    <div class="home__feature-book-element-title">
                      Bước chậm lại giữa thế gian vội vã
                    </div>
                    <div class="home__feature-book-element-author">
                      Hae Min
                    </div>
                    <div class="rating">
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                      <span class="star">☆</span>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 home__feature-book-element">
                  <div
                    class="home__feature-book-element-image home__new-release-content-image"
                  >
                    <img src="/image/1984.jpg" alt="" />
                  </div>

                  <div class="home__feature-book-element-information">
                    <div class="home__feature-book-element-title">
                      1984
                    </div>
                    <div class="home__feature-book-element-author">
                      George Drwell
                    </div>
                    <div class="rating">
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                      <span class="star">☆</span>
                      <span class="star">☆</span>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 home__feature-book-element">
                  <div
                    class="home__feature-book-element-image home__new-release-content-image"
                  >
                    <img src="/image/Dune.jpg" alt="" />
                  </div>

                  <div class="home__feature-book-element-information">
                    <div class="home__feature-book-element-title">
                      Dune
                    </div>
                    <div class="home__feature-book-element-author">
                      Frank Herbert
                    </div>
                    <div class="rating">
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                      <span class="star">☆</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-3 home__top-book-wrapper">
          <div class="home__top-book">
            <div class="home__top-10-week-book">
              <div class="home__top-book-header">Top 10 This Week</div>
              <div class="home__top-book-content">
                <div class="home__top-book-list">
                  <div class="home__top-book-element">
                    <div class="home__top-book-element-image">
                      <img src="/image/Mat_biec.jpg" alt="" />

                      <div class="home__top-book-element-rank-wrapper">
                        <div class="home__top-book-element-rank rank-1">1</div>
                      </div>
                    </div>

                    <div class="home__top-book-element-information">
                      <div class="home__top-book-element-title">
                        Mắt Biếc
                      </div>
                      <div class="home__top-book-element-author">
                        Nguyễn Nhật Ánh
                      </div>
                    </div>
                  </div>

                  <div class="home__top-book-element">
                    <div class="home__top-book-element-image">
                      <img src="/image/Toi_Thay_Hoa_Vang_Tren_Co_Xanh.jpg" alt="" />

                      <div class="home__top-book-element-rank-wrapper">
                        <div class="home__top-book-element-rank rank-2">2</div>
                      </div>
                    </div>

                    <div class="home__top-book-element-information">
                      <div class="home__top-book-element-title">
                        Tôi thấy hoa...
                      </div>
                      <div class="home__top-book-element-author">
                        Nguyễn Nhật Ánh
                      </div>
                    </div>
                  </div>

                  <div class="home__top-book-element">
                    <div class="home__top-book-element-image">
                      <img src="/image/Canh_Dong_Bat_Tan.jpg" alt="" />

                      <div class="home__top-book-element-rank-wrapper">
                        <div class="home__top-book-element-rank rank-3">3</div>
                      </div>
                    </div>

                    <div class="home__top-book-element-information">
                      <div class="home__top-book-element-title">
                        Cánh đồng bất...
                      </div>
                      <div class="home__top-book-element-author">
                        Nguyễn Ngọc Tư
                      </div>
                    </div>
                  </div>

                  <div class="home__top-book-element">
                    <div class="home__top-book-element-image">
                      <img src="/image/Hieu_Ve_Trai_Tim.jpg" alt="" />

                      <div class="home__top-book-element-rank-wrapper">
                        <div class="home__top-book-element-rank rank-4">4</div>
                      </div>
                    </div>

                    <div class="home__top-book-element-information">
                      <div class="home__top-book-element-title">
                        Hiểu về trái tim
                      </div>
                      <div class="home__top-book-element-author">
                        Minh Niệm
                      </div>
                    </div>
                  </div>

                  <div class="home__top-book-element">
                    <div class="home__top-book-element-image">
                      <img src="/image/An_Gi_Khong_Chet.jpg" alt="" />

                      <div class="home__top-book-element-rank-wrapper">
                        <div class="home__top-book-element-rank rank-5">5</div>
                      </div>
                    </div>

                    <div class="home__top-book-element-information">
                      <div class="home__top-book-element-title">
                        Ăn gì không chết
                      </div>
                      <div class="home__top-book-element-author">
                        Michael Greger
                      </div>
                    </div>
                  </div>

                  <div class="home__top-book-element">
                    <div class="home__top-book-element-image">
                      <img src="/image/Dac_Nhan_Tam.jpg" alt="" />

                      <div class="home__top-book-element-rank-wrapper">
                        <div class="home__top-book-element-rank rank-6">6</div>
                      </div>
                    </div>

                    <div class="home__top-book-element-information">
                      <div class="home__top-book-element-title">
                        Đắc Nhân Tâm
                      </div>
                      <div class="home__top-book-element-author">
                        Dale Carnegie
                      </div>
                    </div>
                  </div>

                  <div class="home__top-book-element">
                    <div class="home__top-book-element-image">
                      <img src="/image/Co_Gai_Den_Tu_Hom_Qua.jpg" alt="" />

                      <div class="home__top-book-element-rank-wrapper">
                        <div class="home__top-book-element-rank rank-7">7</div>
                      </div>
                    </div>

                    <div class="home__top-book-element-information">
                      <div class="home__top-book-element-title">
                        Cô gái đến từ...
                      </div>
                      <div class="home__top-book-element-author">
                        Nguyễn Ngọc Ánh
                      </div>
                    </div>
                  </div>

                  <div class="home__top-book-element">
                    <div class="home__top-book-element-image">
                      <img src="/image/Di_Qua_Hoa_Cuc.jpg" alt="" />

                      <div class="home__top-book-element-rank-wrapper">
                        <div class="home__top-book-element-rank rank-8">8</div>
                      </div>
                    </div>

                    <div class="home__top-book-element-information">
                      <div class="home__top-book-element-title">
                        Đi Qua Hoa...
                      </div>
                      <div class="home__top-book-element-author">
                        Nguyễn Ngọc Tư
                      </div>
                    </div>
                  </div>

                  <div class="home__top-book-element">
                    <div class="home__top-book-element-image">
                      <img src="/image/Dune.jpg" alt="" />

                      <div class="home__top-book-element-rank-wrapper">
                        <div class="home__top-book-element-rank rank-9">9</div>
                      </div>
                    </div>

                    <div class="home__top-book-element-information">
                      <div class="home__top-book-element-title">
                        Dune
                      </div>
                      <div class="home__top-book-element-author">
                        Frank Herbert
                      </div>
                    </div>
                  </div>

                  <div class="home__top-book-element">
                    <div class="home__top-book-element-image">
                      <img src="/image/Nha_Gia_Kim.jpg" alt="" />

                      <div class="home__top-book-element-rank-wrapper">
                        <div class="home__top-book-element-rank rank-10">
                          10
                        </div>
                      </div>
                    </div>

                    <div class="home__top-book-element-information">
                      <div class="home__top-book-element-title">
                        Nhà Giả Kim
                      </div>
                      <div class="home__top-book-element-author">
                        Paulo Coelho
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="home__top-most-view-book">
              <div class="home__top-book-header">Most Viewed</div>
              <div class="home__top-book-content">
                <div class="home__top-book-list">
                  <div class="home__top-book-element">
                    <div class="home__top-book-element-image">
                      <img src="/image/Mat_biec.jpg" alt="" />

                      <div class="home__top-book-element-rank-wrapper">
                        <div class="home__top-book-element-rank rank-1">1</div>
                      </div>
                    </div>

                    <div class="home__top-book-element-information">
                      <div class="home__top-book-element-title">
                        Mắt biếc
                      </div>
                      <div class="home__top-book-element-author">
                        Nguyễn Nhật Ánh
                      </div>
                    </div>
                  </div>

                  <div class="home__top-book-element">
                    <div class="home__top-book-element-image">
                      <img src="/image/Ngoi_Khoc_Tren_Cay.jpg" alt="" />

                      <div class="home__top-book-element-rank-wrapper">
                        <div class="home__top-book-element-rank rank-2">2</div>
                      </div>
                    </div>

                    <div class="home__top-book-element-information">
                      <div class="home__top-book-element-title">
                        Ngồi khóc trên cây
                      </div>
                      <div class="home__top-book-element-author">
                        Nguyễn Nhật Ánh
                      </div>
                    </div>
                  </div>

                  <div class="home__top-book-element">
                    <div class="home__top-book-element-image">
                      <img src="/image/Chuyen_Con_Meo_Day_Hai_Au_Bay.jpg" alt="" />

                      <div class="home__top-book-element-rank-wrapper">
                        <div class="home__top-book-element-rank rank-3">3</div>
                      </div>
                    </div>

                    <div class="home__top-book-element-information">
                      <div class="home__top-book-element-title">
                        Chuyện con mèo...
                      </div>
                      <div class="home__top-book-element-author">
                        Luis Sepulveda
                      </div>
                    </div>
                  </div>
                </div>
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
import { userState } from "../assets/js/userState";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
#myCarousel,
.carousel-inner,
.carousel-item,
.carousel-item img {
  width: 100%;
  height: 100%;
}

.home__banner {
  height: 540px;
  width: 100%;
}

.home__banner .title-slide-1 {
  font-size: 5rem;
  width: 350px;
  font-family: "Cormorant Garamond", serif;
}

.home__banner .title-slide-2 {
  font-size: 5rem;
  color: #fff;
  font-family: "Cormorant Garamond", serif;
}

.home__popular-book {
  padding: 0 30px;
  margin-top: 80px;
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
  background: url("./image/backgroundauthor.png") no-repeat center;
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
</style>