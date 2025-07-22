// Gallery specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  initGalleryFilter()
  initLightbox()
})

// Gallery filtering functionality
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active", "btn-warning"))
      filterButtons.forEach((btn) => btn.classList.add("btn-outline-warning"))
      this.classList.remove("btn-outline-warning")
      this.classList.add("btn-warning", "active")

      // Filter gallery items
      galleryItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block"
          item.classList.add("animate-fadeInUp")
        } else {
          item.style.display = "none"
        }
      })
    })
  })
}

// Lightbox functionality
function initLightbox() {
  const bootstrap = window.bootstrap // Declare the bootstrap variable
  const lightboxModal = new bootstrap.Modal(document.getElementById("lightboxModal"))

  window.openLightbox = (button) => {
    const card = button.closest(".gallery-card")
    const img = card.querySelector(".gallery-img")
    const title = card.querySelector(".card-title").textContent
    const description = card.querySelector(".card-text").textContent
    const client = card.querySelector(".d-flex span:first-child").textContent
    const year = card.querySelector(".d-flex span:last-child").textContent

    // Update modal content
    document.getElementById("lightboxImage").src = img.src
    document.getElementById("lightboxTitle").textContent = title
    document.getElementById("lightboxDescription").textContent = description
    document.getElementById("lightboxClient").textContent = client
    document.getElementById("lightboxYear").textContent = year

    lightboxModal.show()
  }
}

// Add gallery-specific styles
const galleryStyles = `
    .gallery-card {
        transition: all 0.3s ease;
    }
    
    .gallery-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }
    
    .gallery-img {
        height: 250px;
        object-fit: cover;
        transition: transform 0.3s ease;
    }
    
    .gallery-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .gallery-card:hover .gallery-overlay {
        opacity: 1;
    }
    
    .gallery-card:hover .gallery-img {
        transform: scale(1.1);
    }
    
    .gallery-actions {
        display: flex;
        gap: 10px;
    }
    
    .filter-btn {
        transition: all 0.3s ease;
    }
`

// Inject gallery styles
const styleSheet = document.createElement("style")
styleSheet.textContent = galleryStyles
document.head.appendChild(styleSheet)
