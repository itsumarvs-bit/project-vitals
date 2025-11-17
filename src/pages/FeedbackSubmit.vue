<template>
  <div class="feedback-form">
    <div class="overlay">
      <h2>Patient Feedback</h2>
      <form @submit.prevent="submitFeedback">
        <label>Department</label>
        <select v-model="department" required>
          <option disabled value="">Select Department</option>
          <option v-for="dept in Object.keys(departmentQuestions)" :key="dept">
            {{ dept }}
          </option>
        </select>

        <div v-if="department">
          <div v-for="(question, index) in questions" :key="index">
            <label>{{ question }}</label>
            <textarea v-model="responses[index]" required></textarea>
          </div>
        </div>

        <button type="submit" class="primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { db } from "../services/firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { analyzeSentiment } from "../services/sentiment";
import { useRouter } from "vue-router";

const router = useRouter();
const department = ref("");
const responses = ref([]);

const departmentQuestions = ref({});
const useDeptQuestions = ref(true);

onMounted(async () => {
  try {
    const snap = await getDoc(doc(db, "settings", "global"));
    if (snap.exists()) {
      const data = snap.data();
      useDeptQuestions.value = data.useDeptQuestions ?? true;
      departmentQuestions.value = data.departmentQuestions || {};
    } else {
      console.warn("⚠️ No settings found in Firestore.");
    }
  } catch (err) {
    console.error("❌ Error loading settings:", err);
  }
});

const genericQuestions = [
  "How was your overall experience?",
  "Was the staff respectful and helpful?",
  "Was the facility clean and organized?",
];

const questions = computed(() => {
  if (!useDeptQuestions.value) return genericQuestions;
  return departmentQuestions.value[department.value] || [];
});

watch(questions, (newQuestions) => {
  responses.value = newQuestions.map(() => "");
});

function getSentimentLabel(score) {
  if (score >= 0.05) return "positive";
  if (score <= -0.05) return "negative";
  return "neutral";
}

async function submitFeedback() {
  const sentimentResults = await Promise.all(
    responses.value.map((text) => analyzeSentiment(text))
  );

  const feedbackData = {
    department: department.value,
    createdAt: serverTimestamp(),
  };

  questions.value.forEach((q, i) => {
    feedbackData[`question${i + 1}`] = q;
    feedbackData[`response${i + 1}`] = responses.value[i];
    feedbackData[`sentiment${i + 1}`] = sentimentResults[i].compound;
    feedbackData[`label${i + 1}`] = getSentimentLabel(
      sentimentResults[i].compound
    );
  });

  await addDoc(collection(db, "feedback"), feedbackData);
  router.push("/thankyou");
}
</script>

<style scoped>
.feedback-form {
  background: url("https://wallpapercave.com/wp/wp6938553.jpg") no-repeat center
    center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background-color: rgba(255, 255, 255, 0.85);
  padding: 2rem;
  border-radius: 12px;
  max-width: 700px;
  width: 100%;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

label {
  font-weight: bold;
  color: #555;
}

textarea,
select {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
}

button.primary {
  background: #2196f3;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
  display: block;
  margin: auto;
}

button.primary:hover {
  background: #1976d2;
}
</style>
