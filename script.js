const ROOMS = {
  deluxe: {
    title: "Phòng Deluxe home",
    rate: 500000,
    capacity: "2 khách",
    bed: "1 giường đôi lớn",
    parking: "Chỗ đỗ ô-tô miễn phí",
    amenities: "Điều hòa, TV, Wifi, ánh sáng ấm",
    desc: "Không gian riêng tư, nội thất mới hoàn thiện năm 2026 với tông màu dịu mắt và ánh đèn ấm áp theo tinh thần “Biển lặng yên”.",
    img: "https://cdn-kvweb.citigo.net/merchant/656fdee96cfdb6a1ca200a4ba5ea5195/cropped/1771517169/phong-deluxe.webp",
  },
  double: {
    title: "Phòng Đôi tiện nghi",
    rate: 450000,
    capacity: "2 khách",
    bed: "1 giường đôi",
    parking: "Chỗ đỗ ô-tô miễn phí",
    amenities: "Điều hòa, TV, Wifi mạnh",
    desc: "Phòng gọn gàng, đầy đủ tiện nghi nghỉ ngơi cho cặp đôi hoặc khách công tác lưu trú tại khu vực trung tâm An Cựu, TP. Huế.",
    img: "https://cdn-kvweb.citigo.net/merchant/656fdee96cfdb6a1ca200a4ba5ea5195/cropped/1771517070/phong-doi-tien-nghi.webp",
  },
  family: {
    title: "Phòng Gia đình",
    rate: 300000,
    capacity: "Tối đa 4 khách",
    bed: "2 giường đôi",
    parking: "Chỗ đỗ ô-tô miễn phí",
    amenities: "Điều hòa, TV, Wifi, yên tĩnh",
    desc: "Không gian rộng rãi cho gia đình hoặc nhóm nhỏ (tối đa 4 khách, 2 giường đôi), giá ưu đãi từ 300.000đ/đêm.",
    img: "https://cdn-kvweb.citigo.net/merchant/656fdee96cfdb6a1ca200a4ba5ea5195/cropped/1771517089/phong-gia-dinh.webp",
  },
  dorm: {
    title: "Phòng Dorm tập thể",
    rate: 280000,
    capacity: "Khách lẻ / Nhóm bạn",
    bed: "Giường tầng hiện đại",
    parking: "Chỗ đỗ ô-tô & xe máy",
    amenities: "Không gian chung ấm cúng, Wifi",
    desc: "Thiết kế sạch sẽ, hiện đại, tối ưu chi phí cho khách đi một mình hoặc nhóm bạn trẻ thích không khí ấm cúng, dễ kết bạn.",
    img: "https://cdn-kvweb.citigo.net/merchant/656fdee96cfdb6a1ca200a4ba5ea5195/cropped/1771517123/phong-dorm-tap-the.webp",
  },
};

const formatVND = (amount) => `${amount.toLocaleString("vi-VN")}đ`;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 1. Header Scroll State (Transparent on Hero -> Clean White on Scroll)
const siteHeader = document.querySelector(".site-header[data-hero-header]");
if (siteHeader) {
  const updateHeader = () => {
    siteHeader.classList.toggle("is-transparent", window.scrollY <= 80);
  };
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
}

// 2. Mobile drawer
const menuToggle = document.querySelector(".menu-toggle");
const mobileDrawer = document.getElementById("mobile-drawer");

menuToggle?.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  menuToggle.setAttribute("aria-label", expanded ? "Mở menu điều hướng" : "Đóng menu điều hướng");
  if (mobileDrawer) mobileDrawer.hidden = expanded;
});

mobileDrawer?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Mở menu điều hướng");
    mobileDrawer.hidden = true;
  });
});

