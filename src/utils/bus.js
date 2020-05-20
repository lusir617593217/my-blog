export default {
  list: {},

  $on: function (eventName, callback) {
    this.list[eventName] = callback
  },

  $emit: function (eventName, payload) {
    let options = payload ? payload : ''

    this.list[eventName](options)
  }
}
