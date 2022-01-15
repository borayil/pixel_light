var video;
var pixel_size = 15; // initial value
var distance_limit = 200

function changePixelSize() {
  pixel_size = pixel_size_slider.value()
}

function changeViewSize() {
  distance_limit = view_size_slider.value()
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  video = createCapture(VIDEO)
  video.size(width, height);
  video.hide()

  pixel_size_slider = createSlider(5,35, pixel_size, 1)
  pixel_size_slider.position(20, 20)
  pixel_size_slider.changed(changePixelSize)
  pixel_size_slider.addClass("sliders")

  view_size_slider = createSlider(10,1000, 200, 10)
  view_size_slider.position(20, 40)
  view_size_slider.changed(changeViewSize)
  view_size_slider.addClass("sliders")
}


function draw() {
  background(5)

  video.loadPixels()
  for (let y = 0; y < video.height; y += pixel_size) {
    for (let x = 0; x < video.width; x += pixel_size) {
      let distanceToMouse = dist(mouseX, mouseY, x, y)
      if (distanceToMouse <= distance_limit) {
        let index = (y * video.width + x) * 4; // pixel index in pixel array
      //let mouse_index = (mouseY * video.width + mouseX) * 4 // pixel index of mouse pos
      let r = video.pixels[index]
      let g = video.pixels[index+1]
      let b = video.pixels[index+2]
      
      
      // brightness based on closeness to mouse
     
      let maxDistance = dist(windowWidth, windowHeight, 0, 0)
      let bright = map(distanceToMouse, 0, maxDistance, 255, 0)
      
      fill(r, g, b, bright)
      noStroke();
      rectMode(CENTER)
      rect(x,y, pixel_size, pixel_size)
      }
      
    }
  }
}