// 3. Language switcher (VI / EN)
const I18N = {
  en: {
    navSpaces: "Spaces",
    navStory: "Our Story",
    navRooms: "Rooms",
    navGuide: "Hue Guide",
    bookNow: "Book now",
    heroLead: "Where tranquility meets modern living in Hue",
    heroViewRooms: "View rooms →",
    whyHeading: "Why choose KenHi Homestay?",
    roomsTitle: "4 Room Categories",
    estimatorTitle: "Number of nights",
    bookKiot: "Book via KiotViet",
    bookZalo: "Hold room via Zalo",
    guideTitle: "Hue Travel Guide",
    reviewsTitle: "Guest Impressions",
    contactTitle: "Location & Contact",
  },
  vi: {
    navSpaces: "Không gian",
    navStory: "Chuyện của KenHi",
    navRooms: "Hạng phòng",
    navGuide: "Cẩm nang Huế",
    bookNow: "Đặt phòng ngay",
    heroLead: "Nơi khoảng lặng dịu dàng gặp gỡ nhịp sống cố đô Huế",
    heroViewRooms: "Xem hạng phòng →",
    whyHeading: "Vì sao chọn KenHi Homestay?",
    roomsTitle: "4 hạng phòng lưu trú",
    estimatorTitle: "Số đêm lưu trú",
    bookKiot: "Đặt phòng qua KiotViet",
    bookZalo: "Giữ phòng nhanh qua Zalo",
    guideTitle: "Cẩm nang du lịch Huế",
    reviewsTitle: "Cảm nhận khách lưu trú",
    contactTitle: "Vị trí & Liên hệ",
  },
};

function applyLanguage(lang) {
  const dict = I18N[lang] || I18N.vi;
  document.documentElement.lang = lang;
  localStorage.setItem("kenhi_lang", lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
  });
}

document.querySelectorAll(".lang-switch button").forEach((btn) => {
  btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
});

const savedLang = localStorage.getItem("kenhi_lang");
if (savedLang && savedLang !== "vi") {
  applyLanguage(savedLang);
}

// 4. Home Room Workbench + Estimator
const roomButtons = document.querySelectorAll(".room-row");
const stageImg = document.getElementById("stage-img");
const stageTitle = document.getElementById("stage-title");
const stageRate = document.getElementById("stage-rate");
const stageDesc = document.getElementById("stage-desc");
const specCapacity = document.getElementById("spec-capacity");
const specBed = document.getElementById("spec-bed");
const specParking = document.getElementById("spec-parking");
const specAmenities = document.getElementById("spec-amenities");
const nightsDec = document.getElementById("nights-dec");
const nightsInc = document.getElementById("nights-inc");
const nightsValue = document.getElementById("nights-value");
const totalPrice = document.getElementById("total-price");
const stageZalo = document.getElementById("stage-zalo");
const stageZaloFeedback = document.getElementById("stage-zalo-feedback");

if (roomButtons.length && stageImg) {
  let activeRoomKey = "deluxe";
  let nights = 2;
  let feedbackTimer = null;

  const renderRoomStage = () => {
    const room = ROOMS[activeRoomKey];
    if (!room) return;
    const total = formatVND(room.rate * nights);
    stageImg.src = room.img;
    stageImg.alt = `${room.title} tại KenHi Homestay`;
    stageTitle.textContent = room.title;
    stageRate.textContent = `${formatVND(room.rate)} / đêm`;
    stageDesc.textContent = room.desc;
    if (specCapacity) specCapacity.textContent = room.capacity;
    if (specBed) specBed.textContent = room.bed;
    if (specParking) specParking.textContent = room.parking;
    if (specAmenities) specAmenities.textContent = room.amenities;
    nightsValue.textContent = `${nights} đêm`;
    totalPrice.textContent = total;
    if (nightsDec) nightsDec.disabled = nights <= 1;
    if (nightsInc) nightsInc.disabled = nights >= 30;
    if (stageZalo) {
      const zaloHint = `Giữ ${room.title} (${nights} đêm · ${total}) qua Zalo`;
      stageZalo.title = zaloHint;
      stageZalo.setAttribute("aria-label", zaloHint);
    }
  };

  stageZalo?.addEventListener("click", () => {
    const room = ROOMS[activeRoomKey];
    if (!room) return;
    const summary = `Chào KenHi Homestay, mình muốn giữ ${room.title} - ${nights} đêm (tạm tính ${formatVND(room.rate * nights)}).`;
    navigator.clipboard?.writeText(summary).catch(() => {});
    if (stageZaloFeedback) {
      stageZaloFeedback.textContent = "Đã sao chép thông tin phòng, đang mở Zalo...";
      stageZaloFeedback.hidden = false;
      clearTimeout(feedbackTimer);
      feedbackTimer = setTimeout(() => {
        stageZaloFeedback.hidden = true;
      }, 3500);
    }
  });

  roomButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeRoomKey = btn.dataset.room;
      roomButtons.forEach((other) => {
        const selected = other === btn;
        other.classList.toggle("is-active", selected);
        other.setAttribute("aria-checked", String(selected));
      });
      renderRoomStage();
    });
  });

  nightsDec?.addEventListener("click", () => {
    if (nights > 1) {
      nights -= 1;
      renderRoomStage();
    }
  });

  nightsInc?.addEventListener("click", () => {
    if (nights < 30) {
      nights += 1;
      renderRoomStage();
    }
  });

  renderRoomStage();
}

