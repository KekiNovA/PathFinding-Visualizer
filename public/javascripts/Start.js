import Board from "./border.js";
import Dijkstra from "./Dijkstra.js"

function initialize() {
	var temp = document.getElementsByClassName("algorithm");						//adds events listenrs on navbar and calls Board
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
			var e = event.target.value;
			e = e.split(" ");
			switch (e[1]) {
				case "Dijkstra":
					Dijkstra(newBoard,newBoard.start , 0);
					break;
				case "A*":
					alert("A*");
				  break;
				case "BFS":
					alert("BFS");
				  break;
				case "DFS":
					alert("DFS");
				  break;
				default:
					alert("Select Algo First.");
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
