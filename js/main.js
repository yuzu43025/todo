(function(){
'use strict';

// components
var likeComponent = Vue.extend({
    data: function() {
        return {
            count: 0
        }
    },
    template: '<button class="like" @click="countUp">Like {{ count }}</button>',
    methods: {
        countUp: function() {
            this.count++;
        }
    }
});

var vm = new Vue ({

    el: '#app',
    components: {
        'like-component': likeComponent
    },
    // todos
    data: {
        newItem: '',
        todos: []
    },
    watch: {
        todos: {
        handler: function() {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        deep: true
        }
    },
    mounted: function(){
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods: {
        addItem: function() {
            var item = {
                title: this.newItem,
                isDone: false
            };
            this.todos.push(item);
            this.newItem = '';
        },
        deleteItem: function(index) {
            if (confirm('このタスクを削除しますか？')) {
                this.todos.splice(index , 1);
            }
        },
        purge: function() {
            if (!confirm('完了したタスクを一括消去しますか?')) {
                return;
            }
        this.todos = this.remaining;
        }
    },
    computed: {
        remaining: function() {
           return this.todos.filter(function(todo) {
                return !todo.isDone;
            });
        }
    }
});
})();