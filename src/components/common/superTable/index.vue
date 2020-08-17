<template>
  <div>
    <el-table
      :data="data"
      :element-loading-text="elementLoadingText"
      :border="border"
      :fit="fit"
      :stripe="stripe"
      :highlight-current-row="highlightCurrentRow"
      :height="height"
      :header-cell-style="{background:'#4fa1f5',color:'#fff'}"
    >
      <el-table-column
        v-for="(item, index) in column"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :align="align"
      />
      <slot />
    </el-table>
    <el-pagination
      class="currentPaage"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
/**
@description:表格
@createTime:2020-08-06
@create:lijiahui
*/
export default {
    name: 'SuperTable',
    components: {},
    props: {
        data: {
            type: Array,
            default: []
        },
        elementLoadingText: {
            type: String,
            default: 'loading'
        },
        border: {
            type: Boolean,
            default: true
        },
        fit: {
            type: Boolean,
            default: true
        },
        stripe: {
            type: Boolean,
            default: true
        },
        highlightCurrentRow: {
            type: Boolean,
            default: true
        },
        height: {
            type: Number,
            default: 0
        },
        column: {
            type: Array,
            default: []
        },
        align: {
            type: String,
            default: 'center'
        }
    },
    data() {
        return {
            currentPage: 5
        };
    },
    computed: {},
    watch: {},
    mounted() {},
    created() {},
    methods: {
        handleSizeChange () {},
        handleCurrentChange () {}
    }
};
</script>
<style scoped>
.currentPaage {
  padding-top: 10px;
  text-align: right;
}
</style>
