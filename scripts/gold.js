$(document).ready(function(){
    let player = $("#player")
    let gold = $(".gold")
    let score = $(".score")
    let playerScore = 0
    let isSpawning = false
    let goldPresent = false
    let goldPosition = {
        top: parseInt(gold.css("top")),
        left: parseInt(gold.css("left"))
    }

    let goldSpawner = setInterval(function(){
        if (!isSpawning) {
            isSpawning = true
            let spawnTime = Math.round(Math.random() * 5000 + 5000)
            setTimeout(function(){
                goldPosition.top = Math.round(Math.random() * (screen.height/10 * 8) + (screen.height/10))
                goldPosition.left = Math.round(Math.random() * (screen.width/10 * 6) + (screen.width/10))
                gold.css({top: goldPosition.top, left: goldPosition.left})
                gold.css("visibility","visible")
                goldPresent = true
            }, spawnTime)
        }
    }, 1)

    $(document).on("keydown", function(event){
        let playerBox = player[0].getBoundingClientRect()
        let goldBox = gold[0].getBoundingClientRect()
        if (
            playerBox.right > goldBox.left &&
            playerBox.left < goldBox.right &&
            playerBox.bottom > goldBox.top &&
            playerBox.top < goldBox.bottom
        ){
            if (goldPresent) {
                goldPresent = false
                gold.css("visibility","hidden")
                isSpawning = false
                playerScore++
                updateScore()
            }
        }
    })

    function updateScore() {
        if (playerScore < 10) {
            let scoreString = `000${playerScore}`
            score.html(scoreString)
        } else if (playerScore < 100) {
            let scoreString = `00${playerScore}`
            score.html(scoreString)
        } else if (playerScore < 1000) {
            let scoreString = `0${playerScore}`
            score.html(scoreString)
        } else {
            score.html(playerScore)
        }
    }
})