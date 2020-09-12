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
          text: '#5A5C69'
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

      brandsPage: 1,
      modelsPage: 1,

      rowsPerPage: 5,

      brands: [],
      selectedBrand: '',

      models: [],
      showModels: false,
    }
  },
  computed: {
    brandsContent() {
      return this.setPageContent(this.brands, this.brandsPage, 'loadingBrands')
    },

    modelsContent() {
      return this.setPageContent(this.models, this.modelsPage, 'loadingModels')
    }
  },
  methods: {
    getBrands() {
      this.loadingBrands = true

      axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas')
      .then(content => {
        this.brands = content.data
      })
      .catch(() => {
        this.getBrandsFailed = true
      })
    },

    getModels(id, name) {
      this.loadingModels = true

      this.showModels = true

      this.selectedBrand = name

      this.models = []

      axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${id}/modelos`)
      .then(content => {
        let models = content.data.modelos

        models.forEach(modelo => delete modelo.codigo)

        this.models = models
      })
      .catch(() => {
        this.getModelsFailed = true
      })
    },

    hideModels() {
      this.showModels = false
      this.models = []
      this.getModelsFailed = false
    },

    setPageContent(array, page, loading) {
      let content = array.slice(0)

      if (content.length > 0) {
        content = content.slice((page * this.rowsPerPage) - this.rowsPerPage, page * this.rowsPerPage)
        
        this[loading] = false
      }

      return content
    }
  },
  mounted() {
    this.getBrands()
  }
})