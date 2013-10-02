//The Application
// ---------------

// Our overall **AppView** is the top-level piece of UI.
//
define(['zepto', 'underscore', 'backbone', 'app/collection/todos', 'app/view/todo', 'app/constant'], function($, _, Backbone, Todos, TodoView, Constant) {
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: '#todoapp',

    // Our template for the line of statistics at the bottom of the app.
    template: _.template( $('#stats-template').html() ),

    events: {
      'keypress #new-todo': 'createOnEnter',
      'click #clear-completed': 'clearCompleted',
      'click #toggle-all': 'toggleAllComplete'
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed.
    initialize: function() {
      this.allCheckbox = this.$('#toggle-all')[0];
      this.$input = this.$('#new-todo');
      this.$footer = this.$('#footer');
      this.$main = this.$('#main');

      this.listenTo(Todos, 'add', this.addOne);
      this.listenTo(Todos, 'reset', this.addAll);
      this.listenTo(Todos, 'change:completed', this.filterOne);
      this.listenTo(Todos,'filter', this.filterAll);
      this.listenTo(Todos, 'all', this.render);

      Todos.fetch();
    },

    render: function() {
      var completed = Todos.completed().length;
      var remaining = Todos.remaining().length;

      if ( Todos.length ) {
        this.$main.show();
        this.$footer.show();

        this.$footer.html(this.template({
          completed: completed,
          remaining: remaining
        }));

        this.$('#filters li a')
        .removeClass('selected')
        //.filter('[href="#/' + ( TodoFilter || '' ) + '"]')
        .addClass('selected');
      } else {
        this.$main.hide();
        this.$footer.hide();
      }

      this.allCheckbox.checked = !remaining;
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function( todo ) {
      var view = new TodoView({ model: todo });
      $('#todo-list').append( view.render().el );
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
      this.$('#todo-list').html('');
      Todos.each(this.addOne, this);
    },

    filterOne : function (todo) {
      todo.trigger('visible');
    },

    filterAll : function () {
      app.Todos.each(this.filterOne, this);
    },

    // Generate the attributes for a new Todo item.
    //
    newAttributes: function() {
      return {
        title: this.$input.val().trim(),
        order: Todos.nextOrder(),
        completed: false
      };
    },

    createOnEnter: function(event) {
      if ( event.which !== Constant.ENTER_KEY || !this.$input.val().trim() ) {
        return;
      }

      Todos.create( this.newAttributes() );
      this.$input.val('');
    },

    clearCompleted: function() {
      _.invoke(app.Todos.completed(), 'destroy');
      return false;
    },

    toggleAllComplete: function() {
      var completed = this.allCheckbox.checked;

      app.Todos.each(function( todo ) {
        todo.save({
          'completed': completed
        });
      });
    }
  });

  return AppView;
});
