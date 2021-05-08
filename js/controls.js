var keys = [], action = {};
window.onkeyup = function(e) {keys[e.keyCode]=false;}
window.onkeydown = function(e) {keys[e.keyCode]=true;}

function linkAction(id, action_name) {
	var el = document.getElementById(id);
	el.addEventListener('touchstart', function(e) { action[action_name] = true; }, false);
	el.addEventListener('mousedown', function(e) { action[action_name] = true; }, false);
	el.addEventListener('touchend', function(e) { action[action_name] = false; }, false);
	el.addEventListener('mouseup', function(e) { action[action_name] = false; }, false);
}

linkAction('canvas_container', 'jump');