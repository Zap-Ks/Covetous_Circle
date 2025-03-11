$(document).ready(function(){
    let player = $("#player")
    let level = 1
    let box1 = $(".box-1")
    let box1Position = {top: parseInt(box1.css("top")), left: parseInt(box1.css("left"))}
    
    setTimeout(function(){
        let obstacleSpawner = setInterval(function(){
            box1Position.top = Math.round(Math.random() * (screen.height/10 * 8) + (screen.height/10))
            box1Position.left = Math.round(Math.random() * (screen.width/10 * 8) + (screen.width/10))
            box1.css({top: box1Position.top, left: box1Position.left})
            box1.css("visibility","visible")
        }, 5000)
    }, 2000)
})