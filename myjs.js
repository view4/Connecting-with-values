
  var firebaseConfig = {
    apiKey: "AIzaSyCjdYZQNpA-o8XEtnuFDN6DXmqVuGdE4QE",
    authDomain: "relating-teachings.firebaseapp.com",
    databaseURL: "https://relating-teachings.firebaseio.com",
    projectId: "relating-teachings",
    storageBucket: "relating-teachings.appspot.com",
    messagingSenderId: "356910087563",
    appId: "1:356910087563:web:05a33fb9e6980e09"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var brain = {}

var globalBrain=[];

var actions = [];
var thoughts = [];
var service = [];
var publicPursuits = [];

function listenToTeachings(e){
	e.preventDefault()
 
	var belief = document.getElementById("kadesh").value;

	brain.belief = belief;
	brain.offspring = {}
	offspring = brain.offspring;
	offspring.actions = actions;
	offspring.thoughts = thoughts;
	offspring.service = service; 
	offspring.publicPursuits = publicPursuits;


	
	date = Date(Date.now()).toString()

	brain.date = date

 
	var database = firebase.database().ref('Teachings'); 

	database.push(brain)
	clearFormAndOffspring()
}

function listTeachings(){
	var container = document.getElementById('listening-container');
	container.innerHTML= '';
	const allTeachings = firebase.database().ref("Teachings");
	allTeachings.on('value', (snapshot) => {
		let Teachings = snapshot.val()

		for (let teachingSet in Teachings){
			var teaching = document.createElement('div');
			teaching.classList.add('teaching')
			var belief = document.createElement('h4');
			belief.id = 'Belief'
			belief.innerText = Teachings[teachingSet].belief;
			// There is likely to be complicated looping and if statements here to ensure that fields exist and this is likely to be a bit tricky. 
			// Which is the best way to be doing this? 
			// Bit by bit.
			var offspring = Teachings[teachingSet].offspring;
			if (offspring == null){
				continue; // this may cause it to render other's consider using 'continue'
			}

			teaching.appendChild(belief)
			if (offspring.hasOwnProperty('actions')){
	
				var action = document.createElement('div');
				action.classList.add('action');
				for(var i = 0; i<offspring.actions.length; i++){// Each of these for loops are repetitive and I think there may be a better way to be dealing with this.
					var span = document.createElement('span');
					span.innerText = offspring.actions[i].teaching;
					action.appendChild(span)
					var separation = document.createElement('br')// Is it possible to have a basic function which would return elements? Because each time writing createElement is a bit of a chore. 
					renderGrandchildren(offspring.actions[i], span)
					action.appendChild(separation);
					teaching.appendChild(action);
				}	
			} 
			if(offspring.hasOwnProperty('thoughts')){

				var thought = document.createElement('div');
				thought.classList.add('thought');
				for(var i = 0; i<offspring.thoughts.length; i++){
					var span = document.createElement('span');
					span.innerText = offspring.thoughts[i].teaching;
					var separation = document.createElement('br') // I hope that it may be possible to add the child elements here through this, but these may be in a bit of a separate manner
					thought.appendChild(span)
					renderGrandchildren(offspring.thoughts[i], span)
					thought.appendChild(separation);
					teaching.appendChild(thought);
				}			
			}
			if(offspring.hasOwnProperty('service')){

				var service = document.createElement('div');
				service.classList.add('service');
				for(var i = 0; i<offspring.service.length; i++){
					var span = document.createElement('span');
					span.innerText = offspring.service[i].teaching;
					service.appendChild(span)
					var separation = document.createElement('br')
					renderGrandchildren(offspring.service[i], span)
					service.appendChild(separation);
					teaching.appendChild(service);
				}				
			}
			if(offspring.hasOwnProperty('publicPursuits')){

				var publicPursuits = document.createElement('div');
				publicPursuits.classList.add('public');
				for(var i = 0; i<offspring.publicPursuits.length; i++){
					var span = document.createElement('span');
					span.innerText = offspring.publicPursuits[i].teaching;// So perhaps I can add it here, to be added  the 
					publicPursuits.appendChild(span)
					renderGrandchildren(offspring.publicPursuits[i], span)
					var separation = document.createElement('br')
					publicPursuits.appendChild(separation);
				}
				teaching.appendChild(publicPursuits);
			}


			container.appendChild(teaching);
	}});


	var teachings = globalBrain;

	//setTimeout(listTeachings, 10000)
}

function multiplier(e){
	e.preventDefault()
	var target = e.target;
	var sibling = target.previousElementSibling;

	var child = beFruitful(sibling.value)
	var value = {teaching:sibling.value}
 
	if(sibling.id == 'speaker-actions'){
		actions.push(value);
		child.classList.add('action');
	} else if(sibling.id == 'speaker-thoughts'){
		thoughts.push(value);
		child.classList.add('thought');
	}else if(sibling.id == 'speaker-service'){
		service.push(value);
		child.classList.add('service');
	} else if(sibling.id == 'speaker-public'){
		publicPursuits.push(value);
		child.classList.add('public');
	}
	sibling.value = '';
	
	child.setAttribute('isClicked', 'false')
	document.getElementById('offspring-container').appendChild(child)
}
function beFruitful(value){
	var body = document.createElement('div');
	body.innerText = value;
	body.className='child'
	body.addEventListener('click', addSubTeaching)
	return body
}
function addSubTeaching(){
	var isClicked = this.getAttribute('isClicked')
	if(isClicked == 'false'){
		var container = document.createElement('div')
		var input = document.createElement('input')
		var button = document.createElement('button')
		button.innerText = '+'
		container.appendChild(input);
		container.appendChild(button)
		this.appendChild(container)
		this.setAttribute('isClicked', 'true')
		button.addEventListener('click',createGrandchildren)
	}

	
}

function createGrandchildren(e){
	grandchildTeaching = e.target.previousElementSibling.value

	parent = e.target.parentNode.parentNode
	type = parent.classList[1]

	text = parent.innerText

	if(type == "action"){
		for(var i = 0; i<actions.length;i++){
			if(text.includes(actions[i].teaching)){
				if(actions[i].grandchildren){
					actions[i].grandchildren.push({teaching:grandchildTeaching})
				} else {
					actions[i].grandchildren = [{teaching:grandchildTeaching}]
				}
			}
		}	
	} else if(type == "thought"){
		for(var i = 0; i<thoughts.length;i++){
			if(text.includes(thoughts[i].teaching)){
				if(thoughts[i].grandchildren){ // use a ternary here?? 
					thoughts[i].grandchildren.push({teaching:grandchildTeaching})
				} else {
					thoughts[i].grandchildren = [{teaching:grandchildTeaching}]
				}
			}
		}	
	}else if(type == "service"){
		for(var i = 0; i<service.length;i++){
			if(text.includes(service[i].teaching)){
				if(service[i].grandchildren){
					service[i].grandchildren.push({teaching:grandchildTeaching})
				} else {
					service[i].grandchildren = [{teaching:grandchildTeaching}]
				}
			}
		}	
	}else if(type == "public"){
		for(var i = 0; i<publicPursuits.length;i++){
			if(text.includes(publicPursuits[i].teaching)){
				if(publicPursuits[i].grandchildren){
					publicPursuits[i].grandchildren.push({teaching:grandchildTeaching})
				} else {
					publicPursuits[i].grandchildren = [{teaching:grandchildTeaching}]
				}
			}
		}	
	}
	displayGrandchild(grandchildTeaching, e.target.parentNode)
	clearField.call(e.target.previousElementSibling)
}
function displayGrandchild(value, submitter){// I think it would be a good thing to be able to reuse this code for the displaying of them on the other part of the screen, the only difference here is that it is being placed before something, otherwise it is much the same. So I am not sure of the best way to kind of resolve this. 
	div = document.createElement('div');
	div.innerText = value;
	submitter.parentNode.insertBefore(div, submitter);

}
function renderGrandchildren(childTeaching, node){

	if (childTeaching.hasOwnProperty('grandchildren')){
		var list = document.createElement('ul')
		for(var i = 0; i< childTeaching.grandchildren.length; i++){
			var teaching =  childTeaching.grandchildren[i].teaching;
			var teachingPoint = document.createElement('li');
			teachingPoint.innerText=teaching;
			list.appendChild(teachingPoint)
		}
		node.appendChild(list)
	}

}
function clearField(){
	this.value = '';

}
function clearFormAndOffspring(){
	var fields = document.getElementsByTagName('input');
	var formChildren = form.childNodes;
	var inputChildren = [];
	for(let i =0; i<fields.length; i++){
		if(fields[i].type != 'submit'){
			fields[i].value = ''
		}

	}

}


listTeachings()

document.getElementById('submitter').addEventListener('click', listenToTeachings)

var multipliers = document.getElementsByClassName('multipliers');
for (var i = 0; i<multipliers.length; i++){
	multipliers[i].addEventListener('click', multiplier)
}



