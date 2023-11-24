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
        this.props.openTShirtsOrders(activeElement._chart.data.labels[_index])
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
                onClick: this.graphClickEvent.bind(this)
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