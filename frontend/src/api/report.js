const API_BASE = "https://5fu4yvoafi.execute-api.ap-southeast-1.amazonaws.com";

export async function prepareUpload(fileName, token = null) {
    const res = await fetch(`${API_BASE}/prepare-upload`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fileName, token })
    });

    if (!res.ok) {
        throw new Error("Failed to prepare upload");
    }
    return res.json();
}

export async function uploadFile(uploadUrl, file) {
    const res = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': file.type || 'application/octet-stream',
            'x-amz-server-side-encryption': 'aws:kms',
            'x-amz-server-side-encryption-aws-kms-key-id': import.meta.env.VITE_KMS_KEY_ID
        },
        body: file
    });
    console.log("Using KMS key:", import.meta.env.VITE_KMS_KEY_ID);

    if (!res.ok) {
        const text = await res.text();
        console.error("S3 error:\n", text);  
        throw new Error("Failed to upload file");
    };
}

export async function submitReport({ token, title, description }) {
    const res = await fetch(`${API_BASE}/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, title, description })
    });

    if (!res.ok) {
        throw new Error("Failed to submit report");
    }

    return res.json();
}

export async function trackReport(token) {
    const res = await fetch(`${API_BASE}/track?token=${encodeURIComponent(token)}`);

    if (!res.ok) {
        throw new Error("Failed to track report");
    }

    return res.json();
}