// 5. Space Page: Category Filter & Native Dialog Lightbox
const filterPills = document.querySelectorAll(".filter-pill");
const spaceTiles = Array.from(document.querySelectorAll(".space-tile"));
const lightbox = document.getElementById("space-lightbox");
const lbImg = document.getElementById("lb-img");
const lbCaption = document.getElementById("lb-caption");
const lbCounter = document.getElementById("lb-counter");
const lbPrev = document.getElementById("lb-prev");
const lbNext = document.getElementById("lb-next");
const lbClose = document.getElementById("lb-close");
const lbThumbs = document.getElementById("lb-thumbs");
const lbZoomIn = document.getElementById("lb-zoom-in");
const lbZoomOut = document.getElementById("lb-zoom-out");
const lbZoomReset = document.getElementById("lb-zoom-reset");
const lbZoomLevel = document.getElementById("lb-zoom-level");

if (spaceTiles.length && lightbox) {
  let activeFilter = "all";
  let currentIndex = 0;
  let lastTrigger = null;
  let zoomScale = 1;
  let panX = 0;
  let panY = 0;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;

  const applyZoom = () => {
    lbImg.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomScale})`;
    lbImg.classList.toggle("is-zoomed", zoomScale > 1);
    if (lbZoomLevel) lbZoomLevel.textContent = `${Math.round(zoomScale * 100)}%`;
    if (lbZoomOut) lbZoomOut.disabled = zoomScale <= 1;
    if (lbZoomIn) lbZoomIn.disabled = zoomScale >= 3;
    if (lbZoomReset) lbZoomReset.hidden = zoomScale === 1;
  };

  const resetZoom = () => {
    zoomScale = 1;
    panX = 0;
    panY = 0;
    applyZoom();
  };

  const setZoom = (nextScale) => {
    zoomScale = Math.max(1, Math.min(3, Number(nextScale.toFixed(2))));
    if (zoomScale === 1) {
      panX = 0;
      panY = 0;
    }
    applyZoom();
  };

  lbZoomIn?.addEventListener("click", () => setZoom(zoomScale + 0.5));
  lbZoomOut?.addEventListener("click", () => setZoom(zoomScale - 0.5));
  lbZoomReset?.addEventListener("click", resetZoom);

  lbImg.addEventListener("dblclick", () => {
    setZoom(zoomScale > 1 ? 1 : 2);
  });

  lbImg.parentElement?.addEventListener("wheel", (e) => {
    if (!lightbox.open) return;
    e.preventDefault();
    const step = e.deltaY < 0 ? 0.25 : -0.25;
    setZoom(zoomScale + step);
  }, { passive: false });

  lbImg.addEventListener("mousedown", (e) => {
    if (zoomScale <= 1) return;
    e.preventDefault();
    isDragging = true;
    dragStartX = e.clientX - panX;
    dragStartY = e.clientY - panY;
    lbImg.classList.add("is-dragging");
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    panX = e.clientX - dragStartX;
    panY = e.clientY - dragStartY;
    applyZoom();
  });

  window.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    lbImg.classList.remove("is-dragging");
  });

  const getVisibleTiles = () =>
    spaceTiles.filter((tile) => activeFilter === "all" || tile.dataset.category === activeFilter);

  const buildLightboxThumbs = () => {
    if (!lbThumbs) return;
    const visible = getVisibleTiles();
    lbThumbs.innerHTML = visible
      .map((tile, idx) => {
        const img = tile.querySelector("img");
        return `
          <button type="button" class="lb-thumb-btn" role="tab" data-index="${idx}" aria-selected="${idx === currentIndex}" aria-label="Xem ${img.alt}">
            <img src="${img.src}" alt="" />
          </button>
        `;
      })
      .join("");

    lbThumbs.querySelectorAll(".lb-thumb-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentIndex = Number(btn.dataset.index);
        renderLightbox();
      });
    });
  };

  const renderLightbox = () => {
    const visible = getVisibleTiles();
    if (!visible.length) return;
    resetZoom();
    currentIndex = Math.max(0, Math.min(currentIndex, visible.length - 1));
    const tile = visible[currentIndex];
    const img = tile.querySelector("img");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = img.alt;
    lbCounter.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(visible.length).padStart(2, "0")}`;
    lbPrev.disabled = currentIndex === 0;
    lbNext.disabled = currentIndex === visible.length - 1;

    lbThumbs?.querySelectorAll(".lb-thumb-btn").forEach((btn, idx) => {
      const active = idx === currentIndex;
      btn.setAttribute("aria-selected", String(active));
      if (active) {
        btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    });
  };

  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      activeFilter = pill.dataset.filter;
      filterPills.forEach((p) => p.setAttribute("aria-pressed", String(p === pill)));
      spaceTiles.forEach((tile) => {
        tile.hidden = activeFilter !== "all" && tile.dataset.category !== activeFilter;
      });
    });
  });

  let wasDragged = false;

  spaceTiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      if (wasDragged) {
        wasDragged = false;
        return;
      }
      const visible = getVisibleTiles();
      currentIndex = visible.indexOf(tile);
      if (currentIndex === -1) return;
      lastTrigger = tile;
      buildLightboxThumbs();
      renderLightbox();
      document.body.classList.remove("has-custom-cursor");
      lightbox.showModal();
    });
  });

  // Parallax Carousel for khong-gian.html (Vanilla port of @reactbits-starter/parallax-carousel-tw)
  const pViewport = document.getElementById("parallax-viewport");
  const pTrack = document.getElementById("parallax-track");
  const pPrev = document.getElementById("pc-prev");
  const pNext = document.getElementById("pc-next");
  const pCounter = document.getElementById("pc-counter");
  const pDotsWrap = document.getElementById("pc-dots");

  if (pViewport && pTrack) {
    const slides = Array.from(pTrack.children);
    let currentX = 0;
    let targetX = 0;
    let isPointerDown = false;
    let startPointerX = 0;
    let lastPointerX = 0;
    let dragVelocity = 0;
    let startTargetX = 0;
    let activeSlide = 0;

    const getMaxScroll = () => Math.max(0, pTrack.scrollWidth - pViewport.clientWidth);

    const getStops = () => {
      const maxScroll = getMaxScroll();
      if (maxScroll <= 1) return [0];
      const stepWidth = slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : pViewport.clientWidth;
      const stops = [0];
      for (let i = 1; i < slides.length; i += 1) {
        const pos = Math.min(maxScroll, slides[i].offsetLeft);
        if (pos >= maxScroll - stepWidth * 0.35) {
          if (maxScroll - stops[stops.length - 1] > 4) stops.push(maxScroll);
          break;
        }
        if (pos - stops[stops.length - 1] > 4) stops.push(pos);
      }
      if (stops[stops.length - 1] < maxScroll - 4) stops.push(maxScroll);
      return stops;
    };

    let stops = getStops();

    const syncUI = (idx) => {
      activeSlide = Math.max(0, Math.min(idx, stops.length - 1));
      if (pCounter) {
        pCounter.textContent = `${String(activeSlide + 1).padStart(2, "0")} / ${String(stops.length).padStart(2, "0")}`;
      }
      if (pPrev) pPrev.disabled = activeSlide === 0;
      if (pNext) pNext.disabled = activeSlide >= stops.length - 1;
      pDotsWrap?.querySelectorAll(".carousel-dot").forEach((dot, i) => {
        dot.setAttribute("aria-current", String(i === activeSlide));
      });
    };

    const buildParallaxDots = () => {
      stops = getStops();
      if (!pDotsWrap) return;
      pDotsWrap.innerHTML = stops
        .map((_, idx) => `<button type="button" class="carousel-dot" data-slide="${idx}" aria-label="Trang ảnh ${idx + 1}" aria-current="${idx === activeSlide}"></button>`)
        .join("");
      pDotsWrap.querySelectorAll(".carousel-dot").forEach((dot) => {
        dot.addEventListener("click", () => goToSlide(Number(dot.dataset.slide)));
      });
    };

    const goToSlide = (idx) => {
      stops = getStops();
      const clamped = Math.max(0, Math.min(idx, stops.length - 1));
      targetX = -stops[clamped];
      syncUI(clamped);
    };

    pPrev?.addEventListener("click", () => goToSlide(activeSlide - 1));
    pNext?.addEventListener("click", () => goToSlide(activeSlide + 1));

    const startDrag = (clientX) => {
      isPointerDown = true;
      wasDragged = false;
      startPointerX = clientX;
      lastPointerX = clientX;
      dragVelocity = 0;
      startTargetX = currentX;
      targetX = currentX;
      pViewport.classList.add("is-dragging");
    };

    const moveDrag = (clientX) => {
      if (!isPointerDown) return;
      const dx = clientX - startPointerX;
      dragVelocity = clientX - lastPointerX;
      lastPointerX = clientX;
      if (Math.abs(dx) > 6) wasDragged = true;
      const maxScroll = getMaxScroll();
      targetX = Math.max(-maxScroll, Math.min(0, startTargetX + dx * 1.15));
    };

    const endDrag = () => {
      if (!isPointerDown) return;
      isPointerDown = false;
      pViewport.classList.remove("is-dragging");
      stops = getStops();
      const maxScroll = getMaxScroll();
      // Apply smooth inertial momentum on release
      targetX = Math.max(-maxScroll, Math.min(0, targetX + dragVelocity * 14));
      const scrollPos = -targetX;
      let nearest = 0;
      let bestDist = Infinity;
      stops.forEach((stop, i) => {
        const dist = Math.abs(stop - scrollPos);
        if (dist < bestDist) {
          bestDist = dist;
          nearest = i;
        }
      });
      syncUI(nearest);
    };

    pViewport.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        e.preventDefault();
        const maxScroll = getMaxScroll();
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        targetX = Math.max(-maxScroll, Math.min(0, targetX - delta));
        const scrollPos = -targetX;
        let nearest = 0;
        let bestDist = Infinity;
        stops.forEach((stop, i) => {
          const dist = Math.abs(stop - scrollPos);
          if (dist < bestDist) {
            bestDist = dist;
            nearest = i;
          }
        });
        syncUI(nearest);
      }
    }, { passive: false });

    window.addEventListener("resize", () => {
      const prevCount = stops.length;
      stops = getStops();
      if (stops.length !== prevCount) buildParallaxDots();
      const maxScroll = getMaxScroll();
      targetX = Math.max(-maxScroll, Math.min(0, targetX));
      syncUI(Math.min(activeSlide, stops.length - 1));
    });

    pViewport.addEventListener("mousedown", (e) => startDrag(e.clientX));
    window.addEventListener("mousemove", (e) => moveDrag(e.clientX));
    window.addEventListener("mouseup", endDrag);

    pViewport.addEventListener("touchstart", (e) => startDrag(e.changedTouches[0].clientX), { passive: true });
    pViewport.addEventListener("touchmove", (e) => moveDrag(e.changedTouches[0].clientX), { passive: true });
    pViewport.addEventListener("touchend", endDrag, { passive: true });

    const tickParallax = () => {
      const ease = isPointerDown ? 0.24 : 0.055;
      currentX += (targetX - currentX) * ease;
      pTrack.style.transform = `translate3d(${currentX}px, 0, 0)`;

      const vpRect = pViewport.getBoundingClientRect();
      const vpCenter = vpRect.left + vpRect.width / 2;
      slides.forEach((slide) => {
        const img = slide.querySelector("img");
        if (!img) return;
        const rect = slide.getBoundingClientRect();
        const slideCenter = rect.left + rect.width / 2;
        const ratio = (slideCenter - vpCenter) / vpRect.width;
        const shift = Math.max(-16, Math.min(16, ratio * 38));
        img.style.transform = `translate3d(${shift}%, 0, 0)`;
      });

      requestAnimationFrame(tickParallax);
    };

    buildParallaxDots();
    syncUI(0);
    requestAnimationFrame(tickParallax);
  }

  lbPrev?.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      renderLightbox();
    }
  });

  lbNext?.addEventListener("click", () => {
    const visible = getVisibleTiles();
    if (currentIndex < visible.length - 1) {
      currentIndex += 1;
      renderLightbox();
    }
  });

  lbClose?.addEventListener("click", () => lightbox.close());

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.close();
  });

  lightbox.addEventListener("close", () => {
    if (supportsFinePointer && !prefersReducedMotion) {
      document.body.classList.add("has-custom-cursor");
    }
    lastTrigger?.focus();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.open) return;
    if (e.key === "ArrowLeft" && !lbPrev.disabled) {
      currentIndex -= 1;
      renderLightbox();
    } else if (e.key === "ArrowRight" && !lbNext.disabled) {
      currentIndex += 1;
      renderLightbox();
    }
  });

  let touchStartX = 0;
  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener("touchend", (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    const visible = getVisibleTiles();
    if (delta > 40 && currentIndex > 0) {
      currentIndex -= 1;
      renderLightbox();
    } else if (delta < -40 && currentIndex < visible.length - 1) {
      currentIndex += 1;
      renderLightbox();
    }
  }, { passive: true });
}

