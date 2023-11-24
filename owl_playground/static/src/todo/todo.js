/** @odoo-module */

import { Component, useState } from "@odoo/owl"
import { TodoList } from "../todoList/todoList"

export class Todoo extends Component {
    static template = "owl_playground.Todo"
    static components = { TodoList }

    setup() {
        this.store = useState(this.env.todoStore)
    }
    addNewList() {
        this.store.createList();
    }

    // removeList(listId) {
    //     const todoIndex = this.lists.findIndex((todo) => todo.id === listId);
    //     if (todoIndex >= 0) {
    //         this.lists.splice(todoIndex, 1);
    //     }
    // }
}