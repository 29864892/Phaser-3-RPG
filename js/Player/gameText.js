//create a textbox with text for a scene
function worldText(scene, text){
	if(!scene.textActive && scene.createText){
			scene.box = scene.add.image(400, 500, 'textBox');
			scene.text = scene.add.text(100, 410, text,{ fontSize: '30px', fill: '#001', fontFamily: 'Arial' });
			scene.textActive = true;
			scene.clearTextBox = false;
	}
}
//clear existing textBox
function clearText(scene){
	if(scene.textActive && scene.clearTextBox){
		scene.box.destroy();
		scene.text.destroy();
		scene.textActive = false;
		scene.createText = false;
	}
}
/*Text for most of the Game*/
//Stage 3 text
	//initial conversation
	let s3text1 = 'Soldier:\nFighting against us is a waste of time!';
	let s3text2 = 'Mysterious Person:\nI refuse to yield to you!';
	let s3text3 = 'Soldier:\nOh, you would rather die then?';
	let s3text4 = 'Mysterious Person:\n ...';
	let s3text5 = 'Soldier:\nIf you don\'t cooperate with us, we will have no \nchoice but to kill you.';
	let s3text6 = 'Mysterious Person:\nI would rather die than help you!';
	let s3text7 = 'Mysterious Person:\nMy allies told me about the ones you \nmassacred yesterday...';
	let s3text8 = 'Mysterious Person:\nNot only my kind but also your own \npeople were killed to cover up our existence.';
	let s3text9 = 'Mysterious Person:\nI will never surrender to murderers \nsuch as yourselves!';
	let s3text10 = 'Soldier:\nHAHAHAHAHHAHAHAHAHAHAHAAAAAAA!';
	let s3text11 = 'Soldier:\nLooks like we didn\'t murder all of you that \nday, huh?';
	let s3text12 = 'Soldier:\nI guess we enjoyed ourselves too much to pay \nattention to the corpses.';
	let s3text13 = 'Soldier:\nI take back what I said, we\'re going to \nkill you!';
	let s3text14 = 'Mysterious Person:\nNot before I avenge my fallen \ncomrades!';
	//choice 1 (help)
	let s3c1Text1 = 'Soldier:\nWell, well! Looks like we\'ll have to silence \nthis one too!';
	let s3c1Text2 = 'Mysterious Person\nYou really are hopeless...';
	let s3c1Text3 = 'Mysterious Person\nStand back, I won\'t allow them to hurt you!';
	//choice 2 (watch)
	let s3c2Text1 = 'Soldier:\nNice joke, take her out!';
	let s3c2Text2 = 'Mysterious Person\n(That human staring at us doesn\'t appear \nhostile.)';
	let s3c2Text3 = 'Mysterious Person\nHmph, I\'ll show you my true power!';
	//choice 3 (leave)
	let s3c3Text1 = 'Mysterious Person\nYou! Get out of here, these people will kill you!';
	let s3c3Text2 = 'Soldier:\nYou heard it, scram kid!';
	let s3c3Text3 = 'Soldier:\nHahaha, we\'ll let you live until we kill this \nmonster.';
	//Officer defeated
	let s3VText1 = 'Group of Soldiers:\nOfficer down! Fall back to base!';
	let s3VText2 = 'Mysterious Person:\nAre you alright?';
	let s3VText3 = '...';
	let s3VText4 = 'Mysterious Person:\nA human as weak as you shouldn\'t be fighting.';
	let s3VText5 = 'Mysterious Person:\nHad I not been able to defeat them, you would \nhave surely died.';
	let s3VText6 = 'Mysterious Person:\nBut I do see determination in your eyes and feel \nas though you may be useful to me.';
	let s3VText7 = 'Mysterious Person:\nI have no doubt that you will be hunted by those \npeople so it would be best to stay with me.';
	let s3VText8 = 'Mysterious Person:\nIn exchange, you will guide me though the \nhuman world so that I may find something I \nhave lost.';
	let s3VText9 = 'Luna:\nMy name is Luna. I hope you keep your end of \nour deal.';
	let s3VText10 = 'Luna:\nSince I have no idea where to search, you can \ndecide where we go for now.';
	let s3VText11 = 'Luna:\nBut if you waste my time, I will make you pay.';
	let s3VText12 = '.......';
