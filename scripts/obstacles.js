$(document).ready(function(){
    let player = $("#player")
    let playerHealth = 3
    let invincible = false
    let level = 1
    let box1Spawner;
    let box2Spawner;
    let box3Spawner;
    let line1ASpawner;
    let line1BSpawner;
    let line2ASpawner;
    let line2BSpawner;
    let box1 = $(".box-1")
    let box2 = $(".box-2")
    let box3 = $(".box-3")
    let line1A = $(".line-1:nth-of-type(1)")
    let line1B = $(".line-1:nth-of-type(2)")
    let line2A = $(".line-2:nth-of-type(1)")
    let line2B = $(".line-2:nth-of-type(2)")
    let box1Position = {top: parseInt(box1.css("top")), left: parseInt(box1.css("left"))}
    let box2Position = {top: parseInt(box2.css("top")), left: parseInt(box2.css("left"))}
    let box3Position = {top: parseInt(box3.css("top")), left: parseInt(box3.css("left"))}
    let line1APosition = {top: parseInt(line1A.css("top")), left: parseInt(line1A.css("left"))}
    let line1BPosition = {top: parseInt(line1B.css("top")), left: parseInt(line1B.css("left"))}
    let line2APosition = {top: parseInt(line2A.css("top")), left: parseInt(line2A.css("left"))}
    let line2BPosition = {top: parseInt(line2B.css("top")), left: parseInt(line2B.css("left"))}

    function gameOver() {
        $("#player").css("position","static")
        $(".gold").animate({opacity: 0}, 0)
        setTimeout(function(){
            $(".game-over").css("visibility", "visible")
        }, 3000)
    }

    let updateHealth = setInterval(function(){
        $(".hitpoint").each(function(){
            $(this).css("background-color","#0F0")
        })
        if (playerHealth <= 2) {
            $(".hitpoint:nth-of-type(3)").css("background-color","#000")
        }
        if (playerHealth <= 1) {
            $(".hitpoint:nth-of-type(2)").css("background-color","#000")
        }
        if (playerHealth <= 0) {
            $(".hitpoint:nth-of-type(1)").css("background-color","#000")
            $("*").css("visibility","hidden")
            clearInterval(iframes)
            clearInterval(box1Spawner)
            clearInterval(box2Spawner)
            clearInterval(box3Spawner)
            clearInterval(line1ASpawner)
            clearInterval(line1BSpawner)
            clearInterval(line2ASpawner)
            clearInterval(line2BSpawner)
            gameOver()
            clearInterval(updateHealth)
        }
    }, 1)

    let iframes = setInterval(function(){
        if (invincible) {
            setTimeout(function(){
                invincible = false
            }, 2000)
        }
    }, 1)

    function attackSequence(obstacle) {
        obstacle.animate({opacity: 0}, 0)
        obstacle.css("visibility","visible")
        for (let i = 0; i < 0.5; i+=0.0375) {
            obstacle.animate({opacity: i}, 100)
            
        }
        obstacle.animate({opacity: 1}, 1)
        let counter = 0
        setTimeout(function(){
            let attackDuration = setInterval(function(){
                counter++
                let playerBox = player[0].getBoundingClientRect()
                let obstacleBox = obstacle[0].getBoundingClientRect()
                if (
                    playerBox.right > obstacleBox.left &&
                    playerBox.left < obstacleBox.right &&
                    playerBox.bottom > obstacleBox.top &&
                    playerBox.top < obstacleBox.bottom
                ){
                    clearInterval(attackDuration)
                    playerHealth--
                    invincible = true
                    obstacle.css("background-color","white")
                    player.css("background-color","#F00")
                    setTimeout(function(){
                        obstacle.css("visibility","hidden")
                        obstacle.css("background-color","red")
                        player.css("background-color","#0F0")
                    }, 250)
                }
                if (counter >= 150) {
                    clearInterval(attackDuration)
                    obstacle.css("visibility","hidden")
                }
            }, 1)
        }, 1500)
    }

    let level1Delay = setTimeout(function(){
        box1Spawner = setInterval(function(){
            box1Position.top = Math.random() * (screen.height * 0.6) + (screen.height * 0.075)
            box1Position.left = Math.random() * (screen.width * 0.75)
            box1.css({top: box1Position.top, left: box1Position.left})
            attackSequence(box1)
        }, 5000)
        box2Spawner = setInterval(function(){
            box2Position.top = Math.random() * (screen.height * 0.45) + (screen.height * 0.075)
            box2Position.left = Math.random() * (screen.width * 0.9)
            box2.css({top: box2Position.top, left: box2Position.left})
            attackSequence(box2)
        }, 4000)
        box3Spawner = setInterval(function(){
            box3Position.top = Math.random() * (screen.height * 0.5) + (screen.height * 0.075)
            box3Position.left = Math.random() * (screen.width * 0.8)
            box3.css({top: box3Position.top, left: box3Position.left})
            attackSequence(box3)
        }, 3000)
    }, 5000)

    /*
    let level2Delay = setTimeout(function(){
        line1ASpawner = setInterval(function(){
            line1APosition.top = Math.random() * (screen.height * 0.7) + (screen.height * 0.075)
            line1APosition.left = 0
            line1A.css({top: line1APosition.top, left: line1APosition.left})
            attackSequence(line1A)
        }, 3000)
        line1BSpawner = setInterval(function(){
            line1BPosition.top = Math.random() * (screen.height * 0.7) + (screen.height * 0.075)
            line1BPosition.left = 0
            line1B.css({top: line1BPosition.top, left: line1BPosition.left})
            attackSequence(line1B)
        }, 5000)
        line2ASpawner = setInterval(function(){
            line2APosition.top = screen.height * 0.075
            line2APosition.left = Math.random() * (screen.width * 0.95)
            line2A.css({top: line2APosition.top, left: line2APosition.left})
            attackSequence(line2A)
        }, 3000)
        line2BSpawner = setInterval(function(){
            line2BPosition.top = screen.height * 0.075
            line2BPosition.left = ath.random() * (screen.width * 0.95)
            line2B.css({top: line2BPosition.top, left: line2BPosition.left})
            attackSequence(line2B)
        }, 5000)
    }, 3000)
    */
})