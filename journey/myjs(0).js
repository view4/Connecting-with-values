//I have made progress thus far. I think using firebase is a reasonable option for this project. I am not sure if I have done anything wrong thus far. Why is it a good thing to be using? 
/*
-- Hear O'ISrael  --> It is a good thing to incorporate consciousness, the platfomr, and also the data from the database. 
--> Connect with meaning --> There is a lot which this platform offers and so I think it would be a good thing to connect with this, also there is meaning, from the teachings in the date 
--> To love the L-rd... --> I think there is a lot of meaning which is wihtin this and I think it is a good thing to connect wiht that which is real and exists and is established. 
--> We will do and we will understand --> It is an oppurtunity to learn something new... I'm not sure how I feel about the server side in honesty, and frankly I don't think I really want one. 
--> Using local storage is not a great soln. 
--> I don't have to use an sql database, and this is something which I feel quite good about. 
--> Without data persistance it removes a lot of the quality of this program. 
--> I also think it would solve the issue I was facing with a few of those things. 

*/
 // Your web app's Firebase configuration
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

// I want to be able to add data to the database, I think I can look at the resource which I have used before. 
//I also want to be able to retrieve all of the data as well. If I can do this then I think it would be really cool. 
// The next issue is to be able to edit or delete the data in the table.
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
// Above is an interesting way to structure this, it is new, and it would be interesting to be doing. I would like to see that it works. 
// For now I only have the ability to add one teaching to each son, or domain. I do not know when to be adding more, but I think it is important to add some more to this 'teach them thoroughly'.
var globalBrain=[]
// the brain is supposed to be something fluid, and therefore not something with a fixed outline or structure, here I have given it a fixed structure. I think this could be bad. Perhaps there is a way in which I cna modify this, but also it is noit really the same as a human brain, whilst the content is subject to change I do not know how much the overall structure of it is to change. --> What do I do about the 'brain' bit now, do I keep it as it is, or do I do it a different kind of way? 
function listenToTeachings(e){
	e.preventDefault()//Do I need this ? 
	//console.log(e.toElement.form)// Is it possible or better to access data through here? 
	var belief = document.getElementById("kadesh").value;

	var actions = document.getElementById("speaker-actions").value;
	var thoughts = document.getElementById("speaker-thoughts").value;
	var service = document.getElementById("speaker-service").value;
	var publicPursuit = document.getElementById("speaker-public").value;

	brain.belief = belief;
	offspring = brain.offspring;
	offspring.actions[0].teaching = actions;
	offspring.thoughts[0].teaching = thoughts;// At some point I think these should be changed to append.Actually I am not accessing them right. 
	offspring.service[0].teaching = service; // They are stored in an array within each domain, I do not know whether to switch it or to keep it as one and then to be able to add more teachings after this. Hmm. I think it is good to break it down and to do a simple version first and then to build it up when I have the capability. --> Change to a single one for now. 
	offspring.publicPursuits[0].teaching = publicPursuit;
	// There is a lot of indentation and the object structure is complicated, it may be a good thing to split it up in some kind of sense. To somehow have a teaching creator. Or perhaps to have a single teaching as the 'state', and then to have multiple kind of teachings which then tcome from the database and to dynamically create them in a kind of sense. I think this may be quite a good thing to be doing. Rather, I quite like the sound of this. I have not gone home tonight for a while and so it would be interesting to know what happens. I still have a lot of work to do, the issue us that it is difficult for me to know how to deal with teachinga after giving service and it is hard for me to deal with them. I have not done it before ebut I think the comment feature is something which is quite cool and good to be doing. 
	console.log(brain) // I think each of the elements in the array are pointing to the same object, so whenever I change one I think it changes them all. How can I fix this? To kind of copy them in some way, and perhaps not to push the actual object. 
	var moment = Object.assign({},brain);// This does not work, I wish to find a better soloution to this, I am not sure of the best way to go about this, perhaps if I were to have a more dynamic method then this would help as well. I probably need to think about it more. 
//Before pushing I want to be able to add the date to this. I think it is relevant and can come in handy and link it to Life in some way.
	console.log(firebase) 
	var database = firebase.database().ref(); 
	console.log(database)
	database.push(brain)
	//globalBrain.push(moment)
	console.log(globalBrain)
	
	/*var teaching=document.getElementById('speaker');
	var teachings=localStorage.getItem('teachings') ? localStorage.getItem('teachings') : '[]';
	teachings = JSON.parse(teachings)
	teachings.push(teaching);
	teachings = JSON.stringify(teachings);
	localStorage.setItem('teachings', teachings);
	listTeachings();*/
}

//I want to create the object from this but I am not sure of the best way to be doing this, because I fear doing something in a bad way, and I think it is important to do this in a dynamic manner. 
//LocalStorage does not seem to work, I am interested in using firebase, I think it could be a good thing for me. I also think I should consider how to structure the data. 
function listTeachings(){
	console.log('being called')
	var container = document.getElementById('listening-container');
	//var teachings = localStorage.getItem('teachings') ? localStorage.getItem('teachings') : '[]';
//	teachings = JSON.parse(teachings);
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
//Above is a bit of a tedious way to be doing this, but I do think that it is beneficial, I think it helps and there could be a better way of doing this, I think using classes and perhaps having an inbuilt function for this, but I have not used classes heaps, but I have with react. 
//I don't know how I would go about this now and it seems a little bit hard and so I think it requires some thought in regards to this, but I think there is potential in this. Perhaps there is a tutorial to do here. 
listTeachings()
document.getElementById('submitter').addEventListener('click', listenToTeachings)

