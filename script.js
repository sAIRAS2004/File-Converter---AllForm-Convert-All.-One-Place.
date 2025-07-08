// ================== LANDING PAGE TRANSITION ===================
setTimeout(() => {
  document.getElementById("landing").style.transform = "translateY(-100%)";
  setTimeout(() => {
    document.getElementById("landing").style.display = "none";
    document.getElementById("homepage").style.display = "block";
    document.body.style.overflow = "auto";
  }, 800);
}, 3000);

// ================== FILE CONVERSION LOGIC =====================
function convertFile(inputId, formatId) {
  const input = document.getElementById(inputId);
  const format = document.getElementById(formatId).value;

  if (input.files.length === 0 || !format) {
    alert("Please select a file and format to convert.");
    return;
  }

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    let content = reader.result;
    let mimeType = getMimeType(format);

    // Create Blob and Download Link
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `converted.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  reader.readAsText(file);
}

function getMimeType(extension) {
  switch (extension) {
    case "txt": return "text/plain";
    case "pdf": return "application/pdf";
    case "docx": return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    case "html": return "text/html";
    case "mp3": return "audio/mpeg";
    case "wav": return "audio/wav";
    case "mp4": return "video/mp4";
    case "mov": return "video/quicktime";
    default: return "application/octet-stream";
  }
}

// ================== DRAG & DROP FUNCTIONALITY =====================
["text", "audio", "video"].forEach(type => {
  const dropArea = document.getElementById(`${type}Drop`);
  const input = document.getElementById(`${type}Input`);

  dropArea.addEventListener("click", () => input.click());

  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("hover");
  });

  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("hover");
  });

  dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("hover");
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      input.files = files;
    }
  });
});

let carousel = document.getElementById('featuresCarousel');
let slides = carousel.querySelectorAll('.feature-slide');
let index = 0;
let totalSlides = slides.length;

function slideFeatures() {
  index = (index + 1) % totalSlides;
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(slideFeatures, 6000); // 6 seconds per slide for slower pacing

