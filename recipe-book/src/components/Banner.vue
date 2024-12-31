<script setup>
import pasta from '@/assets/pasta.webp'
import food from '@/assets/food.jpg'
</script>

<template>
  <section class="banner">
    <div class="container">
      <div class="banner-wrapper">
        <div class="banner-content">
          <h1>
            Find & Share Your
            <br><span class="highlight">Favorite Recipes</span>
          </h1>
          <p>Discover delicious recipes from around the world</p>
          
          <div class="search-container">
            <div class="search-box">
              <input 
                type="text" 
                placeholder="Search recipes..."
                class="search-input"
              >
              <button class="search-button">
                Search
              </button>
            </div>
            <div class="search-tags">
              <span class="tag">Popular</span>
              <span class="tag">Turkish</span>
              <span class="tag">Desserts</span>
              <span class="tag">Healthy</span>
            </div>
          </div>

          <div class="stats">
            <div class="stat-item">
              <h4>4.9</h4>
              <p>Rating</p>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <h4>2K+</h4>
              <p>Users</p>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <h4>500+</h4>
              <p>Recipes</p>
            </div>
          </div>
        </div>
        
        <div class="banner-images">
          <div class="image-container">
            <div class="image-box main-image">
              <img :src="pasta" alt="Delicious Pasta">
            </div>
            <div class="image-box secondary-image">
              <img :src="food" alt="Healthy Bowl">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.banner {
  padding: 4rem 0;
  background: linear-gradient(135deg, #6C63FF 0%, #4c46b3 100%);
  min-height: 85vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.banner-wrapper {
  display: flex;
  align-items: center;
  gap: 6rem;
}

.banner-content {
  flex: 1;
  max-width: 600px;
}

.banner-content h1 {
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -1px;
  color: white;
}

.highlight {
  color: #FF6B6B;
}

.banner-content p {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.search-container {
  max-width: 500px;
  margin: 2rem 0;
}

.search-box {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 0.4rem;
  display: flex;
  align-items: center;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  color: white;
  outline: none;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search-button {
  background: #FF6B6B;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-button:hover {
  background: #ff5252;
  transform: translateY(-1px);
}

.search-tags {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.tag {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 100px;
  font-size: 0.9rem;
  backdrop-filter: blur(4px);
}

.stats {
  display: flex;
  gap: 3rem;
  margin-top: 3rem;
}

.stat-item {
  color: white;
  text-align: center;
}

.stat-item h4 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.stat-item p {
  font-size: 1rem;
  opacity: 0.8;
  margin: 0.25rem 0 0 0;
}

.banner-images {
  flex: 1;
  position: relative;
}

.image-container {
  position: relative;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-box {
  position: absolute;
  border-radius: 30px;
  overflow: hidden;
  background: white;
  padding: 15px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  animation: float 6s ease-in-out infinite;
}

.image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}

.main-image {
  width: 380px;
  height: 500px;
  right: 0;
  z-index: 2;
  transform: rotate(-2deg);
  animation: floatMain 6s ease-in-out infinite;
}

.secondary-image {
  width: 320px;
  height: 420px;
  right: 180px;
  top: 80px;
  z-index: 1;
  transform: rotate(3deg);
  animation: floatSecondary 8s ease-in-out infinite;
}

@keyframes floatMain {
  0% {
    transform: rotate(-2deg) translateY(0px);
  }
  50% {
    transform: rotate(-1deg) translateY(-20px);
  }
  100% {
    transform: rotate(-2deg) translateY(0px);
  }
}

@keyframes floatSecondary {
  0% {
    transform: rotate(3deg) translateY(0px);
  }
  50% {
    transform: rotate(4deg) translateY(-15px);
  }
  100% {
    transform: rotate(3deg) translateY(0px);
  }
}

.image-box:hover {
  transform: scale(1.02) translateY(-10px) rotate(0);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.image-box::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.05)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-box:hover::after {
  opacity: 1;
}

@media (max-width: 1200px) {
  .banner-content h1 {
    font-size: 3.5rem;
  }
  
  .secondary-image {
    right: 120px;
  }
}

@media (max-width: 991px) {
  .banner-wrapper {
    flex-direction: column;
    text-align: center;
  }

  .banner-content {
    max-width: 100%;
    margin-bottom: 3rem;
  }

  .stats {
    justify-content: center;
  }

  .search-tags {
    justify-content: center;
  }

  .image-container {
    height: 400px;
  }

  .main-image {
    width: 300px;
    height: 400px;
    right: 50%;
    transform: translateX(50%) rotate(0);
  }

  .secondary-image {
    display: none;
  }

  .search-container {
    max-width: 100%;
  }

  .main-image {
    animation: none;
    transform: translateX(50%) rotate(0);
  }

  .main-image:hover {
    transform: translateX(50%) translateY(-10px);
  }
}

@media (max-width: 768px) {
  .banner {
    padding: 3rem 0;
  }

  .banner-content h1 {
    font-size: 2.5rem;
  }

  .stats {
    flex-direction: column;
    gap: 2rem;
  }

  .image-container {
    height: 350px;
  }

  .main-image {
    width: 260px;
    height: 350px;
  }
}
</style> 