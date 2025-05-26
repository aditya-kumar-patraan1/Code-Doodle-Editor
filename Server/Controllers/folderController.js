const myModel = require("../Models/Schema");

const addFile = async (req, res) => {
  const { fileName, fileContent } = req.body;
  const userId = req.body.userId;

  // console.log("Received data:", req.body);
  // console.log("User ID:", userId);
  // console.log("File Name:", fileName);
  // console.log("File Content:", fileContent);

  if (!userId) {
    return res.send({
      status: 0,
      message: "User ID is required...",
    });
  }

  if (!fileName || !fileContent) {
    return res.send({
      status: 0,
      message: "Please complete the details are incomplete...",
    });
  }

  try {
    const myUser = await myModel.findById(userId);

    if (!myUser) {
      return res.send({
        status: 0,
        message: "User not found...",
      });
    }

    myUser.allFiles.push({
      dateCreated: Date.now(),
      fileName: fileName,
      fileContent: fileContent,
    });

    await myUser.save();

    return res.send({
      status: 1,
      message: "File added successfully...",
      allFiles: myUser.allFiles,
    });
  } catch (e) {
    return res.send({
      status: 0,
      message: e.message,
    });
  }
};

const deleteFile = async (req, res) => {
  const userId = req.body.userId;
  // console.log("Received data:", req.body);
  // console.log("User ID:", userId);

  if (!userId) {
    return res.send({
      status: 0,
      message: "User ID is required...",
    });
  }

  try {
    const myUser = await myModel.findById(userId);
    if (!myUser) {
      return res.send({
        status: 0,
        message: "User not found...",
      });
    }

    myUser.allFiles = []; // Clear all files

    await myUser.save();

    return res.send({
      status: 1,
      message: "All files deleted successfully...",
      allFiles: myUser.allFiles,
    });
  } catch (e) {
    return res.send({
      status: 0,
      message: e.message,
    });
  }
};

const deleteOneFile = async (req, res) => {
  const userId = req.body.userId;
  const fileName = req.body.fileName;

  // console.log("Received data:", req.body);  
  // console.log("User ID:", userId);
  // console.log("File Name:", fileName);

  if (!fileName) {
    return res.send({
      status: 0,
      message: "File name is required...",
    });
  }

  if (!userId) {
    return res.send({
      status: 0,
      message: "User ID is required...",
    });
  }

  try {
    const myUser = await myModel.findById(userId);
    if (!myUser) {
      return res.send({
        status: 0,
        message: "User not found...",
      });
    }

    const fileIndex = myUser.allFiles.findIndex(
      (file) => file.fileName === fileName
    );
    if (fileIndex === -1) {
      return res.send({
        status: 0,
        message: "File not found...",
      });
    }

    myUser.allFiles.splice(fileIndex, 1);

    await myUser.save();

    return res.send({
      status: 1,
      message: "File deleted successfully...",
      allFiles: myUser.allFiles,
    });
  } catch (e) {
    return res.send({
      status: 0,
      message: e.message,
    });
  }
};

module.exports = {
  addFile,
  deleteFile,
  deleteOneFile
};
