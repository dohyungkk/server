const csv = require('csv-parser');
const fs = require('fs');

exports.getVehicles = (req, res) => {
    let results = []
    fs.createReadStream('./vehicles.csv')
        .pipe(csv())
        .on('data', (data) => {
            results.push(data);
        })
        .on('end', () => {
            const offset = parseInt(req.query.offset) || 0;
            const limit = parseInt(req.query.limit) || results.length;

            results = results.slice(offset, offset + limit);

            res.status(200).send({
                vehicles: results
            });
        });
};
