const csv = require('csv-parser');
const fs = require('fs');

exports.login = (req, res) => {
    let users = []
    fs.createReadStream('./users.csv')
    .pipe(csv())
    .on('data', (data) => {
        users.push(data);
    })
    .on('end', () => {
        const { email, password } = req.body
        console.log(req)
        const user = users.find((u) => u.email === email && u.password === password);
        const isUserFound = !!user;

        // Check if the provided email and password match the dummy credentials.
        if (isUserFound) {
            // Successful login, return 200 status code.
            res.status(200).send({
                message: 'Login successful!'
            });
        } else {
            // Login failed, return 400 status code.
            res.status(400).send({
                error: 'Invalid email or password'
            });
        }
    });
} 