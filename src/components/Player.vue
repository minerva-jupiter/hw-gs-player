<script setup lang="ts">
import { YoutubeIframe } from '@vue-youtube/component';
import { ref, computed, onUnmounted } from 'vue';

const videoId = ref('1QkKDY1-NN0');
const player = ref<any>(null);
const nowTime = ref(0);
const endTime = ref(0);
const title = ref();
const titleName = ref();
const intervalId = ref<number | null>(null);
const isPlaying = ref(false);

const togglePlay = async () => {
  player.value?.togglePlay(); // change play-pause
};

// Get total time and video title
const onReady = (event: { target: any }) => {
  endTime.value = Math.floor(event.target.getDuration());
  title.value = event.target.getVideoData();
  titleName.value = title.value['title'];
};

// When the playback state is changed
const onStateChange = (event: { target: any; data: number }) => {
  if (event.data === 1) { // start
    isPlaying.value = true; // play-pause-button
    intervalId.value = window.setInterval(() => { // Get current time per 250ms
      nowTime.value = Math.floor(event.target.getCurrentTime());
    }, 250);
  } else if (event.data === 2 || event.data === 0) { // stop (2) or end (0)
    isPlaying.value = false; // play-pause-button
    if (intervalId.value !== null) {
      clearInterval(intervalId.value);
      intervalId.value = null;
    }
  }
};

// Format to mm:ss
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Get formatted time with computed
const formattedNowTime = computed(() => formatTime(nowTime.value));
const formattedEndTime = computed(() => formatTime(endTime.value));

// Clear setInterval when component is destroyed
onUnmounted(() => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
  }
});
</script>

<template>
  <div class="container">
    <youtube-iframe 
      :video-id="videoId"
      :player-vars="{
        autoplay: 1,
        iv_load_policy: 3,
        loop: 1,
        playlist: videoId,
        controls: 0,
        playsinline: 1,
        rel: 0
        }"
      ref="player"
      @ready="onReady" 
      @state-change="onStateChange" />
    <div class="info_box">
      <div class="title">{{ titleName }}</div>
      <div class="album">album name</div>
      <div class="time_container">
        <div class="nowtime">{{ formattedNowTime }}</div>
        <div class="endtime">{{ formattedEndTime }}</div>
      </div>
    </div>
    <button @click="togglePlay" class="play-pause-button">
      <div class="play-pause-icon" :class="{ playing: isPlaying }">
        <div class="bar bar-left"></div>
        <div class="bar bar-right"></div>
      </div>
    </button>
  </div>
</template>

<style scoped>
</style>
