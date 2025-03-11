$(document).ready(function(){
    let player = $("#player")
    let speed = 10
    let dashSpeed = 100
    let dashReady = true
    //Initial player and gold position
    let position = {
        top: parseInt(player.css("top")),
        left: parseInt(player.css("left"))
    }
    //Function for handling key press events for movement
    $(document).on("keydown", function(event){
        let newTop = position.top
        let newLeft = position.left

        switch(event.which) {
            case 65: //A key
                newLeft -= speed
                break;
            case 87: //W key
                newTop -= speed
                break;
            case 68: //D key
                newLeft += speed
                break;
            case 83: //S key
                newTop += speed
                break;
        }
        if (dashReady) {
            switch(event.which) {
                case 37: //Left arrow
                    dashAnimation()
                    newLeft -= dashSpeed
                    dashCooldown()
                    break;
                case 38: //Up arrow
                    dashAnimation()
                    newTop -= dashSpeed
                    dashCooldown()
                    break;
                case 39: //Right arrow
                    dashAnimation()
                    newLeft += dashSpeed
                    dashCooldown()
                    break;
                case 40: //Down arrow
                    dashAnimation()
                    newTop += dashSpeed
                    dashCooldown()
                    break;
            }
        }
        function dashAnimation() {
            $("#player").css("background-color","white")
            setTimeout(function(){$("#player").css("background-color","#CFC")}, 75)
            setTimeout(function(){$("#player").css("background-color","#8F8")}, 150)
            setTimeout(function(){$("#player").css("background-color","#4F4")}, 225)
            setTimeout(function(){$("#player").css("background-color","#0F0")}, 300)
        }
        function dashCooldown() {
            dashReady = false
            let cooldown = setTimeout(function(){
                dashReady = true
            }, 1500)
        }

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
        if(!collision) {
            position.top = newTop
            position.left = newLeft
            player.css({top: position.top, left: position.left})
        }
    })
})