const csv = require('csv-parser');
const fs = require('fs');

exports.getVehicles = (req, res) => {
    const email = req.header('email')
    const decoded_key = Buffer.from(req.header('secret_key'), 'base64').toString('utf8')
    if ( decoded_key !== email ) {
        return res.status(401).send('Unauthorized');
    }

    let results = []
    fs.createReadStream('./vehicles.csv')
        .pipe(csv())
        .on('data', (data) => {
            results.push(data);
        })
        .on('end', () => {
            const offset = parseInt(req.query.offset) || 0;
            const limit = parseInt(req.query.limit) || results.length;

            vehicles = results.slice(offset, offset + limit);

            res.status(200).send({
                vehicles: vehicles,
                total: results.length
            });
        });
};
