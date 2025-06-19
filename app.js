const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let submissions = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

// Handle submission
app.post('/submit', (req, res) => {
    const { name, email, age, feedback } = req.body;

    // Server-side validation
    if (!name || !email || !age || !feedback) {
        return res.render('error', { message: 'All fields are required!' });
    }

    if (!email.includes('@')) {
        return res.render('error', { message: 'Invalid email format.' });
    }

    if (isNaN(age) || age < 10 || age > 100) {
        return res.render('error', { message: 'Age must be a number between 10 and 100.' });
    }

    submissions.push({ name, email, age, feedback });

    res.render('thankyou', { name, email, age, feedback });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
