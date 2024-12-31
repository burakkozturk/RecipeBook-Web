<template>
  <footer class="footer">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-4">
          <div class="footer-brand">
            <span class="brand-text">Recipe</span>
            <span class="brand-text-alt">Book</span>
          </div>
          <p class="footer-description">
            Discover and share amazing recipes from around the world.
          </p>
        </div>
        <div class="col-lg-2">
          <h5>Quick Links</h5>
          <ul class="footer-links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/categories">Categories</router-link></li>
            <li><router-link to="/about">About Us</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </div>
        <div class="col-lg-3">
          <h5>Categories</h5>
          <ul class="footer-links">
            <li><router-link to="/category/breakfast">Breakfast</router-link></li>
            <li><router-link to="/category/main-dishes">Main Dishes</router-link></li>
            <li><router-link to="/category/desserts">Desserts</router-link></li>
            <li><router-link to="/category/healthy">Healthy</router-link></li>
          </ul>
        </div>
        <div class="col-lg-3">
          <h5>Follow Us</h5>
          <div class="social-links">
            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 Recipe Book. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #6C63FF;
  color: white;
  padding: 4rem 0 2rem;
}

.footer-brand {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.brand-text-alt {
  color: #FF6B6B;
}

.footer-description {
  opacity: 0.9;
  margin-bottom: 2rem;
}

h5 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.8rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer-links a:hover {
  color: #FF6B6B;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: white;
  font-size: 1.2rem;
  background-color: rgba(255, 255, 255, 0.1);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: #FF6B6B;
  transform: translateY(-2px);
}

.footer-bottom {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.footer-bottom p {
  opacity: 0.8;
  margin: 0;
}

@media (max-width: 768px) {
  .footer {
    padding: 3rem 0 1.5rem;
  }

  .footer-brand {
    text-align: center;
  }

  .footer-description {
    text-align: center;
  }

  h5 {
    margin-top: 1.5rem;
    text-align: center;
  }

  .footer-links {
    text-align: center;
  }

  .social-links {
    justify-content: center;
    margin-top: 1rem;
  }
}
</style> 