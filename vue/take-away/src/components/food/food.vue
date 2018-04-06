<template>
  <div>
    <transition-group name="move">
      <div class="food" v-show="showFlag" key="a" ref="food">
        <div class="food-content" key="b">
          <div class="image-header" key="c">
            <img :src="food.image" alt="食品主图">
            <div class="back" key="d" @click="hide">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content" key="e">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail" key="f">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price" key="g">
              <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper" key="h">
              <v-cartcontrol :food="food" @cart-add="drop"></v-cartcontrol>
            </div>
            <transition name="fade">
              <div class="buy" v-show="!food.count" key="i" @click.stop.prevent="addFirst($event)">加入购物车</div>
            </transition>
          </div>
          <v-split v-show="food.info"></v-split>
          <div class="info" v-show="food.info" key="j">
            <h3 class="title">商品信息</h3>
            <p class="text">{{food.info}}</p>
          </div>
          <v-split></v-split>
          <div class="rating" key="k">
            <h3 class="title">商品评价</h3>
            <v-ratingselect
              :select-type="selectType"
              :only-content="onlyContent"
              :desc="desc"
              :ratings="food.ratings"
              @select-type="select"
              @toggle-content="toggle"></v-ratingselect>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script type='text/ecmascript-6'>
import Vue from 'vue';
import BScroll from 'better-scroll';
import cartcontrol from '@/components/cartcontrol/cartcontrol';
import split from '@/components/split/split';
import ratingSelect from '@/components/ratingSelect/ratingSelect';

// const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;

export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    };
  },
  components: {
    'v-cartcontrol': cartcontrol,
    'v-split': split,
    'v-ratingselect': ratingSelect
  },
  methods: {
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = false;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.showFlag = false;
    },
    addFirst(event) {
      if (!event._constructed) {
        return;
      }
      this.$emit('cart-add', event.target);
      Vue.set(this.food, 'count', 1);
    },
    drop(target) {
      this.$emit('cart-add', target);
    },
    select(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    toggle() {
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
.food {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background-color: #fff;

  &.move-enter-active, &.move-leave-active {
    transition: all 0.2s;
    transform: translate3d(0, 0, 0);
  }

  &.move-enter, &.move-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .image-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .back {
      position: absolute;
      left: 0;
      top: 10px;

      .icon-arrow_lift {
        display: block;
        padding: 18px;
        font-size: 20px;
        color: #fff;
      }
    }
  }

  .content {
    position: relative;
    padding: 18px;

    .title {
      line-height: 14px;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 700;
      color: rgb(7, 17, 27);
    }

    .detail {
      margin-bottom: 18px;
      line-height: 10px;
      height: 10px;
      font-size: 0;

      .sell-count, .rating {
        font-size: 10px;
        color: rgb(147, 153, 159);
      }

      .sell-count {
        margin-right: 12px;
      }
    }

    .price {
      font-weight: 700;
      line-height: 24px;

      .now {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
      }

      .old {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }

    .cartcontrol-wrapper {
      position: absolute;
      right: 12px;
      bottom: 12px;
    }

    .buy {
      position: absolute;
      right: 18px;
      bottom: 18px;
      z-index: 10;
      height: 24px;
      line-height: 24px;
      padding: 0 12px;
      box-sizing: border-box;
      border-radius: 12px;
      font-size: 10px;
      color: #fff;
      background-color: rgb(0, 160, 220);
      opacity: 1;

      &.fade-enter-active, &.fade-leave-active {
        transition: all 0.2s;
      }

      &.fade-enter, &.fade-leave-to {
        opacity: 0;
      }
    }
  }

  .info {
    padding: 18px;

    .title {
      line-height: 14px;
      margin-bottom: 6px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }

    .text {
      line-height: 24px;
      padding: 0 8px;
      font-size: 12px;
      color: rgb(77, 85, 93);
    }
  }

  .rating {
    padding-top: 18px;

    .title {
      margin-left: 18px;
      line-height: 14px;
      margin-bottom: 6px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
  }
}
</style>
