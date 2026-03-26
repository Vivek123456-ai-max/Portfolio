const crypto = require("crypto");
const fs = require("fs");

const decryptFile = (inputFile, outputFile, password) => {
  const key = crypto.createHash("sha256").update(password).digest();

  const encBuffer = fs.readFileSync(inputFile);
  const iv = encBuffer.slice(0, 16);
  const data = encBuffer.slice(16);

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);

  fs.writeFileSync(outputFile, decrypted);
};

decryptFile("public/models/character.enc", "public/models/character_unencrypted.glb", "Character3D#@");
