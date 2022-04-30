const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]


var fireDataStructure = []
var width = 30
var height = 30
var pixelSize = 0

var canvas = document.createElement('canvas')
var context = canvas.getContext("2d")
document.querySelector("#fireCanvas").appendChild(canvas)
canvas.width = 300
canvas.height = 300
pixelSize = canvas.width/(width-1)
createFireDataStructure(width, height)
createFireSource()
setInterval(calculateFirePropagation, 60)

function createFireDataStructure(w, h) {
    for (let i = 0; i < w * h; i++) {
        fireDataStructure[i] = 0
    }
}

function createFireSource() {
    for (let x = 0; x < width; x++) {
        fireDataStructure[(width * (height-1)) + x] = 36
    }
}

function calculateIntensityPerPixel(currentPixel) {
    var bellowPixelIndex = currentPixel + width
    if (bellowPixelIndex >= width * height) {
        return
    }
    var decay = Math.floor(Math.random()*6) //numero inteiro de 0 a 2
    var bellowPixelFireIntensity = fireDataStructure[bellowPixelIndex]
    var newFireIntensity = bellowPixelFireIntensity - decay
    newFireIntensity = Math.max(0, newFireIntensity)
    fireDataStructure[currentPixel] = newFireIntensity
}

function calculateFirePropagation() {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            calculateIntensityPerPixel(y * width + x)
        }
    }
    renderFire()
}

function renderFire() {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            var color = fireColorsPalette[fireDataStructure[y*width+x]]
            context.fillStyle = 'rgb('+color.r+','+color.g+','+color.b+')'
            context.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize)
        }
    }
}
