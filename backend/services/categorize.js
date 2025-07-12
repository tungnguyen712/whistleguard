const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function categorize(title) {
    const categoryRoute = [
        // Governance / Corruption
        { name: "Corruption", routeTo: "Anti-Corruption NGO" },
        { name: "Fraud", routeTo: "Anti-Corruption NGO" },
        { name: "Bribery", routeTo: "Anti-Corruption NGO" },
        { name: "Embezzlement", routeTo: "Anti-Corruption NGO" },
        { name: "Conflict of Interest", routeTo: "Anti-Corruption NGO" },
        { name: "Whistleblower Retaliation", routeTo: "Whistleblower Protection Org" },
        { name: "Policy Violation", routeTo: "Legal Aid Organization" },
        { name: "Unethical Behavior", routeTo: "Legal Aid Organization" },

        // Human Rights / Discrimination
        { name: "Harassment", routeTo: "Human Rights Organization" },
        { name: "Sexual Harassment", routeTo: "Gender Rights NGO" },
        { name: "Discrimination", routeTo: "Civil Rights NGO" },
        { name: "Bullying", routeTo: "Youth Advocacy Group" },
        { name: "Retaliation", routeTo: "Labor Watchdog" },
        { name: "Threats or Intimidation", routeTo: "Human Rights Organization" },
        { name: "Stalking", routeTo: "Victim Support NGO" },
        { name: "Defamation or Slander", routeTo: "Legal Aid Organization" },
        { name: "Nepotism", routeTo: "Good Governance NGO" },
        { name: "Favoritism", routeTo: "Good Governance NGO" },
        { name: "Abuse of Power", routeTo: "Human Rights Organization" },

        // Labor / Worker Rights
        { name: "Unfair Hiring or Promotion", routeTo: "Labor Rights Organization" },
        { name: "Wage Theft", routeTo: "Labor Rights Organization" },
        { name: "Excessive Workload", routeTo: "Occupational Health NGO" },
        { name: "Workplace Violence", routeTo: "Worker Protection NGO" },
        { name: "Unsafe Working Conditions", routeTo: "Worker Protection NGO" },

        // Education-related
        { name: "Academic Misconduct", routeTo: "Education Oversight Group" },
        { name: "Cheating or Plagiarism", routeTo: "Education Oversight Group" },
        { name: "Faculty Misconduct", routeTo: "Academic Ethics Committee" },
        { name: "Grading Bias", routeTo: "Academic Ethics Committee" },
        { name: "Inappropriate Relationships", routeTo: "Student Advocacy NGO" },
        { name: "Accessibility Issue", routeTo: "Disability Rights Group" },

        // Environmental / Health & Safety
        { name: "Environmental Hazard", routeTo: "Environmental NGO" },
        { name: "Health Code Violation", routeTo: "Public Health Watchdog" },
        { name: "Fire Safety Violation", routeTo: "Urban Safety Org" },
        { name: "Hazardous Materials", routeTo: "Environmental NGO" },
        { name: "Facilities Issue", routeTo: "Community Infrastructure Org" },

        // Tech & Privacy
        { name: "Data Privacy Violation", routeTo: "Digital Rights NGO" },
        { name: "Cyberbullying", routeTo: "Online Safety NGO" },
        { name: "Unauthorized System Access", routeTo: "Digital Rights NGO" },
        { name: "IT Misuse", routeTo: "Tech Oversight Group" },
        { name: "Phishing or Social Engineering", routeTo: "Cybersecurity Watchdog" },

        // Public Security / Safety
        { name: "Safety Violation", routeTo: "Public Safety NGO" },
        { name: "Suspicious Activity", routeTo: "Community Watch Group" },
        { name: "Theft", routeTo: "Local Justice NGO" },
        { name: "Vandalism", routeTo: "Community Watch Group" },
        { name: "Noise Complaint", routeTo: "Community Mediation Center" },
        { name: "Lost and Found", routeTo: "Public Information Center" },

        // Catch-all
        { name: "Other", routeTo: "General Public Interest Organization" }
    ];

    let allowedCategories = categoryRoute.map(c => c.name);

    const prompt = 
        `Categorize the following report title into one of the following categories: ${allowedCategories.map(c => `"${c}"`).join(", ")}.
        \n\nTitle: "${title}"
        \n\nCategory (one word or phrase only, exactly as listed above):`;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.2,
        });

        const category = completion.choices[0].message.content.trim().toLowerCase();
        
        const normalizedAllowed = allowedCategories.map(c => c.toLowerCase());
        const idx = normalizedAllowed.indexOf(category.toLowerCase());
        return idx !== -1 ? allowedCategories[idx] : "Other";

    } catch (error) {
        console.error("OpenAI error:", error);
        return "other";
    }
}



module.exports = categorize;