
export async function sha256ToBytes32(message) {
	const msgBuffer = new TextEncoder().encode(message);
	const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const paddedHashArray = new Uint8Array(32);
	paddedHashArray.set(hashArray, 0);
	const hashHex = Array.prototype.map
		.call(paddedHashArray, (x) => ("00" + x.toString(16)).slice(-2))
		.join("");
	return "0x" + hashHex;
}
