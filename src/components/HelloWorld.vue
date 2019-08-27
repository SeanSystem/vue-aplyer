<template>
    <div class="hello">
        <aplayer ref="aplayer" :audio="audio" :lrcType="3" autoplay/> <!--fixed 吸底模式 mini 迷你模式-->
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                musicUrl: "localhost:8090/hugeMusic/search",
                audio: [
                    {
                        name: '东西（Cover：林俊呈）',
                        artist: '纳豆',
                        url: 'https://cdn.moefe.org/music/mp3/thing.mp3',
                        //  cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
                        // lrc: 'https://cdn.moefe.org/music/lrc/thing.lrc',
                    },
                    {
                        name: '响喜乱舞（Cover：MARiA）',
                        artist: '泠鸢yousa',
                        url: 'https://cdn.moefe.org/music/mp3/kyoukiranbu.mp3',
                        // cover: 'https://p1.music.126.net/AUGVPQ_rVrngDH9ocQrn3Q==/109951163613037822.jpg?param=300y300', // prettier-ignore
                        //  lrc: 'https://cdn.moefe.org/music/lrc/kyoukiranbu.lrc',
                    },
                    {
                        name: '啵唧',
                        artist: 'Hanser',
                        url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
                        // cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
                        //   lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc',
                    },
                ]
                ,
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
                    var musicData = res.data;
                    // eslint-disable-next-line no-console
                    console.log(musicData);
                })
                .catch();
        }
    }
</script>

<style scoped>

</style>
