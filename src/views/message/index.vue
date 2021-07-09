<template>
  <tableHttp :tableId="tableId"></tableHttp>
</template>

<script>
import tableHttp from "@/components/table-http";
export default {
  components: {
    tableHttp,
  },
  data() {
    return {
      tableId: "messageRemind",
    };
  },
};
</script>

<style lang="scss" scoped>
</style>