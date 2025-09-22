const Distribution = require("../modals/distribuiton");
const Agent = require("../modals/agent");
const csv = require("csv-parser");
const xlsx = require("xlsx");
const fs = require("fs");

exports.uploadAndDistribute = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const extension = req.file.originalname.split(".").pop();

    let items = [];
    

    // Parse based on file type
    if (extension === "csv") {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
          if (row.FirstName && row.Phone && row.Notes) {
            results.push({
              firstName: row.FirstName,
              phone: row.Phone,
              notes: row.Notes,
            });
          }
        })
        .on("end", async () => {
          await distributeAndSave(results, res);
          fs.unlinkSync(filePath); // cleanup
        });
    } else if (extension === "xlsx" || extension === "xls") {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      items = data.map((row) => ({
        firstName: row.FirstName,
        phone: row.Phone,
        notes: row.Notes,
      }));

      await distributeAndSave(items, res);
      fs.unlinkSync(filePath); // cleanup
    } else {
      return res.status(400).json({ message: "Invalid file format" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const distributeAndSave = async (items, res) => {
  try {
    const agents = await Agent.find();
    if (agents.length < 1) {
      return res.status(400).json({ message: "No agents available" });
    }

    // Clear old distributions
    await Distribution.deleteMany();

    const distributions = [];

    items.forEach((item, index) => {
      const agentIndex = index % agents.length; // distribute equally
      const agentId = agents[agentIndex]._id;

      let dist = distributions.find((d) => d.agentId.toString() === agentId.toString());
      if (!dist) {
        dist = { agentId, tasks: [] };
        distributions.push(dist);
      }
      dist.tasks.push(item);
    });

    await Distribution.insertMany(distributions);
    res.json({ message: "Tasks distributed successfully", distributions });
  } catch (err) {
    res.status(500).json({ message: "Distribution failed", error: err.message });
  }
};

exports.getDistributions = async (req, res) => {
  try {
    const distributions = await Distribution.find().populate("agentId", "name email");
    res.json(distributions);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
