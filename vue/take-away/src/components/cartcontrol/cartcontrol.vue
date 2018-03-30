<template>
  <div class="cartcontrol">
    <transition-group name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart" :key="1">
        <span class="inner icon-remove_circle_outline" :key="2"></span>
      </div>
    </transition-group>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-increase icon-add_circle" @click="increaseCart"></div>
  </div>
</template>

<script type='text/ecmascript-6'>
import Vue from 'vue';

export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {};
  },
  components: {},
  created() {
  },
  methods: {
    increaseCart(event) {
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      this.$emit('cart-add', event.target);
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
.cartcontrol {
  font-size: 0;

  .cart-decrease {
    display: inline-block;
    padding: 6px;

    .inner {
      display: inline-block;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }

    &.move-enter-active, &.move-leave-active {
      transition: all 0.4s linear;
      transform: translate3d(0, 0, 0);
      opacity: 1;

      .inner {
        transition: all 0.4s linear;
        transform: rotate(0);
      }
    }

    &.move-enter, &.move-leave-to {
      opacity: 0;
      transform: translate3d(24px, 0, 0);

      .inner {
        transform: rotate(180deg);
      }
    }
  }

  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .cart-increase {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }
}
</style>
