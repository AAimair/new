<template>
  <div class="home">
    <div class="leftNav" @click="navMenuClick(false)">
      <div class="navMenu">
        <ul v-if="showLeftNav" @click.stop="">
          <li
            v-for="item in navData"
            :class="{ sel: subMenu.selNavId == item.id }"
            :key="item.id"
            @click="navMenuClick(item)"
          >
            <div class="icon">
              <component :is="dynamicIcon(item.icon)" />
            </div>
          </li>
        </ul>
        <div class="subMenu" v-if="subMenu.show" @click="navMenuClick(false)">
          <div class="menu">
            <div class="subTit">
              <div class="closeBtn" @click="navMenuClick(false)" title="关闭">
                <CloseOutlined />
              </div>
            </div>
            <div class="subMenuView">
              <ul>
                <li
                  v-for="subItem in subMenu.data"
                  :key="subItem.id"
                  @click="open(subItem)"
                >
                  <span>{{ subItem.name }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="config">
        <ul>
          <li title="刷新" class="btn"><RedoOutlined /></li>
          <li title="关于" class="btn"><InfoCircleOutlined /></li>
          <li title="设置" class="btn"><SettingOutlined /></li>
          <li>
            <span class="user">
              <component :is="dynamicIcon('UserOutlined')" />
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="main" v-if="isLoading">
      <!--头部-->
      <div class="top">
        <div class="logo">
          <span>{{ projectName }}</span>
        </div>
        <div class="topTabs">
          <div class="prevBtn" @click="navTabsMove('prev')">
            <LeftOutlined />
          </div>
          <div class="nextBtn" @click="navTabsMove('next')">
            <RightOutlined />
          </div>
          <div class="tabsView">
            <ul :style="{ left: navTabsLeft + 'px' }">
              <li
                v-for="tab in tabModules"
                :key="tab.id"
                :data-tabid="'navTab_' + tab.id"
                :class="{
                  active: tab.id == activeTabId,
                  noClose: tab.key == 'index',
                }"
                @click="open(tab)"
              >
                <span>{{ tab.name }}</span>
                <div
                  v-if="tab.key != 'index'"
                  class="closeBtn"
                  @click.stop="close(tab)"
                >
                  <CloseOutlined />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--右侧内容区-->
      <div class="mainView">
        <template v-for="item in tabModules" :key="item.id">
          <div class="tabViews" :class="{ active: item.id == activeTabId }">
            <component
              :is="dynamicTabsComponent(item)"
              :moduleData="navData"
              :openTab="open"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, defineAsyncComponent } from "vue";
import * as AntdIcon from "@ant-design/icons-vue";
// 菜单数据
import menuData from "../../config/navConfig";

