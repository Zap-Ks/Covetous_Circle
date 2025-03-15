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
    let damageSFX = new Audio("/sfx/Damage.mp3")
    damageSFX.volume = 0.1
    let healingSFX = new Audio("/sfx/Healing.mp3")
    healingSFX.volume = 0.2
    let hallucinationSFX = new Audio("/sfx/Hallucination.mp3")
    hallucinationSFX.volume = 0.2
    let fake1Spawner;
    let fake2Spawner;
    let fake3Spawner;
    let box1Spawner;
    let box2Spawner;
    let box3Spawner;
    let line1Spawner;
    let line2Spawner;
    let line3Spawner;
    let line4Spawner;
    let circles1Spawner;
    let circles2Spawner;
    let fake1 = $(".dupeAttack1")
    let fake2 = $(".dupeAttack2")
    let fake3 = $(".dupeAttack3")
    let box1 = $(".box-1")
    let box2 = $(".box-2")
    let box3 = $(".box-3")
    let line1 = $(".line-1")
    let line2 = $(".line-2")
    let line3 = $(".line-3")
    let line4 = $(".line-4")
    let circle1 = $(".circle-1")
    let circle2 = $(".circle-2")
    let circle3 = $(".circle-3")
    let circle4 = $(".circle-4")
    let circle5 = $(".circle-5")
    let circle6 = $(".circle-6")
    let circle7 = $(".circle-7")
    let circle8 = $(".circle-8")
    let circle9 = $(".circle-9")
    let circle10 = $(".circle-10")
    let fake1Position = {top: parseInt(box1.css("top")), left: parseInt(box1.css("left"))}
    let fake2Position = {top: parseInt(box2.css("top")), left: parseInt(box2.css("left"))}
    let fake3Position = {top: parseInt(box3.css("top")), left: parseInt(box3.css("left"))}
    let box1Position = {top: parseInt(box1.css("top")), left: parseInt(box1.css("left"))}
    let box2Position = {top: parseInt(box2.css("top")), left: parseInt(box2.css("left"))}
    let box3Position = {top: parseInt(box3.css("top")), left: parseInt(box3.css("left"))}
    let line1Position = {top: parseInt(line1.css("top")), left: parseInt(line1.css("left"))}
    let line2Position = {top: parseInt(line2.css("top")), left: parseInt(line2.css("left"))}
    let line3Position = {top: parseInt(line3.css("top")), left: parseInt(line3.css("left"))}
    let line4Position = {top: parseInt(line4.css("top")), left: parseInt(line4.css("left"))}
    let circle1Position = {top: parseInt(circle1.css("top")), left: parseInt(circle1.css("left"))}
    let circle2Position = {top: parseInt(circle2.css("top")), left: parseInt(circle2.css("left"))}
    let circle3Position = {top: parseInt(circle3.css("top")), left: parseInt(circle3.css("left"))}
    let circle4Position = {top: parseInt(circle4.css("top")), left: parseInt(circle4.css("left"))}
    let circle5Position = {top: parseInt(circle5.css("top")), left: parseInt(circle5.css("left"))}
    let circle6Position = {top: parseInt(circle6.css("top")), left: parseInt(circle6.css("left"))}
    let circle7Position = {top: parseInt(circle7.css("top")), left: parseInt(circle7.css("left"))}
    let circle8Position = {top: parseInt(circle8.css("top")), left: parseInt(circle8.css("left"))}
    let circle9Position = {top: parseInt(circle9.css("top")), left: parseInt(circle9.css("left"))}
    let circle10Position = {top: parseInt(circle10.css("top")), left: parseInt(circle10.css("left"))}
    let circleWidth = circle1.width()
    circle1.css("height", circleWidth)
    circle2.css("height", circleWidth)
    circle3.css("height", circleWidth)
    circle4.css("height", circleWidth)
    circle5.css("height", circleWidth)
    circle6.css("height", circleWidth)
    circle7.css("height", circleWidth)
    circle8.css("height", circleWidth)
    circle9.css("height", circleWidth)
    circle10.css("height", circleWidth)


    function gameOver() {
        $("#player").css("position","static")
        $(".gold").animate({opacity: 0}, 0)
        $(".power-up").animate({opacity: 0}, 0)
        $(".dupe").animate({opacity: 0}, 0)
        setTimeout(function(){
            $(".game-over").css("visibility", "visible")
        }, 3000)
        let stopIntervals = setInterval(function(){
            clearInterval(survivalTimer)
            clearInterval(updateLevel)
            clearInterval(box1Spawner)
            clearInterval(box2Spawner)
            clearInterval(box3Spawner)
            clearInterval(line1Spawner)
            clearInterval(line2Spawner)
            clearInterval(line3Spawner)
            clearInterval(line4Spawner)
            clearInterval(circles1Spawner)
            clearInterval(circles2Spawner)
        }, 1)
    }

    survivalTimer = setInterval(function(){
        timeSurvived++
        finalTime.html(`Time Survived: ${timeSurvived}`)
    }, 1000)

    setTimeout(function(){
        updateLevel = setInterval(function(){
            levelText.html(`Level ${level}`)
            finalLevel.html(`Level Reached: ${level}`)
        }, 1)
    }, 8000)

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
            gameOver()
            clearInterval(updateHealth)
        }
    }, 1)

    function attackSequence(obstacle) {
        obstacle.animate({opacity: 0}, 0)
        obstacle.css("visibility","visible")
        for (let i = 0; i <= 0.5; i+=0.0375) {
            obstacle.animate({opacity: i}, 100)
        }
        obstacle.animate({opacity: 1}, 0)
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
                        damageSFX.currentTime = 0
                        damageSFX.play()
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

    function groupAttack(c1, c2, c3, c4, c5) {
        c1.animate({opacity: 0}, 0)
        c2.animate({opacity: 0}, 0)
        c3.animate({opacity: 0}, 0)
        c4.animate({opacity: 0}, 0)
        c5.animate({opacity: 0}, 0)
        c1.css("visibility","visible")
        c2.css("visibility","visible")
        c3.css("visibility","visible")
        c4.css("visibility","visible")
        c5.css("visibility","visible")
        for (let i = 0; i <= 0.5; i+=0.05) {
            c1.animate({opacity: i}, 100)
            c2.animate({opacity: i}, 100)
            c3.animate({opacity: i}, 100)
            c4.animate({opacity: i}, 100)
            c5.animate({opacity: i}, 100)
        }
        setTimeout(function(){
            circleAttack(c1)
            setTimeout(function(){
                circleAttack(c2)
                setTimeout(function(){
                    circleAttack(c3)
                    setTimeout(function(){
                        circleAttack(c4)
                        setTimeout(function(){
                            circleAttack(c5)
                        }, 250)
                    }, 250)
                }, 250)
            }, 250)
    }, 1000)
    }

    function circleAttack(obstacle) {
        obstacle.animate({opacity: 1}, 0)
        let counter = 0
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
                    damageSFX.currentTime = 0
                    damageSFX.play()
                    obstacle.css("background-color","white")
                    player.css("background-color","#F00")
                    setTimeout(function(){
                        obstacle.css("visibility","hidden")
                        obstacle.css("background-color","red")
                        player.css("background-color","#0F0")
                    }, 250)
                }
            }
            if (counter >= 50) {
                clearInterval(attackDuration)
                obstacle.css("visibility","hidden")
            }
        }, 1)
    }

    function attackSequence(obstacle) {
        obstacle.animate({opacity: 0}, 0)
        obstacle.css("visibility","visible")
        for (let i = 0; i <= 0.5; i+=0.0375) {
            obstacle.animate({opacity: i}, 100)
        }
        obstacle.animate({opacity: 1}, 0)
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
                        damageSFX.currentTime = 0
                        damageSFX.play()
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
    }, 50000) //45 seconds after level 1

    let level3Delay = setTimeout(function(){
        setTimeout(function(){level++}, 10000)
        circles1Spawner = setInterval(function(){
            // Circle 1
            circle1Position.top = Math.random() * (screen.height * 0.6) + (screen.height * 0.065)
            circle1Position.left = Math.random() * (screen.width * 0.9)
            circle1.css({top: circle1Position.top, left: circle1Position.left})
            // Circle 2
            circle2Position.top = Math.random() * (screen.height * 0.6) + (screen.height * 0.065)
            circle2Position.left = Math.random() * (screen.width * 0.9)
            circle2.css({top: circle2Position.top, left: circle2Position.left})
            // Circle 3
            circle3Position.top = Math.random() * (screen.height * 0.6) + (screen.height * 0.065)
            circle3Position.left = Math.random() * (screen.width * 0.9)
            circle3.css({top: circle3Position.top, left: circle3Position.left})
            // Circle 4
            circle4Position.top = Math.random() * (screen.height * 0.6) + (screen.height * 0.065)
            circle4Position.left = Math.random() * (screen.width * 0.9)
            circle4.css({top: circle4Position.top, left: circle4Position.left})
            // Circle 5
            circle5Position.top = Math.random() * (screen.height * 0.6) + (screen.height * 0.065)
            circle5Position.left = Math.random() * (screen.width * 0.9)
            circle5.css({top: circle5Position.top, left: circle5Position.left})
            // Circles attack as a group
            groupAttack(circle1, circle2, circle3, circle4, circle5)
        }, 10000)
    }, 95000) //90 seconds after level 1

    let level4Delay = setTimeout(function(){
        setTimeout(function(){level++}, 6000)
        circles2Spawner = setInterval(function(){
            // Circle 6
            circle6Position.top = Math.random() * (screen.height * 0.6) + (screen.height * 0.065)
            circle6Position.left = Math.random() * (screen.width * 0.9)
            circle6.css({top: circle6Position.top, left: circle6Position.left})
            // Circle 7
            circle7Position.top = Math.random() * (screen.height * 0.6) + (screen.height * 0.065)
            circle7Position.left = Math.random() * (screen.width * 0.9)
            circle7.css({top: circle7Position.top, left: circle7Position.left})
            // Circle 8
            circle8Position.top = Math.random() * (screen.height * 0.6) + (screen.height * 0.065)
            circle8Position.left = Math.random() * (screen.width * 0.9)
            circle8.css({top: circle8Position.top, left: circle8Position.left})
            // Circle 9
            circle9Position.top = Math.random() * (screen.height * 0.6) + (screen.height * 0.065)
            circle9Position.left = Math.random() * (screen.width * 0.9)
            circle9.css({top: circle9Position.top, left: circle9Position.left})
            // Circle 10
            circle10Position.top = Math.random() * (screen.height * 0.6) + (screen.height * 0.065)
            circle10Position.left = Math.random() * (screen.width * 0.9)
            circle10.css({top: circle10Position.top, left: circle10Position.left})
            // Circles attack as a group
            groupAttack(circle6, circle7, circle8, circle9, circle10)
        }, 6000)
    }, 140000) //135 seconds after level 1

    /*
    Power-Ups Section
    */
    let powerUp = $(".power-up")
    let dupe = $(".dupe")
    let invincibilitySFX = new Audio("/sfx/Invincibility.mp3")
    invincibilitySFX.volume = 0.1
    let powerIsSpawning = false
    let powerPresent = false
    let powerSpawner;
    let dupeIsSpawning = false
    let dupePresent = false
    let dupeSpawner;
    let dupeDuration;
    let powerPosition = {
        top: parseInt(powerUp.css("top")),
        left: parseInt(powerUp.css("left"))
    }
    let dupePosition = {
        top: parseInt(dupe.css("top")),
        left: parseInt(dupe.css("left"))
    }

    powerSpawner = setInterval(function(){
        if (!powerIsSpawning) {
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
        effectTimer("Enlarged", 8)
        player.animate({
            "width": "40px",
            "height": "40px",
        }, 500)
        setTimeout(function(){
            player.animate({
                "width": "20px",
                "height": "20px",
            }, 500)
        }, 8000)
    }

    function shrink() {
        effectTimer("Reduced", 6)
        player.animate({
            "width": "10px",
            "height": "10px",
        }, 500)
        setTimeout(function(){
            player.animate({
                "width": "20px",
                "height": "20px",
            }, 500)
        }, 6000)
    }

    function healing() {
        healingSFX.play()
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
        effectTimer("Invincible", 10)
        invincibilitySFX.currentTime = 34
        invincibilitySFX.play()
        let time = 0
        invincible = true
        player.css("background-color","white")
        let iframes = setInterval(function(){
            player.css("background-color","#A2B")
            setTimeout(function(){
                player.css("background-color","white")
                time++
                if (time >= 20) {
                    invincibilitySFX.pause()
                    invincibilitySFX.currentTime = 0
                    player.css("background-color","#0F0")
                    invincible = false
                    clearInterval(iframes)
                }
            }, 250)
        }, 500)
    }

    function effectTimer(effect, x) {
        let time = x
        $(".power-timer").html(`[${effect}] ${time}`)
        let duration = setInterval(function(){
            time--
            $(".power-timer").html(`[${effect}] ${time}`)
            if (time <= 0) {
                $(".power-timer").html("[. . .]")
                clearInterval(duration)
            }
        }, 1000)
    }

    let dupeDelay = setTimeout(function(){
        dupeSpawner = setInterval(function(){
            if (!dupeIsSpawning) {
                dupeIsSpawning = true
                let spawnTime = Math.round(Math.random() * 20000 + 15000)
                setTimeout(function(){
                    dupePosition.top = Math.random() * (screen.height/10 * 7) + (screen.height/10)
                    dupePosition.left = Math.random() * (screen.width/10 * 8) + (screen.width/10)
                    dupe.css({top: dupePosition.top, left: dupePosition.left})
                    dupe.css("visibility","visible")
                    dupePresent = true
                    dupeDuration = setTimeout(function(){
                        if (dupePresent) {
                            dupePresent = false
                            dupe.css("visibility","hidden")
                            dupeIsSpawning = false
                        }
                    }, 12000)
                }, spawnTime)
            }
        }, 1)
    }, 30000)

    $(document).on("keydown", function(){
        let playerBox = player[0].getBoundingClientRect()
        let dupeBox = dupe[0].getBoundingClientRect()
        if (
            playerBox.right > dupeBox.left &&
            playerBox.left < dupeBox.right &&
            playerBox.bottom > dupeBox.top &&
            playerBox.top < dupeBox.bottom
        ){
            if (dupePresent) {
                dupePresent = false
                dupe.css("visibility","hidden")
                dupeIsSpawning = false
                hallucination()
            }
        }
    })

    function hallucination() {
        hallucinationSFX.play()
        let randomIllusion = Math.round(Math.random() * 3)
        if (randomIllusion == 1) {
            camouflage()
        } else if (randomIllusion == 2) {
            fakeAttacks()
        } else {
            invisible()
        }
    }

    function camouflage() {
        $("game-container").css("background-color","#B00")
        setTimeout(function(){
            $("game-container").css("background-color","black")
        }, 5000)
    }

    function fakeAttacks() {
        box1Spawner = setInterval(function(){
            box1Position.top = Math.random() * (screen.height * 0.6) + (screen.height * 0.075)
            box1Position.left = Math.random() * (screen.width * 0.75)
            box1.css({top: box1Position.top, left: box1Position.left})
            dupeSequence(box1)
        }, 5000)
        box2Spawner = setInterval(function(){
            box2Position.top = Math.random() * (screen.height * 0.45) + (screen.height * 0.075)
            box2Position.left = Math.random() * (screen.width * 0.9)
            box2.css({top: box2Position.top, left: box2Position.left})
            dupeSequence(box2)
        }, 4000)
        box3Spawner = setInterval(function(){
            box3Position.top = Math.random() * (screen.height * 0.5) + (screen.height * 0.075)
            box3Position.left = Math.random() * (screen.width * 0.8)
            box3.css({top: box3Position.top, left: box3Position.left})
            dupeSequence(box3)
        }, 3000)
    }

    function invisible() {
        player.animate({opacity: 0}, 500)
        setTimeout(function(){
            player.animate({opacity: 1}, 500)
        }, 5000)
    }
})