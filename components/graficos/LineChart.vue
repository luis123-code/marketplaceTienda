<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'LineChart',
  extends: Line,
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
  max-width: 600px;
  height: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.chart-label {
  display: block;
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 18px;
}
</style>
