var fs = require("fs");
fs.writeFile(process.env.GCS_FILE, process.env.GCS_CRED, err => {});
