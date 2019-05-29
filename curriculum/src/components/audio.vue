<template>
    <div id="audioBox">
        <aplayer
        :music="music"
        mini="true"
        />
        <audio src="/i/horse.ogg" controls="controls">
            Your browser does not support the audio element.
        </audio>
    </div>
</template>
<script>
import VueAplayer from 'vue-aplayer'
export default{
    data(){
        return{
            music:{
                title: 'sadasd',
                artist: '',
                src: '',
                pic: ''
            }
        }
    },
    components:{
        'aplayer':VueAplayer
    }

}
</script>
<style></style>