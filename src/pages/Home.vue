<template>
  <div class="home">
    <div class="overlay">
      <h1>PROJECT VITALS</h1>
      <p class="subtitle">
        Victoria Intelligent Tracking and Assessment Listening System
      </p>
      <p class="description">
        A web-based automated feedback mechanism for patient reviews.
      </p>

      <div class="info">
        <h2>Our Purpose</h2>
        <p>
          Project VITALS was created to give patients a simple way to share
          their experiences. Your feedback helps us understand what works well
          and what needs improvement in our healthcare services.
        </p>

        <h2>Our Goal</h2>
        <p>
          Our goal is to continuously improve patient care by listening to your
          voice. Every review is analyzed to identify strengths and areas for
          growth, ensuring that healthcare remains safe, responsive, and
          compassionate.
        </p>
      </div>

      <router-link to="/feedback">
        <button class="primary">Submit Your Feedback</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
// No logic needed yet
</script>

<style scoped>
.home {
  /* Background image */
  background: url("https://wallpapercave.com/wp/wp6938553.jpg") no-repeat center
    center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Overlay to make text readable */
.overlay {
  background-color: rgba(255, 255, 255, 0.85);
  padding: 3rem;
  border-radius: 12px;
  max-width: 800px;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.subtitle {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #555;
}

.description {
  margin-bottom: 2rem;
  color: #666;
  font-size: 1.1rem;
}

.info h2 {
  color: #2196f3;
  margin-top: 1.5rem;
}

.info p {
  color: #444;
  line-height: 1.6;
}

button.primary {
  padding: 0.75rem 1.5rem;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button.primary:hover {
  background: #1976d2;
}
</style>
