interface Callback {
  id: number
  eventName: string
  caller: any
  callback: (value: any) => void
}

/**
 * Manages events and their callbacks.
 */
class EventManager {
  /** An array of callback objects. */
  private callbacks: Callback[] = []

  /** The ID to be assigned to the next callback. */
  private nextId = 0

  /**
   * Emit an event to all subscribed callbacks.
   * @param eventName - The name of the event to emit.
   * @param value - The value to pass to the callback function.
   */
  emit(eventName: string, value: any): void {
    this.callbacks.forEach((callback) => {
      if (callback.eventName === eventName) {
        callback.callback(value)
      }
    })
  }

  /**
   * Subscribe to an event.
   * @param eventName - The name of the event to subscribe to.
   * @param caller - The object that is subscribing.
   * @param callback - The function to call when the event is emitted.
   * @returns The ID of the subscribed callback.
   */
  on(eventName: string, caller: any, callback: (value: any) => void): number {
    this.nextId++
    this.callbacks.push({
      id: this.nextId,
      eventName,
      caller,
      callback,
    })
    return this.nextId
  }

  /**
   * Unsubscribe from an event by ID.
   * @param id - The ID of the callback to unsubscribe.
   */
  off(id: number): void {
    this.callbacks = this.callbacks.filter((callback) => callback.id !== id)
  }

  /**
   * Unsubscribe all callbacks from a specific caller.
   * @param caller - The object that wants to unsubscribe.
   */
  unsubscribe(caller: any): void {
    this.callbacks = this.callbacks.filter(
      (callback) => callback.caller !== caller
    )
  }
}

/** Export a singleton instance of EventManager. */
export const events = new EventManager()
