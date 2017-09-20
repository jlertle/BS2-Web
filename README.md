# Novation Bass Station II Web interface

Control your Bass Station II synthesizer from your web browser. 
No more hidden parameters. All of the Bass Station II parameters are visible on screen.
Save, load and even print your patches!
And, for the fun, leave the application create a patch with the _randomizer_.

![screenshot](/images/BS2-Web_v2.0.0.png "screenshot of current version running in Chrome")


# Requirements &amp; Limitations

:warning: This application requires a browser that support the [Web MIDI API](http://webaudio.github.io/web-midi-api/).

Currently, only **Chrome 43+** and **Opera 44+** support this standard. This app will therefore _not_ work in Firefox, Safari or IE. 

Still under active development. Feel free to log bugs/issues.


# How to use

1. Open https://francoisgeorgy.github.io/BS2-Web/
2. Allow the browser to use your MIDI devices
3. If it's not already done, connect your Bass Station II to your computer.
4. When the Bass Station II is connected the logo will glow. 
5. Move a dial or a slider on your Bass Station II, the corresponding on-screen control must move accordingly.

The logo glows when the Bass Station is connected and recognized by the application:

![connected](/images/BS2-Web-connected.png "Bass Station II connected")

Bass Station II is disconnected:

![disconnected](/images/BS2-Web-disconnected.png "Bass Station II disconnected")

## Features:

Double-click on any knob's label to reset the knob to its default value.

![reset](/images/BS2-Web-double-click-to-reset.png "Double-click the label to reset the value")

## Application Menu

### Favorites

Open the Favorites panel. You can save and recall your favorites patches here. Your favorites are saved in your
browser's local storage. No files are created. 

A favorite is simply a URL with the following format:

    http://<domain>/bs2?sysex=<sysex-data>

Example:

    http://<domain>/bs2?sysex=f00020290033000000000000000000006000004804037d7e0220100f777801004340200000ff7c00000000000f78000008200000077800004000000f700000000000126000000000001a4000202004001f190f6923797c7e3f1f5f6f70017c7e403f4f6770017c7e401f4000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f7

### Randomize

Randomize the parameters according to the _Randomizer settings_ defined in the _Settings_ panel.

### Init

Reset the application and the Bass Station II with the default values.

### Sync

Sync the application with the Bass Station II. This is done by sending a request-for-sysex to the Bass Station II.

### Load patch

Open a dialog allowing you to select a sysex patch file (file with `.syx` extension). One loaded the patch is sent to the Bass Station II.

### Save patch

Open your browser's Save File dialog to save the current patch as a sysex dump file (file with `.syx` extension). 

### Print patch Midi

Open a new window with the current patch displayed in a ready-to-print layout. 

:bulb: With Chrome you can even easily create a _PDF_ file. 

### Settings

Open the Settings panel. Within this panel you can configure:
- the **MIDI channel** to use to communicate with your Bass Station II 
- the **randomizer**

### About

Display the _About_ dialog.

# Bass Station II MIDI messages

The MIDI parameters are documented in the official Novation Bass Station II user manual. 

## SysEx Dump

The application is able to receive and decode SysEx dumps coming from the Bass Station II ("FN-Key _Global: Dump_") as well as .syx patch files.

The SysEx dump format is not documented by Novation. I have reverse-engineered it and you can find the result
 in my other project [BS2-SysEx](https://github.com/francoisgeorgy/BS2-SysEx).


# Credits

Click on __About__ to view the list of libs used to build BS2-Web.  


# Trademarks

_Novation_ is a registered trade mark of Focusrite Audio Engineering Limited.

_Bass Station II_ is a trade mark of Focusrite Audio Engineering Limited.


# Useful links

- http://beta.novationmusic.com/releases/bass_station_ii/
- https://support.novationmusic.com/hc/en-gb/articles/206861739-How-do-I-Control-the-Arp-on-the-Bass-Station-II-from-an-external-Controller-
- https://support.novationmusic.com/hc/en-gb/articles/207561465-How-to-export-User-presets-on-Bass-Station-II-
- https://www.reddit.com/r/synthesizers/comments/3nh3pc/your_bass_station_2_tips_and_tricks/

## Other BS2 editors

- https://cycling74.com/projects/bass-station-ii-patch-editor


# Recommended tools

- https://github.com/gbevin/SendMIDI
- https://github.com/gbevin/ReceiveMIDI
