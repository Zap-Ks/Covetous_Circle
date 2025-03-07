$(document).ready(function(){
    let player = $('#player')
    let gold = $('#gold')
    let speed = 10
    let dashSpeed = 100
    let isDashing = false
    let dashReady = true
    //Initial player position
    let position = {
        top: parseInt(player.css('top')),
        left: parseInt(player.css('left'))
    }
    //Function for handling key press events for movement
    $(document).on('keydown', function(event){
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
                    newLeft -= dashSpeed
                    break;
                case 38: //Up arrow
                    newTop -= dashSpeed
                    break;
                case 39: //Right arrow
                    newLeft += dashSpeed
                    break;
                case 40: //Down arrow
                    newTop += dashSpeed
                    break;
            }
        }

        //Check for wall collisions
        let collision = false
        $('#game-container').each(function(){
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