const { OpenAI } = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function categorize(title) {
    const allowedCategories = [
      "Corruption",
      "Fraud",
      "Bribery",
      "Embezzlement",
      "Abuse of Power",
      "Discrimination",
      "Harassment",
      "Retaliation",
      "Safety Violation",
      "Conflict of Interest",
      "Theft",
      "Misuse of Resources",
      "Policy Violation",
      "Unethical Behavior",
      "Other"
    ];

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