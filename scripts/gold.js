$(document).ready(function(){
    let player = $("#player")
    let gold = $(".gold")
    let playerScore = 0
    let goldPresent = false
    let goldPosition = {
        top: parseInt(gold.css("top")),
        left: parseInt(gold.css("left"))
    }

    let goldSpawner = setInterval(function(){
        if (!goldPresent) {
            goldPresent = true
            let spawnTime = Math.round(Math.random() * 5000 + 3000)
            setTimeout(function(){
                goldPosition.top = Math.round(Math.random() * (screen.width*0.8) + (screen.width/10))
                goldPosition.left = Math.round(Math.random() * (screen.height*0.8) + (screen.height/10))
                gold.css({top: goldPosition.top, left: goldPosition.left})
                gold.css("visibility","visible")
            }, spawnTime)
        }
    }, 1)

    $(document).on("keydown", function(event){
        let screenWidth = screen.width;
        let screenHeight = screen.height;
        let playerPosition = {
            top: parseInt(player.css("top")),
            left: parseInt(player.css("left"))
        }
        let collision = false
        $("#gold").each(function(){
            let goldRect = $(this).getBoundingClientRect()
            let playerRect = {top:playerPosition.top, left:playerPosition.left, right:playerPosition.left+20, bottom:playerPosition.top+20}
            if(
                playerRect.left < goldRect.left &&
                playerRect.right > goldRect.right &&
                playerRect.top < goldRect.top &&
                playerRect.bottom > goldRect.bottom
            ){
                if (goldPresent) {
                    collision = true
                    return false
                }
            }
        })
        if(collision) {
            goldPresent = false
            playerScore++
            gold.css("visibility","hidden")
        }
    })
})