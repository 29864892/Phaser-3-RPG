//battle scene
currentEnemy = 'Edgel0rd';

class Battle1s1 extends Phaser.Scene{
	constructor(){
		super({key: 'Battle1s1',
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
		this.ui = this.add.image(400, 300, 'BattleUI');
		this.bg = this.add.image(400, 206, 'battleBg1s1');
		this.createEnemy();
		this.createBattleUI();
		this.createAlly();
		this.turn = 1;
	}
	createEnemy(){
		if(currentEnemy === 'Edgel0rd'){
			this.createEdgel0rd();
		}
		this.enemy.body.setAllowGravity(false);
	}
	createEdgel0rd(){
		this.enemy = this.physics.add.sprite(400,150, 'boss1s1');
		edgeLordAnims(this);
		this.enemy.anims.play('edgelordIdle');
		this.enemyObject = new Edgel0rd();
		this.enemyStats = new Character(666, '3dg310rd', 500, 6, 20);
		this.add.text(90, 50, 'Edgel0rd LV.' + this.enemyStats.level, { fontSize: '30px', fill: '#001', fontFamily: 'Impact' });
	}
	createBattleUI(){
		this.createBUIButtons();
		this.createAllyUI();
		this.createBossInfo();
		this.turnText = this.add.text(600, 50, 'Turn: 1', { fontSize: '20px', fill: '#001', fontFamily: 'Impact' });
	}
	createBUIButtons(){
		this.conf = this.add.image(700, 400, 'next');
		this.conf.setInteractive();
		this.conf.on('pointerdown', () => this.Attack());
		this.cancel = this.add.image(700, 450, 'cancel');
		this.cancel.setInteractive();
		this.cancel.on('pointerdown', () => this.clearSkills());
		this.run = this.add.image(700, 500, 'run');
		this.run.setInteractive();
		this.confLeave = null;
		this.infoBox = null;
		this.textActive = false;
		this.run.on('pointerdown', () => this.escape());
	}
	createBossInfo(){
		this.add.image(180, 100, 'bossBarbg');
		this.bossBar = this.add.sprite(180,100, 'bossBar');
		this.eDamage = 0;
		this.enemyTurn = false;
	}
	createAlly(){
		if(AllyTeam.Ally1.name === 'Luna'){
			this.allySprite = this.physics.add.sprite(370, 302, 'LunaSprite');
			LunaAnims(this);
			this.allySprite.anims.play('LunaIdle');
		}
		else if(AllyTeam.Ally1.name === 'Yufine'){
			this.allySprite = this.physics.add.sprite(370, 302, 'YufineSprite');
			YufineAnims(this);
			this.allySprite.anims.play('YufineIdle');
		}
		else{
			this.allySprite = this.physics.add.sprite(370, 302, 'YufineSprite');
			PlayerBattleAnims(this);
			this.allySprite.anims.play('PlayerIdle');
		}
		this.allySprite.body.setAllowGravity(false);
	}
	//Left ally box uix 170, y 455; hpbar x 170, y 382 text x 110; y 395, 410, 425, 440; skills: x 130, 170, 210; y 510
	createAllyUI(){
		this.ally1UI = this.add.image(370, 455, 'AllyUi');
		this.allyHp = this.add.image(370, 382, 'allyHp');
		this.ally1Skill = 'x';//change based on skill selection
		this.add.text(310, 395, AllyTeam.Ally1.name,{ fontSize: '14px', fill: '#001', fontFamily: 'Arial' });
		this.add.text(310, 410, 'Level: ' + AllyTeam.Ally1.level,{ fontSize: '14px', fill: '#001', fontFamily: 'Arial' });
		this.allyHpText = this.add.text(310, 425, 'Health: ' + AllyTeam.Ally1.health,{ fontSize: '14px', fill: '#001', fontFamily: 'Arial' });
		this.add.text(310, 440, 'Exp: ' + AllyTeam.Ally1.exp, { fontSize: '14px', fill: '#001', fontFamily: 'Arial' });
		this.Ally1Attacked = false;
		this.AllyHealthPrior = 100;
		this.createAlly1Skill1();
		this.createAlly1Skill2();
		this.createAlly1Skill3();
	}
	createAlly1Skill1(){
		this.ally1S1Conf = this.add.image(330, 510, 'sOk');
		this.ally1S1Conf.visible = false;
		this.ally1S1 = this.add.image(330, 510, 's1');
		this.ally1S1.setInteractive();
		this.ally1S1.on('pointerdown', () => this.selectS1());
		this.ally1S1.on('pointerover', () => this.infoA1S1());
		this.ally1S1.on('pointerout', () => this.clearInfo());
		this.info = false;
	}
	infoA1S1(){
		if(!this.info){
			this.InfoText(AllyTeam.Ally1.skill1Des);
			this.info = true;
		}
	}
	clearInfo(){
		if(this.infoBox !== null){
			this.infoBox.destroy();
			this.infoText.destroy();
			this.infoBox = null;
			this.info = false;
		}
	}
	createAlly1Skill2(){
		this.ally1S2Conf = this.add.image(370, 510, 'sOk');
		this.ally1S2Conf.visible = false;
		this.ally1S2 = this.add.image(370, 510, 's2');
		this.ally1S2.setInteractive();
		this.ally1S2.on('pointerdown', () => this.selectS2());
		this.ally1S2.on('pointerover', () => this.infoA1S2());
		this.ally1S2.on('pointerout', () => this.clearInfo());
	}
	infoA1S2(){
		if(!this.info){
			this.InfoText(AllyTeam.Ally1.skill2Des);
			this.info = true;
		}
	}
	createAlly1Skill3(){
		this.ally1S3Conf = this.add.image(410, 510, 'sOk');
		this.ally1S3Conf.visible = false;
		this.ally1S3 = this.add.image(410, 510, 's3');
		this.ally1S3.setInteractive();
		this.ally1S3.on('pointerdown', () => this.selectS3());
		this.ally1S3.on('pointerover', () => this.infoA1S3());
		this.ally1S3.on('pointerout', () => this.clearInfo());
		this.ally1S3Cd = AllyTeam.Ally1.s3Cd;
	}
	infoA1S3(){
		if(!this.info){
			this.InfoText(AllyTeam.Ally1.skill3Des + '\nCooldown: '+ this.ally1S3Cd);
			this.info = true;
		}
	}
	selectS1(){
		if(this.ally1S2Conf.visible === true){
			this.ally1S2Conf.visible = false;
		}
		if(this.ally1S3Conf.visible === true){
			this.ally1S3Conf.visible = false;
		}
		this.ally1S1Conf.visible = true;
		this.ally1Skill = 's1';
	}
	selectS2(){
		if(this.ally1S1Conf.visible === true){
			this.ally1S1Conf.visible = false;
		}
		if(this.ally1S3Conf.visible === true){
			this.ally1S3Conf.visible = false;
		}
		this.ally1S2Conf.visible = true;
		this.ally1Skill = 's2';
	}
	selectS3(){
		if(this.ally1S1Conf.visible === true){
			this.ally1S1Conf.visible = false;
		}
		if(this.ally1S2Conf.visible === true){
			this.ally1S2Conf.visible = false;
		}
		this.ally1S3Conf.visible = true;
		this.ally1Skill = 's3';
	}
	
	
	update(){
		this.updateButtons();
		this.updateBoss();
		this.updateAlly();
		this.enemyAttack();
		this.checkGameOver();
	}
	updateButtons(){
		if(this.confLeave !== null && !this.textActive){
			this.confLeave.destroy();
			this.confLeave = null;
		}
	}
	updateBoss(){
		this.bossBar.setCrop(0, 0, 180 * (this.enemyStats.health / 500), 600);
	}
	updateAlly(){
		this.allyHp.setCrop(0, 0, 180 * (AllyTeam.Ally1.health / 100), 600);
		this.allyHpText.setText('Health: ' + AllyTeam.Ally1.health);
		if(this.AllyDamaged && !this.textActive){
			this.BattleText(AllyTeam.Ally1.name + ' took ' + (this.allyHealthPrior - AllyTeam.Ally1.health) + ' damage!');
			this.AllyDamaged = false;
			if(AllyTeam.Ally1.health <= 0){
				AllyTeam.Ally1.health = 0;
				this.gameOver = true;
			}
		}
	}
	
	enemyAttack(){
		if(this.enemyTurn && !this.textActive && this.enemyStats.health > 0){
			this.allyHealthPrior = AllyTeam.Ally1.health;
			if(this.turn % 6 === 0){
				this.BattleText(this.enemyStats.name + ' ' + this.enemyObject.skill3DesE);
				this.enemyObject.skill3(this.enemyStats, AllyTeam.Ally1);
			}
			else if(this.turn % 2 === 0){
				this.enemyObject.skill1(this.enemyStats, AllyTeam.Ally1);
				this.BattleText(this.enemyStats.name + ' ' + this.enemyObject.skill1DesE);
			}
			else{
				this.enemyObject.skill2(this.enemyStats, AllyTeam.Ally1);
				this.BattleText(this.enemyStats.name + ' ' + this.enemyObject.skill2DesE);
			}
			if(this.allyHealthPrior != AllyTeam.Ally1.health){
				this.AllyDamaged = true;
			}
			this.enemyTurn = false;
		}
	}
	checkGameOver(){
		if(this.enemyStats.health <= 0 && !this.gameOver){
			if(!this.textActive){
				this.BattleText(this.enemyStats.name + ' has been defeated!');
				this.gameOver = true;
			}
			else{
				this.gameOver = false;
			}
			edgel0rdDefeated = true; 
		}
		if(AllyTeam.Ally1.health <= 0 && !this.gameOver){
			this.gameOver = true;
			if(!this.textActive){
				this.BattleText(AllyTeam.Ally1.name + ' has been defeated!');
			}
			else{
				this.gameOver = false;
			}
		}
		if(!this.textActive && this.gameOver){
			this.scene.start('Stage1s1');
		}
	}
	
	InfoText(text){
		if(this.infoBox === null){
			this.infoBox = this.add.image(400, 260, 'textBox');
			this.infoText = this.add.text(100, 200, text, { fontSize: '30px', fill: '#001', fontFamily: 'Arial' });
		}
	}
	BattleText(text){
		if(!this.textActive){
			this.box = this.add.image(400, 460, 'textBox');
			this.text = this.add.text(100, 410, text,{ fontSize: '30px', fill: '#001', fontFamily: 'Arial' });
			this.box.setInteractive();
			this.box.on('pointerdown', () => this.clearText());
			this.textActive = true;
		}
	}
	clearText(){
		this.box.destroy();
		this.text.destroy();
		this.textActive = false;
	}
	clearSkills(){
		this.ally1S1Conf.visible = false;
		this.ally1S2Conf.visible = false;
		this.ally1S3Conf.visible = false;
		this.ally1Skill = 'x';
	}
	Attack(){
		this.teamAttack = true;
		this.checkAttack();
		if(this.Ally1Attacked && this.teamAttack){
			//Successful attack and turn transition
			if(this.eDamage === 0){
				this.BattleText(AllyTeam.Ally1.name + ' increased their stats!');
			}
			else{
				this.calculateDamage();
			}
			this.turn++;
			this.turnText.setText('Turn: ' + this.turn);
			this.enemyTurn = true;
			this.checkPassives();
		}
		else{
			//reset cooldown if not used because of ally
			if(this.ally1Skill === 's3' && this.Ally1Attacked && !this.teamAttack){
				this.ally1S3Cd = 0;
			}
			this.enemyTurn= false;
		}
		
	}
	checkAttack(){
		this.checkAlly1Attack();
	}
	checkAlly1Attack(){
		if(this.ally1Skill === 'x'){
			this.BattleText('Not all characters have an attack selected.');
			this.teamAttack = false;
		}
		else if(this.ally1Skill === 's2'){
			if(AllyTeam.Ally1.isPassive2){
				this.BattleText('One or more passive skills were selected as an \nattack.');
				this.teamAttack = false;
			}
			else{
				this.eDamage += AllyTeam.Ally1.skill2(AllyTeam.Ally1);
				this.Ally1Attacked = true;
			}
		}
		else if(this.ally1Skill === 's1' && !AllyTeam.isPassive1){
			this.eDamage += AllyTeam.Ally1.skill1(AllyTeam.Ally1);
			if(this.ally1S3Cd !== 0){
				this.ally1S3Cd--;
			}
			this.Ally1Attacked = true;
		}
		else if(this.ally1Skill === 's3' && !AllyTeam.isPassive3){
			if(this.ally1S3Cd === 0){
				this.eDamage += AllyTeam.Ally1.skill3(AllyTeam.Ally1);
				this.Ally1Attacked = true;
				this.ally1S3Cd = AllyTeam.Ally1.s3Cd;
			}
			else{
				this.BattleText('Skill is on cooldown: ' + this.ally1S3Cd + ' turns.');
				this.Ally1Attacked = false;
				this.teamAttack = false;
			}
		}
	}
	calculateDamage(){
		this.eDamage -= this.enemyStats.armor;
		if(this.eDamage <= 0){
			this.eDamage = 0;
		}
		this.enemyStats.health -= this.eDamage;
		this.BattleText(AllyTeam.Ally1.name + ' attacked, dealing ' + this.eDamage + ' damage!');
		this.eDamage = 0;
	}
	
	checkPassives(){
		if(AllyTeam.Ally1.isPassive1){
			AllyTeam.Ally1.skill1(AllyTeam.Ally1);
		}
		else if(AllyTeam.Ally1.isPassive2){
			AllyTeam.Ally1.skill2(AllyTeam.Ally1);
		}
		else if(AllyTeam.Ally1.isPassive3){
			AllyTeam.Ally1.skill3(AllyTeam.Ally1);
		}
	}
	
	escape(){
		this.BattleText('Quit the Battle?');
		this.confLeave = this.add.image(700, 500, 'next');
		this.confLeave.setInteractive();
		this.confLeave.on('pointerdown', () => this.forefeit());
	}
	forefeit(){
		this.registry.events.off('changedata', undefined, undefined, false);
		this.registry.destroy();
		this.events.off();
		this.scene.stop();
		this.scene.start('Stage1s1');
	}
}