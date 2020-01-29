var song
var songButton
var songhist = []
var amp
var x,y,r,i=0
var x2,y2,r2,i2=0
var rate=1

function preload(){
    song = loadSound('Cradles.mp3')
}

function setup(){
    createCanvas(550,550)
    background(0)

    songButton = createButton("play")
    songButton.mousePressed(togglePlay)

    amp = new p5.Amplitude()
    freq = new p5.FFT()
    angleMode(DEGREES)
}

function togglePlay(){    
    if(song.isPlaying()){
        song.pause()
        songButton.html('play')
    }
    else{
        song.setVolume(0.5)
        song.play()
        song.rate(rate)
        songButton.html('pause')
    }
}

function draw(){
    background(0)

    translate(width/2,height/2)
    
    var vol =amp.getLevel()
    songhist.push(vol)

    var spectrum = freq.analyze()
    
    beginShape()
    noFill()
    stroke(255)

    for(var i=0;i<songhist.length;i++)
    {
        r = map(songhist[i],0,1,100,400)
        x = r*cos(i)
        y = r*sin(i)

        r2 = map(spectrum[i],0,255,100,400)
        x2 = r2*cos(i)
        y2 = r2*sin(i)

        stroke(0,10*i,10*i)
        //point(x,y)
        //fill(0,10*i,10*i)
        vertex(x,y)
    }
    endShape()

    beginShape()
    noFill()
    stroke(255)

    for(var i=0;i<255;i++)
    {
        r2 = map(spectrum[i],0,255,100,200)
        x2 = r2*cos(i)
        y2 = r2*sin(i)

        stroke(10*i,0,10*i)
        //point(x,y)
        //fill(0,10*i,10*i)
        vertex(x2,y2)
    }
    endShape()

    if(songhist.length > 360)
    {
        songhist.splice(0,1)
    }
}
