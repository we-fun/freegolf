
function map(stage, client){
	var camera = stage.camera,
		scene = stage.scene;
	
	// ground
	var ground = new Ground();
	ground.position.copy(new THREE.Vector3(0, 0, -ground.depth / 2 + 2500));
	scene.add(ground);
	
	
	// goal
	var goal = new Goal();
	goal.position.copy(new THREE.Vector3(0, 0, -10000));
	scene.add(goal);
	
	// ball
	var ball = new Ball(ground, goal);
	ball.position.copy(new THREE.Vector3(0, ball.radius, 0));
	scene.add(ball);
	// forces
	ball.addForce('gravity', new THREE.Vector3(0, -50, 0));
	
	// stars
	var starGeom = new THREE.SphereGeometry(150),
		starMat = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
	var star1 = new THREE.Mesh(starGeom, starMat);
	star1.position.copy(new THREE.Vector3(0, 10000, -150000));
	scene.add(star1);
	var star2 = new THREE.Mesh(starGeom, starMat);
	star2.position.copy(new THREE.Vector3(-100000, 0, -150000));
	scene.add(star2);
	var star3 = new THREE.Mesh(starGeom, starMat);
	star3.position.copy(new THREE.Vector3(100000, 0, -150000));
	scene.add(star3);
	var star4 = new THREE.Mesh(starGeom, starMat);
	star4.position.copy(new THREE.Vector3(-60000, -40000, -150000));
	scene.add(star4);
	var star5 = new THREE.Mesh(starGeom, starMat);
	star5.position.copy(new THREE.Vector3(60000, -40000, -150000));
	scene.add(star5);
	
	// tracker
	var tracker = new Tracker(camera);
	tracker.set(ball, goal);
	scene.add(tracker);
	
	// references
	client.setItems(ground, goal, ball, tracker);
}
