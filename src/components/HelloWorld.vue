<template>
    <div class="hello">
        <el-row>
            <el-col :span="4">
                <el-input v-model="query" placeholder="请输入歌曲名或歌手名"></el-input>
            </el-col>
            <el-col :span="5">
                <span>列表数：</span>
                <el-select v-model="pageSize" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </el-col>
        </el-row>
        <div>
            <aplayer ref="aplayer" :audio="audio" :lrcType="3" autoplay fixed/> <!--fixed 吸底模式 mini 迷你模式-->
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
            };
        },
        methods: {
            search() {
                this.axios.get(this.musicUrl,
                    {
                        params: {
                            pageNum: 0,
                            pageSize: this.pageSize,
                            queryString: this.query
                        }
                    }
                )
                    .then((res) => {
                        this.audio = res.data;
                    })
                    .catch();
            }
        },
        mounted: function () {
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
                .catch(e =>(console.log(e)) );
        }
    }
</script>

<style scoped>

</style>
