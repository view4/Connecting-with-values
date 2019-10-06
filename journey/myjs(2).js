
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
	offspring = brain.offspring;
	offspring.actions = actions;
	offspring.thoughts = thoughts;
	offspring.service = service; 
	offspring.publicPursuits = publicPursuits;
	console.log(brain)

	
	date = Date(Date.now()).toString()
	console.log(date)
	brain.date = date

 
	var database = firebase.database().ref('Teachings'); 

	database.push(brain)
}

function listTeachings(){
	var container = document.getElementById('listening-container');
	container.innerHTML= '';
	const allTeachings = firebase.database().ref("Teachings");
	allTeachings.on('value', (snapshot) => {
		let Teachings = snapshot.val()
		console.log(Teachings)
		for (let teachingSet in Teachings){
			var teaching = document.createElement('div');

			var belief = document.createElement('h1');
			belief.innerText = Teachings[teachingSet].belief;
			// There is likely to be complicated looping and if statements here to ensure that fields exist and this is likely to be a bit tricky. 
			// Which is the best way to be doing this? 
			// Bit by bit.
			var offspring = Teachings[teachingSet].offspring;
			if (offspring == null){
				return // this may cause it to render other's consider using 'continue'
			}
			console.log(offspring);
			if (offspring.hasOwnProperty('actions')){
				console.log('has actions')	
				var action = document.createElement('div');
				for(var i = 0; i<offspring.actions.length; i++){
					action.innerText += offspring.actions[i].teaching;
					var separation = document.createElement('br')
					action.appendChild(separation);
				}	
			} 
			if(offspring.hasOwnProperty('thoughts')){
				console.log('has thoughts')	
				var thought = document.createElement('div');
				for(var i = 0; i<offspring.thoughts.length; i++){
					thought.innerText += offspring.thoughts[i].teaching;
					var separation = document.createElement('br') // I hope that it may be possible to add the child elements here through this, but these may be in a bit of a separate manner
					thought.appendChild(separation);
				}			
			}
			if(offspring.hasOwnProperty('service')){
				console.log('has service')
				var service = document.createElement('div');
				for(var i = 0; i<offspring.service.length; i++){
					service.innerText += offspring.service[i].teaching;
					var separation = document.createElement('br')
					service.appendChild(separation);
				}				
			}
			if(offspring.hasOwnProperty('publicPursuits')){
				console.log('has public')	
				var publicPursuits = document.createElement('div');
				for(var i = 0; i<offspring.publicPursuits.length; i++){
					publicPursuits.innerText += offspring.publicPursuits[i].teaching;// So perhaps I can add it here, to be added  the 
					var separation = document.createElement('br')
					publicPursuits.appendChild(separation);
				}			
			}
			teaching.appendChild(belief)
			teaching.appendChild(action);
			teaching.appendChild(thought);
			teaching.appendChild(service);
			teaching.appendChild(publicPursuits);
			container.appendChild(teaching)// This is where the power of react comes in handy--> Reusable components and also dynamic rendering. Here is is a little bit annoying in honesty, it just feels like so much effort to be doing this dynamically and this is a little bit annoying. 
		}
	});
// Also I feel the naming is a bit of a mess.

	var teachings = globalBrain;

	/*for (var i = 0; i<teachings.length; i++){
		
		var teaching = document.createElement('div');

		var belief = document.createElement('h1');
		belief.innerText = teachings[i].belief;

		var action = document.createElement('div');
		action.innerText = teachings[i].offspring.actions[0].teaching;
		var thought = document.createElement('div');
		thought.innerText = teachings[i].offspring.thoughts[0].teaching;
		var service = document.createElement('div');
		service.innerText = teachings[i].offspring.service[0].teaching;
		var publicPursuits = document.createElement('div');
		publicPursuits.innerText = teachings[i].offspring.publicPursuits[0].teaching;
		
		
		container.appendChild(teaching);
		teaching.appendChild(belief);
		teaching.appendChild(action);
		teaching.appendChild(thought);
		teaching.appendChild(service);
		teaching.appendChild(publicPursuits);
	}*/

	setTimeout(listTeachings, 10000)
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
	console.log(grandchildTeaching)
	console.log(e)
	parent = e.target.parentNode.parentNode
	type = parent.classList[1]
	console.log(type)
	text = parent.innerText
	console.log(text)
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
				if(thoughts[i].grandchildren){
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
}
function displayGrandchild(value, submitter){// I think it would be a good thing to be able to reuse this code for the displaying of them on the other part of the screen, the only difference here is that it is being placed before something, otherwise it is much the same. So I am not sure of the best way to kind of resolve this. 
	div = document.createElement('div');
	div.innerText = value;
	submitter.parentNode.insertBefore(div, submitter);

}

listTeachings()
document.getElementById('submitter').addEventListener('click', listenToTeachings)

var multipliers = document.getElementsByClassName('multipliers');
for (var i = 0; i<multipliers.length; i++){
	multipliers[i].addEventListener('click', multiplier)
}

