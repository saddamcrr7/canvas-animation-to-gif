const gifLength = 120


var capturer = new CCapture( {
	framerate: 30,
  format: 'gif', 
  workersPath: 'scripts/',
	verbose: true
} );


let textProp = {
  alpha: 0
}

let chars = ['MISTER ', 'HORSE ', 'LOVES ', 'SWEET ', 'COOKIES '] 

let tl = gsap.timeline({
  duration: 0.01,
  repeat: -1
})

let index = 0

function setup() {
  let p5canvas = createCanvas(innerWidth, 200);
  canvas = p5canvas.canvas;

  capturer.start()

  tl.to(textProp, {
    alpha: 0,
    onComplete: ()=> {
      if(index == chars.length) return
        index++
    }
  });


}


function draw() {
  // background(255, 100, 200);
  textSize(32);

  textColor = color(255, 255, 255, 255)

  fill(textColor);
  let cWidth = 200

  chars.forEach((char, i)=> {
    let texts= text(char, cWidth, 100);
    cWidth += textWidth(char);

    if(i == index ) {
      fill(255, 255, 255, textProp.alpha);
    }

  })

  
  if(frameCount < gifLength) {
    capturer.capture(canvas)
  }else if(frameCount === gifLength) {
    capturer.stop()

    capturer.save(function( blob ) {
      blobToBase64(blob).then(res => {
        const image = document.createElement('img')
        const a = document.createElement('a')
        const h1 = document.createElement('h1')
        h1.innerHTML = 'Preview GIF'

        a.href = res
        a.innerHTML = 'Download GIF'
        a.download = "animation.gif"; 

        image.src = res

        document.body.appendChild(h1)
        document.body.appendChild(image)
        document.body.appendChild(a)
      });
   
    })

  }

  
}


const blobToBase64 = blob => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise(resolve => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};


