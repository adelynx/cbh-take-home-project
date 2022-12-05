const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
    const MAX_PARTITION_KEY_LENGTH = 256;
    let candidate = this.candidate(event);

    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
        candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
    }

    return candidate;
};


exports.candidate = (event) => {
    let candidate = '0';

    if (event) {
        if (event.partitionKey) {
            candidate = event.partitionKey;
        } else {
            const data = JSON.stringify(event);
            candidate = crypto.createHash("sha3-512").update(data).digest("hex");
        }
    }

    if (candidate && typeof candidate !== "string") {
        candidate = JSON.stringify(candidate);
    }

    return candidate;
};