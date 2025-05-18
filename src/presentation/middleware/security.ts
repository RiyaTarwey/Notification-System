import {
  scrypt,
  randomFill,
  createCipheriv,
  createDecipheriv,
  randomFillSync
} from "crypto";
import dotenv from "dotenv";
dotenv.config();

const algorithm = process.env.HASH_ALGORITHM as string;
const password = process.env.HASH_PASS as string;
const salt = process.env.HASH_SALT as string;

// Helper function for encryption
export function encrypt(plaintext: string): Promise<string> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, 32, (err, key) => {
      if (err) return reject(err);

      const iv = Buffer.alloc(16); // Initialization Vector (16 bytes for AES)
      randomFill(iv, (err: any) => {
        if (err) return reject(err);

        try {
          const cipher = createCipheriv(algorithm, key, iv);
          let encrypted = '';
          cipher.setEncoding('hex');

          cipher.on('data', (chunk) => encrypted += chunk);
          cipher.on('end', () => {
            // Concatenate IV and encrypted data
            const result = iv.toString('hex') + encrypted;
            resolve(result);
          });

          cipher.write(plaintext);
          cipher.end();
        } catch (cipherErr) {
          reject(cipherErr);
        }
      });
    });
  });
}

// Helper function for decryption
export function decrypt(ciphertext: string): Promise<string> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, 32, (err, key) => {
      if (err) {
        console.error("Scrypt error:", err);
        return reject(err);
      }

      try {
        const iv = Buffer.from(ciphertext.slice(0, 32), 'hex');
        const encryptedData = Buffer.from(ciphertext.slice(32), 'hex');

        const decipher = createDecipheriv(algorithm, key, iv);
        let decrypted = '';

        decipher.on('readable', () => {
          let chunk;
          while (null !== (chunk = decipher.read())) {
            decrypted += chunk.toString('utf8');
          }
        });

        decipher.on('end', () => {
          resolve(decrypted);
        });

        decipher.on('error', (err) => {
          console.error("Decipher error:", err);
          reject(err);
        });

        decipher.write(encryptedData);
        decipher.end();
      } catch (error) {
        console.error("Decryption error:", error);
        reject(error);
      }
    });
  });
}

// Random password generator
export function generateRandomPassword(length: number): string {
  const buffer = Buffer.alloc(length);
  randomFillSync(buffer);
  return buffer.toString('base64').slice(0, length);
}