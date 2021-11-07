import crypto from 'crypto';
require('dotenv').config();

const algorithm = 'aes-256-ctr'; // algorithm to use
const key = process.env.SECRET_KEY;// secret key generates 32 bytes random data
const iv = crypto.randomBytes(16); // initVector generates 16 bytes random data

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

const decrypt = (hash) => {
    const iv = hash.substring(0,32);
    const content = hash.substring(32,hash.length);
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
    let decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
    return decrypted.toString();
};

export {encrypt, decrypt};