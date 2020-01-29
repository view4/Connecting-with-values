/*
So in this I want to achieve some kind of navigation for the app, and to be able to separate between a few things because I think that this matters in some kind of sense and I think that there is good which is within this in honesty. 

- walk in His ways 
- Have a sign on the doorposts of your House and on the doorposts of your gates . 
- I think freedom to move, to roam is linked with freedom, with choice and not being stuck or imprisoned in some kind of sense. 

'Hear O'Israel', 
but also...'to speak of them'


So this has worked pretty well but a lot of the functionality of this I had done outside of this component and so I am not sure if this is something which is completely worth it in honesty. 

I hope in the review or something I wish to highlight the main good points, and that which is beneficial, and I hope to grow through this in some way or another. 

I like the ability to append different functions to this. This is one of the examples of this over react for example. Well you can have this in react as well in some sense but it is not so simple. 
*/

class Button {
 	constructor (buttonFunction, buttonText) {
		this.buttonFunc = buttonFunction.bind(this);
		this.buttonText = buttonText;
	};

	create () {
		const button = create('button');

		button.innerText = this.buttonText;

		button.addEventListener('click', this.buttonFunc)

		return button;
	};
};
