<template>
  <div class="home" v-if="!isRefresh">
    <div class="leftNav" @click="navMenuClick(false)">
      <div class="navMenu">
        <ul v-if="showLeftNav" @click.stop="">
          <!-- navData -->
          <li
            v-for="item in leftNavMenu"
            :key="item.id"
            :class="{ sel: subMenu.selNavId == item.id }"
            @click="navMenuClick(item)"
            :title="item.name"
          >
            <div class="icon">
              <component :is="dynamicIcon(item.icon)" />
            </div>
          </li>

          <!-- 更多 -->
          <li class="otherMenu" v-if="moreMenu.length" title="更多">
            <a-menu :inline-collapsed="true" @click="moreMenuClick">
              <a-sub-menu popupClassName="otherSubMenu">
                <template #icon>
                  <component :is="dynamicIcon('MoreOutlined')" />
                </template>
                <a-menu-item v-for="oMenn in moreMenu" :key="oMenn.id">{{oMenn.name}}</a-menu-item>
              </a-sub-menu>
            </a-menu>
          </li>
        </ul>
      </div>
      <div class="subMenu" v-if="subMenu.show" @click.stop="navMenuClick(false)">
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
      <div class="config">
        <ul>
          <li title="刷新" class="btn" @click="configOption('refresh')"><RedoOutlined /></li>
          <li title="关于" class="btn" @click="configOption('about')"><InfoCircleOutlined /></li>
          <li title="设置" class="btn" @click="configOption('config')"><SettingOutlined /></li>
          <li>
            <!-- <span class="user">
              <component :is="dynamicIcon('UserOutlined')" />
            </span> -->
            <a-popover size="small" placement="rightBottom" overlayClassName="userPopup">
              <template #content>
                <span @click="configOption('logout')">退出</span>
              </template>
              <span class="user">
                <component :is="dynamicIcon('UserOutlined')" />
              </span>
            </a-popover>
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
        <!-- <template> -->
          <div v-for="item in tabModules" :key="item.id" class="tabViews" :class="{ active: item.id == activeTabId }">
            <component
              :is="dynamicTabsComponent(item)"
              :moduleData="navData"
              :openTab="open"
            />
          </div>
        <!-- </template> -->
      </div>
    </div>

    <!-- 关于 -->
    <a-modal
      v-model:visible="about.show"
      title="关于"
      :width="300"
      :closable="false"
    >
      <template #footer>
        <a-button key="submit" type="primary" @click="about.show=false">关闭</a-button>
      </template>
      <div class="aboutContent">
        Opcenter Execution Foundation v 1.0 © 2021 Code365
      </div>
    </a-modal>
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

      // 左侧导航菜单高度
      leftNavHeight: 0,
      // 导航菜单
      leftNavMenu: [],
      // 其他更多导航菜单
      moreMenu: [],
      
      // cache 异步组件加载
      componentCacheMap: {},

      // 刷新
      isRefresh: false,

      // 关于
      about: {
        show: false,
      }
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
        // console.log(res);
        this.parseInterfaceData(res);

        // 需要直接开启的tabs页签
        var opanPath = this.$route.params.path;
        opanPath = opanPath=='index'?'':opanPath;

        if (Array.isArray(this.navData)) {
          this.navData.forEach((one: any) => {
            if (one.key == "index") {
              // 默认加载首页
              this.activeTabId = one.id;
              this.tabModules.push({
                ...one,
              });
            }

            // 验证tabs页签 并开启
            if(opanPath && one.key == opanPath && this.tabsComponents[one.id] ){
              this.activeTabId = one.id;
              this.tabModules.push({
                ...one,
              });
              this.componentCacheMap[one.id] = defineAsyncComponent(this.tabsComponents[one.id]);
              this.showLeftNav = one.key;
            }else if(opanPath && Array.isArray(one.children)){
              one.children.forEach(subOne => {
                if( subOne.key == opanPath && this.tabsComponents[subOne.id] ){
                  this.activeTabId = subOne.id;
                  this.tabModules.push({
                    ...subOne,
                  });
                  this.componentCacheMap[subOne.id] = defineAsyncComponent(this.tabsComponents[subOne.id]);
                  this.showLeftNav = subOne.key;
                }
              });
            }
          });
        }

        // 显示最大菜单数量
        var showMaxMenuNum = this.leftNavHeight/48|0;
        var navLen = this.navData.length;
        if(navLen>showMaxMenuNum){
          this.navData.forEach((subMenu, idx) => {
            if(idx<(showMaxMenuNum-1)){
              // 可展示全的菜单
              this.leftNavMenu.push({
                ...subMenu
              });
            }else{
              // 更多导航菜单
              this.moreMenu.push({
                ...subMenu
              });
            }
          });
        }else{
          this.leftNavMenu = this.navData;
        }

        this.isLoading = true;
        loading.close();
      });
  },
  mounted: function(){
    // 左侧导航条高度
    this.leftNavHeight = this.$el.querySelector('.navMenu').clientHeight;
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
          }else{
            this.$router.replace("/login")
          }
        } else if (oneRes.config.url == "/getRouters") {
          // 用户路由权限
          var navMenu = <Array<any>>[];

          // 默认加入首页
          navMenu.push({
            id: 'index',
            icon: "HomeOutlined",
            key: "index",
            name: "首页",
            type: "command", // command 菜单   directory 目录
            component: menuData.componentMap["index"],
          });

          this.tabsComponents[navMenu[0].id] = menuData.componentMap["index"];
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

                  this.tabsComponents[subMenu.id] = menuData.componentMap[subMenu.path];
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
          }else{
            this.$router.replace("/login")
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
      // 缓存动态加载组件
      if(!this.componentCacheMap[component.id]){
        this.componentCacheMap[component.id] = defineAsyncComponent(this.tabsComponents[component.id]);
      }
      // 懒加载 组件
      return this.componentCacheMap[component.id] || "";
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
    // 更多菜单回调事件
    moreMenuClick: function(key){
      // console.log(key);
      for(var i=0;i<this.moreMenu.length;i++){
        var one = this.moreMenu[i];
        if(one.id == key.key){
          // 打开二级菜单
          this.navMenuClick(one);
          break;
        }
      };
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
      // 校验是否有模块
      if(!this.tabsComponents[data.id]){
        this.$message.error('模块加载失败');
        return;
      }
      // load加载句柄
      var loading = null;
      var ids = this.tabModules.map((o) => o.id);
      // 是否展示左侧导航条
      this.showLeftNav = data.key !== "index";
      this.$router.push("/home/"+data.key);
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

    // 设置
    configOption: function(type){
      switch(type){
        case 'refresh':
          // 刷新  重新加载模块
          var loading = this.$loading({
            // target: this.$el,
            background: 'rgba(0,0,0,0.75)',
            size: 166,
            iconColor: '#00678C',
          });

          this.isRefresh = true;
          setTimeout(() => {
            this.isRefresh = false;
            this.$nextTick(function(){
              loading.close();
            });
          }, 1000)
          break;
        case 'about':
          // 关于
          this.about.show = true;
          break;
        case 'config':
          // 设置
          this.$message.info('正在开发中...');
          break;
        case 'logout':
          // 清空TOKEN
          sessionStorage['token'] = '';
          document.cookie = 'token="";';
          this.$router.push("login");
          break;
      }
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
      overflow: hidden;
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

          &.otherMenu{
            .ant-menu.ant-menu-inline-collapsed{
              width: auto;
              background-color: transparent;
              text-align: center;
              border: 0;
            }
            .ant-menu-submenu{
              height: 48px;
              line-height: 48px;
            }
            .ant-menu-item:active, 
            .ant-menu-submenu-title:active{
              background-color: transparent;
            }
            .ant-menu-submenu-title{
              margin: 0;
              padding: 0;
              color: #fff;
              svg{
                transform: translate(5px, 9px);
                width: 24px !important;
                height: 24px !important;
              }
            }
          }
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
        height: 10px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #464646;
        opacity: 0.2;
        border-radius: 24px;
      }
    }
  }
}

// 更多子菜单弹出窗
.otherSubMenu{
  background-color: #003750;
  box-shadow: 8px 8px 16px 0 rgba(0, 0, 0, 0.3), 2px -4px 4px 0 rgba(0, 0, 0, 0.3);
  &.ant-menu-submenu-popup>.ant-menu{
    background-color: #003750;
  }
  ul.ant-menu-vertical.ant-menu-sub{
    padding: 5px 0;
    >li.ant-menu-item{
      margin: 0;
      padding: 0 10px 0 15px;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      color: #aae6f5;
      cursor: pointer;

      &.ant-menu-item-selected,
      &:hover,
      &:active {
        background-color: #004c6c;
      }
    }
  }
}

// 用户退出菜单 
.ant-popover.userPopup{
  .ant-popover-arrow{
    border-color: transparent transparent #004c6c #004c6c;
  }
  .ant-popover-inner-content{
    background-color: #004c6c;
    padding: 0 15px;
    >span{
      display: inline-block;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      color: #aae6f5;
      cursor: pointer;
    }
  }
}
</style>