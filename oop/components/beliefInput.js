/*
--- Hear O'Israel, the L-rd is our G-d, the L-rd is One.
--- Speak of them
--- have a relationship with Life 
--- connect with meaning. 
--- To connect with Life
--- Not to define oneself.
Okay so here I wish to create a means to let in the belief, for I think that this would be a good thing for me to be doing. 

There is a lot of ways to go about this. Is it better to render the Html through functionality or through inner HTML, so this is not something which is super easy. 

So in some kind of way or another, i want to store this in some kind of sense and I actually think it should have a 'higher level file which relates to the contents and can change this in some kind of way.'
- fear the L-rd, 
- let in consciousness
- not to make a graven image


I want to add some functionality to this: 
- cleave to Him 
- walk in His ways
- speak of them 
I do not know the best way to be going about this. I could add an event listener to the component, but it may be better to add an onclick inside the code, I think it may be easier. 

So trying to add it through the text was not very easy, I do not know how to access the same functions, perhaps if I bind this. 

I am finding it hard to unserstand this. I think having the higher level content at the top could be a good thing, so that all could interact with this. The issue which I mostly have is how to link functionalty to this because I think that this is something which is hard. I do fear trying to limit Hashem or something like this because sometimes I liken Hashem to a unified consciousness, but what I am doing is very limited and it is not something which is fixed which I think is a good thing, I just think it would be a means to benefit. Perhaps functionality could also be in the higher level place, but I am just not sure of how to be doing this, or how to activate this.

This could be done through passing the component to add an event listener too. However this is not something which is super easy and I do not know the best way in which I should be doing this.

 I want to try with the functionality method of doing this: 
	- Walk in His ways 
	- speak of them 
	- not to make a graven image

Okay, so I like the thought of incorporating children into the belief input: 
	- let in meaning, let in consciousness, be fruitful, but it could also be more than one. 
I quite like invoking the create function from outside of the class, and then appending it to the chosen thing, I kind of feel the belief section then tells a little story of how the app works with this as well.
*/
class BeliefInput {
	constructor(parent, children = []) {
		this.addBelief = this.addBelief.bind(this);
		this.displayBelief = this.displayBelief.bind(this);
		this.children = children
		this.element = this.physicality();
		parent.append(this.element);
	};
	addBelief() {
		// Let in consciousness 
		// Swear in His Name
		// Speak of them
		// Connect with meaning..
		this.belief = this.input.value;
		const date = Date(Date.now()).toString();
		const beliefObject = {
			belief: this.belief,
			offspring: brain.offspring,
			date
		};

		const direction = brain.direction
		console.log(beliefObject);
		console.log(brain.offspring)
		const database = firebase.database().ref(direction);
		database.push(beliefObject);

		this.resettingListeningPanel();

	};
	resettingListeningPanel() {
		clearSection(document.getElementById('children'))
		document.getElementById('children').append(this.beliefTextContainer)
		this.input.value = '';
		this.displayBelief();
	};
	appendChildren(node) {
		this.children.map((child) => {
			node.append(child);
		});
	};

	displayBelief(){
		const beliefText = this.input.value;
		const beliefTextContainer = document.getElementById('belief-text-container');
		beliefTextContainer.innerText = beliefText;
	};

	physicality () {
		const container = create('div');
		const input = create('input');
		const button = create('button');
		const beliefTextContainer = create('h4');

		this.input = input;
		this.beliefTextContainer = beliefTextContainer;

		input.setAttribute('placeholder', 'belief');
		button.innerText = 'submit';
		beliefTextContainer.id ='belief-text-container'; 

		container.append(input);
		this.appendChildren(container)
		container.append(button);
		document.getElementById('children').append(beliefTextContainer);

		input.addEventListener('keyup', this.displayBelief)
		button.addEventListener('click',this.addBelief);

		return container;
	};
};
/*
Wow so I made some cool progress with this, there were a few bumps but I feel like this is inevitable, and a couple of 'rookie' errors. 


Display input text on change: 
	- speak of them 
	- let in consicousness
	- connect with meaning.


I'm not too sure what else needs to be done, I think I've made some pretty good progress to be honest. 

There is some obvious styling to be doing, but I do not even feel like it needs a lot, I could do this now and then transform it.
*/
