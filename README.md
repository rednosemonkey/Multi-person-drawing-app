# Multi-person drawing app

A multiperson canvas drawing app with messaging/chat functionality. using websockets (socket.io) and a node server. It has support for both touch and mouse, and will work across any device (computer, tablet, and smart phone).

The socket.io website has a message saying that a drawing app example will come, but I built my own in the meantime. I will likely make updates when I see how the socket.io team uses their technology.

Checkout the [live demo site](http://www.drawwithfriend.com/). Open 2 (or more) browser windows and give it a try!

[single person version](https://github.com/rednosemonkey/draw).

## usage

This app requires a node server.

websockets is handled by socket.io and express is used for the framework. The default html preprocessor for express is jade. However, this app is setup for ejs, which allows the use of standard html. The server.js file has been configured to allow the use of .html in the file names, instead of .ejs. A basic template structure has been added to the views folder.

Although the app will work on any screen size, the other user's screen size has to be taken into account when drawing. Ie, if drawing on a pc to be seen by someone on a smart phone, only use the top left corner of your screen.

