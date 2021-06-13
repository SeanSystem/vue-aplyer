<template>
    <div class="hello">
        <div style="display: inline-block;width: 100%">
            <el-input v-model="query" @keyup.enter="allSearch" placeholder="请输入歌曲名或歌手名" style="width: 200px"></el-input>
            <div style="margin: 5px;display: inline-block">
                <span>列表数：</span>
                <el-select v-model="pageSize" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div style="margin: 5px;display: inline-block">
                <el-button type="primary" icon="el-icon-search" @click="allSearch">搜索</el-button>
                <el-button type="primary" @click="preSearch">前一页</el-button>
                <el-button type="primary" @click="nextSearch">后一页</el-button>
                <el-tag type="success" style="margin-left: 5px">歌曲总数：{{count}}</el-tag>
            </div>
        </div>
        <div style="filter:alpha(Opacity=60);-moz-opacity:0.6;opacity: 0.5;">
            <a-player ref="player" :music="songList[0]" :list="songList" v-if="flag" :autoplay="true" />
        </div>
    </div>
</template>

<script>
    import Aplayer from 'vue-aplayer'

    export default {
        name: 'HelloWorld',
        components: {
            // eslint-disable-next-line vue/no-unused-components
            'a-player': Aplayer
        },
        data() {
            return {
                flag: false,
                musicUrl: "http://localhost:8090/hugeMusic/searchAplayer",
                randomMusicUrl: "http://localhost:8090/hugeMusic/getRandom",
                musicCountUrl: "http://localhost:8090/hugeMusic/count",
                songList: [],
                count: 0,
                query: null,
                options: [{
                    value: '10',
                    label: '10'
                }, {
                    value: '20',
                    label: '20'
                }, {
                    value: '30',
                    label: '30'
                }, {
                    value: '40',
                    label: '40'
                }, {
                    value: '50',
                    label: '50'
                }],
                pageSize: 10,
                pageNum: 0
            };
        },
        async mounted() {
            await this.musicCount();
            await this.randomSearch();
        },
        created() {
            var lett = this;
            document.onkeydown = function(e) {
                var key = window.event.keyCode;
                if (key == 13) {
                    lett.allSearch();
                }
            }
        },
        methods: {
            async randomSearch() {
                // eslint-disable-next-line no-unused-vars
                const getMusicList = url => this.axios.get(url, {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize
                    }
                });
                let url = this.randomMusicUrl;
                // eslint-disable-next-line no-unused-vars
                let data = await getMusicList(url);
                // eslint-disable-next-line no-console
                this.songList = data.data.list;
                this.flag = true;
            },
            nextSearch() {
                this.pageNum++;
                if (this.query == null) {
                    this.randomSearch();
                } else {
                    this.search();
                }
            },
            preSearch() {
                if (this.pageNum <= 0) {
                    this.pageNum = 0;
                } else {
                    this.pageNum--;
                }
                if (this.query == null) {
                    this.randomSearch();
                } else {
                    this.search();
                }
            },
            search() {
                this.axios.get(this.musicUrl,
                    {
                        params: {
                            pageNum: this.pageNum,
                            pageSize: this.pageSize,
                            queryString: this.query
                        }
                    }
                )
                    .then((res) => {
                        this.songList = res.data.list;
                        this.count = res.data.total;
                    })
                    .catch();
            },
            async musicCount() {
                const getMusicCount = url => this.axios.get(url);
                let url = this.musicCountUrl;
                // eslint-disable-next-line no-unused-vars
                let data = await getMusicCount(url);
                // eslint-disable-next-line no-console
                this.count = data.data;
            },
            allSearch() {
                if (this.query == null) {
                    this.randomSearch();
                } else {
                    this.search();
                }
            }
        },

    }
</script>

<style>
    .aplayer-list {
        display: block;
        width: 100%;
        height: 360px !important;
        overflow-y:scroll !important;
    }
</style>
