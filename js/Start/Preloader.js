class Preloader extends Phaser.Scene{
	constructor(config){
		super(config);
	}
	preload(){
		this.background = this.add.sprite(400, 300, 'preloaderBackground');
		//Main menu assets
		this.LoadMainMenu();
		this.LoadStages();
		this.LoadBattleAssets();
		this.LoadCharacters();
		this.LoadOther();
	}
	create(){
		this.scene.start('proto');
	}
	LoadMainMenu(){
		this.load.image('menu', 'assets/menus/Confirm.png');
		this.load.image('back', 'assets/menus/back.png');
		this.load.image('confirm', 'assets/menus/Confirm.png');
		this.load.image('next', 'assets/menus/next.png');
		this.load.image('cancel', 'assets/menus/cancel.png');
		this.load.image('run', 'assets/menus/run.png');
		//this.load.audio('click', 'assets/menus/mouse-click-clicking-single-click-2-www.FesliyanStudios.com.mp3');//https://www.fesliyanstudios.com/sound-effects-search.php?q=single+mouse+click
	}
	LoadBattleAssets(){
		this.load.image('textBox', 'assets/menus/textbox.png');
		this.load.image('BattleUI', 'assets/menus/battleBg.png');
		this.load.spritesheet('boss1s1', 'assets/CharacterImages/edgelordsheet.png', { frameWidth: 140, frameHeight: 160 });
		this.load.image('bossBarbg', 'assets/menus/bosshpBg.png');
		this.load.image('bossBar', 'assets/menus/bosshpBar.png');
		this.load.image('allyHp', 'assets/menus/allyHpBar.png');
		this.load.image('AllyUi', 'assets/menus/AllyUi.png');
		this.load.image('s1', 'assets/CharacterImages/skillImages/skill1.png');
		this.load.image('s2', 'assets/CharacterImages/skillImages/skill2.png');
		this.load.image('s3', 'assets/CharacterImages/skillImages/skill3.png');
		this.load.image('sOk', 'assets/CharacterImages/skillImages/skillSelected.png');
		
	}
	LoadCharacters(){
		this.load.image('Luna', 'assets/CharacterImages/seasideluna.png');
		this.load.image('Luna2d', 'assets/stage3/luna2d.png');
		this.load.image('Yufine', 'assets/CharacterImages/yufine.png');
		this.load.spritesheet('LunaSprite', 'assets/CharacterImages/lunaSheet.png', {frameWidth: 129, frameHeight: 119 });
		this.load.spritesheet('YufineSprite', 'assets/CharacterImages/YufineSheet.png', {frameWidth: 129, frameHeight: 119});
		this.load.spritesheet('PlayerSprite', 'assets/CharacterImages/PlayerBattleSprite.png', {frameWidth: 129, frameHeight: 119});
		this.load.spritesheet('player', 'assets/CharacterImages/MCSheet40.png', { frameWidth: 40, frameHeight: 40 });
		this.load.image('Mr.Robster', 'assets/CharacterImages/robster.png');
		this.load.image('gangster', 'assets/CharacterImages/gangster.png');
		this.load.image('kid', 'assets/CharacterImages/kid.png');
		this.load.image('soldier', 'assets/stage3/soldier.png');
		this.load.image('captain', 'assets/stage3/captain.png');
		this.load.spritesheet('officer', 'assets/CharacterImages/officerSheet.png', {frameWidth: 140, frameHeight: 160});
	}
	LoadOther(){
		
	}
	LoadStages(){
		//s1
		this.load.image('door', 'assets/stage1/door.png');
		this.load.image('exit', 'assets/stage1/house1/exit.png');
		this.load.image('borderh', 'assets/stage1/house1/borderh.png');
		this.load.image('borderv', 'assets/stage1/house1/borderv.png');
		this.load.image('edgel0rd', 'assets/stage1/house1/edgelord.png');
		this.load.image('battleBg1s1', 'assets/stage1/house1/battleScene1s1.png');
		this.load.image('table', 'assets/stage1/house2/mission.png');
		this.load.image('help', 'assets/stage2/map.png');
		//s3
		this.load.spritesheet('fire', 'assets/stage3/firesheet.png', { frameWidth: 100, frameHeight: 100 });
		this.load.image('ship', 'assets/stage3/ship.png');
		this.load.image('option', 'assets/stage3/option.png');
		this.load.image('optionS', 'assets/stage3/optionS.png');
		//s4
		this.load.image('door4', 'assets/stage4/door.png');
		this.load.image('blood', 'assets/stage4/stage4s2/blood.png');
		this.load.image('librarian', 'assets/stage4/stage4s2/librarian.png');
		this.load.image('s4Kid', 'assets/stage4/stage4s1/townKid.png');
		this.load.image('womanF', 'assets/stage4/stage4r3/woman.png');
		this.load.image('soldierF', 'assets/stage4/stage4r3/soldierF.png');
		this.load.image('grave', 'assets/stage4/stage4r3/grave.png');
		this.load.image('captain4r4', 'assets/stage4/stage4r4/captain4r4.png');
		this.load.image('gangLeader', 'assets/stage4/stage4r4/gangLeader.png');
		this.load.image('gangLeaderF', 'assets/stage4/stage4r4/gangLeaderF.png');
		this.load.spritesheet('gangLeaderB', 'assets/CharacterImages/gangLeader.png', {frameWidth: 140, frameHeight: 160});
		this.load.image('help4r5', 'assets/stage4/stage4r5/map4r5.png');
		this.load.image('medic', 'assets/stage4/stage4r5/medic.png');
	}







}
