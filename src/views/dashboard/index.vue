<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ getUserName }}</div>
  </div>
</template>

<script>
import { getUserName } from '@/utils/auth' 

export default {
  name: 'Dashboard',
  data() {
    return {
      getUserName: getUserName()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
