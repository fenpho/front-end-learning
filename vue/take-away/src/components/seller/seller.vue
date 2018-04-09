<template>
 <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h2 class="title">{{seller.name}}</h2>
        <div class="desc border-1px">
          <v-star :size="36" :score="seller.score"></v-star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h3>起送价</h3>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h3>商家配送</h3>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h3>平均配送时间</h3>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active': favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <v-split></v-split>
      <div class="bulletin">
        <h3 class="title">公告与活动</h3>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul class="supports" v-if="seller.supports">
          <li class="support-item border-1px" v-for="(item, index) in seller.supports" :key="index">
            <div class="icon-wrapper">
              <v-icon :className="classMap[seller.supports[index].type]"></v-icon>
            </div>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <v-split></v-split>
      <div class="pics">
        <h3 class="title">商家实景</h3>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="(pic, index) in seller.pics" :key="index">
              <img :src="pic" alt="商家实景" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <v-split></v-split>
      <div class="info">
        <h3 class="title border-1px">商家信息</h3>
        <ul>
          <li class="info-item" v-for="(info, index) in seller.infos" :key="index">{{info}}</li>
        </ul>
      </div>
    </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import BScroll from 'better-scroll';
import star from '@/components/star/star';
import split from '@/components/split/split';
import icon from '@/components/icon/icon';
import { saveToLocal, loadFromLocal } from '@/common/js/store';

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      favorite: (() => {
        return loadFromLocal(this.seller.id, 'favorite', false);
      })()
    };
  },
  components: {
    'v-star': star,
    'v-split': split,
    'v-icon': icon
  },
  created() {
    this.classMap = ['decrease4', 'discount4', 'special4', 'invoice4', 'guarantee4'];
  },
  watch: {
    seller() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll();
      this._initPics();
    });
  },

  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏';
    }
  },
  methods: {
    toggleFavorite(event) {
      if (!event._constructed) {
        return;
      }
      this.favorite = !this.favorite;
      saveToLocal(this.seller.id, 'favorite', this.favorite);
    },
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    },
    _initPics() {
      if (this.seller.pics) {
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = width + 'px';
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            });
          } else {
            this.picScroll.refresh();
          }
        });
      }
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixin';

.seller {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;

  .overview {
    position: relative;
    padding: 18px;

    .title {
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }

    .desc {
      padding-bottom: 18px;
      border-1px(rgba(7, 17, 27, 0.1));
      font-size: 0;

      .star {
        display: inline-block;
        margin-right: 8px;
        vertical-align: top;
      }

      .text {
        display: inline-block;
        margin-right: 12px;
        vertical-align: top;
        line-height: 18px;
        font-size: 10px;
        color: rgb(77, 85, 93);
      }
    }

    .remark {
      display: flex;
      padding-top: 18px;

      .block {
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.1);

        &:last-child {
          border: none;
        }

        h3 {
          margin-bottom: 4px;
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .content {
          line-height: 24px;
          font-size: 10px;
          color: rgb(7, 17, 27);

          .stress {
            font-size: 24px;
          }
        }
      }
    }

    .favorite {
      position: absolute;
      right: 18px;
      top: 18px;
      width: 36px;
      text-align: center;

      .icon-favorite {
        display: block;
        color: #d4d6d9;
        font-size: 24px;
        line-height: 24px;

        &.active {
          color: rgb(240, 20, 20);
        }
      }

      .text {
        font-size: 10px;
        line-height: 10px;
        color: rgb(77, 85, 93);
      }
    }
  }

  .bulletin {
    padding: 18px 18px 0 18px;

    .title {
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }

    .content-wrapper {
      padding: 0 12px 16px 12px;
      border-1px(rgba(7, 17, 27, 0.1));

      .content {
        line-height: 24px;
        font-size: 12px;
        color: rgb(241, 20, 20);
      }
    }

    .supports {
      .support-item {
        padding: 16px 12px;
        border-1px(rgba(7, 17, 27, 0.1));
        font-size: 0;

        &:last-child {
          border-none();
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
          color: rgb(7, 17, 27);
        }
      }
    }
  }

  .pics {
    padding: 18px;

    .title {
      margin-bottom: 12px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }

    .pic-wrapper {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;

      .pic-list {
        font-size: 0;

        .pic-item {
          display: inline-block;
          margin-right: 6px;
          width: 120px;
          height: 90px;

          &:last-child {
            margin: 0;
          }
        }
      }
    }
  }

  .info {
    padding: 18px 18px 0 18px;
    color: rgb(7, 17, 27);

    .title {
      padding-bottom: 12px;
      line-height: 14px;
      font-size: 14px;
      border-1px(rgba(7, 17, 27, 0.1));
    }

    .info-item {
      padding: 16px 12px;
      line-height: 16px;
      border-1px(rgba(7, 17, 27, 0.1));
      font-size: 12px;

      &:last-child {
        border-none();
      }
    }
  }
}
</style>
