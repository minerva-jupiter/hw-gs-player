/*
This Script manage the queue for play.
*/

import { ref } from "vue";


let queue: string[] = [];
let albumTitle: string = "Unknown Album";
let nextSong;
let playerRenderKey = ref(0);
let isLoop: boolean = false;

function get_albumTitle(): string {
    return albumTitle;
}

function get_next(): (string|null) {
    console.log("get_next was called");
    if(isLoop){
        playerRenderKey.value += 1;
        return queue[0];
    } else {
        if(queue.length == 1){
        console.log("queue was ended");
        return null;
        }else{
        nextSong = queue[1];
        queue.shift();
        console.log("i will play" + nextSong);
        playerRenderKey.value += 1;
        return nextSong;
        }
    };
};

function get_nowSong(): (string) {
    return queue[0];
}

function add_album(VideoIdArray: string[],AlbumTitle: string) {
    queue = VideoIdArray;
    albumTitle = AlbumTitle;
    playerRenderKey.value += 1;
}

function del_all() {
   queue = [];
   albumTitle = "Unknown Album";
};

function interrupt(VideoIdArray: string[]) {
    queue = VideoIdArray;
};

function get_playerRenderKey()  {
    return playerRenderKey;
}

function onLoopButton(){
    isLoop = !isLoop;
    console.log("loop is " + isLoop);
}

export default {get_albumTitle, get_next, get_nowSong, add_album, del_all, interrupt, get_playerRenderKey, onLoopButton};