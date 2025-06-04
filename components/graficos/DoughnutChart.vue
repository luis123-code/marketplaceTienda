<script>
import { Doughnut } from 'vue-chartjs'

export default {
  name: 'DoughnutChart',
  extends: Doughnut,
  props: {
    chartData: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false
      })
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 400px;
  height: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
