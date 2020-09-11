import NLayout from './components/NLayout.js'
import NTable from './components/NTable.js'

new Vue({
  el: '#app',
  vuetify: new Vuetify({
		theme: {
			themes: {
				light: {
          primary: '#1CC88A',
          secondary: '#4E73DF',
          normal: '#F8F9FC',
					background: '#F7F8FB',
				}
			},
			options: {
					customProperties: true
			},
		},
	}),
  components: {
    NTable,
    NLayout
  },
  data() {
    return {
      loadingBrands: false,
      loadingModels: false,

      getBrandsFailed: false,
      getModelsFailed: false,

      selectedBrand: '',
      brands: [],
      models: []
    }
  },
  methods: {
    getBrands() {
      this.loadingBrands = true

      axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas')
      .then(content => {
        this.brands = content.data
      })
      .catch(error => {
        this.getBrandsFailed = true
      })

      this.loadingBrands = false
    },

    getModel(id) {
      this.loadingModels = true

      this.models = []

      axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${id}/modelos`)
      .then(content => {
        let modelos = content.data.modelos

        modelos.forEach(modelo => delete modelo.codigo)

        this.models = modelos
      })
      .catch(error => {
        this.getModelsFailed = true
      })

      this.loadingModels = false
    },

    resetModels() {
      this.models = []
      this.getModelsFailed = false
    }
  },
  mounted() {
    this.getBrands()
  }
})