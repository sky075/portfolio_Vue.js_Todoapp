Vue.createApp({
  data: function () {
    return {
      todoTitle: '',
      importance: '高',
      todos: [],
    }
  },
  computed: {
    canCreateTodo: function () {
      return this.todoTitle !== ''
    },
  },
  watch: {
    todos: {
      handler: function (next) {
        window.localStorage.setItem('todos', JSON.stringify(next))
      },
      deep: true,
    },
  },
  methods: {
    createTodo: function () {
      if (!this.canCreateTodo) {
        return
      }

      this.todos.push({
        id: 'todo-' + Date.now(),
        title: this.todoTitle,
        time: new Date().toLocaleString(),
        importance: this.importance,
        done: false,
      })

      this.todoTitle = ''
    },
    removeTodo: function (index) {
      this.todos.splice(index, 1)
    },
  },
  created: function () {
    const todos = window.localStorage.getItem('todos')

    if (todos) {
      this.todos = JSON.parse(todos)
    }
  },
}).mount('#app')
