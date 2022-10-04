<template>
  <div>
    <h3>Фильтры</h3>
    <FiltrationForm @changeCondition="filterInfos" />
    <table class="table">
      <thead>
        <tr>
          <th scope="col" data-field="id" data-sortable="true">Дата</th>
          <th scope="col">
            Название<span
              class="ms-2 badge text-bg-secondary"
              @click="sortBy('title', orderTitle)"
              role="button"
              >{{ !orderTitle ? "▼" : "▲" }}</span
            >
          </th>
          <th scope="col">
            Количество<span
              class="ms-2 badge text-bg-secondary"
              @click="sortBy('quantity', orderQuantity)"
              role="button"
              >{{ !orderQuantity ? "▼" : "▲" }}</span
            >
          </th>
          <th scope="col">
            Расстояние<span
              class="ms-2 badge text-bg-secondary"
              @click="sortBy('distance', orderDistance)"
              role="button"
              >{{ !orderDistance ? "▼" : "▲" }}</span
            >
          </th>
        </tr>
      </thead>
      <tbody>
        <TableRow v-for="info in displayedInfos" :key="info.id" :info="info" />
      </tbody>
    </table>

    <NavPagination
      @reducePage="reducePage"
      @setPage="setPage"
      @increasePage="increasePage"
      :pages="pages"
      :page="page"
      v-if="pages.length>1"
    />
  </div>
</template>

<script>
import InfoDataService from "../services/InfoDataService";
import TableRow from "./TableRow";
import NavPagination from "./NavPagination";
import FiltrationForm from "./FiltrationForm";
export default {
  name: "TableComponent",
  components: {
    TableRow,
    NavPagination,
    FiltrationForm,
  },
  data() {
    return {
      infos: [],
      filteredInfos: [],
      page: 1,
      perPage: 5,
      pages: [],
      orderTitle: true,
      orderDistance: true,
      orderQuantity: true,
    };
  },
  methods: {
    getInfo() {
      InfoDataService.getAll()
        .then((response) => {
          this.infos = response.data;
          this.filteredInfos = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    setPages() {
      this.pages = [];
      let numberOfPages = Math.ceil(this.filteredInfos.length / this.perPage);
      console.log(numberOfPages)
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(infos) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return infos.slice(from, to);
    },
    reducePage() {
      this.page--;
    },
    setPage(pageNumber) {
      this.page = pageNumber;
    },
    increasePage() {
      this.page++;
    },
    filterInfos(column, condition, value) {
      if (column && condition && value)
        switch (condition) {
          case "=":
            this.filteredInfos = this.infos.filter((item) => {
              console.log(item[column].toString(), value)
              return item[column].toString() === value;
            });
            break;
          case "include":
            this.filteredInfos = this.infos.filter((item) => {
              return item[column].toString().includes(value);
            });
            break;
          case ">":
            if(column === 'date')
            this.filteredInfos = this.infos.filter((item) => {
              return item[column] > value;
            });
            else
            this.filteredInfos = this.infos.filter((item) => {
              return item[column] > +value;
            });
            break;
          case "<":
             if(column === 'date')
            this.filteredInfos = this.infos.filter((item) => {
              return item[column] < value;
            });
            else
            this.filteredInfos = this.infos.filter((item) => {
              return item[column] < +value;
            });
            break;
          default:
            this.filteredInfos = this.infos
        }
        else this.filteredInfos = this.infos
    },
    sortBy(type, order) {
      if (order) {
        this.filteredInfos.sort((a, b) => {
          if (a[type] < b[type]) {
            return -1;
          }
          if (a[type] > b[type]) {
            return 1;
          }
          return 0;
        });
      } else {
        this.filteredInfos.sort((a, b) => {
          if (a[type] > b[type]) {
            return -1;
          }
          if (a[type] < b[type]) {
            return 1;
          }
          return 0;
        });
      }
      switch (type) {
        case "title":
          this.orderTitle = !this.orderTitle;
          break;
        case "quantity":
          this.orderQuantity = !this.orderQuantity;
          break;
        case "distance":
          this.orderDistance = !this.orderDistance;
          break;
      }
    },
  },
  watch: {
    filteredInfos() {
      this.setPages();
    },
  },
  computed: {
    displayedInfos() {
      return this.paginate(this.filteredInfos);
    },
  },
  created() {
    this.getInfo();
  },
};
</script>
