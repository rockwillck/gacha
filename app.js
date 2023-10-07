// Start coding here
var points = 0
var multiplier = 1
var price = 2
setInterval(() => {
    document.getElementById("points").innerHTML = `${points.toFixed(2)} <sub>(x${multiplier})</sub>`;
    points += 0.01*multiplier
    points = Math.round(points*100)/100
    if (points * 100 % 100 == 0) {
        document.getElementById("points").style.fontSize = "35vmin"
        setTimeout(() => {
            document.getElementById("points").style.fontSize = ""
        }, 50)
    }
    document.getElementById("points").style.scale = 4/points.toFixed(2).length

    document.getElementById("pointsOutof").innerText = `[${Math.min(Math.floor(points), price)}/${price}]`

    if (Math.floor(points) >= price) {
        document.getElementById("gacha").disabled = false
    } else {
        document.getElementById("gacha").disabled = true
    }
}, 1)

pity = 0
first = true
function unlock() {
    document.getElementById("crate").style.scale = "1"
    points -= price
    pity++
    setRandom()
}

var loop = 50
function setRandom() {
    setTimeout(() => {
        if (loop > 0) {
            setRandom()
            loop--
            probability = Math.random()
    
            if (probability > 0.95 || pity >= 10 || (first == true && probability > 0.5)) {
                document.getElementById("crate").innerText = `MULTIPLIER +1
        6 ★`
            } else {
                document.getElementById("crate").innerText = `${Math.round(Math.sqrt((probability*100+5))*100)/100} POINTS
        ${Math.floor(probability/0.2) + 1} ★`
            }
        } else {
            loop = 50
            probability = Math.random()
            if (probability > 0.95 || pity >= 10 || (first == true && probability > 0.5)) {
                document.getElementById("crate").innerText = `MULTIPLIER +1
        6 ★`
                multiplier++
                pity = 0
                first = false
            } else {
                document.getElementById("crate").innerText = `${Math.round(Math.sqrt((probability*100+5))*100)/100} POINTS
        ${Math.floor(probability/0.2) + 1} ★`
                points += Math.round(Math.sqrt((probability+5))*100)/100
            }
            setTimeout(() => {
                document.getElementById("crate").style.scale = ""
            }, 1500)
            price++
        }
        
    }, (1-(loop/50))*100)
}