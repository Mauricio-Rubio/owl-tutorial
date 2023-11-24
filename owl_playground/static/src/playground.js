/** @odoo-module **/

import { Component, useState, useSubEnv } from "@odoo/owl";
import { Navbar } from "./navbar/navbar";
import { Todoo } from "./todo/todo";
import { Dashboard } from "./dashboard/dashboard";
import { Contacts } from "./contacts/contacts";
import { TodoStore } from "./todoStore/todoStore";
export class Playground extends Component {
    static template = "owl_playground.playground";
    static components = { Navbar, Todoo, Dashboard, Contacts, TodoStore }

    setup() {
        this.apps = [
            { id: "todoo", name: "Todoo", Component: Todoo },
            { id: "dashboard", name: "Dashboard", Component: Dashboard },
            { id: "contacts", name: "Contacts", Component: Contacts },
        ]
        this.state = useState({
            currentApp: this.apps[0]
        })

        const todoStore = useState(new TodoStore())
        useSubEnv({ todoStore })
    }

    selectApp(appId) {
        const newApp = this.apps.find((app) => app.id === appId)
        this.state.currentApp = newApp
    }
}
