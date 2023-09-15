import xlsx from 'xlsx';
import mongoose from 'mongoose';

const extractDataFromExcel = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

  const headers = jsonData[0];

  const data = jsonData.slice(1).map((row) => {
    const rowData = {};
    row.forEach((value, index) => {
      rowData[headers[index]] = value;
    });
    return rowData;
  });

  console.log('Data extracted from Excel:', data); // Add this line

  return data;
};

const SchemalessUploadSchema = new mongoose.Schema({
  tenantId: String,
  tenantName: String,
  data: mongoose.Schema.Types.Mixed,
});

const SchemalessUpload = mongoose.model('SchemalessUpload', SchemalessUploadSchema);

const uploadFile = async (req, res) => {
  if (!req.file) {
    console.log('No file uploaded'); // Add this line
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = req.file.path;
  console.log('File path:', filePath); // Add this line
  const data = extractDataFromExcel(filePath);

  const tenantId = req.body.tenantId;
  const tenantName = req.body.tenantName;

  if (!tenantId || !tenantName) {
    console.log('Tenant ID and Tenant Name are required'); // Add this line
    return res.status(400).json({ error: 'Tenant ID and Tenant Name are required' });
  }

  try {
    const newUpload = new SchemalessUpload({
      tenantId,
      tenantName,
      data,
    });

    await newUpload.save();

    console.log('Data saved successfully'); // Add this line
    return res.status(200).json({
      message: 'Data saved successfully',
      insertedId: newUpload._id,
    });
  } catch (err) {
    console.error('Failed to save data to MongoDB:', err); // Add this line
    return res.status(500).json({ error: 'Failed to save data to MongoDB' });
  }
};

export { uploadFile };