export default defineComponent({
  name: "Home",
  data: function () {
    return {
      isLoading: false,
      projectName: "",
      navData: [],
      tabsComponents: {},
      subMenu: {
        show: false,
        selNavId: "",
        data: [],
      },
      // 激活展示tab页签ID
      activeTabId: "",
      tabModules: [],
      // 导航菜单 移动
      navTabsLeft: 0,
      // 展示左侧导航菜单
      showLeftNav: false,
    };
  },
  created: function () {
    var loading = this.$loading({
      background: "rgba(0,0,0,0.75)",
      size: 166,
      iconColor: "#00678C",
    });
    // 获取项目名
    this.getProjectName();
    (window as any).axios
      .all([this.getUserInfo(), this.getUserJurisdiction()])
      .then((res) => {
        console.log(res);
        this.parseInterfaceData(res);

        if (Array.isArray(this.navData)) {
          this.navData.forEach((one: any) => {
            if (one.key == "index") {
              // 默认加载首页
              this.activeTabId = one.id;
              this.tabModules.push({
                ...one,
              });
            }
          });
        }

        this.isLoading = true;
        loading.close();
      });
  },
  methods: {
    getProjectName: function () {
      return this.$axios
        .get("/system/config/configKey/sys.index.name")
        .then((res) => {
          // console.log(res)
          if (res.data.code == 200) {
            this.projectName = res.data.msg;
          }
        });
    },
    // 获取用户信息
    getUserInfo: function () {
      return this.$axios.get("/getInfo");
    },
    // 获取用户权限
    getUserJurisdiction: function () {
      return this.$axios.get("/getRouters");
    },
    // 解析接口数据
    parseInterfaceData: function (res) {
      // 处理两接口返回数据
      res.forEach((oneRes) => {
        if (oneRes.config.url == "/getInfo") {
          // 用户基本信息
          if (oneRes.data.code == 200) {
            this.$store.state.userInfo = oneRes.data.user;
            this.$store.state.userRoles = oneRes.data.roles;
            this.$store.state.userPermissions = oneRes.data.permissions;
          }
        } else if (oneRes.config.url == "/getRouters") {
          // 用户路由权限
          var navMenu = <Array<any>>[];

          // 默认加入首页
          navMenu.push({
            id: 1,
            icon: "HomeOutlined",
            key: "index",
            name: "首页",
            type: "command", // command 菜单   directory 目录
            component: menuData.componentMap["index"],
          });

          this.tabsComponents[1] = menuData.componentMap["index"];
          if (oneRes.data.code == 200) {
            // 菜单模版
            var template = {
              id: "",
              icon: "",
              name: "",
              key: "",
              pic: "",
              describe: "",
              type: "",
            };
            // 解析压入用户权限菜单 数据
            oneRes.data.data.forEach((m) => {
              var newTemp = JSON.parse(JSON.stringify(template));
              newTemp.id = m.id;
              newTemp.icon = m.icon;
              newTemp.name = m.name;
              newTemp.key = m.path;
              newTemp.pic = menuData.modulePics[m.pic];
              newTemp.describe = m.remark;
              newTemp.type = m.type == "M" ? "directory" : "command";

              if (m.type == "M" && m.children) {
                newTemp.children = [];
                m.children.forEach((subMenu) => {
                  var subTemp = JSON.parse(JSON.stringify(template));
                  subTemp.id = subMenu.id;
                  subTemp.icon = subMenu.pic;
                  subTemp.name = subMenu.name;
                  subTemp.key = subMenu.path;
                  subTemp.pic = subMenu.pic;
                  subTemp.describe = subMenu.remark;
                  subTemp.type = subMenu.type == "M" ? "directory" : "command";
                  subTemp.component = menuData.componentMap[subMenu.path];

                  this.tabsComponents[subMenu.id] =
                    menuData.componentMap[subMenu.path];
                  newTemp.children.push(subTemp);
                });
              } else {
                newTemp.component = menuData.componentMap[m.path];
                this.tabsComponents[newTemp.id] = newTemp.component;
              }
              navMenu.push(newTemp);
            });
            // 保存用户权限菜单
            this.$store.state.routerMenu = navMenu;
            this.navData = navMenu;
          }
        }
      });
    },
    // 动态加载icon
    dynamicIcon: function (icon) {
      // console.log(icon);
      return AntdIcon[icon] || "";
    },
    // 动态加载tab组件
    dynamicTabsComponent: function (component) {
      // 懒加载 组件
      return defineAsyncComponent(this.tabsComponents[component.id]) || "";
    },
    // 导航菜单 点击事件
    navMenuClick: function (data) {
      if (data && data.children && data.children.length) {
        this.subMenu.selNavId = data.id;
        this.subMenu.show = true;
        this.subMenu.data = JSON.parse(JSON.stringify(data.children));
      } else if (data === false) {
        this.subMenu.show = false;
        this.subMenu.selNavId = "";
        this.subMenu.data = [];
      } else {
        this.subMenu.selNavId = "";
        this.subMenu.show = false;
        this.subMenu.data = [];
        this.open(data);
      }
    },
    // 导航tab移动
    navTabsMove: function (type) {
      var direction = type == "prev" ? 1 : -1;
      var viewW = this.$el.querySelector(".tabsView").clientWidth;
      var ulW = this.$el.querySelector(".tabsView>ul").clientWidth;
      if (Math.abs(this.navTabsLeft) + viewW < ulW || type == "prev") {
        var offset = this.navTabsLeft;
        offset += direction * 50;
        this.navTabsLeft = offset > 0 ? 0 : offset;
      }
    },
    // 开启导航tab页签
    open: function (data) {
      // load加载句柄
      var loading = null;
      var ids = this.tabModules.map((o) => o.id);
      // 是否展示左侧导航条
      this.showLeftNav = data.key !== "index";
      // 是否加载新的页签
      if (ids.indexOf(data.id) == -1) {
        loading = this.$loading({
          background: "rgba(0,0,0,0.75)",
          size: 166,
          iconColor: "#00678C",
        });
        // 页签开启限制
        if (this.tabModules.length >= 10) {
          this.$message.error("最多开启10个页签");
          return;
        }
        this.tabModules.push({ ...data });
      }
      this.activeTabId = data.id;
      this.$forceUpdate();
      this.$nextTick(function () {
        this.calcNavTabsMove();
        if (loading) {
          setTimeout(() => {
            (loading as any).close();
          }, 1000);
        }
      });
    },
    // 计算标签移动
    calcNavTabsMove: function () {
      var el = this.$el.querySelector(
        "li[data-tabid='navTab_" + this.activeTabId + "']"
      );
      var elLeft = el.offsetLeft;
      var viewW = this.$el.querySelector(".tabsView").clientWidth;
      var ulW = this.$el.querySelector(".tabsView>ul").clientWidth;
      var maxLeft = ulW - viewW;
      if (Math.abs(this.navTabsLeft) + viewW < ulW) {
        var divisor = elLeft < maxLeft ? elLeft : maxLeft;
        var offsetNum = Math.ceil(divisor / 50);
        this.navTabsLeft = offsetNum * -50;
      }
    },
    // 关闭导航tab页签
    close: function (data) {
      var ids = this.tabModules.map((o) => o.id);
      var targetIdx = ids.indexOf(data.id);
      this.tabModules.splice(targetIdx, 1);
      if (data.id == this.activeTabId) {
        this.activeTabId =
          this.tabModules[
            targetIdx < this.tabModules.length - 1 ? targetIdx : targetIdx - 1
          ].id;
      }
      this.$forceUpdate();
    },
  },
});
</script>
<style lang="less">
@topNavNextOrPrevBtnWidth: 20px;
@topNavHeight: 30px;
@topNavBorderColor: #666;

