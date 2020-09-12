export default {
  props: {
    title: { type: String, required: true },
    header: { type: String, required: true },
    items: { type: Array, required: true },
    totalItems: { type: Number, required: true },
    rows: { type: Number, required: true },
    loading: { type: Boolean, required: true },
    loadingFailed: { type: Boolean, required: true },
  },
  data() {
    return {
      selectedItem: null,
      page: 1
    }
  },
  watch: {
    page(v) {
      this.$emit('change-page', v)
    }
  },
  computed: {
    totalPages() {
      const totalItems = this.totalItems
      const rows = this.rows

      this.page = 1

      if (totalItems < rows) {
        return 0
      }
      else {
        return Math.ceil(totalItems / rows)
      }
      
    }
  },
  methods: {
    selectItem(id, name) {
      this.$emit('show-models', id, name)
      this.selectedItem = id
    },

    deselectItem() {
      this.$emit('hide-models')
      this.selectedItem = null
    },
  },
  template: /*html*/`  
    <v-card outlined class="table-card my-5">
      <!-- Cabeçalho -->
      <v-card outlined color="normal" class="pa-3">
        <span class="table-title secondary--text">{{ title }}</span>
      </v-card>

      <v-divider></v-divider>
      
      <!-- Tabela -->
      <v-row no-gutters class="px-10 py-8">
        <!-- Loading -->
        <v-col cols="12" v-if="loading">
          <div class="text-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
        </v-col>

        <!-- Erro -->
        <v-col cols="12" v-else-if="loadingFailed">
          <div class="text-center red--text">
            Ocorreu um erro ao carregar o conteúdo.
          </div>
        </v-col>

        <v-col cols="12" v-else>
          <!-- Header -->
          <v-row class="table-header">
            <v-col cols="12">{{ header }}</v-col>
          </v-row>
    
          <!-- Body -->
          <v-row class="table-body" v-for="(item, i) in items" :key="i">
            <v-col cols="4">
              {{ item.nome }}
            </v-col>
  
            <v-col cols="4" class="text-center" v-if="item.codigo">
              <span @click="selectItem(item.codigo, item.nome)" class="btn-models secondary--text" v-if="selectedItem !== item.codigo">Ver Modelos</span>

              <span @click="deselectItem" class="btn-models primary--text" v-else>Ocultar Modelos</span>              
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <!-- Paginação -->
      <v-card outlined color="normal" class="table-footer text-center pa-3" v-show="totalPages > 0">
        <v-pagination
          v-model="page"
          :length="totalPages"
          total-visible="8"
        ></v-pagination>
      </v-card>
    </v-card>
  `
}