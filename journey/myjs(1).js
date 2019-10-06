
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
require('')

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
	globalBrain.push(brain)
	//var moment = Object.assign({},brain);
 
	//var database = firebase.database().ref(); 

	//database.push(brain)
}

function listTeachings(){
	var container = document.getElementById('listening-container');

	var teachings = globalBrain;
	container.innerHTML= '';
	for (var i = 0; i<teachings.length; i++){
		
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
	}

	setTimeout(listTeachings, 2000)
}

function multiplier(e){
	e.preventDefault()
	var target = e.target;
	var sibling = target.previousElementSibling;

	var child = beFruitful(sibling.value)
	var value = {teaching:sibling.value}
	// I want to enable more to exist after this, but also to retain the present value. 
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
	// I think I want to then kind of append this, or add this as the next value. 
	// After this I also want to add children to the siblings and I think that this matters. 

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
	// It is allowing me to append more than one and I think that this is not really the best thing, I actually think that it is a little bit bad :( This is something which I can kind of solve in a minute. I could set an attribute or something but I am not super sure if this is the right thing to be doing. 
//on submit it gets a bit trickier, this is where the data flow becomes a little bit of a pain. 
// Should I be continuing with this today?
// I would then kind of need to prevent event propagation in some kind of way, but not completely sure of how. 
	
}
//I think the better way to be doing this is to be setting an attribute here, then checking it to see if it has been clicked or not. 
function createGrandchildren(e){
	grandchildTeaching = e.target.previousElementSibling.value
	console.log(grandchildTeaching)
	console.log(e)//see if I can find inner Text in here. 
	parent = e.target.parentNode.parentNode
	type = parent.classList[1]
	console.log(type)
	text = parent.innerText
	console.log(text)
	if(type == "action"){//Consider calling a function or something to assign this. 
		for(var i = 0; i<actions.length;i++){
			if(text.includes(actions[i].teaching)){//surely a better way to be doing this, could do innerhtml and take everything before the first '<'
				if(actions[i].grandchildren){
					actions[i].grandchildren.push({teaching:grandchildTeaching})// Okay this is super duper nested. Not ideal, but let's see for now. 
				} else {
					actions[i].grandchildren = [{teaching:grandchildTeaching}]
				}
			}
		}	
	} else if(type == "thought"){//Consider calling a function or something to assign this. 
		for(var i = 0; i<thoughts.length;i++){
			if(text.includes(thoughts[i].teaching)){//surely a better way to be doing this, could do innerhtml and take everything before the first '<'
				if(thoughts[i].grandchildren){
					thoughts[i].grandchildren.push({teaching:grandchildTeaching})// Okay this is super duper nested. Not ideal, but let's see for now. 
				} else {
					thoughts[i].grandchildren = [{teaching:grandchildTeaching}]
				}
			}
		}	
	}else if(type == "service"){//Consider calling a function or something to assign this. 
		for(var i = 0; i<service.length;i++){
			if(text.includes(service[i].teaching)){//surely a better way to be doing this, could do innerhtml and take everything before the first '<'
				if(service[i].grandchildren){
					service[i].grandchildren.push({teaching:grandchildTeaching})// Okay this is super duper nested. Not ideal, but let's see for now. 
				} else {
					service[i].grandchildren = [{teaching:grandchildTeaching}]
				}
			}
		}	
	}else if(type == "public"){//Consider calling a function or something to assign this. 
		for(var i = 0; i<publicPursuits.length;i++){
			if(text.includes(publicPursuits[i].teaching)){//surely a better way to be doing this, could do innerhtml and take everything before the first '<'
				if(publicPursuits[i].grandchildren){
					publicPursuits[i].grandchildren.push({teaching:grandchildTeaching})// Okay this is super duper nested. Not ideal, but let's see for now. 
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
// I think here comes the displaying of the child.. And this is interesting and then there is the piecing together of the entire teaching set which will also be interesting. 

//I want to clean up this code a little bit at some point, I have not been using much namespaces and things, but I am not overly fussed by this, it says to fear Hashem and so it may be better for me to be dooing. 
// There is surely a fair bit which can be cleaned up? Technically it is perhaps a little bit confusing I think there may be a better way.
// I do not know if there is a better way to be doing this oop? I feel a bit scared of this though. 
listTeachings()
document.getElementById('submitter').addEventListener('click', listenToTeachings)

var multipliers = document.getElementsByClassName('multipliers');
for (var i = 0; i<multipliers.length; i++){
	multipliers[i].addEventListener('click', multiplier)
}
// so I have made great progress, I am really glad for this. I think the next step is to manage the submitter and I think that this is a good thing. 
// Perhaps it makes more sense to have this at the bottom of the page, but for now I am unsure. I think that it should be scrollable. 
// For the sake of user friendliness I would like for the inputs to be able to press enter from being inside of them. Also to clear the values which are in them once they have been submitted. 
// I do not know whether to continue with this now or not? 
