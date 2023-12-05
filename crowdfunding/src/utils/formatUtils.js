export function splitStringIntoLines(str, maxLength) {
	const result = [];
	let index = 0;

	while (index < str.length) {
		result.push(str.slice(index, index + maxLength));
		index += maxLength;
	}

	return result;
}

export function formatTimestamp(timestamp) {
	const date = new Date(parseInt(timestamp) * 1000); // Convertit le timestamp en millisecondes

	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ajoute un 0 si nécessaire pour le mois
	const day = date.getDate().toString().padStart(2, "0"); // Ajoute un 0 si nécessaire pour le jour
	const hour = date.getHours().toString().padStart(2, "0"); // Ajoute un 0 si nécessaire pour l'heure
	const minute = date.getMinutes().toString().padStart(2, "0"); // Ajoute un 0 si nécessaire pour les minutes
	const second = date.getSeconds().toString().padStart(2, "0"); // Ajoute un 0 si nécessaire pour les secondes

	const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
	return formattedDate;
}

export function chunkString (str, size) {
	if(str) {
		const chunks = [];
		for (let i = 0; i < str.length; i += size) {
			chunks.push(str.substring(i, i + size));
		}
		if(chunks.length > 2) {
			return chunks[0] + '...' + chunks[chunks.length - 1];
		}
		return chunks;
	}
	return '';
}
