
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

var brain = {
	belief: '',
	offspring:{
		actions: [
		{
			teaching: ''
			/*comments:[], 
			grandkids:[
				{text:'', 
				comments:
					[]
				}
			]*/
			}
		],
		thoughts: [
			{
			teaching: '' 
			/*comments:[], 
			grandkids:[
				{text:'', 
				comments:
					[]
				}
			]*/
			}
		],
		service: [
			{
			teaching: '' 
			/*comments:[], 
			grandkids:[
				{text:'', 
				comments:
					[]
				}
			]*/
			}
		],
		publicPursuits: [
			{
			teaching: '' 
			/*comments:[], 
			grandkids:[
				{text:'', 
				comments:
					[]
				}
			]*/
			}
		]
	},
	date: ''
}

var globalBrain=[];

var actions = [];
var thoughts = [];
var service = [];
var publicPursuits = [];

function listenToTeachings(e){
	e.preventDefault()
 
	var belief = document.getElementById("kadesh").value;

	/*var actions = document.getElementById("speaker-actions").value;
	var thoughts = document.getElementById("speaker-thoughts").value;
	var service = document.getElementById("speaker-service").value;
	var publicPursuit = document.getElementById("speaker-public").value;
	*/
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
	//globalBrain.push(brain)
	//var moment = Object.assign({},brain);
 
	var database = firebase.database().ref('Teachings'); 

	database.push(brain)
}
// I am struggling with the database permissions and I am not sure exactly what to be doing, to be honest.
//I do not know if it s permissions or a routing issue
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
				return
			}
			console.log(offspring);
			if (offspring.hasOwnProperty('actions')){
				console.log('has actions')	
				var action = document.createElement('div');
				action.innerText = offspring.actions[0].teaching;// This is where I think it may require a nested loop, for extra teachings going through the length of the array. And also for sub teachings; either here or elsewhere, probably going in the same div in some way. 		
			} 
			if(offspring.hasOwnProperty('thoughts')){
				console.log('has thoughts')	
				var thought = document.createElement('div');
				thought.innerText = offspring.thoughts[0].teaching;		
			}
			if(offspring.hasOwnProperty('service')){
				console.log('has service')
				var service = document.createElement('div');
				service.innerText = offspring.service[0].teaching;			
			}
			if(offspring.hasOwnProperty('publicPursuits')){
				console.log('has public')	
				var publicPursuits = document.createElement('div');
				publicPursuits.innerText = offspring.publicPursuits[0].teaching;		
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
function displayGrandchild(value, submitter){
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

