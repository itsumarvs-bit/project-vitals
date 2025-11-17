<template>
  <div class="reviews">
    <div class="overlay">
      <h2>Review Management</h2>

      <table>
        <thead>
          <tr>
            <th>Department</th>
            <th>Question</th>
            <th>Response</th>
            <th>Sentiment</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="review in reviews" :key="review.id">
            <tr>
              <td>{{ review.department }}</td>
              <td>{{ review.question1 }}</td>
              <td>{{ review.response1 }}</td>
              <td :class="review.label1?.toLowerCase()">{{ review.label1 }}</td>
              <td>{{ review.createdAt?.toDate().toLocaleString() }}</td>
            </tr>
            <tr>
              <td>{{ review.department }}</td>
              <td>{{ review.question2 }}</td>
              <td>{{ review.response2 }}</td>
              <td :class="review.label2?.toLowerCase()">{{ review.label2 }}</td>
              <td>{{ review.createdAt?.toDate().toLocaleString() }}</td>
            </tr>
            <tr>
              <td>{{ review.department }}</td>
              <td>{{ review.question3 }}</td>
              <td>{{ review.response3 }}</td>
              <td :class="review.label3?.toLowerCase()">{{ review.label3 }}</td>
              <td>{{ review.createdAt?.toDate().toLocaleString() }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

const reviews = ref([]);

onMounted(async () => {
  try {
    const snapshot = await getDocs(collection(db, "feedback"));
    if (!snapshot.empty) {
      reviews.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }
  } catch (err) {
    console.error("❌ Firestore error:", err);
  }
});
</script>

<style scoped>
.reviews {
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
  padding: 2rem;
  border-radius: 12px;
  max-width: 1000px;
  width: 100%;
  overflow-x: auto;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

th,
td {
  padding: 0.75rem;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f0f0f0;
  color: #333;
}

.positive {
  color: green;
  font-weight: bold;
}

.negative {
  color: red;
  font-weight: bold;
}

.neutral {
  color: orange;
  font-weight: bold;
}
</style>
