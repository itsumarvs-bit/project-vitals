<template>
  <div class="settings">
    <div class="overlay">
      <h2>Settings</h2>
      <form @submit.prevent="saveSettings">
        <label>Healthcare Center Name</label>
        <input v-model="centerName" type="text" placeholder="Enter name" />

        <div v-if="useDeptQuestions" class="departments">
          <h3>Department Questions</h3>

          <div
            v-for="(questions, dept) in departmentQuestions"
            :key="dept"
            class="dept-block"
          >
            <h4>{{ dept }}</h4>
            <div
              v-for="(q, index) in questions"
              :key="index"
              class="question-row"
            >
              <input
                v-model="departmentQuestions[dept][index]"
                type="text"
                placeholder="Enter question"
              />
            </div>
            <button type="button" @click="addQuestion(dept)">
              + Add Question
            </button>
          </div>

          <div class="new-dept">
            <h4>Add New Department</h4>
            <input
              v-model="newDeptName"
              type="text"
              placeholder="Department name"
            />
            <button type="button" @click="addDepartment">
              + Add Department
            </button>
          </div>
        </div>

        <button type="submit" class="primary">Save</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const centerName = ref("");
const useDeptQuestions = ref(true);
const departmentQuestions = ref({});
const newDeptName = ref("");

// Load settings from Firestore when component mounts
onMounted(async () => {
  try {
    const snap = await getDoc(doc(db, "settings", "global"));
    if (snap.exists()) {
      const data = snap.data();
      centerName.value = data.centerName || "";
      useDeptQuestions.value = data.useDeptQuestions ?? true;
      departmentQuestions.value = data.departmentQuestions || {};
      console.log("✅ Loaded settings:", data);
    } else {
      console.warn("⚠️ No settings found in Firestore yet.");
    }
  } catch (err) {
    console.error("❌ Error loading settings:", err);
  }
});

function addQuestion(dept) {
  departmentQuestions.value[dept].push("");
}

function addDepartment() {
  const name = newDeptName.value.trim();
  if (!name) return alert("Please enter a department name.");
  if (departmentQuestions.value[name]) {
    return alert("Department already exists.");
  }
  departmentQuestions.value[name] = [""];
  newDeptName.value = "";
}

async function saveSettings() {
  const settingsData = {
    centerName: centerName.value,
    useDeptQuestions: useDeptQuestions.value,
    departmentQuestions: departmentQuestions.value,
  };

  try {
    await setDoc(doc(db, "settings", "global"), settingsData);
    alert("Settings saved successfully!");
  } catch (err) {
    console.error("Error saving settings:", err);
    alert("Failed to save settings.");
  }
}
</script>

<style scoped>
.settings {
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
  max-width: 800px;
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

input[type="text"] {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.dept-block {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #f9f9f9;
}

.question-row input {
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
}

.new-dept {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px dashed #aaa;
  border-radius: 6px;
  background-color: #fefefe;
}

button.primary {
  background: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
  display: block;
  margin: auto;
}

button.primary:hover {
  background: #388e3c;
}

button[type="button"] {
  background: #2196f3;
  margin-top: 0.5rem;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

button[type="button"]:hover {
  background: #1976d2;
}
</style>
