var Player = function (startX, startY) {
	var x = startX;
	var y = startY;
	var id;

	// Getters and setters
	var getX = function () {
		return this.x;
	}

	var getY = function () {
		return this.y;
	}

	var getID = function () {
	    return this.id;
	}

	var setID = function (id) {
	    this.id = id;
	}

	var setX = function (x) {
		this.x = x;
	}

	var setY = function (y) {
		this.y = y;
	}

    // Define which variables and methods can be accessed
	return {
	    getX: getX,
	    getY: getY,
	    getID: getID,
	    setID: setID,
	    setX: setX,
	    setY: setY,
	    id: id
	}

}

module.exports.Player = Player;