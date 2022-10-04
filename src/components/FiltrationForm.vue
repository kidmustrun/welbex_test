<template>
  <form class="row">
    <div class="mb-3 col">
      <select
        class="form-select"
        aria-label="selectColumn"
        v-model="column"
        @change="checkChange"
      >
        <option selected value="date">Дата</option>
        <option value="title">Название</option>
        <option value="quantity">Количество</option>
        <option value="distance">Расстояние</option>
      </select>
    </div>
    <div class="mb-3 col">
      <select
        class="form-select"
        aria-label="selectCondition"
        v-model="condition"
        @change="checkChange"
      >
        <option selected value="=">равно</option>
        <option v-if="column === 'title'" value="include">содержит</option>
        <option v-if="column != 'title'" value=">">больше</option>
        <option v-if="column != 'title'" value="<">меньше</option>
      </select>
    </div>
    <div class="mb-3 col">
      <input
        :type="
          column === 'quantity' || column === 'distance'
            ? 'number'
            : column === 'date'
            ? 'date'
            : 'text'
        "
        :placeholder="
          column === 'quantity' || column === 'distance'
            ? 'Введите числовое значение'
            : 'Введите текстовое значение'
        "
        class="form-control"
        aria-describedby="textInput"
        v-model="value"
        @input="$emit('changeCondition', column, condition, value)"
      />
    </div>
  </form>
</template>
<script>
export default {
  name: "FiltrationForm",
  data() {
    return {
      column: "date",
      condition: "=",
      value: "",
    };
  },
  methods: {
    checkChange() {
      this.value = "";
      if (
        this.column === "title" &&
        (this.condition === ">" || this.condition === "<")
      ) {
        this.condition = "=";
      }
      if (this.column === "date" && this.condition === "include") {
        this.condition = "=";
      }
      if (
        (this.column === "quantity" || this.column === "distance") &&
        this.condition === "include"
      ) {
        this.condition = "=";
      }
      this.$emit("changeCondition", this.column, this.condition, this.value);
    },
  },
};
</script>
