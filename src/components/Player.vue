<script setup lang="ts">
import { YoutubeIframe } from '@vue-youtube/component';
import { ref, computed, onUnmounted } from 'vue';
import queue from '../queue';

let videoId = ref('1QkKDY1-NN0');
const player = ref<any>(null);
const nowTime = ref(0);
const endTime = ref(0);
const title = ref();
let titleName = ref();
const intervalId = ref<number | null>(null);
const isPlaying = ref(false);
let albumTitle = queue.get_albumTitle();

let next_song;

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
  } else if (event.data === 0) { // end(0)
    next_song = queue.get_next();
    if(next_song == null){ //check queue whather exist next song
      isPlaying.value = false;
      if(intervalId.value !== null) {
        clearInterval(intervalId.value);
        intervalId.value = null;
      }
    }else{
      videoId = ref(next_song)
      console.log("Playing song is updated");
    }
  } else if (event.data === 2) { // stop (2)
    isPlaying.value = false; // play-pause-button
    if (intervalId.value !== null) {
      clearInterval(intervalId.value);
      intervalId.value = null;
    }
  }
  albumTitle = queue.get_albumTitle();
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

//it might be caused in updating playing album.
const interval = setInterval(() => {
  const nowSong = queue.get_nowSong();
  if(nowSong != null){
    if(nowSong != videoId.value){
      videoId = ref(nowSong);
      //if not playing, i will play!
    }
  }
}, 100);
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
      <div class="album">{{albumTitle}}</div>
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
