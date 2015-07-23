/**
 * Created by gstarr on 4/19/15.
 */
var PhotoBooth = function() {
    // The width and height of the captured photo. We will set the
    // width to the value defined here, but the height will be
    // calculated based on the aspect ratio of the input stream.

    var width = 640;    // We will scale the photo width to this
    var height = 0;     // This will be computed based on the input stream

    // |streaming| indicates whether or not we're currently streaming
    // video from the camera. Obviously, we start at false.

    var streaming = false;

    // The various HTML elements we need to configure or control. These
    // will be set by the startup() function.

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;
    var ref = this;

    this.startup = function($rootScope) {
        video = document.getElementById('cameraCanvas');
        canvas = document.getElementById('snapShotCanvas');
        photo = document.getElementById('photo');
        startbutton = document.getElementById('startbutton');

        navigator.getMedia = ( navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);

        navigator.getMedia(
            {
                video: true,
                audio: false
            },
            function(stream) {
                $rootScope.mediaStream = stream;
                if (navigator.mozGetUserMedia) {
                    video.mozSrcObject = stream;
                } else {
                    var vendorURL = window.URL || window.webkitURL;
                    video.src = vendorURL.createObjectURL(stream);
                }
                video.play();
            },
            function(err) {
                console.log("An error occured! " + err);
            }
        );
        this.addVideoListener(video);
        this.clearphoto();
    };

    this.reinit = function($rootScope) {
        video = document.getElementById('cameraCanvas');
        canvas = document.getElementById('snapShotCanvas');
        photo = document.getElementById('photo');
        startbutton = document.getElementById('startbutton');

        var stream = $rootScope.mediaStream;
        if (navigator.mozGetUserMedia) {
            video.mozSrcObject = stream;
        } else {
            var vendorURL = window.URL || window.webkitURL;
            video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
        this.addVideoListener(video);
        this.clearphoto();
    };

    this.addVideoListener = function(video) {
        video.addEventListener('canplay', function(ev){
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth/width);

                // Firefox currently has a bug where the height can't be read from
                // the video, so we will make assumptions if this happens.

                if (isNaN(height)) {
                    height = width / (4/3);
                }

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                photo.setAttribute('width', width);
                photo.setAttribute('height', height);
                streaming = true;
            }
        }, false);
    };

    // Fill the photo with an indication that none has been
    // captured.

    this.clearphoto = function() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    // Capture a photo by fetching the current contents of the video
    // and drawing it into a canvas, then converting that to a PNG
    // format data URL. By drawing it on an offscreen canvas and then
    // drawing that to the screen, we can change its size and/or apply
    // other changes before drawing it.

    this.takepicture = function() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
            return canvas.toDataURL('image/png');
        } else {
            this.clearphoto();
        }
    }

    // Set up our event listener to run the startup process
    // once loading is complete.
    //window.addEventListener('load', startup, false);
}