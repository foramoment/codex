import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input"]

  connect() {
    if (this.hasInputTarget) {
      this.inputTarget.setAttribute("rows", "1")
    }
  }

  keydown(event) {
    if (!this.hasInputTarget || event.key !== "Enter") return

    if (event.ctrlKey) {
      this.expandInput()
      return
    }

    event.preventDefault()
    this.element.requestSubmit()
  }

  expandInput() {
    const minRows = 3
    const currentRows = Number.parseInt(this.inputTarget.getAttribute("rows"), 10) || 1
    if (currentRows < minRows) {
      this.inputTarget.setAttribute("rows", String(minRows))
    }
  }
}
