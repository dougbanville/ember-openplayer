# ember-openplayer

PLay audio. The service /addon/services/openplayer-player.js contains player info. As things like progress ranges need to be torn down when sources change we use openplayerPlayer.isReady to re render components.

For Example when the play action is called it sets openplayerPlayer.isReady to false. openplayerPlayer.isReady is then set to ready when the player meta data has loaded succesfully.

## Compatibility

- Ember.js v3.4 or above
- Ember CLI v2.13 or above
- Node.js v8 or above

## Installation

```
ember install ember-openplayer
```

## Usage

[Longer description of how to use the addon in apps.]

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
