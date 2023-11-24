/** @odoo-module **/

import { Component, useSubEnv, onWillStart } from "@odoo/owl";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view"
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks"
import { Item } from "./Item/item";
import { PieChart } from "./Charts/chart"
class AwesomeDashboard extends Component {
    setup() {
        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            }
        })
        this.action = useService("action");
        this.tshirtService = useService("tshirtService")

        this.display = {
            controlPanel: { "top-right": false, "bottom-right": false },
        };

        this.keyToString = {
            average_quantity: "Average amount of t-shirt by order this month",
            average_time: "Average time for an order to go from 'new' to 'sent' or 'cancelled'",
            nb_cancelled_orders: "Number of cancelled orders this month",
            nb_new_orders: "Number of new orders this month",
            total_amount: "Total amount of new orders this month",
        };

        onWillStart(async () => {
            this.statistics = await this.tshirtService.loadStatistics()
        })
    }

    openCustomerView() {
        this.action.doAction("base.action_partner_form")
    }

    openCrmView() {
        this.action.doAction("crm.action_your_pipeline")
    }

    openTShirtsOrders(index) {
        console.log(index);
        const contextMapping = {
            's': { search_default_s: '1' },
            'm': { search_default_m: '1' },
            'x': { search_default_x: '1' },
            'xl': { search_default_xl: '1' },
            'xxl': { search_default_xxl: '1' },
        }
        console.log(contextMapping[index]);
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "T shirt Orders",
            res_model: "awesome_tshirt.order",
            views: [[false, "kanban"], [false, "form"]],
            context: contextMapping[index]
        })
    }
}

AwesomeDashboard.components = { Layout, Item, PieChart };
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
