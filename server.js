const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const XLSX = require('xlsx');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve the static files (HTML, CSS, JS) from the "public" directory
app.use(express.static('public'));

// Endpoint to handle contact form submissions
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Load the existing Excel file or create a new one
    let workbook;
    const filePath = './contact_data.xlsx';
    if (fs.existsSync(filePath)) {
        workbook = XLSX.readFile(filePath);
    } else {
        workbook = XLSX.utils.book_new();
        workbook.SheetNames.push('Contacts');
        workbook.Sheets['Contacts'] = XLSX.utils.aoa_to_sheet([['Name', 'Email', 'Message']]);
    }

    // Append the new contact data
    const worksheet = workbook.Sheets['Contacts'];
    const newRow = [name, email, message];
    const newRowNumber = XLSX.utils.sheet_add_aoa(worksheet, [newRow], { origin: -1 });

    // Save the updated Excel file
    XLSX.writeFile(workbook, filePath);

    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
