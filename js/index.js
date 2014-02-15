
var up="up";
var down="down";
var left="left";
var right="right";
var tds = document.querySelectorAll(".glowing-puzzle-game td");
document.onkeydown = function(e){
	var whitepos = document.querySelector(".glowing-puzzle-game td.white");
	var canmove = false;
	switch(e.which){
		case 38:{//up
			e.preventDefault();
			console.log(up);
			canmove = canMove(whitepos, up);
			if(canmove){
				move(whitepos, up);
			}
			break;
		}
		case 40:{//down
			e.preventDefault();
			console.log(down);
			canmove = canMove(whitepos, down);
			if(canmove){
				move(whitepos, down);
			}
			break;
		}
		case 37:{//left
			e.preventDefault();
			console.log(left);
			canmove = canMove(whitepos, left);
			if(canmove){
				move(whitepos, left);
			}
			break;
		}
		case 39:{//right
			e.preventDefault();
			console.log(right);
			canmove = canMove(whitepos, right);
			if(canmove){
				move(whitepos, right);
			}
			break;
		}
	}
}
function canMove(whiteblock, direction){
	var canmove = false;
	switch(direction){
		case up:{
			canmove = whiteblock.dataset.r>1;
			break;
		}
		case down:{
			canmove = whiteblock.dataset.r<4;
			break;
		}
		case left:{
			canmove = whiteblock.dataset.c>1;
			break;
		}
		case right:{
			canmove = whiteblock.dataset.c<4;
			break;
		}
	}
	return canmove;
}
function move(whiteblock, direction){
	var row=parseInt(whiteblock.dataset.r);
	var col=parseInt(whiteblock.dataset.c);
	switch(direction){
		case up:{
			var upblock = document.querySelector("td#t"+(row-1)+col);
			switchBlock(whiteblock, upblock);
			break;
		}
		case down:{
			var downblock = document.querySelector("td#t"+(row+1)+col);
			switchBlock(whiteblock, downblock);
			break;
		}
		case left:{
			var leftblock = document.querySelector("td#t"+row+(col-1));
			switchBlock(whiteblock, leftblock);
			break;
		}
		case right:{
			var rightblock = document.querySelector("td#t"+row+(col+1));
			switchBlock(whiteblock, rightblock);
			break;
		}
	}

	var counter = parseInt(document.querySelector("#counterlabel").innerText);

	if(blkback(direction)){
		var oldc = log.children[(log.children.length-1)];
		oldc.remove();
		counter-=1;
	}else{
		var newc = document.createElement("div");
		newc.innerHTML = direction;
		log.appendChild(newc);
		counter+=1;
	}

	document.querySelector("#counterlabel").innerText=counter;
}
function blkback(direction){
	var oldct = log.children[(log.children.length-1)].innerText;
	var back = false;
	switch(direction){
		case up:{
			back = oldct == down;
			break;
		}
		case down:{
			back = oldct == up;
			break;
		}
		case left:{
			back = oldct == right;
			break;
		}
		case right:{
			back = oldct == left;
			break;
		}
	}
	
	
	return back;
}
function switchBlock(block1, block2){
	var block2class=block2.classList[0];
	var block2value=block2.innerText;
	block2.className = block1.className;
	block2.innerText = block1.innerText;
	block1.className = block2class;
	block1.innerText = block2value;
}
