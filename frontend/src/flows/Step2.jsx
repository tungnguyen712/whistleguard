import { useState } from 'react';
import "./styles/Step2.css";
import { FileUploadIcon} from '../assets/icons';

function Step2({ data, next, previous}) {
    const [files, setFiles] = useState(data.files || []);

    const handleDrop = (e) => {
        e.preventDefault();
        const uploadededFiles = Array.from(e.dataTransfer.files);
        setFiles((prevFiles) => [...prevFiles, ...uploadededFiles]);
    };

    const handleBrowse = (e) => {
        const uploadedFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    }

    const removeFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    }

    const handleNext = () => {
        next({ files });
    }

    return (
        <div className="step2-container">
            <h2 className="step2-title">Incident Report Form</h2>
            <p className="step2-desc">Feel free to share us your story anonymously...</p>

            <h3>Proof Upload</h3>
            <p>Upload your documents here, and you can upload up to 10 files max</p>
            <div 
                className="file-upload-area"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <div className="file-upload-icon">
                    <FileUploadIcon size={80} className="step2-icon" alt="Upload icon" />
                </div>
                <div className="file-drag-text">
                    Drag your file(s) to start uploading
                </div>
                <div className="or-separator"><span>OR</span></div>
                <label className="browse-files-button">
                    Browse files
                    <input 
                        type="file" 
                        multiple 
                        onChange={handleBrowse}
                        style={{ display: 'none' }}
                    />
                </label>
            </div>

            <ul className="uploaded-files-list">
                {files.map((file, index) => (
                    <li key={index} className="uploaded-file-item">
                        <span>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        <button className="remove-file-button" onClick={() => removeFile(index)}>x</button>
                    </li>
                ))}
            </ul>

            <div className="step-buttons">
                <button className="previous-button" onClick={previous}>Previous step</button>
                <button className="next-button" onClick={handleNext} disabled={files.length === 0}>Submit Report</button>
            </div>
        </div>
    )
}

export default Step2;