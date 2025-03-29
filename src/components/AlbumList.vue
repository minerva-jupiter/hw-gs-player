<script setup lang="ts">
import AlbumList from '../assets/AlbumsList.json';
import queue, { type Queue } from '../queue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

function add_play_album(albumIndex: number) {
  console.log("The Album will play! The Album index is " + albumIndex);
  const albumSongList: Queue[] = AlbumList[albumIndex].songs.map((song) => {
    const queueinter: Queue = { videoId: song.videoId, SongName: t(song.titleKey) };
    return queueinter;
  });
  queue.add_album(albumSongList, t(AlbumList[albumIndex].albumTitleKey));
}
</script>

<template>
  <div class="page">
    <div class="album-container">
      <div v-for="(Album, index) in AlbumList" :key="index">
        <button @click="add_play_album(index)" class="button_album">
          <img :src="Album.albumArt" alt="" />
          <div class="album-title">{{ t(Album.albumTitleKey) }}</div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.album-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(1px, 1vw, 10px);
}

.button_album {
  font-family: "Poppins", "Noto Sans JP", "Helvetica Neue", "Helvetica", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif;
  font-size: clamp(1.5px, calc(3vw - 1px), 15px);
  background: #000000;
  color: #ffffff;
  border: #404040 solid 2px;
  padding: 5px;
  width: 30vw;
  max-width: 200px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button_album img {
  width: 100%;
  height: auto;
}

.album-title {
  margin-top: 5px;
  text-align: center;
}
</style>