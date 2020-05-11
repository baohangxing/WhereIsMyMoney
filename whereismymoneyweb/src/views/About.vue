<template>
    <div class="about-container">
        <nav-header></nav-header>
        <div class="content">
            <div class="app-version-container" v-for="version in  appVersions">
                <div class="title">{{version.title}} <span v-if="version.appVersion">{{version.appVersion}}</span> <a
                    v-if="version.appDownloadLink"
                    :href="version.appDownloadLink">下载链接</a></div>
                <div class="ql-editor" v-html="version.updateTip">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import navHeader from "../components/navHeader";
    import {APP_VERSION_GET_ALL} from "../api/api";
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';

    export default {
        name: "About",
        components: {
            navHeader
        },
        computed: {
            appVersions() {
                return this.$store.state.appVersions;
            }
        },
        mounted() {
            this.getAppVersions();
        },
        methods: {
            getAppVersions() {
                APP_VERSION_GET_ALL().then(data => {
                    this.$store.commit('setAppVersions', data);
                    this.setVersionShow(this.versionSelectedId);
                });
            },
        }
    }
    ;
</script>

<style scoped lang="stylus">
    .about-container
        .content
            width 1000px
            margin 100px auto 0 auto
            .app-version-container
                margin-top 30px
                .title
                    height 40px
                    font-size $font-size-lllg
                    text-align center
                    font-weight bold
                    color $text-color
                    span
                        margin-left 10px
                        font-style italic
                        font-weight normal
                        font-size $font-size-sm
                    a
                        margin-left 15px
                        font-weight normal
                        font-size $font-size-base
</style>
