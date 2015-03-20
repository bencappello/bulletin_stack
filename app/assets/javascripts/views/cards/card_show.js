TrelloClone.Views.CardShow = Backbone.CompositeView.extend ({
  initialize: function (options) {
    this.parent = options.parent;
  },

  tagName: 'li',

  className: 'card-show',

  template: JST['cards/show'],

  events: {
    'click button#delete-card': 'removeCard'
  },

  attributes: function() {
  return {
    'data-card-id': this.model.id
  };
},

  render: function () {
    this.$el.html(this.template({card: this.model}))
    return this;
  },

  removeCard: function (event) {
    event.preventDefault();
    this.model.destroy();
    this.parent.removeSubview('ul#cards', this)
  },

})