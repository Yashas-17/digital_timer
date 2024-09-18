import './index.css'
import {Component} from 'react'

class DigitalTimer extends Component {
  state = {paused: true, timerLimit: 25, timer: 25 * 60} // `timer` in seconds

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  onclickStart = () => {
    const {paused} = this.state
    if (paused) {
      this.intervalId = setInterval(this.tick, 1000)
    } else {
      clearInterval(this.intervalId)
    }
    this.setState(prev => ({paused: !prev.paused}))
  }

  tick = () => {
    this.setState(prev => {
      if (prev.timer > 0) {
        return {timer: prev.timer - 1}
      }
      clearInterval(this.intervalId)
      return {paused: true}
    })
  }

  onclickReset = () => {
    clearInterval(this.intervalId)
    this.setState(prev => ({paused: true, timer: prev.timerLimit * 60}))
  }

  decreaseByOne = () => {
    this.setState(prev => {
      if (prev.timerLimit > 1 && prev.paused) {
        return {
          timerLimit: prev.timerLimit - 1,
          timer: (prev.timerLimit - 1) * 60,
        }
      }
      return null
    })
  }

  increaseByOne = () => {
    this.setState(prev => {
      if (prev.paused) {
        return {
          timerLimit: prev.timerLimit + 1,
          timer: (prev.timerLimit + 1) * 60,
        }
      }
      return null
    })
  }

  render() {
    const {paused, timerLimit, timer} = this.state
    const minutes = Math.floor(timer / 60)
    const seconds = timer % 60
    const imgsrc = paused
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const alttext = paused ? 'play' : 'pause'
    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="clock-components-container">
          <div className="imgcont">
            <div className="round-cont">
              <h2>{`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</h2>
              <p>{paused ? 'Paused' : 'Running'}</p>
            </div>
          </div>
          <div className="working-comp-container">
            <div className="pause-reset-cont">
              <button type="button" onClick={this.onclickStart} className="bun">
                <img
                  src={imgsrc}
                  className="play-img"
                  alt={`${alttext} icon`}
                />
                <p>{paused ? 'Start' : 'Pause'}</p>
              </button>

              <button type="button" onClick={this.onclickReset} className="bun">
                <img
                  className="reset-img"
                  alt="reset icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                />
                <p>Reset</p>
              </button>
            </div>
            <p>Set Timer Limit</p>
            <p>
              <button
                onClick={this.decreaseByOne}
                type="button"
                disabled={!paused}
              >
                -
              </button>{' '}
              <span className="timerLimit">{timerLimit}</span>
              <button
                onClick={this.increaseByOne}
                type="button"
                disabled={!paused}
              >
                +
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
