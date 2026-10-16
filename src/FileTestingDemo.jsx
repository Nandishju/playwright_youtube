
import { useState } from 'react';

export default function FileTestingDemo() {
  const [fileName, setFileName] = useState('');
  const [uploadStatus, setUploadStatus] = useState(
    'No file selected'
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setFileName('');
      setUploadStatus('No file selected');
      return;
    }

    setFileName(file.name);

    const allowedTypes = [
      'application/pdf',
      'image/png',
    ];

    if (!allowedTypes.includes(file.type)) {
      setUploadStatus('Unsupported file type');
      return;
    }

    setUploadStatus(`Selected file: ${file.name}`);
  };

  const handleDownload = () => {
    const content = 'Hello! This is a sample downloaded file.';
    const blob = new Blob([content], {
      type: 'text/plain',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'sample.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <section
      style={{
        maxWidth: '700px',
        margin: '30px auto',
        padding: '24px',
        border: '1px solid #ddd',
        borderRadius: '10px',
      }}
    >
      <h2>Playwright File Upload & Download</h2>

      <div style={{ marginBottom: '28px' }}>
        <h3>File Upload</h3>

        <label htmlFor="file-upload">
          Choose a PDF or PNG file:
        </label>

        <br />

        <input
          id="file-upload"
          type="file"
          accept=".pdf,.png"
          onChange={handleFileChange}
        />

        <p data-testid="upload-status" role="status">
          {uploadStatus}
        </p>

        {fileName && (
          <p data-testid="selected-file-name">
            File name: {fileName}
          </p>
        )}
      </div>

      <hr />

      <div style={{ marginTop: '24px' }}>
        <h3>File Download</h3>

        <p>Download a sample text file.</p>

        <button
          type="button"
          onClick={handleDownload}
          data-testid="download-button"
        >
          Download Sample File
        </button>
      </div>
    </section>
  );
}
