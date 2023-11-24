/** @odoo-module **/

import { Component } from "@odoo/owl";

export class Navbar extends Component {
    static template = "owl_playground.Navbar";
    static props = {
        currentApp: String,
        apps: Array,
        selectApp: Function,
    };
}