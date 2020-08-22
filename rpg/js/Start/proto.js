const AllyTeam = new team();

class proto extends Phaser.Scene{
	constructor(){
		super({key: 'proto',
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
		this.selection = false;
		this.add.image( 400, 300, 'menu');
		this.add.text(250, 100, 'Select a Character', { fontSize: '40px', fill: '#001', fontFamily: 'Arial' });
		this.yufine();
		this.luna();
	}
	update(){
		this.CheckSelection();
	}
	
	luna(){
		this.lunaAlly = this.add.image(300,300, 'Luna');
		this.lunaAlly.setScale(.5);
		this.lunaAlly.setInteractive();
		this.lunaAlly.on('pointerdown', () => this.pickLuna());
	}
	pickLuna(){
		this.AllySkillsL = new Luna();
		AllyTeam.Ally1 = new Character(1, 'Luna', 100, 4, 0);
		AllyTeam.Ally1.name = 'Luna';
		AllyTeam.Ally1.skill1 = this.AllySkillsL.Skill1;
		AllyTeam.Ally1.skill1Des = this.AllySkillsL.skill1DesL;
		AllyTeam.Ally1.skill2 = this.AllySkillsL.Skill2;
		AllyTeam.Ally1.skill2Des = this.AllySkillsL.skill2DesL;
		AllyTeam.Ally1.isPassive2 = true;
		AllyTeam.Ally1.skill3 = this.AllySkillsL.Skill3;
		AllyTeam.Ally1.skill3Des = this.AllySkillsL.skill3DesL;
		this.selection = true;
	}
	
	yufine(){
		this.yufineAlly = this.add.image(500,300,'Yufine');
		this.yufineAlly.setScale(.3);
		this.yufineAlly.setInteractive();
		this.yufineAlly.on('pointerdown', () => this.pickYufine());
	}
	pickYufine(){
		this.AllySkillsY = new Yufine();
		AllyTeam.Ally1 = new Character(1, 'Yufine', 100, 4, 0);
		AllyTeam.Ally1.name = 'Yufine';
		AllyTeam.Ally1.skill1 = this.AllySkillsY.Skill1;
		AllyTeam.Ally1.skill1Des = this.AllySkillsY.skill1DesY;
		AllyTeam.Ally1.skill2 = this.AllySkillsY.Skill2;
		AllyTeam.Ally1.isPassive2 = false;
		AllyTeam.Ally1.skill2Des = this.AllySkillsY.skill2DesY;
		AllyTeam.Ally1.skill3 = this.AllySkillsY.Skill3;
		AllyTeam.Ally1.skill3Des = this.AllySkillsY.skill3DesY;
		this.selection = true;
		
	}
	
	CheckSelection(){
		if(this.selection){
			this.scene.start('Confirm')
		}
	}
}