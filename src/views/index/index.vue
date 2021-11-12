<template>
  <div class="indexPage">
    <div class="topSearch">
      <a-input
        placeholder="在些键入搜索文本..."
        v-model:value="searchModuleKey"
        allow-clear
        @change="search"
      >
        <template #suffix>
          <span class="searchBtn" @click="search">
            <SearchOutlined />
          </span>
        </template>
      </a-input>
    </div>
    <div class="searchRes" v-if="searchModuleKey">
      <div class="subTit">搜索结果</div>
      <div class="resultView">
        <ul>
          <li
            class="moduleItem"
            v-for="item in searchResult"
            :key="item.id"
            @click="jump(item)"
          >
            <div class="moduleIcon">
              <component v-if="!(/^alpIcon/ig.test(item.icon))" :is="dynamicIcon(item.icon)" />
              <alpIcon v-else :size="64" :icon="dynamicAlpIcon(item.icon)"/>
            </div>
            <div class="moduleName">{{ item.name }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="moduleList" v-if="!searchModuleKey">
      <div class="moduleClassify">
        <div
          class="classifyItem"
          v-for="classifyItem in moduleClassify"
          :key="classifyItem.id"
          @click="positionModule(classifyItem)"
        >
          <div class="classifyPic"><img :src="classifyItem.pic" /></div>
          <div class="classifyName">{{ classifyItem.name }}</div>
          <div class="classifyDesc">{{ classifyItem.describe }}</div>
        </div>
      </div>
      <template v-for="moduleItem in moduleData" :key="moduleItem.id">
        <div
          v-if="moduleItem.children && moduleItem.children.length"
          class="classifyDetail"
          :id="'module_' + moduleItem.id"
        >
          <div class="classifyTit">{{ moduleItem.name }}</div>
          <div class="classifyView">
            <ul>
              <li
                class="moduleItem"
                v-for="item in moduleItem.children"
                :key="item.id"
                @click="jump(item)"
              >
                <div class="moduleIcon">
                  <component v-if="!(/^alpIcon/ig.test(item.icon))" :is="dynamicIcon(item.icon)" />
                  <alpIcon v-else :size="64" :icon="dynamicAlpIcon(item.icon)"/>
                </div>
                <div class="moduleName">{{ item.name }}</div>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import * as AntdIcon from "@ant-design/icons-vue";

export default defineComponent({
  name: "indexPage",
  props: {
    // 模块数据
    moduleData: Array,
    // 打开tab方法
    openTab: Function,
  },
  setup(props) {
    // 模块数据
    var moduleData = (props as any).moduleData.filter((o) => o.key != "index");

    // 解析模块列表  分类数据
    var moduleList = <Array<any>>[],
      classifyData = <Array<any>>[];
    const parseModule = function (data) {
      if (Array.isArray(data)) {
        data.forEach((one) => {
          if (one.type == "directory") {
            classifyData.push({
              ...one,
            });
            if (one.children) {
              parseModule(one.children);
            }
          } else {
            moduleList.push({
              ...one,
            });
          }
        });
      }
    };
    parseModule(moduleData);

    const data = {
      moduleData: moduleData,
      moduleClassify: classifyData.reverse(),
      searchModuleKey: ref(""),
      searchResult: ref<Array<any>>([]),
    };

    // 搜索查询
    const search = function (val) {
      data.searchResult.value = [];
      if (data.searchModuleKey.value.trim()) {
        var reg = new RegExp(data.searchModuleKey.value.trim(), "ig");
        data.searchResult.value = moduleList.filter((o) => {
          return reg.test(o.name);
        });
      }
    };

    // 动态加载icon
    const dynamicIcon = function (icon) {
      // console.log(icon);
      return AntdIcon[icon] || "";
    };
    const dynamicAlpIcon = function (icon) {
      // console.log(icon);
      return icon.split(':')[1];
    };
    return {
      ...data,
      search,
      dynamicIcon,
      dynamicAlpIcon,
    };
  },
  methods: {
    // 定位模块
    positionModule: function (item) {
      var moduleEl = this.$el.querySelector("#module_" + item.id);
      if (moduleEl) {
        var topOffset = moduleEl.offsetTop;
        (document as any).body.querySelector(
          ".home>.main>.mainView"
        ).scrollTop = topOffset;
      }
    },
    // 模块跳转页签模块
    jump: function (item) {
      // 调用父级打开tab页签
      if (this.openTab) {
        this.openTab(item);
      }
    },
  },
  created: function () {
  },
});
</script>
<style lang="less">
.indexPage {
  height: 100%;

  > .topSearch {
    padding: 16px;
    width: 300px;
    .searchBtn {
      color: #999;
      cursor: pointer;
      &:hover {
        color: #333;
      }
    }
  }

  > .searchRes {
    > .subTit {
      height: 30px;
      font-size: 18px;
      line-height: 30px;
      color: #ffffff;
    }
    > .resultView {
      > ul {
        overflow: hidden;
        > li {
          float: left;
        }
      }
    }
  }

  > .moduleList {
    padding: 16px;
    > .moduleClassify {
      display: flex;
      flex-flow: row-reverse wrap-reverse;
      align-items: center;
      justify-content: center;
      > .classifyItem {
        margin: 0 0 16px 16px;
        padding: 15px;
        width: 300px;
        height: 300px;
        background-color: #fff;
        user-select: none;
        cursor: pointer;
        > .classifyPic {
          margin: 0 auto;
          width: 268px;
          height: 150px;
          > img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        > .classifyName {
          padding: 8px 0;
          height: 40px;
          font-weight: bold;
          font-size: 18px;
          text-overflow: ellipsis;
          color: #1e1e1e;
          overflow: hidden;
          white-space: nowrap;
        }
        > .classifyDesc {
          height: 78px;
          font-size: 12px;
          overflow: hidden;
          line-height: 20px;
          color: #464646;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
    > .classifyDetail {
      margin-top: 8px;
      > .classifyTit {
        height: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 18px;
        line-height: 30px;
        color: #ffffff;
      }
      > .classifyView {
        > ul {
          overflow: hidden;
          > li {
            float: left;
          }
        }
      }
    }
  }

  .moduleItem {
    margin: 16px 16px 0 0;
    width: 150px;
    height: 150px;
    background-color: #fff;
    cursor: pointer;
    > .moduleIcon {
      margin: 16px 40px 12px;
      width: 70px;
      height: 70px;
      font-size: 60px;
      line-height: 70px;
      text-align: center;
      font-weight: 100;
      color: #777;
      > img {
        display: block;
        width: 100%;
        height: 100%;
      }
      // >.alp_icon{
      //   display: block;
      //   width: 64px;
      //   >img{
      //     display: block;
      //     width: 100%;
      //   }
      // }
    }
    > .moduleName {
      overflow: hidden;
      font-size: 12px;
      line-height: 15px;
      text-transform: uppercase;
      padding: 0 8px 8px 8px;
      height: 52px;
      text-align: center;
      text-overflow: ellipsis;
      width: 100%;
    }
  }
}
</style>