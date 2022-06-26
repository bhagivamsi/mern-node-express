const e = require("express");
const fs = require("fs");
const readline = require("readline");
const prompt = require("prompt-sync")();

const FILE_CONTENT = "You are awesome";

const FILE_WITH_FILE_NAMES = "fileNames.txt";
var fileNameArray = [];
var fileNameArrayLength = 0;

function checkAndCreateFile() {
	var fileName = prompt("Please provide filename : ");
	loadFileNames(() => {
		while (true) {
			if (checkForExistingFile(fileName)) {
				fileName = prompt("File ALready exists. Provide another file name : ");
			} else {
				break;
			}
		}

		writeFileName(fileName, () => {
			var writableStream = fs.createWriteStream(fileName);
			writableStream.write(FILE_CONTENT, "UTF-8");
			writableStream.end();
			writableStream.on("finish", () => {
				console.log("File writing completed.");
				return;
			});
		});
	});
}

function loadFileNames(callback) {
	fs.closeSync(fs.openSync(FILE_WITH_FILE_NAMES, "a"));
	const rl = readline.createInterface({
		input: fs.createReadStream(FILE_WITH_FILE_NAMES),
		crlfDelay: Infinity,
	});
	rl.on("line", (line) => {
		console.log(`Line from file: ${line}`);
		fileNameArray[fileNameArrayLength++] = line;
	});
	rl.on("close", () => {
		console.log("CLOSED");
		if (callback != undefined) callback();
	});
	return fileNameArray;
}

function writeFileName(fileName, callback) {
	fs.appendFile(FILE_WITH_FILE_NAMES, fileName + "\n", (err) => {
		if (err) {
			throw err;
		}
		fileNameArray[fileNameArrayLength++] = fileName;
		console.log("FILE NAME ADDED");
		callback();
	});
}

function checkForExistingFile(fileNameToCheck) {
	console.log("CHECKING FOR FILE NAME");
	console.log("FILENAMES");
	console.log(fileNameArray);
	console.log(fileNameArrayLength);
	for (i = 0; i < fileNameArrayLength; i++) {
		const newLocal = fileNameArray[i];
		if (newLocal == undefined) {
			return false;
		}
		console.log(
			newLocal.toUpperCase() +
				"\t" +
				fileNameToCheck.toUpperCase() +
				"\t" +
				(newLocal.toUpperCase() == fileNameToCheck.toUpperCase())
		);
		if (newLocal.toUpperCase() == fileNameToCheck.toUpperCase()) {
			return true;
		}
	}
	return false;
}
module.exports.checkAndCreateFile = checkAndCreateFile;
module.exports.loadFileNames = loadFileNames;
