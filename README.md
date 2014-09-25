# Multi-person drawing app

A multiperson canvas drawing app using websockets (socket.io) and a node server. A multiperson version of my [drawing app](https://github.com/rednosemonkey/draw). It has support for both touch and mouse. The socket.io website has a message saying that a drawing app example will come, but I built my own in the meantime. I will likely make updates when I see how the socket.io team uses their technology.

## usage

This app requires a node server to push the drawing changes over (primarily) websockets. As I personally don't have hosting that allows the use of a node server, this code has only been tested locally. As I use a LAMP/WAMP stack, I use an apache server to run the code, and a local node server for the websockets. Without a local apache server, you'll need to setup an express server. Loads of info on the net, or even the socket.io site to show how to do that.

## Features

- Drawing changes are shown across all devices open on the same server port.
- Simple interface for young kids to use.
- No external dependencies.

## Future changes

- Color changes currently aren't working. Only line thickness. 
- fix canvas resize on screen orientation
- remove the need for fastclick.js by adding touch events to buttons for iOS devices.

