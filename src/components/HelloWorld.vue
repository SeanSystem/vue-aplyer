<template>
    <div class="hello">
        <div style="display: inline-block;width: 100%">
            <el-input v-model="query" placeholder="请输入歌曲名或歌手名" style="width: 200px"></el-input>
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
            </div>
        </div>
        <div style="filter:alpha(Opacity=60);-moz-opacity:0.6;opacity: 0.5">
            <aplayer ref="aplayer" :audio="audio" :lrcType="3" autoplay/> <!--fixed 吸底模式 mini 迷你模式-->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                musicUrl: "http://localhost:8090/hugeMusic/searchAplayer",
                randomMusicUrl: "http://localhost:8090/hugeMusic/getRandom",
                audio: [],
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
        methods: {
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
                }
                this.pageNum--;
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
                        this.audio = res.data;
                    })
                    .catch();
            },
            randomSearch() {
                this.axios.get(this.randomMusicUrl,
                    {
                        params: {
                            pageSize: this.pageSize,
                        }
                    }
                )
                    .then((res) => {
                        this.audio = res.data;
                    })
                    // eslint-disable-next-line no-console
                    .catch(e => (console.log(e)));
            },
            allSearch() {
                if (this.query == null) {
                    this.randomSearch();
                } else {
                    this.search();
                }
            }
        },
        mounted: function () {
            this.randomSearch();
        }
    }
</script>

<style>
    .aplayer-list {
        display: block;
        width: 100%;
        height: 360px !important;
    }
</style>
