module.exports = class {

	constructor() {
		this.lastMessage = null;
	}
	convertToFarenhiet(celcius) {
		return (((celcius * 9) / 5) + 32).toFixed(4);
	}

	convertToCelcius(farenhiet) {
		return ((farenhiet - 32) * 5 / 9).toFixed(4);
	}

	completeJSONVariable(json) {
		console.log(json);
		// Parse through the request. Based on what it is, we will serve a calculation and add it to the JSON.
		switch(json.request) {
			case "celcius":
				json.farenhiet = isNaN(json.farenhiet) ? 0 : parseFloat(json.farenhiet);
				json.celcius = this.convertToCelcius(json.farenhiet);
				break;
			case "farenhiet":
				json.celcius = isNaN(json.celcius) ? 0 : parseFloat(json.celcius); 
				json.farenhiet = this.convertToFarenhiet(json.celcius);
				break;
			default:
				break;
		}

		this.lastMessage = json;
	}

	getLastMessage() {
		return this.lastMessage;
	}


};
