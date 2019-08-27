<template>
    <div class="hello">
        <aplayer ref="aplayer" :audio="audio" :lrcType="3" autoplay fixed/> <!--fixed 吸底模式 mini 迷你模式-->
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                musicUrl: "http://localhost:8090/hugeMusic/searchAplayer",
                audio: [],
            };
        },
        mounted: function () {
            this.axios.get(this.musicUrl,
                {
                    params: {
                        pageNum: 0,
                        pageSize: 10,
                        queryString: "周杰伦"
                    }
                }
            )
                .then((res) => {
                    this.audio = res.data;
                })
                .catch();
        }
    }
</script>

<style scoped>

</style>
