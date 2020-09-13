import Board from "./border.js";

function initialize() {
	var temp = document.getElementsByClassName("algorithm");
	let i;
	for (i in temp) {
		for (i = 0; i < Object.keys(temp).length; i++)
		temp[i].addEventListener("click",algorithm);
	}
	document.getElementById("visualize").addEventListener("click", vclicked);
	document.getElementById("clear").addEventListener("click", cleard);
	function algorithm(event) {
		var e = event.target.id;
		document.getElementById('visualize').value = "Visualize " + event.target.text;
	}

	function vclicked(event) {
		if(event.target.value === "Visualize") {
			alert("Select Algo");
		}
		else {
			var e = event.target.value;
			e = e.split(" ");
			alert(e[1] + " Selected");
		}
	}


	function cleard(event) {
		location.reload(true);
	}
}

var navbar_height = 56;
var WinHeight = window.innerHeight;
var WinWidth = window.innerWidth;
let newBoard = new Board(Math.floor((WinHeight - navbar_height - 6) / 25), Math.floor(WinWidth / 25));
newBoard.initializeBoard();
initialize();
