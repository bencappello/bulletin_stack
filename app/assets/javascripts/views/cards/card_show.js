BulletinStack.Views.CardShow = Backbone.CompositeView.extend ({
  initialize: function (options) {
    this.list = options.list;
    this.listenTo(this.model, 'change', this.render);
  },

  tagName: 'li',

  className: 'card-show group',

  template: JST['cards/show'],

  events: {
    'click #edit-card': 'showModal',
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

  showModal: function () {
    this.modalView = new BulletinStack.Views.CardModal({
      model: this.model,
      list: this.list
    });
    $('#md-overlay').prepend(this.modalView.$el);
    this.modalView.render();
    this.modalView.delegateEvents();
  },

})
