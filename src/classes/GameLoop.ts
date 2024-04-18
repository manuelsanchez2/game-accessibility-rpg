export class GameLoop {
  private onStep: Function
  private rafCallback: any

  constructor(onStep: Function) {
    this.onStep = onStep // Function that is called on every frame
    this.rafCallback = null // The callback that is returned from requestAnimationFrame callback
    this.stop = this.stop.bind(this)
    this.restart = this.restart.bind(this)
    this.start()
  }

  private start() {
    let previousMs: number | undefined
    const step = 1 / 60
    const tick = (timestampMs: number) => {
      if (previousMs === undefined) {
        previousMs = timestampMs
      }
      let delta = (timestampMs - previousMs) / 1000
      while (delta >= step) {
        this.onStep()
        delta -= step
      }
      previousMs = timestampMs - delta * 1000
      // Recapture the callback to be able to shut it off
      this.rafCallback = requestAnimationFrame(tick)
    }

    // Initial kickoff
    this.rafCallback = requestAnimationFrame(tick)
  }

  public stop() {
    cancelAnimationFrame(this.rafCallback)
  }

  public restart() {
    this.stop()
    this.start()
  }
}
