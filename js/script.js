// Custom JavaScript for Rahul's Heaven Interior

document.addEventListener("DOMContentLoaded", () => {
  // Initialize animations
  initScrollAnimations()

  // Initialize gallery
  initGallery()

  // Initialize smooth scrolling
  initSmoothScrolling()

  // Initialize contact form
  initContactForm()

  // Initialize navbar scroll effect
  initNavbarScroll()

  // Initialize lazy loading
  initLazyLoading()

  // Initialize mobile menu
  initMobileMenu()

  // Initialize floating buttons
  initFloatingButtons()

  // Initialize performance optimizations
  initPerformanceOptimizations()
})

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated")
      }
    })
  }, observerOptions)

  // Add animation class to elements
  const animateElements = document.querySelectorAll(
    ".card, .feature-icon, .service-card, .testimonial-card, .contact-card",
  )
  animateElements.forEach((el) => {
    el.classList.add("animate-on-scroll")
    observer.observe(el)
  })
}

// Gallery functionality
function initGallery() {
  const galleryThumbs = document.querySelectorAll(".gallery-thumb")
  const carousel = document.querySelector("#galleryCarousel")

  if (galleryThumbs.length > 0 && carousel) {
    galleryThumbs.forEach((thumb, index) => {
      thumb.addEventListener("click", () => {
        const carouselInstance = new window.bootstrap.Carousel(carousel)
        carouselInstance.to(index)
      })
    })
  }

  // Auto-play carousel
  if (carousel) {
    const carouselInstance = new window.bootstrap.Carousel(carousel, {
      interval: 4000,
      wrap: true,
    })
  }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      if (href === "#") return

      const target = document.querySelector(href)

      if (target) {
        e.preventDefault()

        const offsetTop = target.offsetTop - 80 // Account for navbar height

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML

      // Show loading state
      submitBtn.innerHTML = '<span class="loading"></span> Sending...'
      submitBtn.disabled = true

      // Simulate form submission
      setTimeout(() => {
        // Show success message
        showNotification("Message sent successfully! We'll get back to you soon.", "success")

        // Reset form
        contactForm.reset()

        // Reset button
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }
}

// Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar")

  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  }
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `alert alert-${type === "success" ? "success" : "info"} alert-dismissible fade show position-fixed`
  notification.style.cssText = "top: 20px; right: 20px; z-index: 9999; min-width: 300px;"
  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 5000)
}

// Lazy loading for images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Mobile menu handling
function initMobileMenu() {
  const navbarToggler = document.querySelector(".navbar-toggler")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  if (navbarToggler && navbarCollapse) {
    // Close mobile menu when clicking on a link
    const navLinks = navbarCollapse.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click()
        }
      })
    })
  }
}

// Floating buttons animation
function initFloatingButtons() {
  const floatingButtons = document.querySelector(".floating-buttons")

  if (floatingButtons) {
    // Add stagger animation to buttons
    const buttons = floatingButtons.querySelectorAll(".btn-floating")
    buttons.forEach((button, index) => {
      button.style.animationDelay = `${index * 0.1}s`
    })
  }
}

// Performance optimization
function initPerformanceOptimizations() {
  // Preload critical images
  const criticalImages = [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
  ]

  criticalImages.forEach((src) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = src
    document.head.appendChild(link)
  })
}

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
})

// Service Worker registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful")
      })
      .catch((err) => {
        console.log("ServiceWorker registration failed")
      })
  })
}

// Analytics tracking (placeholder)
function trackEvent(category, action, label) {
  // Implement your analytics tracking here
  console.log("Event tracked:", { category, action, label })
}

// Track button clicks
document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-warning, .btn-floating")) {
    const buttonText = e.target.textContent.trim() || e.target.getAttribute("aria-label") || "Button"
    trackEvent("Button", "Click", buttonText)
  }
})

// Utility functions
const utils = {
  // Debounce function
  debounce: (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  // Throttle function
  throttle: (func, limit) => {
    let inThrottle
    return function () {
      const args = arguments
      
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  },

  // Check if element is in viewport
  isInViewport: (element) => {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  },
}

// Export utils for use in other scripts
window.RHIUtils = utils
