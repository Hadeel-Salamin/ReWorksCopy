const Airtable = require('airtable');

const { Airtable_API_KEY } = process.env;
const base = new Airtable({ apiKey: Airtable_API_KEY }).base('appAZnpLnWP0wjAc6');

exports.getItems = (req, res) => {
  const { userAirtableId } = req;
  const data = [];

  base('Items')
    .select({
      view: 'Main View',
    })
    .eachPage(
      (records, fetchNextPage) => {
        records.forEach((record) => {
          if (record.get('Users')[0] === userAirtableId) {
            data.push({
              itemId: record.id,
              type: record.get('Type'),
              size: record.get('Size'),
              url: record.get('Image URL'),
              name: record.get('Name'),
              price: record.get('Price'),
              color: record.get('Colors'),
              brand: record.get('Brand Names'),
              condition: record.get('Condition'),
              age: record.get('Age'),
              details: record.get('Details'),
            });
          }
        });
        fetchNextPage();
      },
      (err) => {
        if (err) {
          return res.json({ success: 'false', message: err });
        }
        return res.json({ success: 'true', data });
      },
    );
};
