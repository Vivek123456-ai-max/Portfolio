const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'models', 'character_unencrypted.glb');
const buffer = fs.readFileSync(filePath);

// Simple GLB parser to find materials
const magic = buffer.readUInt32LE(0);
if (magic !== 0x46546C67) {
    console.log("Not a GLB file");
    process.exit(1);
}

const length = buffer.readUInt32LE(8);
let chunkLength = buffer.readUInt32LE(12);
let chunkType = buffer.readUInt32LE(16);

if (chunkType === 0x4E4F534A) { // JSON
    const jsonStr = buffer.toString('utf8', 20, 20 + chunkLength);
    const json = JSON.parse(jsonStr);
    const data = { materials: json.materials, meshes: json.meshes };
    fs.writeFileSync('glb_data.json', JSON.stringify(data, null, 2));
}
