<template>
    <div id="app" class="app-container">
        <router-view/>
    </div>
</template>
<script>
    export default {
        created() {
            this.$store.commit('refreshDateInfo');
        }
    }
</script>

<style lang="stylus">
    @import "/assets/css/font.css";
    @import "/assets/css/normalize.css"
    html
        height 100%
        width 100%
        margin 0
        padding 0

    body
        height 100%
        width 100%
        margin 0
        padding 0

    .app-container
        height 100%
        width 100%
</style>
