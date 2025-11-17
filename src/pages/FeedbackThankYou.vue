<template>
  <div class="thankyou">
    <div class="overlay">
      <h2>Thank You!</h2>
      <p>Your feedback has been recorded and will help improve our services.</p>
      <router-link to="/">
        <button class="primary">Back to Home</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
// No logic needed
</script>

<style scoped>
.thankyou {
  background: url("https://wallpapercave.com/wp/wp6938553.jpg") no-repeat center
    center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Overlay for readability */
.overlay {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 3rem;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  text-align: center;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

p {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 2rem;
}

button.primary {
  padding: 0.75rem 1.5rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button.primary:hover {
  background: #388e3c;
}
</style>
