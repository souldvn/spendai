import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const execAsync = promisify(exec);

const certDir = path.join(__dirname, 'cert');

// Create cert directory if it doesn't exist
if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir);
}

try {
  // Generate private key
  console.log('Generating private key...');
  await execAsync('openssl genrsa -out cert/key.pem 2048');
  console.log('Private key generated successfully');

  // Generate certificate signing request
  console.log('Generating CSR...');
  await execAsync('openssl req -new -key cert/key.pem -out cert/csr.pem -subj "/CN=localhost"');
  console.log('CSR generated successfully');

  // Generate self-signed certificate
  console.log('Generating self-signed certificate...');
  await execAsync('openssl x509 -req -days 365 -in cert/csr.pem -signkey cert/key.pem -out cert/cert.pem');
  console.log('Self-signed certificate generated successfully');
} catch (error) {
  console.error('Error generating certificates:', error);
  process.exit(1);
} 