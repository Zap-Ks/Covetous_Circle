$(document).ready(function(){
    //Variables
    let player = $("#player")
    let gold = $(".gold")
    let goldCollected = 0
    let playerScore = 0
    let score = $(".score")
    let finalGold = $(".final-gold")
    let finalScore = $(".final-score")
    let goldSFX = new Audio("./scripts/sfx/Gold.mp3")
    goldSFX.volume = 0.2
    let isSpawning = false
    let goldPresent = false
    let goldSpawner;
    let goldWidth = gold.width()
    gold.css("height", goldWidth)
    let goldPosition = {
        top: parseInt(gold.css("top")),
        left: parseInt(gold.css("left"))
    }

    //Spawns the gold in a random spot after a random delay
    goldSpawner = setInterval(function(){
        if (!isSpawning) {
            isSpawning = true
            let spawnTime = Math.round(Math.random() * 5000 + 5000)
            setTimeout(function(){
                goldPosition.top = Math.random() * (screen.height/10 * 6.5) + (screen.height/10)
                goldPosition.left = Math.random() * (screen.width/10 * 8) + (screen.width/10)
                gold.css({top: goldPosition.top, left: goldPosition.left})
                gold.css("visibility","visible")
                goldPresent = true
            }, spawnTime)
        }
    }, 1)

    //Detects whether or not the player has taken the gold
    let goldCollision = setInterval(function(){
        let playerBox = player[0].getBoundingClientRect()
        let goldBox = gold[0].getBoundingClientRect()
        if (
            playerBox.right > goldBox.left &&
            playerBox.left < goldBox.right &&
            playerBox.bottom > goldBox.top &&
            playerBox.top < goldBox.bottom
        ){
            //Prevents the player from taking the gold if it's currently hidden
            if (goldPresent) {
                //Increases the gold collected by 1
                //Increases the player's score by a random amount between 5 and 15
                //Restarts the gold spawning cycle
                goldPresent = false
                gold.css("visibility","hidden")
                isSpawning = false
                goldCollected++
                playerScore += Math.round(Math.random() * 10 + 5)
                goldSFX.play()
                updateScore()
            }
        }
    }, 1)

    //Updates the counter displaying the player's score
    function updateScore() {
        if (playerScore < 10) {
            let scoreString = `000${playerScore}`
            score.html(scoreString)
            finalScore.html(`Score: ${scoreString}`)
        } else if (playerScore < 100) {
            let scoreString = `00${playerScore}`
            score.html(scoreString)
            finalScore.html(`Score: ${scoreString}`)
        } else if (playerScore < 1000) {
            let scoreString = `0${playerScore}`
            score.html(scoreString)
            finalScore.html(`Score: ${scoreString}`)
        } else {
            score.html(playerScore)
            finalScore.html(`Score: ${playerScore}`)
        }
        finalGold.html(`Gold Collected: ${goldCollected}`)
    }
})