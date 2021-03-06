import Board from "./border.js";
import Dijkstra from "./Dijkstra.js";
import A_star from "./A_star.js";
import BFS from "./BFS.js";
import DFS from "./DFS.js";


function initialize() {

	var temp = document.getElementsByClassName("algorithm");						//adds events listenrs on navbar and calls Board
	let i;
	for (i in temp) {
		for ( i = 0; i < Object.keys(temp).length; i++ )
			temp[i].addEventListener("click",algorithm);
	}
	document.getElementById("visualize").addEventListener("click", vclicked);
	document.getElementById("clear").addEventListener("click", cleard);
	function algorithm(event) {
		if ( !newBoard.Visualizing ) {
			var e = event.target.id;
			document.getElementById('visualize').value = "Visualize " + event.target.text;
		}

	}

	function vclicked(event) {
		
		if ( !newBoard.Visualizing ) {
			newBoard.Visualizing = true;
			var e = event.target.value;
			e = e.split(" ");
			switch (e[1]) {
				case "Dijkstra":
					Dijkstra(newBoard);
					break;
				case "A*":
					A_star(newBoard);
			  		break;
				case "BFS":
					BFS(newBoard);
			  		break;
				case "DFS":
					DFS(newBoard);
			  		break;
				default:
					alert("Select Algo First.");
			}
		}
		
	}
	function cleard(event) {

		if ( !newBoard.Visualizing ) {
			newBoard.Visualizing = false;
			newBoard.initializeBoard();
		}
		
	}
		
}

var navbar_height = 61;
var WinHeight = window.innerHeight;
var WinWidth = window.innerWidth;
var newBoard = new Board(Math.floor((WinHeight - navbar_height -12) / 30), Math.floor(WinWidth / 30));
newBoard.initializeBoard();
initialize();
