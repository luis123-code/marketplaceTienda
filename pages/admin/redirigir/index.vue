<template>
    <div>
        <div style=" display: flex;margin: 48px 39px;justify-content: space-between;">
            <AnimatedText :text="'Bienvenido Administrador'" />
            <div style=" display: flex; gap: 8px;">
                <img style="height: 40px;border-radius: 7px;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQthagpgJMldks-g-jqLcpx7e-zKUQm8hc08g&s">
                <div style="padding-top: 12px;">
                    <p style="font-weight: 400;font-size: 15px;line-height: 100%;color: #0000009C;">Admin</p>
                    <p style="font-weight: 400;font-size: 12px;line-height: 100%;color: black;">Luis Zevallos</p>
                </div>
            </div>
        </div>
        <div style="display: grid;grid-template-columns: repeat(auto-fit, minmax(290px, 200px));justify-items: center;justify-content: center;row-gap: 35px;">
            <div class="container">
                <img style="height: 75px" src="../../../static/icons/users.svg">
                <div>
                    <p style="font-weight: 400;font-size: 18px;line-height: 127%;width: min-content;margin-bottom: 15px;">Usuarios registrados</p>
                    <animated-counter :endValue="datos.usuarios" v-slot="{ number }"> {{ number }}</animated-counter>
                </div>
            </div>
            <div class="container">
                <img style="height: 75px" src="../../../static/icons/package.svg">
                <div>
                    <p style="font-weight: 400;font-size: 18px;line-height: 127%;width: min-content;margin-bottom: 15px;">Productos stock</p>
                    <animated-counter :endValue="datos.productosStock" v-slot="{ number }"> {{ number }}</animated-counter>
                </div>
            </div>
            <div class="container">
                <img style="height: 75px" src="../../../static/icons/codepen.svg">
                <div>
                    <p style="font-weight: 400;font-size: 18px;line-height: 127%;width: min-content;margin-bottom: 15px;">Productos creados</p>
                    <animated-counter :endValue="datos.productosCreados" v-slot="{ number }"> {{ number }}</animated-counter>
                </div>
            </div>
            <div class="container">
                <img style="height: 75px" src="../../../static/icons/truck.svg">
                <div>
                    <p style="font-weight: 400;font-size: 18px;line-height: 127%;width: min-content;margin-bottom: 15px;">Productos vendido </p>
                    <animated-counter :endValue="datos.productosVendidos" v-slot="{ number }"> {{ number }}</animated-counter>
                </div>
            </div>
        </div>

        <div style="display: flex;gap: 45px;     flex-wrap: wrap;    justify-content: center; margin: 72px 0;">
              <div class="chart-wrapper">
                  <BarChart :chart-data="barChartData" :options="chartOptions" style="height: 300px;width: 400px;" />
              </div>
              <div class="chart-wrapper" style="position: relative;">
                  <DoughnutChart :chartData="DoughnutChartData.data" :options="DoughnutChartData.options" style="height: 300px;width: 400px;" />
              </div>
              <div class="chart-wrapper" style="position: relative;">
                  
                  <LineChart :chart-data="lineChartData.lineData" :options="lineChartData.chartOptions" style="height: 300px;width: 400px;" />
              </div>
        </div>

    </div>
