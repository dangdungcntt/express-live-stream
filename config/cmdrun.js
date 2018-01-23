module.exports = {
    runLive: 'ffmpeg -stream_loop ${loop} -re -i "${file}" ${image} -filter_complex "overlay=x=(main_w-overlay_w):y=10,drawtext=text=\'${text}\':fontcolor=white:fontsize=23:x=(w-mod(2*n\\,w+tw)):y=(h-th-15):borderw=3" -acodec libmp3lame -ar 44100 -b:a 128k -pix_fmt yuv420p -profile:v baseline -s 1280x720 -bufsize 6000k -vb 400k -maxrate 1500k -deinterlace -vcodec libx264 -preset veryfast -g 30 -r 60 -f flv "rtmp://rtmp.facebook.com:80/rtmp/${token}"'
}
