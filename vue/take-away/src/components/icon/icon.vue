<template>
  <span class="icon" :class="className"></span>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    className: {
      type: String
    }
  },
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixin';

.icon {
  width: 100%;
  height: 100%;
  display: inline-block;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  &.decrease1 {
    bg-image('decrease_1');
  }

  &.discount1 {
    bg-image('discount_1');
  }

  &.guarantee1 {
    bg-image('guarantee_1');
  }

  &.invoice1 {
    bg-image('invoice_1');
  }

  &.special1 {
    bg-image('special_1');
  }

  &.decrease2 {
    bg-image('decrease_2');
  }

  &.discount2 {
    bg-image('discount_2');
  }

  &.guarantee2 {
    bg-image('guarantee_2');
  }

  &.invoice2 {
    bg-image('invoice_2');
  }

  &.special2 {
    bg-image('special_2');
  }

  &.decrease3 {
    bg-image('decrease_3');
  }

  &.discount3 {
    bg-image('discount_3');
  }

  &.guarantee3 {
    bg-image('guarantee_3');
  }

  &.invoice3 {
    bg-image('invoice_3');
  }

  &.special3 {
    bg-image('special_3');
  }
}
</style>
