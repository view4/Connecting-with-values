const root = document.getElementById('root');
const speakingPanel = create('div');
const speakingPanelInput = create('div');
const listeningPanel = create('div');
const childrenContainer = create('div');
speakingPanel.id = 'speak-panel';
speakingPanelInput.id = 'speak-input-panel';
listeningPanel.id = 'listen-panel';
childrenContainer.id = 'children'
// I think to include like an optional variable for id, and class names (perhaps as array);
append(root,speakingPanel);
append(speakingPanel,speakingPanelInput);
append(root, listeningPanel);
append(speakingPanel, childrenContainer);
// I think perhaps this should/could be altered to root.append(element)
	// Also to be able to add a list of children, to save repititions.
addStyle(childrenContainer, {overflowX:'scroll'})

const actions = new TeachingsInput('actions');
const thoughts = new TeachingsInput('thoughts');
const service = new TeachingsInput('service');
const pursuits = new TeachingsInput('pursuits')


const arrayOfChildren = [actions.create(), thoughts.create(), service.create(),pursuits.create() ]


new BeliefInput(speakingPanelInput, arrayOfChildren); // I like this, passing the collection of children through here.

var northButton = new Button(buttonFunctions.changeDirection, 'North').create();
addStyle(northButton, {
	position: 'absolute',
	top: '120px',
	right: '50px'
});

var eastButton = new Button(buttonFunctions.changeDirection, 'East').create();
addStyle(eastButton, {
	position: 'absolute',
	top: '180px',
	right: '50px'
});

var southButton = new Button(buttonFunctions.changeDirection, 'South').create();
addStyle(southButton, {
	position: 'absolute',
	backgroundColor: '#07c0ffb3',
    	color: 'white',
    	fontWeight: 'bold',
	top: '240px',
	right: '50px'
});


root.appendChild(northButton);
root.appendChild(eastButton);
root.appendChild(southButton);

var speakOrListenButton = new Button(buttonFunctions.toggleAppMode, 'Speak').create();

//This is temp, see how to add buld css (please....) and perhaps how to pass to the class
addStyle(speakOrListenButton,{	
	position: 'absolute',
	top: '20px',
	right: '50px',
	borderRadius:'36px'
});

root.appendChild(speakOrListenButton) 

setDirection('South');
setAppMode('listen');
listTeachings();
addStyle(listeningPanel, {display: 'flex'});
/*
I'm not sure exactly sure of what else I have to be doing: 
- I want to add the directions to this- so the teachings are sorted by the direction. 
	- Fear the L-rd.. 
	- cleave to Him.. 
	- Connect with meaning 
	- Care for others.. 

I think that this should be doing something but I am unsure of the best way to be going about this. I think it should change the styling but also to change the 'mode' of the app. I kind of think that there should be some kind of thing in the data, and that the function to retreive the data from firebase should also be in the data part of the app, and that this is something interesting, and then this chould be something good. 

I suppose it should recieve from all directions, until is specifies, but I am unsure of this right now. 

Set mode in the data 'brain': 
	- speak of them 
	- fear the L-rd
	- cleave to meaning.

To add information to the database when entering the info.
	!!!- to do this based on direction
		- fear the L-rd... 
		- cleave to Him 
		- speak of them 
		- ths helps to sort them. !!!
	- fear the L-rd.. 
	- speak of them
	- care for others 
And so there may be certain types of directions which may be neccessary for this. And so this is something which I am unsure of how to be doing. I suppose if I set it up so it just adds to one of them then this is a good thing to be doing, and I think I want it to show a message if it is unable to connect because I think that this matters as well. 

So what else do I have - I think for now I do this simple, and I enable it to add to the normal db, and then I filter by direction etc.. After this I think nearly all of the functionality is done and I can just do a kind of review over this and we shall see and I think it would be good. 

Okay, so let's do it based on this I'm not sure if there should be a default mode set or not, for the directions, it is not clear to me. For not it is not the mmost important. If I have this and the ability to later change the direction of inputted ones then it is acceptable.
*/

/*

So I guess one thing which I want to be able to add is to be able to submit these upon enter but this is something which is perhaps not completely easy and so I think that there is a way though. 

It still does not look amazing, but I am kind of okay with this and I do not mind too much. I can always add this over time and I do not even mind this having just some kind of basic retro-ey kind of look, but I am not sure how to achieve this.

*/

/*
So I want to be able to do this on enter as well and so this is something which is kind of complicated but surely there is a way because other people have done this. 

- Let in consciousness
- care for others 
- teach them to your sons
- walk in His ways 

Okay, so this is a pretty good attempt and it works pretty well, I do not know what else to be doing, and I shoudl probably be leaving. I want to see a few other things, but overall I am happy with the progress. 

I think that this could still be kind of improved a little bit. I think that this is basically the third iteration done, once I have finished with a few small things. Namely receiving teachings from different directions, but I do not know what else there is really here. Minor and major styling changes in all honesty. 
*/ 
