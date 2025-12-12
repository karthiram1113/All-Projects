const fileInput = document.getElementById('bulkFileUpload');
const progressWrapper = document.querySelector('.custom-upload-progress');
const progressBar = document.querySelector('.custom-progress-bar');
const uploadedFileName = document.getElementById('uploadedFileName');
 
fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
 
        progressWrapper.style.display = 'block';
        progressBar.style.width = '0%';
        uploadedFileName.style.display = 'none';
 
        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            if (progress > 100) progress = 100;
 
            progressBar.style.width = progress + '%';
            progressBar.textContent = progress + '%';   // show percent
 
            if (progress >= 100) {
                clearInterval(interval);
                progressWrapper.style.display = 'none';
 
                uploadedFileName.textContent = `Selected: ${fileName}`;
                uploadedFileName.style.display = 'block';
            }
        }, 100);
    }
});
