$(document).ready(function(){
    //Variables
    let player = $("#player")
    let speed = 4
    let dashSpeed = 150
    let dashReady = true
    let dashSFX = new Audio("./scripts/sfx/Dash.mp3")
    dashSFX.volume = 0.1
    let upMove = false
    let downMove = false
    let leftMove = false
    let rightMove = false
    let dashMove = false

    //Initial player position
    let position = {
        top: parseInt(player.css("top")),
        left: parseInt(player.css("left"))
    }
    //Function for handling key press events for movement
    $(document).on("keydown", function(event){
        switch(event.which) {
            case 65: //A key
                leftMove = true
                break;
            case 87: //W key
                upMove = true
                break;
            case 68: //D key
                rightMove = true
                break;
            case 83: //S key
                downMove = true
                break;
        }
        //Dash movement
        if (dashReady && event.which == 32) {
            dashAnimation()
            dashMove = true
            dashCooldown()
        }
    })
    $(document).on("keyup", function(event){
        switch(event.which) {
            case 65: //A key
                leftMove = false
                break;
            case 87: //W key
                upMove = false
                break;
            case 68: //D key
                rightMove = false
                break;
            case 83: //S key
                downMove = false
                break;
        }
    })

    let updatePosition = setInterval(function(){
        let newTop = position.top
        let newLeft = position.left
        //Normal movement
        if (leftMove == true) { //A key
            //Dash movement
            if (dashMove == true) {
                newLeft -= dashSpeed
            }
            newLeft -= speed
        }
        if (upMove == true) { //W key
            //Dash movement
            if (dashMove == true) {
                newTop -= dashSpeed
            }
            newTop -= speed
        }
        if (rightMove == true) { //D key
            //Dash movement
            if (dashMove == true) {
                newLeft += dashSpeed
            }
            newLeft += speed
        }
        if (downMove == true) { //S key
            //Dash movement
            if (dashMove == true) {
                newTop += dashSpeed
            }
            newTop += speed
        }
        if (dashMove == true) {
            dashMove = false
        }
        
        //Prevents you from going out of bounds
        let collision = false
        $("#game-container").each(function(){
            let wall = $(this)[0].getBoundingClientRect()
            let playerRect = {top:newTop, left:newLeft, right:newLeft+20, bottom:newTop+20}
            if(
                playerRect.left < wall.left ||
                playerRect.right > wall.right ||
                playerRect.top < wall.top ||
                playerRect.bottom > wall.bottom
            ){
                collision = true
                return false
            }
        })
        //Sets the player's new position if it doesn't put them out of bounds
        if(!collision) {
            position.top = newTop
            position.left = newLeft
            player.css({top: position.top, left: position.left})
        }
    }, 20)

    //Function for the color animation for dashing
    function dashAnimation() {
        dashSFX.play()
        $("#player").css("background-color","white")
        setTimeout(function(){$("#player").css("background-color","#BFB")}, 75)
        setTimeout(function(){$("#player").css("background-color","#7F7")}, 150)
        setTimeout(function(){$("#player").css("background-color","#3F3")}, 225)
        setTimeout(function(){$("#player").css("background-color","#0F0")}, 300)
        setTimeout(function(){
            dashSFX.pause()
            dashSFX.currentTime = 0
        }, 1000)
    }
    //Prevents you from spamming dashes
    function dashCooldown() {
        dashReady = false
        let cooldown = setTimeout(function(){
            dashReady = true
        }, 1000)
    }
})