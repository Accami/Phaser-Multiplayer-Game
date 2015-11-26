var Player = function (startX, startY) {
	var x = startX;
	var y = startY;
	var id;

	// Getters and setters
	var getX = function () {
		return x;
	}

	var getY = function () {
		return y;
	}

	var setX = function (newX) {
		x = newX;
	}

	var setY = function (newY) {
		y = newY;
	}

}

module.exports.Player = Player;