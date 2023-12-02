function convertToCSV() {
  const inputData = document.getElementById('inputText').value;
  const lines = inputData.split('\n');
  const outputData = [];

  // Tambahkan header paling atas
  outputData.push("LATITUDE,LONGITUDE,DEPTH");

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("ELEVATION=") || lines[i].startsWith("DEPTH=")) {
      const depthValue = parseFloat(lines[i].replace(/ELEVATION=|DEPTH=/, ""));
      const coordinatesLine = lines[i + 1];
      const [longitude, latitude] = coordinatesLine.split(',');

      outputData.push(`${latitude},${longitude},${depthValue.toFixed(2)}`);
    }
  }

  // Menetapkan hasil ke textarea outputText
  document.getElementById('outputText').value = outputData.join('\n');
}

function downloadCSV() {
  const outputData = document.getElementById('outputText').value;
  
  // Mendapatkan nama file input
  const inputFile = document.getElementById('fileInput');
  let fileName = inputFile.files.length > 0 ? inputFile.files[0].name : "output.csv";

  // Ganti ekstensi file menjadi .csv
  fileName = fileName.replace(/\.[^/.]+$/, "") + ".csv";

  const blob = new Blob([outputData], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}


function pasteFromClipboard() {
  navigator.clipboard.readText().then(function(text) {
      document.getElementById('inputText').value = text;
  });
}

function copyToClipboard(elementId) {
  const element = document.getElementById(elementId);
  element.select();
  document.execCommand('copy');
}

// Tambahkan fungsi untuk menangani perubahan pada input file
document.getElementById('fileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
  const fileInput = event.target;
  const file = fileInput.files[0];

  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          document.getElementById('inputText').value = e.target.result;
      };
      reader.readAsText(file);
  }
}

function clearPage() {
  // Me-refresh halaman
  location.reload();
}