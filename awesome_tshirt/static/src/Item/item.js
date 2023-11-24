/** @odoo-module **/

import { Component } from "@odoo/owl";

export class Item extends Component {
    static template = "awesome_tshirt.item";
    static props = {
        slots: {
            type: Object,
            shape: {
                title: { type: Object, optional: true },
                default: Object,
            }
        },
        className: {
            type: String,
            optional: true,
        },
    }
}
