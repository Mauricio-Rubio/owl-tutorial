/** @odoo-module */

import { loadJS } from "@web/core/assets";
import { getColor } from "@web/views/graph/colors"
import { Component, onWillStart, useEffect, useRef, onMounted, onWillUnmount } from "@odoo/owl";

export class PieChart extends Component {
    setup() {
        this.canvasRef = useRef("canvas");
        this.labels = Object.keys(this.props.data);
        this.data = Object.values(this.props.data);
        this.color = this.labels.map((_, index) => getColor(index))
        this.chart = null
        console.log(this);
        onWillStart(() => loadJS(["/web/static/lib/Chart/Chart.js"]))
        onWillUnmount(() => this.chart.destroy())
        onMounted(() => {
            this.renderChart()
        })
        useEffect(() => this.renderChart());
    }

    graphClickEvent(ev) {
        const [activeElement] = this.chart.getElementAtEvent(ev);
        if (!activeElement) {
            return;
        }
        const { _index } = activeElement;
        // console.log(this.props);
        // console.log(this.data);
        // console.log(this.color);
        // console.log(this.label);
        console.log(this);
        // this.props.openTShirtsOrders()
    }

    renderChart() {
        if (this.chart) {
            this.chart.destroy()
        }
        this.chart = new Chart(this.canvasRef.el, {
            type: "pie",
            data: {
                labels: this.labels,
                datasets: [
                    {
                        label: this.props.label,
                        data: this.data,
                        backgroundColor: this.color,
                    },
                ],
            },
            options: {
                onClick: this.graphClickEvent
            }
        });
    }

}

PieChart.template = "awesome_tshirt.Chart"
PieChart.props = {
    openTShirtsOrders: {
        type: Function,
        optional: true,
    },
    data: {
        optional: true,
    },
    label: {
        type: String,
        optional: true,
    },
}