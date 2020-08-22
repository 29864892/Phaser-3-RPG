
class Confirm extends Phaser.Scene{
	constructor(){
		super({key: 'Confirm',
		type: Phaser.AUTO,
		width: 800,
		height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 600 },
				debug: false
            }
        }
    });
	}

	create(){
		this.add.image(400,300,'confirm');
		this.BackButton();
		this.ContinueButton();
		this.DisplayAlly();
	}
	update(){
		
		
	}
	BackButton(){
		this.back = this.add.image(640, 500, 'back');
		this.back.setInteractive();
		this.back.on('pointerdown', () => this.retMain());
	}
	ContinueButton(){
		this.next = this.add.image(700, 500, 'next');
		this.next.setInteractive();
		this.next.on('pointerdown', () => this.start());
	}
	
	DisplayAlly(){
		
		this.ally = this.add.image(200,300, AllyTeam.Ally1.name);
		this.resize();
		this.add.text(360, 100, AllyTeam.Ally1.name, { fontSize: '30px', fill: '#001', fontFamily: 'Arial' });
		this.add.text(360, 160, 'Skill 1',{ fontSize: '30px', fill: '#001', fontFamily: 'Arial' });
		this.add.text(360, 200, AllyTeam.Ally1.skill1Des,{ fontSize: '20px', fill: '#001', fontFamily: 'Arial' });
		this.add.text(360, 260, 'Skill 2',{ fontSize: '30px', fill: '#001', fontFamily: 'Arial' });
		this.add.text(360, 300, AllyTeam.Ally1.skill2Des,{ fontSize: '20px', fill: '#001', fontFamily: 'Arial' }); 
		this.add.text(360, 360, 'Skill 3',{ fontSize: '30px', fill: '#001', fontFamily: 'Arial' });
		this.add.text(360, 400, AllyTeam.Ally1.skill3Des,{ fontSize: '20px', fill: '#001', fontFamily: 'Arial' }); 
	}
	retMain(){
		this.registry.events.off('changedata', undefined, undefined, false);
		this.registry.destroy();
		this.events.off();
		this.scene.stop();
		this.scene.start('proto');
	}
	start(){
		this.registry.events.off('changedata', undefined, undefined, false);
		this.registry.destroy();
		this.events.off();
		this.scene.stop();
		this.scene.start('Stage1s2');
	}
	resize(){
		if(AllyTeam.Ally1.name === 'Yufine'){
			this.ally.setScale(.51);
		}
		else if(AllyTeam.Ally1.name === 'luna'){
			this.ally.setScale(.9);
		}
	}
}