import { useState } from 'react';
import './styles/Step1.css';

function Step1({ data, next, previous }) {
    const [title, setTitle] = useState(data.title || '');
    const [description, setDescription] = useState(data.description || '');

    const handleNext = () => {
        const stepData = {
            title: title.trim(),
            description: description.trim()
        }
        next(stepData);
    };

    return (
        <div className="step1-container">
            <h2 className="step1-title">Incident Report Form</h2>
            <p className="step1-desc">Feel free to share us your story anonymously...</p>

            <div className="step1-field-group">
                <label htmlFor="title" className="step1-label">Title</label>
                <input 
                    type="text"
                    id="title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="step1-input"
                />
            </div>

            <div className="step1-field-group">
                <label htmlFor="description" className="step1-label">Description</label>
                <textarea 
                    id="description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="step1-textarea"
                    rows={3}
                />
            </div>

            <div className="step1-actions">
                {previous && (
                    <button type="button" className="step1-prev-btn" onClick={previous}>
                        Previous step
                    </button>
                )}
                <button 
                    type="button"
                    className="step1-next-btn"
                    onClick={handleNext}
                    disabled={!title}
                >
                    Next step
                </button>
            </div>
        </div>
    )
}

export default Step1;