</template>
<script>
  import BarChart from '../../../components/graficos/BarChart.vue';    
  import DoughnutChart from '../../../components/graficos/DoughnutChart.vue';    
  import LineChart from '../../../components/graficos/LineChart.vue';        
  import AnimatedText from '../../../components/animacion/AnimatedText.vue';
  import AnimatedCounter from '../../../components/animacion/AnimatedCounter.vue';
  export default {
  name: "index",
  layout: 'redirigir',
  components: {
    BarChart ,
    DoughnutChart ,
    LineChart ,
    AnimatedText,
    AnimatedCounter 
  },
  created() {
    let data = this.obteniendoDatos();
    data.productosStock();
    data.usuarios();
    data.productosCreados();
    data.productosVendidos();
  



  },
  data() {
    return {

    barChartData: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril' , 'Enero', 'Febrero', 'Marzo', 'Abril'],
        datasets: [
          {
            barThickness: 25, // 🔽 barras más delgadas
            label: 'Ventas mensuales',
            backgroundColor: '#acd9b2',
            borderRadius: 6,
            data: [40, 25, 60, 30, 40, 25, 60, 30]
          }
        ]
      },


      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontColor: '#333',
              fontSize: 14
            },
            gridLines: {
              drawBorder: true,
              lineWidth: 0.5 // 🔽 grosor más delgado
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: '#333',
              fontSize: 14
            },
            gridLines: {
              drawBorder: true,
              lineWidth: 0.5 // 🔽 grosor más delgado
            }
          }]
        },
        legend: {
          labels: {
            fontColor: '#333',
            fontSize: 14
          }
        }
      } ,


      DoughnutChartData: {
        data: {
          labels: ['Red', 'Blue', 'Yellow',],
          datasets: [
            {
              label: 'Ventas mensuales',
              data: [40, 30, 30, ],
              label: 'Colors',
              backgroundColor: ['#e4e4e4', '#acd9b2', '#d3ebd6'],
            }
          ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%' // opcional para hacer tipo "donut" más fino
            }
       },
 
      lineChartData: {
        lineData: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril' , 'Enero', 'Febrero', 'Marzo', 'Abril'],
        datasets: [
          {
            label: 'Trafico del sitio',
            data: [40, 25, 60, 30, 40, 25, 60, 30],
            borderColor: '#d3ebd6 ',
            borderWidth: 2,
            backgroundColor:  '#e4e4e4',
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
scales: {
  yAxes: [{
    ticks: {
      beginAtZero: true,
      fontColor: '#333',
      fontSize: 14  // aumenta aquí
    },
    gridLines: {
      drawBorder: true,
      lineWidth: 0.5
    }
  }],
  xAxes: [{
    ticks: {
      fontColor: '#333',
      fontSize: 14 // aumenta aquí
    },
    gridLines: {
      drawBorder: true,
      lineWidth: 0.5
    }
  }] ,
  legend: {
      labels: {
        fontSize: 25,     // tamaño más grande para el label
        fontStyle: 'bold' // grosor en negrita
      }
    }
},
      }
      },
        datos : {
      usuarios: 56,
      productosStock: 120,
      productosCreados: 80,
      productosVendidos: 45
    } ,








    }
  },
  methods: {
      obteniendoDatos() {
        return {      
          usuarios: async () => {
            try {
              await this.$store.dispatch("obteniendoRegistro", {});
              let respuesta = this.$store.state.registro;
              this.datos.usuarios = respuesta.data.length;
              console.log("productosStock obtenidos:", respuesta);
            } catch (error) {
              console.error("Error al obtener productosStock:", error);
            }

          },
          productosStock: async () => {
            try {
              await this.$store.dispatch("obtniendoProductos", {});
              let respuesta = this.$store.state.productos;
              this.datos.productosStock = respuesta.length;
            } catch (error) {
              console.error("Error al obtener productosStock:", error);
            }
          },
          productosCreados: () => {
            let aleatorio = Math.floor(Math.random() * 45);
            this.datos.productosCreados = aleatorio;
          },
          productosVendidos: () => {
            let aleatorio = Math.floor(Math.random() * 100);
            this.datos.productosVendidos = aleatorio; // Simulación de datos, reemplazar con lógica real
          },
        }
      }
  },
  
}

</script>


<style lang="scss"> 

@import '../../../assets/styleGeneral.scss';
@import '../../../assets/iconStyle.scss';

.chart-wrapper {
  max-width: 600px;
  width: 450px;
  height: 320px;
  background: white;
  padding: 20px;
  border-radius: 12px;
}

.chart-label {
    text-align: center;
    display: block;
    width: 100%;
    position: absolute;
    top: 6px;
    font-size: 14px;
    font-weight: 500;
}

.container{
width: 255px;
height: 130px;
align-items: center;
display: flex;
gap: 15px;
border-radius: 10px;
background: rgba(217, 217, 217, 0.61961);
justify-content: center;
}
</style>