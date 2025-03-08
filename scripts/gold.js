$(document).ready(function(){
    let player = $("#player")
    let gold = $(".gold")
    let playerScore = 0
    let goldPresent = false
    let playerPosition = {
        top: parseInt(player.css("top")),
        left: parseInt(player.css("left"))
    }
    let goldPosition = {
        top: parseInt(gold.css("top")),
        left: parseInt(gold.css("left"))
    }

    let goldSpawner = setInterval(function(){
        if (!goldPresent) {
            let spawnTime = Math.round(Math.random() * 5000 + 5000)
            setTimeout(function(){

            }, spawnTime)
        } else {
            gold.css("visibility","hidden")
        }
    }, 1)
})