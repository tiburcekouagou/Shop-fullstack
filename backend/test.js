const bcrypt = require('bcrypt')

const rounds = 16;
const password = 'a';

(async () => {
    const salt = await bcrypt.genSalt(rounds);
    console.log({salt})
    const hash = await bcrypt.hash(password, salt);
    console.log({hash})
    const match = await bcrypt.compare(password, hash);
    console.log({match})
})();