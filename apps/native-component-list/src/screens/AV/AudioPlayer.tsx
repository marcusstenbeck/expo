import React from 'react';
import { Audio, Asset } from 'expo';

import Player from './Player';

type PlaybackSource =
  | number
  | {
      uri: string;
      overrideFileExtensionAndroid?: string;
      headers?: {
        [fieldName: string]: string;
      };
    }
  | Asset;

interface Props {
  source: PlaybackSource;
}

interface State {
  isLoaded: boolean;
  isLooping: boolean;
  isPlaying: boolean;
  errorMessage?: string;
  positionMillis: number;
  durationMillis: number;
  rate: number;
  shouldCorrectPitch: boolean;
}

export default class AudioPlayer extends React.Component<Props, State> {
  readonly state: State = {
    isLoaded: false,
    isLooping: false,
    isPlaying: false,
    positionMillis: 0,
    durationMillis: 0,
    rate: 1,
    shouldCorrectPitch: false,
  };

  _sound?: Audio.Sound;

  componentDidMount() {
    this._loadSoundAsync(this.props.source);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.source !== this.props.source) {
      this._loadSoundAsync(nextProps.source);
    }
  }

  _loadSoundAsync = async (source: PlaybackSource) => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(source, { progressUpdateIntervalMillis: 100 });
      soundObject.setOnPlaybackStatusUpdate(this._updateStateToStatus);
      const status = await soundObject.getStatusAsync();
      this._updateStateToStatus(status);
      this._sound = soundObject;
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  _updateStateToStatus = (status: any) => this.setState(status);

  _playAsync = async () => await this._sound!.playAsync();

  _pauseAsync = async () => await this._sound!.pauseAsync();

  _setPositionAsync = async (position: number) => await this._sound!.setPositionAsync(position);

  _setIsLoopingAsync = async (isLooping: boolean) => await this._sound!.setIsLoopingAsync(isLooping);

  _setIsMutedAsync = async (isMuted: boolean) => await this._sound!.setIsMutedAsync(isMuted);

  _setRateAsync = async (
    rate: number,
    shouldCorrectPitch: boolean,
    pitchCorrectionQuality = Audio.PitchCorrectionQuality.Low
  ) => {
    await this._sound!.setRateAsync(rate, shouldCorrectPitch, pitchCorrectionQuality);
  };

  render() {
    return (
      <Player
        {...this.state}
        playAsync={this._playAsync}
        pauseAsync={this._pauseAsync}
        setPositionAsync={this._setPositionAsync}
        setIsLoopingAsync={this._setIsLoopingAsync}
        setRateAsync={this._setRateAsync}
        setIsMutedAsync={this._setIsMutedAsync}
      />
    );
  }
}
