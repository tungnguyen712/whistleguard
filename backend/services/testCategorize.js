require('dotenv').config();
const categorize = require('./categorize');

(async () => {
    const category = await categorize("A coworker keeps making inappropriate jokes.");
    console.log("Category:", category);
})();