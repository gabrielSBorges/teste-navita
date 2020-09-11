export default {
  props: {
    title: { type: String, required: true },
    header: { type: String, required: true },
    items: { type: Array, required: true },
  },
  data() {
    return {
      selectedItem: null
    }
  },
  methods: {
    selectItem(id) {
      if (id !== this.selectItem) {
        this.$emit('show-models', id)
        this.selectedItem = id
      }
      else {
        this.$emit('hide-models')
      }
    },

    btnColor(id) {
      return this.selectItem === id ? 'primary--text' : 'secondary--text'
    }
  },
  template: /*html*/`  
      <v-card outlined class="table-card my-5">
        <v-card outlined color="normal" class="table-title pa-3">
          <span class="table-title secondary--text">{{ title }}</span>
        </v-card>
        
        <table class="n-table">
          <!-- Header -->
          <tr>
            <th class="text-left table-header">{{ header }}</th>

            <th></th>
          </tr>
    
          <!-- Body -->
          <tr v-for="(item, i) in items" :key="i">
            <td>
              {{ item.nome }}
            </td>

            <td v-if="item.codigo">
              <span @click="selectItem(item.codigo)" class="btn-models secondary--text">Ver Modelos</span>
            </td>
          </tr>
        </table>
      </v-card>
  `
}