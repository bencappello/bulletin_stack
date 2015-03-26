BulletinStack.Views.ItemShow = Backbone.CompositeView.extend ({
  initialize: function (options) {
    this.parent = options.parent;
    this.listenTo(this.model, 'change', this.render);
  },

  tagName: 'div',

  className: 'item-show',

  template: JST['items/show'],

  events: {
    'click .item-done': 'toggleDone'
  },

  toggleDone: function () {
    this.model.set('done', !this.model.get('done'));
    this.model.save();
  },

  render: function () {
    this.$el.html(this.template({item: this.model}))
    return this;
  },

})