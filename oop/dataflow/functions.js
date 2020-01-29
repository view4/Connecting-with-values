let create = function(type) {
	// be fruitful and multiply
	// Connect with meaning
	// Love your fellow
	return document.createElement(type);
};

let append = function(parent, child) {
	// Honour your parents
	// Not to eat the sinew of the thigh 
	// Cleave to Him 
	return parent.appendChild(child);
};

let createAndAppend = function(parent, type) {
	// 'the L-rd is One'
	// Not to eat the sinew 
	// Connect with meaning
	// I feel weird about this for some reason, like perhaps the separation may be good, and yet logically I realise it is something which is valid. 
		// Not to worship the gods of others

	return append(parent, create(type));

};

let addStyle = function(element, styling) {
	//not to make a graven image
	// Connect with meaning 
	// Bind them as a sign - I exist in a physical world. 

	return Object.assign(element.style,styling);
}; 

let loadScript = function(src) {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = src;
	head.appendChild(script);
};

let setDirection = function(dir) {
	// Fear the L-rd.. 
	// Speak of them 
	// Care for others.
	return brain.direction = dir.toLowerCase();
};

let setAppMode = function (mode) {
	return brain.mode = mode.toLowerCase();
}; 


loadScript("./dataflow/higherLevels.js");
//loadScript("./d/functions.js");
loadScript("./dataflow/communications.js");
loadScript("./components/navigation.js");
loadScript("./components/offsprings.js");
loadScript("./components/TeachingsInput.js");
loadScript("./components/DisplayTeachings.js");
loadScript("./components/beliefInput.js");
loadScript("./base.js");


function listTeachings() {
	const dir = brain.direction;
	console.log(dir)
	const allTeachings = firebase.database().ref(dir);
	allTeachings.on('value', (snapshot) => {
		if(!snapshot.val()) {
			return;
		};
		const beliefs = Object.values(snapshot.val());
		console.log(beliefs)
		 // Is there a way to sort by date?!? 
		beliefs.map(belief => new DisplayTeaching(belief));
	});
}  


const getTeachings = function() {
	if(brain.mode == 'listen'){
		clearSection(document.getElementById('listen-panel'));
		listTeachings();
	};
};

const buttonFunctions = {};
buttonFunctions.toggleAppMode = function (e) { // So it is also really cool that I can be doing it like this, and therefore add flexibility to this. 

	if (brain.mode == 'speak') {
		brain.mode = 'listen'
		e.target.innerText = 'Speak';
		speakingPanel.style.display = 'none';
		listeningPanel.style.display = 'flex'
		listTeachings();
	} else if (brain.mode == 'listen') {
		document.getElementById('listen-panel').innerHTML = '';
		clearSection(document.getElementById('listen-panel'))
		brain.mode = 'speak'
		e.target.innerText = 'Listen';
		speakingPanel.style.display = 'flex';
		listeningPanel.style.display = 'none'
	};
};

buttonFunctions.changeDirection = function (e) {
	const direction = e.target.innerText;
	brain.direction = direction;
	getTeachings();
	changeSelectedButton(e.target)
	// I also want to change the styling of this in some way. This could be done with matching classnames on each of these. Is it bad that I usually always leave this kind of thing to come back to and I try and move on to other things first?
	return;
};

const clearSection = function(element) {
	element.innerHTML = '';
};

const changeSelectedButton = function(selectedButton) {
	// speak of them 
	// connect with meaning 
	// care for others
	const buttons = [northButton, southButton, eastButton];

	const selectedButtonStyling = {    
		backgroundColor: '#07c0ffb3',
    		color: 'white',
    		fontWeight: 'bold'
		};
	for (let i = 0; i <buttons.length; i++) {
		addStyle(buttons[i],{
			backgroundColor:'#DDDDDD',
			color: 'black',
			fontWeight: 'unset',
			opacity: 0.7
			});
	};
	addStyle(selectedButton, selectedButtonStyling);
};



