/*
This Script manage the queue for play.
*/


let queue: string[] = [];
let albumTitle: string = "Unknown Album";
let nextSong;

function get_albumTitle(): string {
    return albumTitle;
}

function get_next(): (string|null) {
    if(queue.length == 0){
        console.log("queue was ended");
        return null;
    }else{
    nextSong = queue[0];
    queue.shift();
    console.log("i will play" + nextSong);
    return nextSong;
    }
};

function add_album(VideoIdArray: string[]) {
    queue = VideoIdArray;
}

function del_all() {
   queue = [];
   albumTitle = "Unknown Album";
};

function interrupt(VideoIdArray: string[]) {
    queue = VideoIdArray;
};


export default {get_albumTitle, get_next, add_album, del_all, interrupt};