.home {
  height: 100%;
  padding-right: 10px;
  > .leftNav {
    padding: 10px 0;
    float: left;
    width: 64px;
    height: 100%;

    > .navMenu {
      height: calc(100% - 192px);
      > ul {
        > li {
          width: 64px;
          height: 48px;
          line-height: 48px;
          color: #fff;
          font-size: 24px;
          text-align: center;
          cursor: pointer;
          &.sel {
            background-color: #003750;
          }
          &:active,
          &:hover {
            background-color: rgba(0, 0, 0, 0.15);
          }
        }
      }

      > .subMenu {
        position: fixed;
        top: 0;
        left: 64px;
        right: 0;
        bottom: 0;
        z-index: 100;
        > .menu {
          padding: 5px 0;
          width: 288px;
          height: 100%;
          background-color: #003750;
          box-shadow: 8px 8px 16px 0 rgba(0, 0, 0, 0.3),
            2px -4px 4px 0 rgba(0, 0, 0, 0.3) inset;

          > .subTit {
            overflow: hidden;
            padding: 0 10px;
            > .closeBtn {
              float: right;
              width: 20px;
              height: 20px;
              line-height: 20px;
              color: #fff;
              text-align: center;
              cursor: pointer;
              opacity: 0.3;
              &:hover {
                opacity: 1;
              }
            }
          }

          > .subMenuView {
            height: calc(100%);
            > ul {
              > li {
                margin-bottom: 5px;
                padding: 0 10px 0 15px;
                height: 30px;
                line-height: 30px;
                font-size: 12px;
                color: #aae6f5;
                cursor: pointer;

                &:hover,
                &:active {
                  background-color: #004c6c;
                }
              }
            }
          }
        }
      }
    }
    > .config {
      > ul {
        > li {
          height: 48px;
          line-height: 48px;
          font-size: 24px;
          color: #fff;
          text-align: center;
          cursor: pointer;

          > span.user {
            display: inline-block;
            width: 32px;
            height: 32px;
            line-height: 26px;
            border-radius: 50%;
            font-size: 16px;
            background-color: #fff;
            border: 2px solid transparent;
            color: #999;
            &:hover {
              box-shadow: 0 0 5px #41aac8;
              border-color: #41aac8;
            }
          }
          &.btn:hover {
            background-color: rgba(0, 0, 0, 0.15);
          }
        }
      }
    }
  }

  > .main {
    margin-left: 64px;
    height: 100%;

    > .top {
      height: 50px;
      border-bottom: 1px solid #fff;

      > .logo {
        float: right;
        padding: 5px 0;
        height: 100%;
        line-height: 50px;

        max-width: 250px;
        > span {
          padding: 0 20px;
          font-size: 24px;
          font-weight: 800;
          color: #fff;
        }
        > img {
          max-width: 100%;
          height: 100%;
        }
      }

      > .topTabs {
        margin-right: 260px;
        padding-top: calc(50px - @topNavHeight);
        height: 100%;

        > .prevBtn,
        > .nextBtn {
          float: left;
          width: @topNavNextOrPrevBtnWidth;
          height: @topNavHeight;
          line-height: @topNavHeight;
          text-align: center;
          color: #fff;
          font-size: 12px;
          cursor: pointer;
          opacity: 0.3;
          &:hover {
            opacity: 1;
          }
        }

        > .nextBtn {
          float: right;
        }

        > .tabsView {
          margin: 0 @topNavNextOrPrevBtnWidth;
          height: 100%;
          overflow: hidden;
          position: relative;
          > ul {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: flex-start;
            padding-right: @topNavHeight;
            > li {
              position: relative;
              padding: 0 35px 0 15px;
              height: @topNavHeight;
              line-height: calc(@topNavHeight - 2px);
              font-size: 14px;
              color: #666;
              background-color: #ccc;
              border-left: 2px solid @topNavBorderColor;
              border-top: 2px solid @topNavBorderColor;
              border-bottom: 0;
              border-right: 0;
              border-radius: 4px 4px 0 0;
              cursor: pointer;
              white-space: nowrap;
              user-select: none;
              &:not(:last-child) {
                margin-right: @topNavHeight / 5;
              }
              &::before {
                content: "";
                display: block;
                position: absolute;
                top: -2px;
                bottom: 0;
                left: calc(100% - 1px);
                border-top: @topNavHeight / 2 solid transparent;
                border-right: @topNavHeight / 3 solid transparent;
                border-left: @topNavHeight / 3 solid @topNavBorderColor;
                border-bottom: @topNavHeight / 2 solid @topNavBorderColor;
              }
              &:after {
                content: "";
                display: block;
                position: absolute;
                top: -1px;
                bottom: 0;
                left: calc(100% - 3px);
                border-top: @topNavHeight / 2 solid transparent;
                border-right: @topNavHeight / 3 solid transparent;
                border-left: @topNavHeight / 3 solid #ccc;
                border-bottom: @topNavHeight / 2 solid #ccc;
                // background-color: #eee;
              }

              > .closeBtn {
                position: absolute;
                right: 5px;
                top: 50%;
                width: 20px;
                height: 20px;
                line-height: 18px;
                border-radius: 50%;
                transform: translate(0, -50%);
                font-size: 12px;
                text-align: center;
                color: #999;
                &:hover {
                  background-color: rgba(0, 0, 0, 0.15);
                  color: #fff;
                }
              }

              &.noClose {
                padding: 0 15px;
              }
              &.active {
                z-index: 1;
                color: #333;
                background-color: #fff;
                &::after {
                  border-left: @topNavHeight / 3 solid #fff;
                  border-bottom: @topNavHeight / 2 solid #fff;
                }
              }
            }
          }
        }
      }
    }

    > .mainView {
      height: calc(100% - 50px);
      overflow: auto;

      > .tabViews {
        height: 100%;
        display: none;
        &.active {
          display: block;
        }
      }

      &::-webkit-scrollbar {
        width: 10px;
        height: 180px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #464646;
        opacity: 0.2;
        border-radius: 24px;
      }
    }
  }
}
</style>