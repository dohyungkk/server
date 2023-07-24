const csv = require('csv-parser');
const fs = require('fs');

const validateUserCredentials = (email, password) => {
    if (email.length === 0) {
        return {
            result : false,
            message : "Missing email",
            status : 400
        }
    }

    if (password.length === 0) {
        return {
            result : false,
            message : "Missing password",
            status : 400
        }
    }

    // Validate email format
    // Ref: https://www.w3resource.com/javascript/form/email-validation.php
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)===false) {
        return {
            result : false,
            message : "Invalid email format",
            status : 400
        }
    }

    // add more or make it a separate file for this f

    return {
        result : true
    }
}

exports.login = (req, res) => {
    let users = []
    fs.createReadStream('./users.csv')
    .pipe(csv())
    .on('data', (data) => {
        users.push(data);
    })
    .on('end', () => {
        const { email, password } = req.body
        let validator = validateUserCredentials(email, password)
        if(!validator.result){
            res.status(validator.status).send({
                message: validator.message
            })
            return
        }
        const user = users.find((u) => u.email === email && u.password === password);
        const isUserFound = !!user;

        // Check if the provided email and password match the dummy credentials.
        if (isUserFound) {
            // Successful login, return 200 status code.
            res.status(200).send({
                message: 'Login successful!',

                // this can be a JWT token...
                secret_key: Buffer.from(email).toString('base64')
            });
        } else {
            // Login failed, return 400 status code.
            res.status(400).send({
                message: 'Invalid email or password'
            });
        }
    });
}