const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

// Replace with your OpenAI API key
const OPENAI_API_KEY = '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';

app.use(cors());
app.use(bodyParser.json());

app.post('/submit-survey', async (req, res) => {
    try {
        const userInputs = req.body;
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a watch recommendation engine. Provide the top 5 watches with brief descriptions and short histories based on the input survey.'
                    },
                    {
                        role: 'user',
                        content: `Here are the survey responses: ${JSON.stringify(userInputs)}.`
                    }
                ]
            })
        });

        const data = await response.json();
        res.json(data);  // Ensure you return valid JSON response
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing survey.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
