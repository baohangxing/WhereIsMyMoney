<template>
    <div class="container" :class="{ 'click-animation': animationDisplay }" @click="selectItem">
        <my-icon :name="item.icon" :color="isSelected ? '#ff55ff' : '#333333'" size="26"></my-icon>
        <div class="name">{{ item.name }}</div>
    </div>
</template>

<script>
    export default {
        props: {
            item: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            isSelected: {
                type: Boolean,
                default: false
            },
            defaultType: {
                type: Boolean,
                default: true
            },
            isSetting: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                animationDisplay: false
            };
        },
        methods: {
            selectItem() {
                if(this.isSetting){
                    this.$emit("settingType");
                    return
                }
                let data = {
                    id : this.item.id,
                    defaultType : this.defaultType
                };
                this.$emit("selectItem",data)
            }
        },
        watch: {
            isSelected() {
                this.animationDisplay = this.isSelected;
            }
        }
    };
</script>

<style lang="stylus" scoped>

    .container
        width 70px
        height 100px
        display flex
        flex-direction column
        justify-content center
        align-items center

        .name
            margin-top 8px
            font-size $font-size-ssm
            color $text-color-grey

</style>
