/**
 * RESHMA G - PROFESSIONAL PORTFOLIO JAVASCRIPT
 * Fully documented, beginner-friendly, high-performance interactions.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ===================================================
     1. NAVIGATION & MOBILE MENU TOGGLE
     =================================================== */
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle mobile navigation menu
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!navbar.contains(event.target)) {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ===================================================
     2. NAVBAR SCROLL SHADOW & BACK TO TOP BUTTON
     =================================================== */
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Add shadow to navbar once scrolled past 40px
    if (scrollPos > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Toggle Back-To-Top button visibility
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  /* ===================================================
     3. SCROLLSPY (Highlight active link on scroll)
     =================================================== */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset + 120; // 120px offset for sticky navbar

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink(); // initial check

  /* ===================================================
     4. COPY EMAIL TO CLIPBOARD WITH TOAST
     =================================================== */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'reshmamalar022@gmail.com';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback for non-https / older browsers
          const textArea = document.createElement('textarea');
          textArea.value = email;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
        showToast('Email address copied to clipboard!');
      } catch (err) {
        showToast('Could not copy email automatically.');
      }
    });
  }

  /* ===================================================
     5. PROFILE PHOTO FALLBACK HANDLER
     =================================================== */
  const profileImg = document.getElementById('profile-img');
  if (profileImg) {
    profileImg.addEventListener('error', () => {
      // If the image cannot be found, inject an elegant SVG avatar placeholder
      const svgFallback = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%"><rect width="400" height="400" fill="%231E3A8A"/><circle cx="200" cy="200" r="160" fill="%232563EB"/><text x="200" y="210" font-family="Arial, sans-serif" font-size="110" font-weight="bold" fill="%23ffffff" text-anchor="middle" dominant-baseline="middle">RG</text><text x="200" y="290" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="%2393C5FD" text-anchor="middle">RESHMA G</text></svg>`;
      profileImg.src = svgFallback;
    });
  }

  /* ===================================================
     6. RESUME DOWNLOAD NOTICE HANDLER
     =================================================== */
  const resumeBtn = document.getElementById('resume-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      // If resume.pdf is not present, guide the user cleanly
      fetch('resume.pdf', { method: 'HEAD' })
        .then(response => {
          if (!response.ok) {
            showToast('Resume file is ready to be viewed in the folder.');
          }
        })
        .catch(() => {
          // fetch error in local file system is normal
        });
    });
  }

});