//Stage 4 text
  //stage4s2
	let s4s2Text1 = 'Librarian:\nDon\'t hurt me please!I\'m just a librarian!!!';
	let s4s2Text2 = 'Luna:\nShut Up! We won\'t hurt you if you quit yelling!';
	let s4s2Text3 = 'Librarian:\nYes ma\'am!';
	let s4s2Text4 = 'Luna:\nDo you happen to know what\'s going on?';
	let s4s2Text5 = 'Librarian:\nI am not quite sure myself...';
	let s4s2Text6 = 'Librarian:\nI was in the middle of town when a group\nof soldier appeared and started firing at civilians.';
	let s4s2Text7 = 'Luna:\nIt\'s possible they were related to the ones I \nfought earlier...';
	let s4s2Text8 = 'Librarian:\nYou fought them!? That is a very menacing \nweapon you have there... Are you really not \ngoing to hurt me?';
	let s4s2Text9 = 'Luna:\nWould you like me to? Get back to what\nyou were saying.';
	let s4s2Text10 = 'Librarian:\nYes, yes... Well I ran here to hide from the \nsoldiers.';
	let s4s2Text11 = 'Luna:\nWhat about the blood over there?';
	let s4s2Text12 = 'Librarian:\nBlood? Oh no!';
	let s4s2Text13 = 'Librarian:\nWhile I was hiding here I heard someone else \ncome in.They were about to reach where I was \nhiding when someone else came in and \ndragged them away!';
	let s4s2Text14 = 'Librarian:\nI couldn\'t tell who it was, but judging by their \nvoice it may have been a woman.';
	let s4s2Text15 = 'Luna:\nI think that wraps this up. Stay out of trouble \nokay?';
	let s4s2Text16 = 'Librarian:\nOf course! If you ever need anything from me \njust ask! I\'ll do anything for you!';
	let s4s2Text17 = 'Luna:\nS-Sure! I\'ll let you know when the time comes.';
	let s4s2Text18 = 'Luna:\nWhat a creep. Reminds me of home in a bad way...';
	let s4s2Text19 = 'Librarian:\nIf you ever need anything from me just ask!\n I\'ll do anything for you!';
  //stage4s1
	let s4s1Text1 = 'Kid:\nW-who are you people? Are you even human?';
	let s4s1Text2 = 'Luna:\nDon\'t worry about that. Do you know what \nhappened here?';
	let s4s1Text3 = 'Kid:\nG-go t-to the center of the town!';
	let s4s1Text4 = 'Luna:\nWhat\'s over there?';
	let s4s1Text5 = 'Kid:\nThey told me to tell everyone to go to the center \nof town!';
	let s4s1Text6 = 'Luna:\nWho told you?';
	let s4s1Text7 = 'Kid:\n(crying)	................';
	let s4s1Text8 = 'Luna:\nThere, there. It\'s alright. I\'ll get rid of the bad \npeople for you.';
	let s4s1Text9 = 'Kid:\n............';
  //stage4r2
	let s4r2Text1 = 'Luna\nWhat could\'ve caused this destruction?';
  //stage4r3
	let s4r3Text1 = 'Soldier 1:\nWhat a shame we had to kill her.';
	let s4r3Text2 = 'Soldier 2:\nYeah, she was quite good looking...';
	let s4r3Text3 = 'Soldier 3:\nDon\'t worry about cleaning up, this whole \ntown is being purged anyways.';
	//choice 1 (fight)
	let s4r3Text5 = 'Luna:\nShe might still be alive!';
	let s4r3Text6 = 'Soldier 1:\nWho the hell are you!?';
	let s4r3Text7 = 'Luna:\nI\'m here to stop this!';
	let s4r3Text7b = 'Soldier 1:\nTake her out!';
	//choice 2 (leave)
	let s4r3Text8 = 'Luna:\nAre you sure that\'s the right thing to do?';
	let s4r3Text9 = 'Luna:\nMaybe I misjudged you...';
	//after battle
	let s4r3VText1 = 'Luna:\nDie cowards!';
	let s4r3VText2 = 'Soldiers 1 and 2:\nNooooooo!';
	let s4r3VText3 = 'Soldier 3:\nNot like this...';
	let s4r3VText4 = 'Luna:\nWhy are you doing this? Tell me!';
	let s4r3VText5 = 'Soldier 3:\nIt\'s our orders. To go against them is a death \nwish.';
	let s4r3VText6 = 'Soldier 3:\nWe made a deal with a local gang after the \naliens attacked us.';
	let s4r3VText7 = 'Luna:\nAttacked? Impossible, we didn\'t come here to \nwage war!';
	let s4r3VText8 = 'Soldier 3:\n*Coughing* I refuse to believe that after what I \nsaw...';
	let s4r3VText9 = 'Soldier 3:\nOur superiors ordered us to kill anyone \nwho may have found out about it...';
	let s4r3VText10 = 'Soldier 3:\nWhich includes everyone is this town.';
	let s4r3VText11 = 'Soldier 3:\nIf only they hadn\'t invaded...';
	let s4r3VTexts1 = [s4r3VText1, s4r3VText2, s4r3VText3, s4r3VText4, s4r3VText5, s4r3VText6, s4r3VText7, s4r3VText8, s4r3VText9, s4r3VText10, s4r3VText11];
	//text after event
	let s4r3VText12 = 'Luna:\nHow could this be? Did my own kind betray me?';
	let s4r3VText13 = 'Luna\nTo tell you the truth, I was thinking of going \non without you after we arrived here.';
	let s4r3VText14 = 'Luna:\nBut I don\'t want you to end up like this woman.';
	let s4r3VText15 = 'Luna:\nEven if I left you, I would have no where else to \ngo.';
	let s4r3VText16 = 'Luna:\nI might as well stay with you for a while longer...';
	let s4r3VTexts2 = [s4r3VText12, s4r3VText13, s4r3VText14, s4r3VText15, s4r3VText16];
  //stage4r4
	let s4r4Text1 = 'Gang Leader:\n Your boss is sending me more guns right?';
	let s4r4Text2 = 'Soldier:\nO-of course sir! The supplies should arrive \ntomorrow!';
	let s4r4Text3 = 'Gang Leader:\nHeh, that\'s perfect. I really need to restore \n\'order\' to the area soon.';
	let s4r4Text4 = 'Soldier:\nMy Captain also wishes to inform you that \nwe will leaving this area tomorrow.';
	let s4r4Text5 = 'Gang Leader:\nGood! Get out of here you pests!';
	let s4r4Text6 = 'Soldier:\nTsk. What a pain...';
	let s4r4Text7 = 'Gang Leader:\nWhat was that, runt? Got a death wish?';
	let s4r4Text8 = 'Soldier:\nHey, there\'s survivors over there! \n(Time to get out of here)';
	//Soldier leaves
	let s4r4Text9 = 'Gang Leader:\n*Snorts* Fortunately for you, I\'m in a good mood!';
	let s4r4Text10 = 'Gang Leader:\nMhmm... You\'re just as good of a lady.';
	let s4r4Text11 = 'Luna:\nHey -';
	let s4r4Text12 = 'Gang Leader:\nTell you what kid, give me the girl and I\'ll let you \ngo.';
	let s4r4Text13 = 'Luna:\nAs if I was his property!';
	let s4r4Text14 = 'Gang Leader:\nOh, so you want to resist me then?';
	let s4r4Text15 = 'Luna:\nYou must be punished for the crimes you\'ve \ncommitted!';
	let s4r4Text16e = 'Gang Leader:\nCrimes? I\'ve only been working with \nthe army to maintain order.';
	let s4r4Text16 = 'Gang Leader:\nHeh, you\'re not even human, what we do \nshouldn\'t matter to you.';
	let s4r4Text17 = 'Gang Leader:\nKid, calm your girlfriend down, okay? She\'s \nmaking me angry...';
	let s4r4Text18 = 'Luna:\nGIRLFRIEND!? I\'ll make you regret being born!';
	let s4r4Text19 = '...';
	let s4r4Texts = [s4r4Text1, s4r4Text2, s4r4Text3 ,s4r4Text4, s4r4Text5, s4r4Text6, s4r4Text7, s4r4Text8, s4r4Text9, s4r4Text10, s4r4Text11, s4r4Text12, s4r4Text13, s4r4Text14, s4r4Text15, s4r4Text16e, s4r4Text16, s4r4Text17, s4r4Text18, s4r4Text19];
	//after battle
	let s4r4VText1 = 'Gang Leader:\nNo way... You\'re not human!';
	let s4r4VText2 = 'Luna:\nI despise the way you think- no, your very \nexistence!';
	let s4r4VText3 = 'Luna:\nYou\'re quite the simpleminded human, \narent\'t you?';
	let s4r4VText4 = 'Luna:\nOnce you were in a position of power, \nyou looked down on and harmed those below \nyou.';
	let s4r4VText5 = 'Luna:\nBe thankful that I\'ve put you in your place.';
	let s4r4VText6 = 'Gang Leader:\nYou bi-';
	let s4r4VText7 = 'Luna:\nI\'m glad that\'s over with.';
	let s4r4VTexts = [s4r4VText1, s4r4VText2, s4r4VText3, s4r4VText4, s4r4VText5, s4r4VText6, s4r4VText7];
	
	let s4r4EText1 = 'Luna:\n*Coughing* I must have used too much energy...';
	let s4r4EText2 = 'Luna:\nThough I am one of my people\'s strongest \nwarriors, my stamina is quite low.';
	let s4r4EText3 = 'Luna:\nWe\'ve fought too much today. I don\'t have the \nstrength to continue...'
	let s4r4EText4 = 'Luna:\nCan I trust you to find a place we can stay \nuntil tomorrow?';
	let s4r4ETexts = [s4r4EText1, s4r4EText2, s4r4EText3, s4r4EText4];
  //stage4r5
    let s4r5Text1 = '\n 	^Business District \n <-- Hospital';  
	let s4r5Text2 = 'Welcome to the hospital. If you know anyone \nthat has been injured, please bring \nthem here.';
	
	
	
	
	
	
	
	
	
	
	
