const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const envPath = path.join(__dirname, '..', '.env')
if (!fs.existsSync(envPath)) {
    console.error('.env file not found. Please create one before generating secrets.');
    process.exit(1);
}

const env = fs.readFileSync(envPath, 'utf-8');

function makeSecret(length = 64) {
    return crypto.randomBytes(length).toString('hex')
}

let out = env;
const replacements = [
    { key: 'JWT_ACCESS_TOKEN_SECRET', placeholder: 'your_jwt_access_token_secret'},
    { key: 'JWT_REFRESH_TOKEN_SECRET', placeholder: 'your_jwt_refresh_token_secret'},
]

replacements.forEach(({key, placeholder}) => {
    const regex = new RegExp(`^${key}=(.*)$`, 'm');
    const match = out.match(regex);

    if (match) {
        const current = match[1].trim();
        if (!current || current === placeholder) {
            const secret = makeSecret(48);
            out = out.replace(regex, `${key}=${secret}`);
            console.log(`Generated new secret for ${key}`);
        } else {
            console.log(`Secret for ${key} already set. Skipping.`);
        }
    } else {
        const secret = makeSecret(48);
        out += `\n${key}=${secret}`;
        console.log(`Added new secret for ${key}`);
    }
})

fs.writeFileSync(envPath, out, 'utf-8');
console.log('Secrets generation completed.');