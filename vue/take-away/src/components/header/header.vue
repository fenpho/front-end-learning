<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="头像">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <div class="icon-wrapper">
            <v-icon :className="classMap1[seller.supports[0].type]"></v-icon>
          </div>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span><i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="背景" width="100%" height="100%">
    </div>
    <transition-group name="fade">
      <div v-show="detailShow" class="detail" key="0">
        <div class="detail-wrapper clearfix" key="1">
          <div class="detail-main" key="2">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper" key="3">
              <v-star :size="48" :score="seller.score"></v-star>
            </div>
            <div class="title-wrapper" key="4">
              <v-title :title="'优惠信息'"></v-title>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
                <div class="icon-wrapper">
                  <v-icon :className="classMap2[seller.supports[index].type]"></v-icon>
                </div>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title-wrapper" key="5">
              <v-title :title="'商家公告'"></v-title>
            </div>
            <div class="bulletin" key="6">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail" key="7">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script type='text/ecmascript-6'>
import star from '@/components/star/star';
import title from '@/components/title/title';
import icon from '@/components/icon/icon';

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false,
      classMap: ''
    };
  },
  components: {
    'v-star': star,
    'v-title': title,
    'v-icon': icon
  },
  created() {
    this.classMap1 = ['decrease1', 'discount1', 'special1', 'invoice1', 'guarantee1'];
    this.classMap2 = ['decrease2', 'discount2', 'special2', 'invoice2', 'guarantee2'];
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixin';

.header {
  position: relative;
  overflow: hidden;
  color: #fff;
  background: rgba(7, 17, 27, 0.5);

  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;

    .avatar {
      display: inline-block;
      vertical-align: top;

      img {
        border-radius: 2px;
      }
    }

    .content {
      display: inline-block;
      margin-left: 16px;

      .title {
        margin: 2px 0 8px 0;

        .brand {
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          bg-image('brand');
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }

        .name {
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
        }
      }

      .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }

      .support {
        .icon-wrapper {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 4px;
        }

        .text {
          line-height: 12px;
          font-size: 10px;
        }
      }
    }

    .support-count {
      position: absolute;
      right: 12px;
      bottom: 18px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;

      .count {
        vertical-align: top;
        font-size: 10px;
      }

      .icon-keyboard_arrow_right {
        margin-left: 2px;
        line-height: 24px;
        font-size: 10px;
      }
    }
  }

  .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7, 17, 27, 0.2);

    .bulletin-title {
      display: inline-block;
      vertical-align: top;
      margin-top: 8px;
      width: 22px;
      height: 12px;
      bg-image('bulletin');
      background-size: 22px 12px;
      background-repeat: no-repeat;
    }

    .bulletin-text {
      vertical-align: top;
      margin: 0 4px;
      font-size: 10px;
    }

    .icon-keyboard_arrow_right {
      position: absolute;
      font-size: 10px;
      right: 12px;
      top: 8px;
    }
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }

  .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    opacity: 1;
    background: rgba(7, 17, 27, 0.8);
    backdrop-filter: blur(10px);

    &.fade-enter-active, &.fade-leave-active {
      transition: all 0.5s;
    }

    &.fade-enter, &.fade-leave-to {
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }

    .detail-wrapper {
      min-height: 100%;
      width: 100%;

      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;

        .name {
          line-height: 16px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }

        .star-wrapper {
          margin-top: 16px;
          padding: 2px 0;
          text-align: center;
        }

        .title-wrapper {
          width: 80%;
          margin: 28px auto 24px auto;
        }

        .supports {
          width: 80%;
          margin: 0 auto;

          .support-item {
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;

            &:last-child: {
              margin-bottom: 0;
            }

            .icon-wrapper {
              display: inline-block;
              width: 16px;
              height: 16px;
              margin-right: 6px;
              vertical-align: top;
            }

            .text {
              line-height: 16px;
              font-size: 12px;
            }
          }
        }

        .bulletin {
          width: 80%;
          margin: 0 auto;

          .content {
            padding: 0 12px;
            line-height: 24px;
            font-size: 12px;
          }
        }
      }
    }

    .detail-close {
      position: relative;
      margin: -64px auto 0 auto;
      width: 32px;
      height: 32px;
      clear: both;
      font-size: 32px;
    }
  }
}
</style>
