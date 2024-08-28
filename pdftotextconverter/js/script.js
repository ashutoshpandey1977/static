document.getElementById('pdf-upload-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('pdf-file');
    const pdfViewer = document.getElementById('pdf-viewer');

    if (fileInput.files.length === 0) {
        alert('Please select a PDF file.');
        return;
    }

    const file = fileInput.files[0];
    
    // Create a FormData object to hold the file
    const formData = new FormData();
    formData.append('file', file);

    try {
        // Send the file to the server
        const response = await fetch('https://153.92.144.198:8080/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            alert('File uploaded successfully!');

            // Optionally, display the uploaded PDF
            pdfViewer.innerHTML = `<embed src="${URL.createObjectURL(file)}" width="100%" height="100%" type="application/pdf">`;
        } else {
            alert('Failed to upload file. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while uploading the file.');
    }
});

document.getElementById('download-text').addEventListener('click', function() {
    const typedText = document.getElementById('typed-text').value;
    const blob = new Blob([typedText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'typed-text.txt';
    link.click();
});
