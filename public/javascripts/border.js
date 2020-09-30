import Per_node from "./nodes.js";

function Board(row,col) {
	this.row = row;                          //Some default parms
	this.col = col;
	this.nodeArray = new Array(this.row);
	this.start = null;
	this.end = null;
	this.Visualizing = false;
}

Board.prototype.initializeBoard = function () {
	this.Creategrid();
	this.ActionListeners();
}

Board.prototype.Creategrid = function () {
	//Creating random start and end node
	var srid = Math.floor(Math.random() * (this.row / 2 - 1));
	var scid = Math.floor(Math.random() * (this.col / 2 - 1));
	var erid = Math.floor((this.row + Math.random() * this.row) / 2);
	var ecid = Math.floor((this.col + Math.random() * this.col) / 2);
	var string = "<table id='table'>";
	for (var i = 0; i < this.row; i++){														//Creating the whole table
		this.nodeArray[i] = new Array(this.col);
		string+= "<tr id= "+i+">";
		for(var j = 0; j < this.col; j++){
			string+= "<td id=" + i + "-" + j + "></td>";
			let node = new Per_node(i,j);
			this.nodeArray[i][j] = node;
		}
		string+= "</tr>";
	}
  string+= "</table>";
  this.start = this.nodeArray[srid][scid];
	this.start.value = 0;
	this.end = this.nodeArray[erid][ecid];
  document.getElementById("main").innerHTML = string;
  document.getElementById("" + srid + "-" + scid).style.background = "url('./public/images/start2.svg')  no-repeat";
	document.getElementById("" + erid + "-" + ecid).style.background = "url('./public/images/end.svg')  no-repeat";
}

Board.prototype.ActionListeners = function () {
	var board = this;															//Adding ActionListeners
	var node,nodeType,e,rid,cid,click = false;
	for(var i = 0; i < this.row; i++){
		for(var j = 0; j < this.col; j++){
			let currNode = document.getElementById("" + i + "-" + j);
			currNode.addEventListener("mousedown", mouseDown);
			currNode.addEventListener("mouseover",mouseDown);
			currNode.addEventListener("mouseup",mouseDown);
		}
	}
	function mouseDown(event) {
		event.preventDefault();					//resolves default drag issue
		e = event.target.id;
		e = e.split("-");
		rid = e[0];
	  cid = e[1];
		node = board.nodeArray[rid][cid];
		if (event.type == "mousedown" && board.Visualizing === false) {
			if (node === board.start) {
				node.value = Infinity;
				nodeType = "start";
				document.getElementById(event.target.id).style.background = "";
				return;
			}
			if (node === board.end) {
				nodeType = "end";
				document.getElementById(event.target.id).style.background = "";
				return;
			}
			click = true;
			if (node.wall) {
				nodeType = "clear";
				node.wall = false;
				document.getElementById(event.target.id).classList.remove("wall");
				return;
			}
			else {
				node.wall = true;
				document.getElementById(event.target.id).classList.add("wall");
				document.getElementById(event.target.id).style.animationPlayState = "running";
				return;
			}
		}
		else if (event.type == "mouseup") {
			if (click === true){
				click = false;
				nodeType = "";
			}
			else if (nodeType === "start") {
				if (board.end === node){
					alert("not possible");
					location.reload(true);
				}
				else {
					board.start = node;
					node.value = 0;
					document.getElementById(event.target.id).style.background = "url('./public/images/start2.svg')  no-repeat";
				}
			}
			else if (nodeType === "end") {
				if (board.start === node) {
					alert("not possible");
					location.reload(true);
				}
				else {
					board.end = node;
					document.getElementById(event.target.id).style.background = "url('./public/images/end.svg')  no-repeat";
				}
			}
		}
		else if (event.type == "mouseover") {
			if (click === true) {
				if ((node === board.start) || (node === board.end))
					return;
				if (nodeType === "clear") {
					node.wall = false;
					document.getElementById(event.target.id).classList.remove("wall");
					return;
				}
				else {
					node.wall = true;
					document.getElementById(event.target.id).classList.add("wall");
					document.getElementById(event.target.id).style.animationPlayState = "running";
					return;
				}
			}
		}
	}
}




export default Board;
