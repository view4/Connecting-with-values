/*
- Teach them to your sons
- circumcise the flesh 
- speak of them 
- connect with meaning 
- connect your will with His will.

- Do I want parent to this? I already know that it is going to belong to the Belief, and be between this in some way. I mean it does not have to be and so for now I think I should be without it(cleave to freedom, walk in His ways).

- I think it could be very good to have a shortcut for many of these repeated things, such as ''createElement' and perhaps the way things are created. There could be a parent class which may already configure this kind of think - each have a .create etc..

- also this is similair to the parent, but for now I think I should keep it simple and use it like this. 

- one thing I feel weird about is that even though this is a child component of the beliefInput, it would have be to be ordered above in the stack which seems strange to me. 

- okay, so if this is going to be children of the BeliefInput then I think that it does need parent. So lets see if I can do this another way. For I believe in You, and I think that this is a good way of doing it. 

There are many similarities which exist between this and the belief. I..e both are inputs with buttons, and functionality on the buttons. I think there could be some kind of way of integrating the two, but I do not know the best way to be doing this and I have and retain the freedom to be doing so in the future. 

I'm a bit unsure of the best way to be going about this and so this is a little bit annoying in a sense. 

I am unsure if I change the input function, or how I could be doing this. I actually do not think there is an easy way to be doing this unless it is possible to. Well the built in append seems to do the trick and is perhaps even better than the innerText function in a sense.

IT is nice that changing the value is done automatically by --> this.input.value = '';
*/

class TeachingsInput {
	constructor(type){
		this.listeningToTeaching = this.listeningToTeaching.bind(this);
		this.type = type;
		this.element = this.create();
	};
	listeningToTeaching() {
		this.displayTeaching();

		brain.offspring = brain.offspring || {};
		brain.offspring[this.type] = brain.offspring[this.type] || [];
		brain.offspring[this.type].push({
			teaching: this.input.value,
			subTeachings:[]
		})
		this.input.value = '';
	};
	displayTeaching() {
		new Offspring(this.input.value, this.type );

	};
	create(){
		var container = create('div');
		var input = create('input');
		var submitter = create('button');

		this.input = input;


		submitter.innerText = '+';
		container.append(input);		
		container.append(submitter)

		input.setAttribute('placeholder', this.type);
		submitter.addEventListener('click', this.listeningToTeaching);
		input.addEventListener('keyup', (e) => {
			if(e.keyCode == 13 ){
				submitter.click();
			};
		});

		return container		
	};

};
