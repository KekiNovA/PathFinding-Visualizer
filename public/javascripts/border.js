import Per_node from "./nodes.js";

function Board(row,col) {
	this.row = row;
	this.col = col;
	this.nodeArray = new Array(this.row);
	this.start = null;
	this.end = null;
	this.moused = false;
}

Board.prototype.initializeBoard = function () {
	this.Creategrid();
	this.ActionListeners();
}

Board.prototype.Creategrid = function () {
	this.srid = Math.floor(Math.random() * (this.row / 2 - 1));
	this.scid = Math.floor(Math.random() * (this.col / 2 - 1));
	this.erid = Math.floor((this.row + Math.random() * this.row) / 2);
	this.ecid = Math.floor((this.col + Math.random() * this.col) / 2);
	var string = "<table id='table'>";
	for (var i = 0; i < this.row; i++){
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
  this.start = this.nodeArray[this.srid][this.scid];
	this.end = this.nodeArray[this.erid][this.ecid];
  document.getElementById("main").innerHTML = string;
  document.getElementById("" + this.srid + "-" + this.scid).style.background = "url('../images/start.svg')  no-repeat";
	//document.getElementById("" + this.srid + "-" + this.scid).style.backgroundColor = "red";
	document.getElementById("" + this.erid + "-" + this.ecid).style.background = "url('../images/end.svg')  no-repeat";
	//document.getElementById("" + this.erid + "-" + this.ecid).style.background = "blue"
}

Board.prototype.ActionListeners = function () {
	var board = this;
	var node,nodeType,e,rid,cid,click = false;
	for(var i = 0; i < this.row; i++){
		for(var j = 0; j < this.col; j++){
			let currNode = document.getElementById("" + i + "-" + j);
			currNode.addEventListener("mousedown", mouseDown);
			currNode.addEventListener("mouseover",mouseDown);
			currNode.addEventListener("mouseup",mouseDown);
			currNode.addEventListener("dragstart",dragStart);
		}
	}
	function mouseDown(event) {
		e = event.target.id;
		e = e.split("-");
		rid = e[0];
	  cid = e[1];
		node = board.nodeArray[rid][cid];
		if (event.type == "mousedown" ) {
			if (node === board.start) {
				nodeType = "start"
				document.getElementById(event.target.id).style.background = "";
				return;
			}
			if (node === board.end) {
				nodeType = "end"
				document.getElementById(event.target.id).style.background = "";
				return;
			}
			click = true;
			if (node.wall) {
				node.wall = false;
				document.getElementById(event.target.id).style.backgroundColor = "";
			}
			else {
				node.wall = true;
				document.getElementById(event.target.id).style.backgroundColor="black";
			}
		}
		else if (event.type == "mouseup") {
			if (click === true){
				click = false;
			}
			else if (nodeType === "start") {
				if (board.end === node){
					alert("not possible");
					location.reload(true);
				}
				else {
					board.start = node;
					document.getElementById(event.target.id).style.background = "url('../images/start.svg')  no-repeat";
				}
			}
			else if (nodeType === "end") {
				if (board.start === node){
					alert("not possible");
					location.reload(true);
				}
				else {
					board.end = node;
					document.getElementById(event.target.id).style.background = "url('../images/end.svg')  no-repeat";
				}
			}
		}
		else if (event.type == "mouseover") {
			if (click === true) {
				if ((node === board.start) || (node === board.end))
					return;
				click = true;
				if (node.wall) {
					node.wall = false;
					document.getElementById(event.target.id).style.backgroundColor = "";
				}
				else {
					node.wall = true;
					document.getElementById(event.target.id).style.backgroundColor="black";
				}
			}
		}
	}
	function dragStart (event) {
		event.preventDefault();
	  //return false;
	};
}





export default Board;
