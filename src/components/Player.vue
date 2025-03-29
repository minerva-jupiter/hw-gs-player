<script setup lang="ts">
import { YoutubeIframe } from '@vue-youtube/component';
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import queue from '../queue';
import Tracklist from './TrackList.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiRepeatOnce, mdiRepeatOff, mdiStarCheck, mdiStarPlusOutline, mdiSkipPrevious, mdiSkipNext } from '@mdi/js';
import { useI18n } from 'vue-i18n';

// define Emit event
const emit = defineEmits(["update:isFullscreen"]);

// YouTube player instance
const player = ref<any>(null);

// Video time
const nowTime = ref(0);
const endTime = ref(0);
const intervalId = ref<number | null>(null);
const isPlaying = ref(false);

// Album and song info
const { t, locale } = useI18n();
const albumTitle = ref(t(queue.get_albumTitle())); // 初期値を翻訳キーで設定

// 現在の曲名をリアクティブに取得
const songTitle = computed(() => {
  const nowSong = queue.get_nowSong();
  return t(nowSong.SongName); // 翻訳キーを使用して曲名を取得
});

// 言語変更時にアルバムタイトルを更新
watch(locale, () => {
  albumTitle.value = t(queue.get_albumTitle());
});

// Fullscreen mode
const isFullscreen = ref(false);
const animationClass = ref("");
const fscontainer = ref<HTMLDivElement | null>(null);

// Toggle fullscreen mode
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
  emit("update:isFullscreen", isFullscreen.value);
};

// Watch fullscreen state changes
watch(isFullscreen, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    animationClass.value = newVal ? "slide-up" : "slide-down";

    // Remove animation class after transition
    setTimeout(() => {
      animationClass.value = "";
    }, 250);
    adjustScale();
  }
});

// Toggle play/pause
const togglePlay = async () => {
  player.value?.togglePlay();
};

// When player is ready
const onReady = (event: { target: any }) => {
  endTime.value = Math.floor(event.target.getDuration());
};

// Handle video state changes
const onStateChange = (event: { target: any; data: number }) => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }

  if (event.data === 1) { // Playing
    isPlaying.value = true;
    intervalId.value = window.setInterval(() => {
      nowTime.value = Math.floor(event.target.getCurrentTime());
    }, 200);
  } else if (event.data === 0) { // End
    isPlaying.value = false;
    queue.get_next();
  } else if (event.data === 2) { // Paused
    isPlaying.value = false;
  }

  albumTitle.value = t(queue.get_albumTitle()); // 言語変更時にアルバムタイトルを更新
};

// Format time as mm:ss
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Computed formatted time
const formattedNowTime = computed(() => formatTime(nowTime.value));
const formattedEndTime = computed(() => formatTime(endTime.value));

// Adjust scale
const adjustScale = async () => {
  await nextTick();

  if (!isFullscreen.value) { // Reset scale if not full screen
    document.body.style.transform = "";
    document.body.style.transformOrigin = "";
    return;
  }

  if (fscontainer.value) {
    const containerHeight = fscontainer.value.offsetHeight;
    const windowHeight = window.innerHeight;
    const scaleFactor = Math.min(1, windowHeight / containerHeight);

    document.body.style.transform = `scale(${scaleFactor})`; // Apply scale to body
    document.body.style.transformOrigin = "top center"; // scaling origin point
  }
};

// Add event listeners for resize and orientation change
onMounted(() => {
  window.addEventListener("resize", adjustScale); // Recalculate scale when resizing window
  window.addEventListener("orientationchange", adjustScale); // Recalculate scale when changing screen orientation
  adjustScale();
});

// Remove event listeners on unmount
onUnmounted(() => {
  window.removeEventListener("resize", adjustScale);
  window.removeEventListener("orientationchange", adjustScale);
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
  }
});

const renderKey = queue.get_playerRenderKey();

</script>

<template>
  <div class="layout">
    <div 
      ref="fscontainer" 
      :class="[isFullscreen ? 'fscontainer' : 'container', animationClass]" 
      :key="renderKey"
    >
      <youtube-iframe
        :video-id="queue.get_nowSong().videoId"
        :player-vars="{
          autoplay: 1,
          iv_load_policy: 3,
          loop: 0,
          controls: 0,
          playsinline: 1,
          rel: 0
        }"
        ref="player"
        @ready="onReady" 
        @state-change="onStateChange" 
      />

      <div class="info_box">
        <!-- Video title -->
        <div class="title" @click="toggleFullscreen">
          {{ songTitle }}
        </div>

        <!-- Time and album info -->
        <div class="time_container">
          <div class="nowtime">{{ formattedNowTime }}</div>
          <div class="endtime">{{ formattedEndTime }}</div>
          <div class="album" @click="toggleFullscreen">{{ albumTitle }}</div>
        </div> 

        <div class="fs_album_container">
          <div class="fs_album" @click="toggleFullscreen">{{ albumTitle }}</div>
          <div class="fs_loop" @click="queue.onLoopButton()">
            <SvgIcon type="mdi" :path="queue.isLoop.value ? mdiRepeatOnce : mdiRepeatOff" />
          </div>
          <div class="fs_fav" @click="queue.event_favorite(queue.get_nowSong())">
            <SvgIcon type="mdi" :path="queue.isFavorite.value ? mdiStarCheck : mdiStarPlusOutline" />
          </div>
        </div>

        <div class="fs_time_container">
          <div class="nowtime">{{ formattedNowTime }}</div>
          <div class="endtime">{{ formattedEndTime }}</div>
        </div>
      </div>

      <div class="control_box">
        <!-- Prev button -->
        <div class="prev-button" @click="queue.get_next()">
          <SvgIcon type="mdi" :path="mdiSkipPrevious" />
        </div>

        <!-- Play/Pause button -->
        <button @click="togglePlay" class="play-pause-button">
          <div class="play-pause-icon" :class="{ playing: isPlaying }">
            <div class="bar bar-left"></div>
            <div class="bar bar-right"></div>
          </div>
        </button>

        <!-- Next button -->
        <div class="next-button" @click="queue.get_next()">
          <SvgIcon type="mdi" :path="mdiSkipNext" />
        </div>
      </div>
    </div>

    <div 
      :class="[isFullscreen ? 'fstracklist-container' : 'tracklist-container', animationClass]"
    >
      <Tracklist />
    </div>
  </div>
</template>

<style scoped>
@import '../player-style.css';
</style>