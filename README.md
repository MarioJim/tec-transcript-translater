# tec-transcript-translater

![GitHub top language](https://img.shields.io/github/languages/top/MarioJim/tec-transcript-translater)
![Lines of code](https://tokei.rs/b1/github/MarioJim/tec-transcript-translater?category=code)
![Continuous Integration](https://github.com/MarioJim/tec-transcript-translater/workflows/Continuous%20Integration/badge.svg)

Simple browser extension to translate ITESM's transcript to english

## Installation

Go to the `Releases` tab, download `tec-transcript-translater.zip` from the latest version and extract the zip somewhere.

Then, load the extension on Chrome:

1. Access chrome://extensions/
1. Check Developer mode
1. Click on `Load unpacked extension`
1. Select the extracted folder

## Development

In a console, run

```sh
$ yarn start
```

Then, in Google Chrome go to `chrome://extensions`, click on `Load unpacked` and browse into the generated `build` folder.

## TODO

- [ ] Save the results in caché
- [x] Improve UI's style
- [x] Add loading indicators
