<template>
  <div class="dashboard">
    <div class="overlay">
      <h2>Admin Dashboard</h2>

      <!-- Overall sentiment pie chart -->
      <div class="chart-container">
        <canvas id="overallChart"></canvas>
      </div>

      <!-- Department sentiment stacked bar chart -->
      <div class="chart-container">
        <canvas id="departmentChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import Chart from "chart.js/auto";

onMounted(async () => {
  const snapshot = await getDocs(collection(db, "feedback"));

  // Overall sentiment counters
  const overall = { Positive: 0, Negative: 0, Neutral: 0 };

  // Department-wise sentiment counters
  const departmentStats = {};

  snapshot.forEach((doc) => {
    const data = doc.data();
    const dept = data.department;

    // overall counts
    [data.label1, data.label2, data.label3].forEach((label) => {
      if (label === "positive") overall.Positive++;
      else if (label === "negative") overall.Negative++;
      else overall.Neutral++;
    });

    // department counts
    if (!departmentStats[dept]) {
      departmentStats[dept] = { Positive: 0, Negative: 0, Neutral: 0 };
    }
    [data.label1, data.label2, data.label3].forEach((label) => {
      if (label === "positive") departmentStats[dept].Positive++;
      else if (label === "negative") departmentStats[dept].Negative++;
      else departmentStats[dept].Neutral++;
    });
  });

  // Overall sentiment chart
  new Chart(document.getElementById("overallChart"), {
    type: "pie",
    data: {
      labels: Object.keys(overall),
      datasets: [
        {
          data: Object.values(overall),
          backgroundColor: ["#4caf50", "#f44336", "#ff9800"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" },
        title: { display: true, text: "Overall Sentiment" },
      },
    },
  });

  // Department sentiment chart (stacked bar)
  new Chart(document.getElementById("departmentChart"), {
    type: "bar",
    data: {
      labels: Object.keys(departmentStats),
      datasets: [
        {
          label: "Positive",
          data: Object.values(departmentStats).map((d) => d.Positive),
          backgroundColor: "#4caf50",
        },
        {
          label: "Negative",
          data: Object.values(departmentStats).map((d) => d.Negative),
          backgroundColor: "#f44336",
        },
        {
          label: "Neutral",
          data: Object.values(departmentStats).map((d) => d.Neutral),
          backgroundColor: "#ff9800",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" },
        title: { display: true, text: "Sentiment by Department" },
      },
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
    },
  });
});
</script>

<style scoped>
.dashboard {
  background: url("https://wallpapercave.com/wp/wp6938553.jpg") no-repeat center
    center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

/* Overlay for readability */
.overlay {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 12px;
  max-width: 1000px;
  width: 100%;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 2rem;
  color: #333;
  font-size: 2rem;
}

.chart-container {
  width: 100%;
  max-width: 600px;
  height: 350px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}
</style>
