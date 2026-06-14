// Interacciones y Efectos para el Portafolio de Luis Heiner

document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================
     1. Menú de Navegación Responsivo (Móvil)
     ========================================== */
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinksContainer.classList.toggle('open');
    });

    // Cerrar el menú móvil cuando se hace click en algún enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinksContainer.classList.remove('open');
      });
    });
  }

  /* ==========================================
     2. Cambio de Estilo de la Navbar al Scroll
     ========================================== */
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section');

  const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Actualizar el enlace activo según la sección actual en pantalla
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); // Ejecutar en carga inicial

  /* ==========================================
     3. Animaciones al Hacer Scroll (Fade-In/Scale)
     ========================================== */
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Se activa cuando el 15% del elemento está en pantalla
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Si ya se animó, dejamos de observarlo para optimizar rendimiento
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => scrollObserver.observe(el));

  /* ==========================================
     4. Efecto de Paralaje Interactivo con el Mouse (Sobre Mí)
     ========================================== */
  const mediaContainer = document.getElementById('aboutInteractiveMedia');
  const card1 = document.querySelector('.card-1');
  const card2 = document.querySelector('.card-2');

  if (mediaContainer && card1 && card2) {
    let requestAnimationFrameId = null;

    mediaContainer.addEventListener('mousemove', (e) => {
      const rect = mediaContainer.getBoundingClientRect();
      // Obtener posición del mouse relativa al centro del contenedor (-0.5 a 0.5)
      const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

      // Cancelar cualquier frame pendiente
      if (requestAnimationFrameId) {
        cancelAnimationFrame(requestAnimationFrameId);
      }

      // Ejecutar animación fluida usando requestAnimationFrame
      requestAnimationFrameId = requestAnimationFrame(() => {
        // Intensidades de traslación e inclinación
        const moveX1 = mouseX * 45;
        const moveY1 = mouseY * 45;
        const tiltX1 = mouseY * -15;
        const tiltY1 = mouseX * 15;

        const moveX2 = mouseX * -30;
        const moveY2 = mouseY * -30;
        const tiltX2 = mouseY * 12;
        const tiltY2 = mouseX * -12;

        card1.style.transform = `translate3d(${moveX1}px, ${moveY1}px, 0) rotateX(${tiltX1}deg) rotateY(${tiltY1}deg) rotate(-5deg)`;
        card2.style.transform = `translate3d(${moveX2}px, ${moveY2}px, 0) rotateX(${tiltX2}deg) rotateY(${tiltY2}deg) rotate(6deg)`;
      });
    });

    // Resetear las imágenes cuando el cursor sale del contenedor
    mediaContainer.addEventListener('mouseleave', () => {
      if (requestAnimationFrameId) {
        cancelAnimationFrame(requestAnimationFrameId);
      }
      
      card1.style.transform = 'translate3d(0, 0, 0) rotateX(0) rotateY(0) rotate(-5deg)';
      card2.style.transform = 'translate3d(0, 0, 0) rotateX(0) rotateY(0) rotate(6deg)';
    });
  }

  /* ==========================================
     5. Scroll Suave para los Enlaces de la Navbar
     ========================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
