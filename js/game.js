class Game{
    constructor(){

    }

    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data){
            gameState = data.val();
        });
    }

    update(state){
        database.ref('/').update({
            gameState: state
        });
    }

    async start(){
        if (gameState === 0){
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");

            if (playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
            }

            form = new Form();
            form.display();
        }

        player1 = createSprite(200,500);
        player1.addImage("player1",playerImage);
    
        player2 = createSprite(800,500);
        player2.addImage("player2",playerImage);
        players = [player1, player2];
    }
    
    play(){        
        form.hide();

        Player.getPlayerInfo();
        image(backgroundImage,0,0,1000,800);
        var x = 100;
        var y = 200;
        var index = 0;

        drawSprites();

        for (var plr in allPlayers){
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y = 500;
                     
            players[index-1].x = x;
            players[index-1].y = y;
            
            stroke("blue");
            fill("blue");
            textSize(20);
            text(allPlayers[plr].name, x-25, y+60);

            stroke("red");
            fill("red");
            text("Player 1: "+allPlayers.player1.score,50,50);
            text("Player 2: "+allPlayers.player2.score,50,80);
        }

        if (keyIsDown(RIGHT_ARROW) && player.index !== null){
            player.distance -= 10;
            player.update();
        }

        if (keyIsDown(LEFT_ARROW) && player.index !== null){
            player.distance += 10;
            player.update();
        }
            
        if (frameCount % 20 === 0){
            fruits = createSprite(random(100,1000),0,100,100);
            fruits.velocityY = 6;

            var rand = Math.round(random(1,5));
            switch(rand){
                case 1: fruits.addImage(fruit1Image);
                break;
                case 2: fruits.addImage(fruit2Image);
                break;
                case 3: fruits.addImage(fruit3Image);
                break;
                case 4: fruits.addImage(fruit4Image);
                break;
                case 5: fruits.addImage(fruit5Image);
                break;
            }

            fruitGroup.add(fruits);             
        }
                 
        if (player.index !== null){
            for (var i = 0; i < fruitGroup.length; i++){
                if (fruitGroup.get(i).isTouching(players)){
                    fruitGroup.get(i).destroy();
                    player.score = player.score+1;
                }
            }            
        }
    }
}