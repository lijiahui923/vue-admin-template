<template>
  <div class="page-container">
    <el-card>
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        size="small"
      >
        <el-form-item label="审批人">
          <el-input
            v-model="formInline.user"
            placeholder="审批人"
          />
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select
            v-model="formInline.region"
            placeholder="活动区域"
          >
            <el-option
              label="区域一"
              value="shanghai"
            />
            <el-option
              label="区域二"
              value="beijing"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
      <superTable
        :column="column"
        :data="list"
        :height="height"
      >
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleClick(scope.row)"
            >
              查看
            </el-button>
            <el-button
              type="text"
              size="small"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </superTable>
    </el-card>
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import superTable from "./../../components/common/superTable";
import { columns } from "./columns";
import axios from "axios";
export default {
    components: { superTable },
    filters: {
        statusFilter(status) {
            const statusMap = {
                published: "success",
                draft: "gray",
                deleted: "danger",
            };
            return statusMap[status];
        },
    },
    data() {
        return {
            list: [],
            listLoading: false,
            height: 0,
            column: columns(),
            formInline: {
                user: "",
                region: "",
            },
        };
    },
    created() {
        this.fetchData();
    },
    mounted() {
        window.addEventListener("resize", this.setViewHeight);
        this.$nextTick(() => {
            this.setViewHeight();
        });
    },
    methods: {
        handleClick(row) {
            console.log(row);
        },
        onSubmit() {
            console.log("submit!");
        },
        fetchData() {
            this.listLoading = true;
            // getList().then(response => {
            //   this.list = response.data.items
            //   this.listLoading = false
            // })
            axios({
                method: "get",
                url:
                "http://mock.studyinghome.com/mock/5f0d436be525ff20854f7c08/maoyan/comingList",
            }).then((response) => {
                this.list = response.data.coming;
                // console.log(this.list);
                this.listLoading = false;
            });
        },
        setViewHeight() {
            this.height = this.$root.$el.clientHeight - 205;
        }
    }
};
</script>

<style scoped>
.page-container {
  padding: 10px;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
.page-container::-webkit-scrollbar {
  display: none;
}
</style>