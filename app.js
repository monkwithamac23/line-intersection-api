const express = require('express');
const bodyParser = require('body-parser');
const turf = require('@turf/turf');

const app = express();
const port = 8080;

// Increase the maximum payload size to 1MB (or any size you require)
app.use(bodyParser.json({ limit: '1mb' }));

const AuthToken = 'YOUR_AUTH_TOKEN'; // Replace this with your actual authentication token

function authenticate(req, res, next) {
  const authToken = req.headers.authorization;
  if (authToken !== `Bearer ${AuthToken}`) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    next();
  }
}

app.post('/checkIntersections', authenticate, (req, res) => {
  const linestring = req.body;
  if (!linestring || linestring.type !== 'LineString' || !linestring.coordinates || linestring.coordinates.length < 2) {
    res.status(500).json({ error: 'Invalid linestring' });
    return;
  }

  const lines = generateRandomLines();

  // Split the long linestring into smaller chunks
  const chunkedLinestrings = splitLineString(linestring, 1000); // Adjust the chunk size as needed

  // Process each chunk separately
  const intersections = [];
  for (const chunk of chunkedLinestrings) {
    const chunkIntersections = findIntersections(chunk, lines);
    intersections.push(...chunkIntersections);
  }

  if (intersections.length === 0) {
    res.json([]); // No intersections
  } else {
    res.json(intersections);
  }
});

function generateRandomLines() {
  // Simulate 50 randomly spread lines
  const lines = [];
  for (let i = 1; i <= 50; i++) {
    const line = turf.lineString([
      [randomFloat(), randomFloat()],
      [randomFloat(), randomFloat()],
    ], { id: `L${i}` });
    lines.push(line);
  }
  return lines;
}

function randomFloat() {
  // Simulate random float values between -10 and 10
  return -10 + Math.random() * 20;
}

function findIntersections(linestring, lines) {
  const intersections = [];
  for (const line of lines) {
    const intersect = turf.lineIntersect(line, linestring);
    if (intersect.features.length > 0) {
      const intersection = intersect.features[0].geometry.coordinates;
      intersections.push({
        id: line.properties.id,
        intersection: {
          type: 'Point',
          coordinates: intersection,
        },
      });
    }
  }
  return intersections;
}

function splitLineString(linestring, chunkSize) {
    const chunkedLinestrings = [];
    let currentChunk = [linestring.coordinates[0]];
    for (let i = 1; i < linestring.coordinates.length; i++) {
      currentChunk.push(linestring.coordinates[i]);
      if (i % chunkSize === 0) {
        chunkedLinestrings.push(turf.lineString(currentChunk));
        currentChunk = [linestring.coordinates[i]]; // Start the next chunk with the last point of the previous chunk
      }
    }
    if (currentChunk.length > 1) {
      chunkedLinestrings.push(turf.lineString(currentChunk));
    }
    return chunkedLinestrings;
  }
  

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
