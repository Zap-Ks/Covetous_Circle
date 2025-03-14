$(document).ready(function(){
    /*
    Obstacles Section
    */
    let player = $("#player")
    let playerHealth = 3
    let level = 1
    let timeSurvived = 0
    let levelText = $(".level")
    let finalLevel = $(".final-level")
    let finalTime = $(".final-time")
    let invincible = false
    let updateLevel;
    let survivalTimer;
    let box1Spawner;
    let box2Spawner;
    let box3Spawner;
    let line1Spawner;
    let line2Spawner;
    let line3Spawner;
    let line4Spawner;
    let box1 = $(".box-1")
    let box2 = $(".box-2")
    let box3 = $(".box-3")
    let line1 = $(".line-1")
    let line2 = $(".line-2")
    let line3 = $(".line-3")
    let line4 = $(".line-4")
    let box1Position = {top: parseInt(box1.css("top")), left: parseInt(box1.css("left"))}
    let box2Position = {top: parseInt(box2.css("top")), left: parseInt(box2.css("left"))}
    let box3Position = {top: parseInt(box3.css("top")), left: parseInt(box3.css("left"))}
    let line1Position = {top: parseInt(line1.css("top")), left: parseInt(line1.css("left"))}
    let line2Position = {top: parseInt(line2.css("top")), left: parseInt(line2.css("left"))}
    let line3Position = {top: parseInt(line3.css("top")), left: parseInt(line3.css("left"))}
    let line4Position = {top: parseInt(line4.css("top")), left: parseInt(line4.css("left"))}

    function gameOver() {
        $("#player").css("position","static")
        $(".gold").animate({opacity: 0}, 0)
        $(".power-up").animate({opacity: 0}, 0)
        setTimeout(function(){
            $(".game-over").css("visibility", "visible")
        }, 3000)
    }

    survivalTimer = setInterval(function(){
        timeSurvived++
        finalTime.html(`Time Survived: ${timeSurvived}`)
    }, 1000)

    updateLevel = setInterval(function(){
        levelText.html(`Level ${level}`)
        finalLevel.html(`Level Reached: ${level}`)
    }, 1)

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
            clearInterval(survivalTimer)
            clearInterval(updateLevel)
            clearInterval(box1Spawner)
            clearInterval(box2Spawner)
            clearInterval(box3Spawner)
            clearInterval(line1Spawner)
            clearInterval(line2Spawner)
            clearInterval(line3Spawner)
            clearInterval(line4Spawner)
            gameOver()
            clearInterval(updateHealth)
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
                    if (!invincible) {
                        clearInterval(attackDuration)
                        playerHealth--
                        obstacle.css("background-color","white")
                        player.css("background-color","#F00")
                        setTimeout(function(){
                            obstacle.css("visibility","hidden")
                            obstacle.css("background-color","red")
                            player.css("background-color","#0F0")
                        }, 250)
                    }
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

    let level2Delay = setTimeout(function(){
        setTimeout(function(){level++}, 3000)
        line1Spawner = setInterval(function(){
            line1Position.top = Math.random() * (screen.height * 0.65) + (screen.height * 0.065)
            line1Position.left = 0
            line1.css({top: line1Position.top, left: line1Position.left})
            attackSequence(line1)
        }, 3000)
        line2Spawner = setInterval(function(){
            line2Position.top = Math.random() * (screen.height * 0.65) + (screen.height * 0.065)
            line2Position.left = 0
            line2.css({top: line2Position.top, left: line2Position.left})
            attackSequence(line2)
        }, 5000)
        setTimeout(function(){
            line3Spawner = setInterval(function(){
                line3Position.top = 0
                line3Position.left = Math.random() * (screen.width * 0.95)
                line3.css({top: line3Position.top, left: line3Position.left})
                attackSequence(line3)
            }, 3000)
            line4Spawner = setInterval(function(){
                line4Position.top = 0
                line4Position.left = Math.random() * (screen.width * 0.95)
                line4.css({top: line4Position.top, left: line4Position.left})
                attackSequence(line4)
            }, 5000)
        }, 500)
    }, 45000)

    /*
    Power-Ups Section
    */
    let powerUp = $(".power-up")
    let isSpawning = false
    let powerPresent = false
    let powerSpawner;
    let powerPosition = {
        top: parseInt(powerUp.css("top")),
        left: parseInt(powerUp.css("left"))
    }

    powerSpawner = setInterval(function(){
        if (!isSpawning) {
            isSpawning = true
            let spawnTime = Math.round(Math.random() * 15000 + 10000)
            setTimeout(function(){
                powerPosition.top = Math.random() * (screen.height/10 * 7) + (screen.height/10)
                powerPosition.left = Math.random() * (screen.width/10 * 8) + (screen.width/10)
                powerUp.css({top: powerPosition.top, left: powerPosition.left})
                powerUp.css("visibility","visible")
                powerPresent = true
            }, spawnTime)
        }
    }, 1)

    $(document).on("keydown", function(){
        let playerBox = player[0].getBoundingClientRect()
        let powerBox = powerUp[0].getBoundingClientRect()
        if (
            playerBox.right > powerBox.left &&
            playerBox.left < powerBox.right &&
            playerBox.bottom > powerBox.top &&
            playerBox.top < powerBox.bottom
        ){
            if (powerPresent) {
                powerPresent = false
                powerUp.css("visibility","hidden")
                isSpawning = false
                let randomPower = Math.round(Math.random() * 4)
                if (randomPower == 1) {
                    grow()
                } else if (randomPower == 2) {
                    shrink()
                } else if (randomPower == 3) {
                    healing()
                } else {
                    invincibility()
                }
            }
        }
    })

    function grow() {
        player.css({
            "width": "60px",
            "height": "60px",
        })
        setTimeout(function(){
            player.css({
                "width": "20px",
                "height": "20px",
            })
        }, 5000)
    }

    function shrink() {
        player.css({
            "width": "10px",
            "height": "10px",
        })
        setTimeout(function(){
            player.css({
                "width": "20px",
                "height": "20px",
            })
        }, 5000)
    }

    function healing() {
        if (playerHealth < 3 && playerHealth > 0) {
            playerHealth++
            $("#player").css("background-color","yellow")
            setTimeout(function(){$("#player").css("background-color","#BF0")}, 400)
            setTimeout(function(){$("#player").css("background-color","#7F0")}, 600)
            setTimeout(function(){$("#player").css("background-color","#3F0")}, 800)
            setTimeout(function(){$("#player").css("background-color","#0F0")}, 1000)
        }
    }

    function invincibility() {
        let time = 0
        invincible = true
        player.css("background-color","white")
        let iframes = setInterval(function(){
            player.css("background-color","#A2B")
            setTimeout(function(){
                player.css("background-color","white")
                time++
                if (time >= 20) {
                    player.css("background-color","#0F0")
                    invincible = false
                    clearInterval(iframes)
                }
            }, 250)
        }, 500)
    }
})