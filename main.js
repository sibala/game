/**
 * Print out literals and their type.
 */
$(document).ready(function(){
  'use strict';
  var rockford = document.getElementById('baddie1'),
    area = document.getElementById('flash'),
    left = area.offsetLeft,
    top  = area.offsetTop,
    posLeft = 0, 
    posTop = 0,
    tileSize = 32,
    gridSize = 24,
	count = 0, 
	msg = ['Ouch. Better watch out!', 'AAAA, just broke my leg', 'Damn my nose aint straight anymore'],

    /**
     * This is the background for the game area.
     */
    gameArea = [
      13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,
      12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,21,14,12,16,14,
      14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,
      13,14,12,21,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,
      12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,
      14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,
      13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,
      12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,
      14,12,13,14,12,13,14,16,16,14,12,16,17,12,13,14,12,13,14,12,13,14,12,13,
      13,14,12,13,14,12,13,14,16,17,14,17,13,15,12,13,14,12,13,14,12,13,14,12,
      12,13,14,12,13,14,12,13,15,15,13,14,12,16,14,12,13,14,12,13,17,21,13,14,
      14,12,13,14,12,13,14,12,15,15,17,17,16,12,13,14,12,13,14,12,19,14,12,13,
      13,14,12,13,14,12,13,14,12,17,17,15,13,14,12,13,14,12,13,14,12,13,14,12,
      12,13,14,12,13,14,12,13,14,12,13,14,12,17,17,12,13,14,12,13,14,12,13,14,
      14,12,13,14,12,13,14,16,13,14,12,13,14,17,16,16,16,13,14,12,13,14,19,21,
      13,14,12,13,14,12,13,14,12,13,14,17,13,14,12,16,16,12,13,19,16,17,21,21,
      12,17,14,12,13,14,12,13,14,12,13,14,12,13,17,12,13,19,17,13,14,16,12,21,
      14,12,13,14,12,13,14,12,13,14,12,13,14,15,16,14,12,20,16,12,19,21,13,21,
      13,14,12,13,14,12,13,14,12,13,14,12,13,15,15,13,19,21,15,14,21,13,17,21,
      12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,20,19,14,16,13,21,15,21,
      14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,22,20,13,12,12,21,16,21,
      13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,17,12,21,21,19,17,21,
      12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,19,17,16,15,15,21,
      14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,22,21,21,21,21,
    ],

    /**
     * These are blocks that cant be moved to, or something happens when you try to move on them.
     * The blocks are drawn "on top" of the gamearea. Block 10 is empty, should be 0 but looks nicer with two figures.
     */
    gameBlocks = [
      20,18,19,18,19,18,19,18,19,18,19,18,19,18,19,18,19,18,19,18,19,18,19,20,
      18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,19,
      19,10,10,10,10,10,10,10,10,10,10,10,10,10,10,12,13,16,16,16,16,16,10,18,
      18,10,10,17,10,17,10,10,10,10,14,15,16,17,19,10,10,10,10,10,10,10,10,19,
      19,10,10,17,10,17,10,17,10,13,10,10,10,10,10,10,10,16,16,10,16,16,10,18,
      18,10,10,17,10,17,17,17,12,11,10,11,11,19,13,19,10,12,10,10,16,10,10,19,
      19,10,10,17,10,10,10,10,10,10,11,10,10,10,13,10,10,12,10,16,10,10,10,18,
      18,10,10,17,17,17,11,15,14,10,10,10,11,10,14,10,13,10,10,17,10,10,10,19,
      19,10,10,10,17,10,10,10,10,17,10,11,12,10,10,13,10,10,12,10,10,10,10,18,
      18,10,10,13,13,10,11,11,11,10,11,10,10,10,14,10,13,10,12,10,10,10,10,19,
      19,10,11,10,18,10,11,10,10,10,10,10,13,19,10,10,13,10,12,10,10,10,10,18,
      18,10,11,10,10,10,11,10,10,11,11,11,10,10,10,13,10,10,12,10,10,10,10,19,
      19,10,11,10,17,11,11,10,10,10,11,10,10,13,10,13,10,12,10,10,10,10,10,18,
      18,10,11,10,10,10,10,18,10,11,10,10,11,13,13,10,13,10,10,10,10,10,10,19,
      19,10,11,17,18,10,12,12,10,10,10,11,10,10,10,10,14,10,10,10,10,10,10,18,
      18,10,10,10,18,10,12,21,10,10,13,10,10,12,11,18,15,10,10,10,10,10,10,19,
      19,10,18,18,18,10,10,18,10,10,13,10,13,10,10,10,10,10,10,10,10,10,10,18,
      18,10,10,10,10,10,13,10,13,10,13,10,13,10,10,10,10,10,10,10,10,10,10,19,
      19,10,18,18,18,18,13,13,11,10,10,10,14,10,10,10,10,10,10,10,10,10,10,18,
      18,10,10,10,10,10,11,10,10,17,12,11,10,10,10,10,10,10,10,10,10,10,10,19,
      19,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,18,
      18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,19,
      19,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,18,
      20,19,18,19,18,19,18,19,18,19,18,19,18,19,18,19,18,19,18,19,18,19,18,20,
    ];


  /**
   * Draw the initial gameplan
   */
  function drawGamePlan(gameArea, gameBlocks) {
    var i,e,b;
    for(i = 0; i < gameArea.length; i++) {
      e = document.createElement('div');
      e.innerHTML = '';
      e.className = 'tile t' + gameArea[i] + (gameBlocks[i] ? ' b' + gameBlocks[i] : '');
      e.id = 'n' + i;
      area.appendChild(e);
    } 
  };
  console.log('Drawing gameplan.');  
  drawGamePlan(gameArea, gameBlocks);

  /**
   * Move Rockford
   */
  var move = function(moveLeft, moveTop, which) {

    function moveIt() {
      rockford.style.left = (area.offsetLeft + posLeft*tileSize + tileSize/2) + 'px';
      rockford.style.top  = (area.offsetTop + posTop*tileSize + tileSize/2) + 'px';      
      //console.log("Moved to: " + rockford.style.left + "x" + rockford.style.top);
    };

    if(which) { rockford.className='baddie ' + which; }

    if(!(gameBlocks[(posLeft+moveLeft)+(posTop+moveTop)*gridSize]-10)) {
      posLeft += moveLeft; 
      posTop  += moveTop;
      moveIt();
	} else if(gameBlocks[(posLeft+moveLeft)+(posTop+moveTop)*gridSize] == 21){
		alert('Congratz, You made it!');
		window.location.href = "";	
    } else {
	  
	  count++;
	  if(count < 4){
	    alert(msg[Math.floor(Math.random() * msg.length)]);
	  } else if(count == 4){
	    alert('Oh man thats som serious bleeding going on. Watch out!');    
	  } else if(count == 5) {
	    alert('One more hit and you will have to start over');  
	  } else {
	    alert('Start over!');
		window.location.href = "";	
	  } 
      console.log('Block detected, cant move.');
    }
  };
  console.log('Moving Mickey Mos (Rockford) to initial spot.');  
  move(1, 1, 'down');


  /**
   * Keep track on keys pressed and move Rockford accordingly.
   */
  document.onkeydown = function(event) {
    var key;
    key = event.keyCode || event.which;
    switch(key) {
      case 37: move(-1, 0, 'left'); break;
      case 39: move(1, 0, 'right'); break;
      case 38: move(0, -1, 'up'); break;
      case 40: move(0, 1, 'down'); break; 
      default: move(0, 0, 'down'); break;
    };
    //console.log('Keypress: ' + event + ' key: ' + key + ' new pos: ' + rockford.offsetLeft + ', ' + rockford.offsetTop);
  };

    console.log('Everything is ready.');  
	
});