// 6. Detail Post Page (bai-viet.html?slug=...)
const articleRoot = document.getElementById("article-root");
if (articleRoot && Array.isArray(window.KENHI_POSTS)) {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const post = window.KENHI_POSTS.find((p) => p.slug === slug);

  if (!post) {
    articleRoot.innerHTML = `
      <div class="container">
        <div class="empty-state">
          <h1>Không tìm thấy bài viết</h1>
          <p>Liên kết bài viết có thể đã thay đổi hoặc không tồn tại.</p>
          <a class="btn btn-dark" href="./index.html#cam-nang">Quay lại Cẩm nang Huế</a>
        </div>
      </div>
    `;
  } else {
    document.title = `${post.title} — KenHi Homestay`;
    const bodyHtml = post.blocks
      .map((block) => {
        if (block.type === "h2") return `<h2>${block.text}</h2>`;
        if (block.type === "p") return `<p>${block.text}</p>`;
        if (block.type === "ul") {
          return `<ul>${block.items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
        }
        if (block.type === "img") {
          return `<figure><img src="${block.src}" alt="${block.alt || post.title}" loading="lazy" /></figure>`;
        }
        return "";
      })
      .join("");

    const related = window.KENHI_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
    const relatedHtml = related
      .map(
        (item) => `
        <a class="related-card" href="./bai-viet.html?slug=${item.slug}">
          <img src="${item.cover}" alt="${item.title}" data-fallback="${item.fallbackCover}" loading="lazy" />
          <div class="related-card-body">
            <h3>${item.title}</h3>
            <span>Đọc tiếp</span>
          </div>
        </a>
      `
      )
      .join("");

    articleRoot.innerHTML = `
      <article class="article-shell">
        <div class="container">
          <header class="article-header">
            <a class="btn btn-outline article-back-btn" href="./cam-nang.html" id="article-back-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              <span>Quay lại</span>
            </a>
            <nav class="breadcrumb" aria-label="Đường dẫn">
              <a href="./index.html">Trang chủ</a>
              <span aria-hidden="true">/</span>
              <a href="./cam-nang.html">Cẩm nang Huế</a>
              <span aria-hidden="true">/</span>
              <span>${post.category}</span>
            </nav>
            <h1>${post.title}</h1>
            <div class="article-meta tabular">
              <span>${post.category}</span>
              <span>·</span>
              <span>${post.readTime}</span>
            </div>
            <p>${post.excerpt}</p>
          </header>

          <figure class="article-cover">
            <img src="${post.cover}" alt="${post.title}" data-fallback="${post.fallbackCover}" />
          </figure>

          <div class="article-prose">${bodyHtml}</div>

          <aside class="article-cta-box">
            <div>
              <h3>Lên kế hoạch ghé Huế?</h3>
              <p>Phòng từ 280.000đ – 500.000đ/đêm tại BGI Topaz Downtown, có chỗ đỗ ô-tô rộng rãi.</p>
            </div>
            <a class="btn btn-dark" href="https://bookhotel.kiotviet.vn/kenhihomestay" target="_blank" rel="noopener noreferrer">
              Đặt phòng ngay
            </a>
          </aside>
        </div>
      </article>

      <section class="section related-section">
        <div class="container">
          <div class="section-head">
            <h2>Bài viết liên quan</h2>
            <a class="text-link" href="./cam-nang.html">Xem tất cả</a>
          </div>
          <div class="related-grid">${relatedHtml}</div>
        </div>
      </section>
    `;

    const backBtn = document.getElementById("article-back-btn");
    backBtn?.addEventListener("click", (e) => {
      if (document.referrer && document.referrer.startsWith(window.location.origin) && window.history.length > 1) {
        e.preventDefault();
        window.history.back();
      }
    });
  }
}

// 7. Reviews Carousel (Home)
const reviewsTrack = document.getElementById("reviews-track");
const revPrev = document.getElementById("rev-prev");
const revNext = document.getElementById("rev-next");
const revCounter = document.getElementById("reviews-counter");
const revDotsWrap = document.getElementById("reviews-dots");

if (reviewsTrack && revPrev && revNext) {
  const cards = Array.from(reviewsTrack.children);
  let revIndex = 0;

  const getPerView = () => {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 980) return 2;
    return 3;
  };

  const getMaxIndex = () => Math.max(0, cards.length - getPerView());

  const buildDots = () => {
    if (!revDotsWrap) return;
    const totalSteps = getMaxIndex() + 1;
    revDotsWrap.innerHTML = Array.from({ length: totalSteps }, (_, i) =>
      `<button type="button" class="carousel-dot" data-step="${i}" aria-label="Xem nhóm đánh giá ${i + 1}" aria-current="${i === revIndex}"></button>`
    ).join("");
    revDotsWrap.querySelectorAll(".carousel-dot").forEach((dot) => {
      dot.addEventListener("click", () => {
        revIndex = Number(dot.dataset.step);
        updateCarousel();
      });
    });
  };

  const updateCarousel = () => {
    const maxIdx = getMaxIndex();
    revIndex = Math.max(0, Math.min(revIndex, maxIdx));
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 20;
    reviewsTrack.style.transform = `translateX(-${revIndex * (cardWidth + gap)}px)`;
    if (revCounter) {
      revCounter.textContent = `${String(revIndex + 1).padStart(2, "0")} / ${String(maxIdx + 1).padStart(2, "0")}`;
    }
    revDotsWrap?.querySelectorAll(".carousel-dot").forEach((dot, i) => {
      dot.setAttribute("aria-current", String(i === revIndex));
    });
  };

  revPrev.addEventListener("click", () => {
    const maxIdx = getMaxIndex();
    revIndex = revIndex > 0 ? revIndex - 1 : maxIdx;
    updateCarousel();
  });

  revNext.addEventListener("click", () => {
    const maxIdx = getMaxIndex();
    revIndex = revIndex < maxIdx ? revIndex + 1 : 0;
    updateCarousel();
  });

  let autoTimer = null;
  const startAutoTimer = () => {
    clearInterval(autoTimer);
    if (prefersReducedMotion) return;
    autoTimer = setInterval(() => {
      const maxIdx = getMaxIndex();
      revIndex = revIndex < maxIdx ? revIndex + 1 : 0;
      updateCarousel();
    }, 4800);
  };

  startAutoTimer();

  reviewsTrack.parentElement?.addEventListener("mouseenter", () => clearInterval(autoTimer));
  reviewsTrack.parentElement?.addEventListener("mouseleave", startAutoTimer);

  // Touch swipe support for mobile
  let revTouchX = 0;
  let revTouchY = 0;
  const revViewport = reviewsTrack.parentElement;

  revViewport?.addEventListener("touchstart", (e) => {
    revTouchX = e.changedTouches[0].clientX;
    revTouchY = e.changedTouches[0].clientY;
    clearInterval(autoTimer);
  }, { passive: true });

  revViewport?.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - revTouchX;
    const dy = e.changedTouches[0].clientY - revTouchY;
    const maxIdx = getMaxIndex();
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        revIndex = revIndex < maxIdx ? revIndex + 1 : 0;
      } else {
        revIndex = revIndex > 0 ? revIndex - 1 : maxIdx;
      }
      updateCarousel();
    }
    startAutoTimer();
  }, { passive: true });

  window.addEventListener("resize", () => {
    buildDots();
    updateCarousel();
  });

  buildDots();
  updateCarousel();
}

// 8. Scroll to top button
const scrollTopBtn = document.getElementById("scroll-top-btn");
if (scrollTopBtn) {
  const toggleScrollTop = () => {
    scrollTopBtn.classList.toggle("is-visible", window.scrollY > 360);
  };
  window.addEventListener("scroll", toggleScrollTop, { passive: true });
  toggleScrollTop();

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// 9. Guide Index Page (cam-nang.html)
const guideGrid = document.getElementById("guide-grid");
const guideSearch = document.getElementById("guide-search");

if (guideGrid && Array.isArray(window.KENHI_POSTS)) {
  const renderGuideCards = (query = "") => {
    const q = query.trim().toLowerCase();
    const filtered = window.KENHI_POSTS.filter(
      (p) =>
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q)
    );

    if (!filtered.length) {
      guideGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <h3>Không tìm thấy bài viết phù hợp</h3>
          <p>Thử từ khóa khác như “ẩm thực”, “ô-tô”, “Biển lặng yên” hoặc “AEON”.</p>
        </div>
      `;
      return;
    }

    guideGrid.innerHTML = filtered
      .map(
        (post) => `
        <a class="guide-card" href="./bai-viet.html?slug=${post.slug}">
          <img src="${post.cover}" alt="${post.title}" data-fallback="${post.fallbackCover}" loading="lazy" />
          <div class="guide-card-body">
            <span class="guide-card-meta tabular">${post.category} · ${post.readTime}</span>
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <span class="guide-card-link">Đọc chi tiết →</span>
          </div>
        </a>
      `
      )
      .join("");

    guideGrid.querySelectorAll("img[data-fallback]").forEach((img) => {
      img.addEventListener("error", () => {
        if (img.dataset.fallback && img.src !== img.dataset.fallback) {
          img.src = img.dataset.fallback;
        }
      });
    });
  };

  guideSearch?.addEventListener("input", (e) => renderGuideCards(e.target.value));
  renderGuideCards();
}

// 10. Image error fallback
document.querySelectorAll("img[data-fallback]").forEach((img) => {
  img.addEventListener("error", () => {
    if (img.dataset.fallback && img.src !== img.dataset.fallback) {
      img.src = img.dataset.fallback;
    }
  });
});

// 11. Custom Spring Cursor (Vanilla JS port of @reactbits-starter/custom-cursor-tw)
const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
if (supportsFinePointer && !prefersReducedMotion) {
  const ring = document.createElement("div");
  ring.className = "custom-cursor-ring";
  const dot = document.createElement("div");
  dot.className = "custom-cursor-dot";
  document.body.append(ring, dot);
  document.body.classList.add("has-custom-cursor");

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let dotX = -100;
  let dotY = -100;
  let visible = false;

  const INTERACTIVE_SELECTOR = "a, button, [role='radio'], .space-tile, .guide-card, .blog-row, .blog-lead, .review-item";

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!visible) {
      ringX = mouseX;
      ringY = mouseY;
      dotX = mouseX;
      dotY = mouseY;
      visible = true;
      ring.classList.add("is-visible");
      dot.classList.add("is-visible");
    }
    const hovering = Boolean(e.target.closest(INTERACTIVE_SELECTOR));
    ring.classList.toggle("is-hover", hovering);
    dot.classList.toggle("is-hover", hovering);
  }, { passive: true });

  document.addEventListener("mouseleave", () => {
    visible = false;
    ring.classList.remove("is-visible");
    dot.classList.remove("is-visible");
  });

  window.addEventListener("mousedown", () => ring.classList.add("is-down"));
  window.addEventListener("mouseup", () => ring.classList.remove("is-down"));

  const animateCursor = () => {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    dotX += (mouseX - dotX) * 0.48;
    dotY += (mouseY - dotY) * 0.48;

    const ringOffset = ring.classList.contains("is-hover") ? 26 : ring.classList.contains("is-down") ? 14 : 17;
    const dotOffset = dot.classList.contains("is-hover") ? 2 : 3.5;

    ring.style.transform = `translate3d(${ringX - ringOffset}px, ${ringY - ringOffset}px, 0)`;
    dot.style.transform = `translate3d(${dotX - dotOffset}px, ${dotY - dotOffset}px, 0)`;
    requestAnimationFrame(animateCursor);
  };

  requestAnimationFrame(animateCursor);
}

// 12. Magnetic pull on Hero CTA button
const heroCtaBtn = document.querySelector(".hero-cta-btn");
if (heroCtaBtn && supportsFinePointer) {
  heroCtaBtn.addEventListener("mousemove", (e) => {
    const rect = heroCtaBtn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.16;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.22;
    heroCtaBtn.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  });
  heroCtaBtn.addEventListener("mouseleave", () => {
    heroCtaBtn.style.transform = "";
  });
}
