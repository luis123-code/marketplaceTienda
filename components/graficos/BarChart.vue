<script>
import { Bar } from 'vue-chartjs'

export default {
  name: 'BarChart',
  extends: Bar,
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
  width: 100%;        /* o prueba 400px */
  max-width: 500px;   /* Limita el tamaño máximo */
  height: 300px;      /* Ajusta la altura */
  margin: 0 auto;     /* Centrado */
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
