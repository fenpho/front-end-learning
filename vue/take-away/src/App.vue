<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item"><router-link to="/">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <keep-alive>
      <router-view :seller="seller" keep-alive></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from '@/components/header/header';
import { urlParse } from '@/common/js/util';
const ERR_OK = 0;
export default {
  name: 'App',
  components: {
    'v-header': header
  },
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    };
  },
  created() {
    this.$http.get('/api/seller?id=' + this.seller.id).then(response => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, response.data);
      }
    });
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import './common/stylus/mixin';

#app {
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    // border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    border-1px(rgba(7, 17, 27, 0.1));

    .tab-item {
      flex: 1;
      text-align: center;

      & > a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
      }

      & > a.active {
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>
