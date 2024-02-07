const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const url = require('url');

const publicFolder = 'public'; // Define the public folder name

// Function to download HTML content from a URL and save it to a file
function downloadHTML(urlString, outputFilename) {
    const parsedUrl = new URL(urlString);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;

    protocol.get(urlString, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            const outputPath = path.join(publicFolder, outputFilename);
            fs.writeFile(outputPath, data, (err) => {
                if (err) {
                    console.error(`Error writing to ${outputPath}: ${err}`);
                } else {
                    console.log(`Wrote to ${outputPath}`);
                }
            });
        });
    }).on('error', (err) => {
        console.error(`Couldn't download ${urlString}: ${err}`);
    });
}

// Function to read file containing URLs and process each one
function processURLs(filename) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${filename}: ${err}`);
            process.exit(1); // Exit with error code
        }

        const urls = data.split('\n').filter(Boolean); // Split by newline, filter out empty lines

        urls.forEach((urlString) => {
            const parsedUrl = new URL(urlString);
            const hostname = parsedUrl.hostname;
            const outputFilename = hostname; // Remove .txt extension

            downloadHTML(urlString, outputFilename);
        });
    });
}

// Entry point
if (process.argv.length !== 3) {
    console.error('Usage: node urls.js FILENAME');
    process.exit(1); // Exit with error code
}

const filename = process.argv[2];
processURLs(filename);
