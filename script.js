let tilt = 0, strain = 0, vibration = 0;
const HISTORY_LENGTH = 50;

let tiltHistory = [];
let strainHistory = [];
let vibrationHistory = [];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function getTrendDelta(history) {
  if (history.length < 2) return 0;
  return history[history.length - 1] - history[0];
}

function updateSensors() {
  // Simulate sensor readings
  tilt = rand(0, 6.5);
  strain = rand(10, 95);
  vibration = rand(0, 11);

  // Maintain history
  tiltHistory.push(tilt);
  strainHistory.push(strain);
  vibrationHistory.push(vibration);

  if (tiltHistory.length > HISTORY_LENGTH) tiltHistory.shift();
  if (strainHistory.length > HISTORY_LENGTH) strainHistory.shift();
  if (vibrationHistory.length > HISTORY_LENGTH) vibrationHistory.shift();

  // Trend analysis
  const tiltTrend = getTrendDelta(tiltHistory);
  const strainTrend = getTrendDelta(strainHistory);
  const vibTrend = getTrendDelta(vibrationHistory);

  let status = "SAFE";

  // Thresholds & Trend-Based Logic
  if (
    tilt > 5 || tiltTrend > 2.5 ||
    strain > 80 || strainTrend > 25 ||
    vibration > 8.5 || vibTrend > 4 ||
    (tiltTrend > 1.5 && strainTrend > 15)
  ) {
    status = "DANGEROUS";
  } else if (
    tilt > 3.5 || tiltTrend > 1 ||
    strain > 65 || strainTrend > 10 ||
    vibration > 6 || vibTrend > 2
  ) {
    status = "WARNING";
  }

  // Save to localStorage
  localStorage.setItem("tilt", tilt.toFixed(2));
  localStorage.setItem("strain", strain.toFixed(1));
  localStorage.setItem("vibration", vibration.toFixed(2));
  localStorage.setItem("status", status);

  // Save history for trend page
  localStorage.setItem("tiltHistory", JSON.stringify(tiltHistory));
  localStorage.setItem("strainHistory", JSON.stringify(strainHistory));
  localStorage.setItem("vibrationHistory", JSON.stringify(vibrationHistory));
}

// Update every 2 seconds
setInterval(updateSensors, 2000);
updateSensors(); // Initial call