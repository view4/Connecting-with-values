/* 

So here I want to display teachings which are stored within the firebase database because I think that this matters. I kind of want to make the code on this really good because I care about it and i am proud of it. I am not sure how to trigger this. It could be that whenever the speaking page is activated it clears the contents of the listening panel, and I think that this would be kind of acceptable. And then the opposite when it is activated. I do not know if this is th ebest way to be doing this though, it would ensure that it is kind of fresh each time it is clicked on and I think that this would eb acceptable.

What would be great if I could reuse some of the components to then display these teachings, but I am a bit worrued r a bit unsure of how to be doing this. 

- speak of them
- cleave to Him 
- love the L-rd
- let in meaning
- connect with freedom 
- unify His name 
- be fruitful 
- care for others


So first let us acccess the db and then try and access the data within and we can see how to deal with this. Cool, so now that I have accessed this I wish to render things in response to this and this is where it becomes kind of tricky, I have a basic idea of how I wish for this to be but I do not know exactly how I want it and so there is some kind fo information to be dealing with this in this regard and so this does kind of matter ina  kind of sense but besides this it is good going. The question is here, can I reuse things, and then when I do, functionality regarding some things is going to make a difference and so I am unsure of how this would be but this is still not the worst thing.


So let us progress bit by bit, based on this ~i want to display things for each of the entries int he database. 


So I think I can call offspring from this. And so this could be something which is a good thing, and then there may have to be some modifying of the offspring component but it could be done. I still lack an understanding of this though.

Okay so now I wish to display the teachings associated with each of these. But first I want each of these to be wider so that the data can be seen.
- cleave to Him 
- unify His name 
- not to intermarry 
- have a reminder between your eyes.

Display teachings for each belief: 
- let in consciousness
- speak of them 
- care for others
- connect with meaning 
- honour your parents.
- connect with freedom

I'm a bit unsure about whether I should make a class just for this or if I should be doing something else. I think extending the class is acceptable. I do not know what else could or shoudl be done in all honesty.In some kind of way I suppose it could kind of be both, but I do not know what the right thing to be doing is. Hmm.. I think it is a good thing to share code for making the offspring on either side of this. 
- fear the L-rd. 
- care for others
- speak of them --> It is good to write good code. 

This is kind of where it gets a little bit difficult, and it is even more complicated to be doing it like this and I do not know if the complexity is a good thing. Perhaps I should just progress in iterations. --> I think this is the better thing to be doing and then when things get better I could gain from this.

So again, I have the problem a bit of this perhaps not being the best looking code but of it working pretty well and it actually being pretty easy to write like this, this time round and so there could well be a better way of doing this and I do not know the best way to be doing this just yet. I really want to improve the code and there is also other things I wish to be doing, for there is still a bit of a way to be going and I want to review  this in a way which is good and to be doing this for myself and so I am happy with this so far. 

On the most part the code for this is actually quite hard to kind of be doing. PErhaps the brain thing is when accessing deeper parts of the data store it can be quite confusing and in honesty the data kind of flow or part of this is not so hard.

A lot of code repeated in the if statements. I think that this can be reduced. 

PErhaps this function should be in the functions file. But then I think it would not have access to this
*/

class DisplayTeaching {
	constructor(belief) {
		this.belief = belief;
		this.create();
	};
	createSubTeachingsList(subTeachings = []) {
		if(!subTeachings){
			return;
		};

		const list = create('ul');
		subTeachings.map((subTeaching) => {
			let listElement = create('li');
			listElement.innerText = subTeaching;
			list.append(listElement)
		});
		return list;
	};
	displayChildren(type) {
		const offspring = this.belief.offspring[type];
		if(!offspring){
			return;
		};
		const typeTitle = create('h4');
		typeTitle.innerText = type;
		this.container.append(typeTitle);
		offspring.map((child) => {
			let childContainer = create('div');
			childContainer.innerText = child.teaching
			this.container.append(childContainer);
			childContainer.append(this.createSubTeachingsList( child.subTeachings));
		});
	};
	create(){
		const beliefContainer = create('div');
		const beliefTitle = create('h3');

		this.container = beliefContainer;

		beliefTitle.innerText = this.belief.belief;

		beliefContainer.append(beliefTitle)
		this.displayChildren('actions');
		this.displayChildren('thoughts');
		this.displayChildren('service');
		this.displayChildren('pursuits');
		document.getElementById('listen-panel').append(beliefContainer);
		this.addDateStamp();

		addStyle(beliefContainer, styles.beliefContainer)
	};
	addDateStamp () {
		const dateContainer = create('div');

		const date = new Date(this.belief.date);
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear()
		let dateString = `${day}/${month}/${year}`;

		dateContainer.append(dateString);
		this.container.append(dateContainer);

		addStyle(dateContainer,styles.dateStyles);
	};
};

const styles = {
	dateStyles: {
		position: 'absolute',
		bottom: '0px'
	},
	beliefContainer: {
		position: 'relative',
		margin: '18px',
  		width: '40%',
    		height: '100%',
    		border: '1px solid black',
    		borderRadius: '10px',
   		padding: '10px',
		overflowX: 'auto'
	},

};
