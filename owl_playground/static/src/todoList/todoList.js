/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { TodoItem } from "../todoItem/todoItem";
import { useAutoFocus } from "../utils/utils";

export class TodoList extends Component {
    static template = "owl_playground.todoList"
    static components = { TodoItem }
    static props = { list: Object };

    setup() {
        this.store = useState(this.env.todoStore)
        useAutoFocus("input")
    }

    addTodo(ev) {
        if (ev.keyCode === 13 && ev.target.value != "") {
            // console.log(this.store.addTodo);
            // console.log(this.props.list.id);
            // console.log(ev.target.value);
            this.store.addTodo(this.props.list.id, ev.target.value);
            ev.target.value = "";
        }
    }

    // toggleTodo(todoId) {
    //     const todo = this.todos.find((todo) => todo.id === todoId)
    //     if (todo) {
    //         todo.isCompleted = !todo.isCompleted
    //     }
    // }

    // removeTodo(todoId) {
    //     const todoIndex = this.todos.findIndex((todo) => todo.id === todoId);
    //     if (todoIndex >= 0) {
    //         this.todos.splice(todoIndex, 1);
    //     }
    // }

    removeList() {
        this.store.removeList(this.props.list.id)
    }
}
