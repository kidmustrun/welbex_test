<template>
  <tr>
    <th scope="row">{{info.date}}</th>
    <td>{{info.title}}</td>
    <td>{{info.quantity}}</td>
    <td>{{info.distance}}</td>
  </tr>
</template>
<script>
export default {
  name: "TableRow",
  props:[
    'info'
  ]
};
</script>
