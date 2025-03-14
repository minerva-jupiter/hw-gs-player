<script setup lang="ts">
import { usePlayer } from '@vue-youtube/core';
import { ref } from 'vue';

const videoId = ref('AvPzD7TE8oA');
const youtube = ref();

const { onReady } = usePlayer(videoId, youtube, {
  cookie: false,
  playerVars: {
    mute: 1,
  },
});

onReady((event) => {
  event.target.playVideo();
});
</script>

<template>
  <div class="container">
    <h1>Top</h1>
    <div ref="youtube"></div>
    <div class="title">title</div>
    <div class="artist">artist</div>
    <div class="nowtime">2:13</div>
    <div class="endtime">5:34</div>
  </div>
</template>

<style scoped>
</style>
