const imageForm = document.getElementById('imageForm');
const imageInput = document.getElementById('imageInput');
const convertButton = document.getElementById('convertButton');
const resultDiv = document.getElementById('result');
const orientationSelect = document.getElementById('orientation'); // For orientation

convertButton.addEventListener('click', () => {
    const formData = new FormData(imageForm);
    const selectedOrientation = orientationSelect.value; // Get the selected orientation

    // Append the selected orientation to the FormData
    formData.append('orientation', selectedOrientation);

    // Check if no files are selected
    if (imageInput.files.length === 0) {
        // Display a SweetAlert error message
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please select one or more images to convert!',
        });
    } else {
        // Files are selected, proceed with the conversion
        const formData = new FormData(imageForm);
        orientationSelect.selectedIndex = 0;    // Reset the <select>
        imageInput.value = '';                  // Clear the <input>

        fetch('/imgToPdf/convert', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Display a SweetAlert success message with a download button
            Swal.fire({
                icon: 'success',
                title: 'PDF Converted!',
                text: 'Click the button below to download the PDF.',
                showCancelButton: false,
                confirmButtonText: 'Download PDF',
                customClass: {
                    confirmButton: 'download-button'
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirect to the PDF download link
                    window.location.href = data.pdfUrl;
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred.';
        });
    }
});