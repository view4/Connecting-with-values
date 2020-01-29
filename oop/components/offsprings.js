/*
- speak of them 
- hear O'ISrael 
- Let in consciousness
- connect with meaning. 
- care for others:


Create a container for each of the children? I think so and I think that this could be a pretty good thing. I do not know if I should be creating this ina  way which I imagine the Sanctuary to be like or not and so it is not something which is super clear for me in honesty. 

Create a separate column for each type of teaching (when entered?, or beforehand I do not know.) Cool, so I have actually been doing this in a slightly different way from before but it actually works in a pretty cool way and so for this I am glad, It is still kind of based on parent container but it is not as much in all honesty.

So there is more to be doing, such as adding sub-teachings to this then, and so I think that this may be activated when clicked on and then with the option to add something which is beneath this. I do not know if it should be added from the beginning, or only once clicked on? I kind of think it should be there from the beginning and then it can be in the display of none and I do not know if this is also another component or now, I think it should kind of be a part of this one. 

Okay, so I think that I have made some really good progress and so I am honestly really happy about this and I just hope to be doing even more good through this because it is something which is pretty important to me, and I do hope to be doing some good through this and because it is something which is really important for me. So, this is something which is kind of hard for me and it is not something which is super easy for me, and I find it hard. It is hard for me in all honesty and I do wish for some help and the ability to be doing some good through this for I do love You. 

So some of this does seem to be a little bit long: e.g. '

		brain.offspring[this.type][this.teaching].subTeaching = brain.offspring[this.type][this.teaching].subTeaching || []; 
		brain.offspring[this.type][this.teaching].subTeaching.push(this.input.value);	
'

Is there a way to shorten the above? 

Is there a constructor function which could build it for oneself taking all of the this and just chucking them in to the class? 

Also is there a shorter way to do the binding?
*/

// This item is a bit bulky and so i am beginning to think it should be reorganised in some kind of way.

class Offspring {
	constructor(teaching, type, parent = document.getElementById('children')){
		this.toggleSubteaching = this.toggleSubteaching.bind(this);
		this.addSubteaching = this.addSubteaching.bind(this);
		this.type = type;
		this.teaching = teaching;
		this.parent = parent;
		this.create();
	};
	createColumn() {
		const column = create('div');
		const header = create('h2');

		column.id = `${this.type}-col`;
		header.innerText = this.type;

		column.append(header);		
		this.parent.append(column);

		return column
	};

	toggleSubteaching(e) {
		if(e.target !== this.container){
			return;
		}
		this.subTeachingContainer.style.display = this.subTeachingContainer.style.display == 'none' ? 'block' : 'none'; // Makes sense but feels a bit long.
		this.input.focus();
	};
	addSubteaching(){
		const teachings = brain.offspring[this.type];
		for (let i = 0; i<teachings.length; i++){
			if(teachings[i].teaching === this.teaching){
				teachings[i].subTeachings.push(this.input.value)
			};
		};

		const listItem = create('li');

		this.list = this.list || create('ul');

		listItem.innerText = this.input.value;

		this.list.append(listItem);
		this.subTeachingContainer.append(this.list);
		this.input.value = '';	
	};
	create(){
		const container = create('div');
		const column = document.getElementById(`${this.type}-col`) || this.createColumn();
		const subTeachingContainer = create('div');
		const input = create('input');
		const button = create('button');

		this.container = container;
		this.input = input;
		this.subTeachingContainer = subTeachingContainer;

		container.innerText = this.teaching;
		button.innerText = '+';	
		subTeachingContainer.style.display = 'none';

		column.append(container);
		subTeachingContainer.append(input);
		subTeachingContainer.append(button);
		container.append(subTeachingContainer);

		container.addEventListener('click', this.toggleSubteaching)
		button.addEventListener('click', this.addSubteaching)		
		input.addEventListener('keyup', (e) => {
			if(e.keyCode == 13 ){
				button.click();
			};
		});
	};
};

