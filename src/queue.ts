let queue: string[] = [];

function get_next(): (string|null) {
    if(queue.length == 0){
        return null;
    }else
    return queue[0];
};

function add_last(VideoId: string) {
    queue.push(VideoId);
};

export default get_next add_last;