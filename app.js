var ctx = canvas.getContext("2d")

var left = 0
var right = 0

var x
var y
var vx
var vy

var playerLeftY = canvas.height / 2 - 50
var playerLeftX = 50
var playerRightY = canvas.height / 2 - 50
var playerRightX = canvas.width - 50

var degreeToRadian = 2 * Math.PI / 360

function getRandomAngle() {
  var angle = 90;
  while (angle < 315 && angle > 225 || angle > 45 && angle < 135) {
    angle = Math.random() * 360
  }
  return angle
}

function init() {
  x = canvas.width / 2
  y = canvas.height / 2
  var angle = getRandomAngle()
  var speed = 5
  vx = speed * Math.cos(angle * degreeToRadian)
  vy = speed * Math.sin(angle * degreeToRadian)
}

init()

document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowUp') {
    playerRightY -= 10
  }
  if (event.key === 'ArrowDown') {
    playerRightY += 10
  }
})

document.addEventListener('keydown', function (event) {
  if (event.key === 'w') {
    playerLeftY -= 10
  }
  if (event.key === 's') {
    playerLeftY += 10
  }
})


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = "#fafafa"
  ctx.fillRect(x, y, 10, 10)
  x += vx
  y += vy

  // middle line
  ctx.fillRect(canvas.width / 2, 0, 1, canvas.height)

  // players
  ctx.fillRect(playerLeftX, playerLeftY, 10, 100)
  ctx.fillRect(playerRightX, playerRightY, 10, 100)

  // scores
  if (x > canvas.width) {
    left++
    leftScore.innerText = left
    init()
  }
  if (x < 0) {
    right++
    rightScore.innerText = right
    init()
  }

  // player collision
  if (vx > 0 && x + 10 > playerRightX && x + 10 < playerRightX + 10 && playerRightY < y && y < playerRightY + 100) {
    vx *= -1
  }
  if (vx < 0 && x < playerLeftX && x > playerLeftX - 10 && playerLeftY < y && y < playerLeftY + 100) {
    vx *= -1
  }

  // canvas collision
  if (y + 5 > canvas.height || y - 5 < 0) {
    vy *= -1
  }

  requestAnimationFrame(draw)
}

requestAnimationFrame(draw)