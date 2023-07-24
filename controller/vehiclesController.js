const csv = require('csv-parser');
const fs = require('fs');

exports.getVehicles = (req, res) => {
    const email = req.header('email')

    // This logic is just to demonstrate the idea of extra security improvement
    const decoded_key = Buffer.from(req.header('secret_key'), 'base64').toString('utf8')
    if ( decoded_key !== email ) {
        return res.status(401).send('Unauthorized');
    }

    let results = []
    fs.createReadStream('./Database - Vehicles Table.csv')
        .pipe(csv())
        .on('data', (data) => {
            results.push(data);
        })
        .on('end', () => {
            // Without any offset/limit given, it loads everything.
            // I wanted to limit the amount of data loading to prevent crash
            const offset = parseInt(req.query.offset) || 0;  
            const limit = parseInt(req.query.limit) || results.length;

             // With a relational database, offset + limit is not needed but just limit
             // slice(offset, limit) was omitting n number of offset 
            vehicles = results.slice(offset, offset + limit);

            res.status(200).send({
                vehicles: vehicles,
                total: results.length
            });
        });
};
