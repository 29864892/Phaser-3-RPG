

window.onload = function() {

	let config = {
		
		type: Phaser.WEBGL,
		width: 800,
		height: 600,
		physics:{
			arcade: {
				debug: true,
				gravity: {y:200}
			}
		},
		scene: {
			Boot: Boot,
			Preloader: Preloader,
			proto: proto,
			Confirm: Confirm,
			Stage1: Stage1,
			Stage1s1: Stage1s1,
			Battle1s1: Battle1s1,
			Stage1s2: Stage1s2,
			Stage1s3: Stage1s3,
			Stage2: Stage2,
			Stage2r1: Stage2r1,
			Stage3: Stage3,
			Battle: Battle,
			Stage2r2: Stage2r2,
			Stage4: Stage4,
			Stage4s1: Stage4s1,
			Stage4s2: Stage4s2,
			Stage4r2: Stage4r2,
			Stage4r3: Stage4r3,
			Stage4r4: Stage4r4,
			Stage4r5: Stage4r5
		},
		
		dom: {
			createContainer: true
		},
	};
	
	let game = new Phaser.Game(config);
	
	game.scene.add('Boot', Boot);
	game.scene.add('Preloader', Preloader);
	game.scene.add('proto', proto);
	game.scene.add('Confirm', Confirm);
	game.scene.add('Stage1', Stage1);
	game.scene.add('Stage1s1', Stage1s1);
	game.scene.add('Battle1s1', Battle1s1);
	game.scene.add('Stage1s2', Stage1s2);
	game.scene.add('Stage1s3', Stage1s3);
	game.scene.add('Stage2', Stage2);
	game.scene.add('Stage2r1', Stage2r1);
	game.scene.add('Stage3', Stage3);
	game.scene.add('Battle', Battle);
	game.scene.add('Stage2r2', Stage2r2);
	game.scene.add('Stage4', Stage4);
	game.scene.add('Stage4s1', Stage4s1);
	game.scene.add('Stage4s2', Stage4s2);
	game.scene.add('Stage4r2', Stage4r2);
	game.scene.add('Stage4r3', Stage4r3);
	game.scene.add('Stage4r4', Stage4r4);
	game.scene.add('Stage4r5', Stage4r5);
	game.scene.start('Boot');
};
