import { Controller } from "@hotwired/stimulus"

// Scrolls chat to the newest message automatically
export default class extends Controller {
  static targets = ["container"]

  connect() {
    this.scrollToBottom()
    this.observer = new MutationObserver(() => this.scrollToBottom())
    if (this.hasContainerTarget) {
      this.observer.observe(this.containerTarget, { childList: true })
    }
  }

  disconnect() {
    this.observer?.disconnect()
  }

  scrollToBottom() {
    if (this.hasContainerTarget) {
      this.containerTarget.scrollTop = this.containerTarget.scrollHeight
    }
  }
}
