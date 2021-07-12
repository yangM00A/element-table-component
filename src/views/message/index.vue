<template>
  <tableHttp :tableId="tableId" :tableBtn="tableBtn" :index="index"></tableHttp>
</template>

<script>
import tableHttp from "@/components/table-http";
export default {
  components: {
    tableHttp,
  },
  data() {
    return {
      index: true,
      tableId: "toiletStatus",
      tableBtn: ["info", "edit", "delete"],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>