staatuus = "";
objects = [];

function setup()
{
    canvas = createCanvas(380 , 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380 , 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Detecting";
} 

function modelLoaded()
{
    console.log("Model Loaded");
    staatuus = true;
    objectDetector.detect(video , gotResult);
}

function preload()
{
   alarm = loadSound("alarm_alarm_alarm.mp3");
}

function draw()
{
    image(video , 0 , 0 , 380 , 380);

    r = random(255);
    g = random(255);
    b = random(255);

    if(staatuus != "")
    {
        objectDetector.detect(video , gotResult);
        for(i = 0; i < objects.length; i++)
        {
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15 );
            noFill();
            stroke(r,g,b,);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

            if(objects[i].label == "person")
            {
                document.getElementById("status").innerHTML = "Baby Found";
                alarm.stop();
            }

            else
            {
               document.getElementById("status").innerHTML = "Baby not found";
               alarm.play();
            }

            if(objects.length < 0)
            {
                document.getElementById("status").innerHTML = "Baby not found";
                alarm.play();
            }
        }
    } 
}

function gotResult(error , results)
{
   if(error)
   {
       console.error(error);
   }

   else
   {
     console.log(results);
     objects = results;
   }
}