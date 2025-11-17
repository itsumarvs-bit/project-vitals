<template>
  <nav class="navbar">
    <router-link to="/">Home</router-link>
    <router-link to="/dashboard" v-if="user">Dashboard</router-link>
    <router-link to="/reviews" v-if="user">Reviews</router-link>
    <router-link to="/settings" v-if="user">Settings</router-link>

    <button v-if="user" @click="logout">Logout</button>
    <router-link v-else to="/login">Login</router-link>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { auth } from "../services/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";

const user = ref(null);
const router = useRouter();

onMounted(() => {
  onAuthStateChanged(auth, (u) => {
    user.value = u;
  });
});

async function logout() {
  await signOut(auth);
  router.push("/"); // redirect to Home after logout
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(to right, #e3f2fd, #bbdefb);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-weight: 500;
  font-size: 1rem;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar a {
  text-decoration: none;
  color: #1976d2;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background 0.3s ease;
}

.navbar a:hover {
  background: rgba(25, 118, 210, 0.1);
}

button {
  background: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #d32f2f;
}
</style>
