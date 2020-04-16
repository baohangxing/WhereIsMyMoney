<template>
    <div class="navTabBox">
        <div class="shortTab" v-if="tabTitle.length <= 5">
            <!-- 导航栏 -->
            <div class="navTab">
                <div
                    v-for="(item, index) in tabTitle"
                    :key="index"
                    class="navTabItem"
                    :class="[index === tabClick ? (size === 's' ? 'click-s' : 'click') : size === 's' ? 'normal-s' : 'normal',index === tabClick ? (size === 'm' ? 'click-m' : 'click') : size === 'm' ? 'normal-m' : 'normal']"
                    @click.stop="navClick(index)"
                >
                    {{ item }}
                </div>
            </div>
            <div class="underlineBox"
                 :style="'transform:translateX(' + isLeft + 'px) translateY(-6px);width:' + isWidth + 'px'">
                <div class="underline"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'slidingMenu',
        props: {
            tabTitle: {
                type: Array,
                default: () => {
                    return ['支出', '收入']
                }
            },
            size: {
                type: String,
                default: ''
            }
            ,
            width: {
                type: Number,
                default:
                    400
            }
            ,
        },
        data() {
            return {
                tabClick: 0, //导航栏被点击
                isLeft: 0, //导航栏下划线位置
                isWidth: 0, //每个导航栏占位
            };
        }
        ,
        created() {
            this.isWidth = this.width / this.tabTitle.length; //宽度除以导航标题个数=一个导航所占宽度
        }
        ,
        methods: {
            // 导航栏点击
            navClick(index) {
                this.$emit('changeTab', index); //设置swiper的第几页
                this.tabClick = index; //设置导航点击了哪一个
                this.isLeft = index * this.isWidth; //设置下划线位置
            }
        }
    }
    ;
</script>

<style lang="stylus" scoped>
    .click
        color black
        font-size $font-size-llg
        font-weight bold


    .normal
        color $text-color-more-grey
        font-size $font-size-lg


    .click-m
        color black
        font-size $font-size-base
        font-weight bold


    .normal-m
        color $text-color-grey
        font-size $font-size-base


    .click-s
        color $text-color
        font-size $font-size-sm
        font-weight bold


    .normal-s
        color $text-color-more-grey
        font-size $font-size-sm


    .navTabBox
        width 100%
        height 100%
        .shortTab
            width 100%
            height 100%
            .navTab
                display flex
                width 100%
                height 100%
                position relative

                .navTabItem
                    display flex
                    align-items center
                    justify-content center
                    width 100%


            .underlineBox
                height 10px
                display flex
                align-content center
                justify-content center

                .underline
                    width 30px
                    height 4px
                    border-radius 2px
                    background-color $system-color-blue

            .underlineBox
                transition 0.2s
</style>
