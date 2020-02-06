$(function() {
  var playerTrack = $("#player-track");
  var bgArtwork = $("#bg-artwork");
  var bgArtworkUrl;
  var albumName = $("#album-name");
  var trackName = $("#track-name");
  var albumArt = $("#album-art"),
    sArea = $("#s-area"),
    seekBar = $("#seek-bar"),
    trackTime = $("#track-time"),
    insTime = $("#ins-time"),
    sHover = $("#s-hover"),
    playPauseButton = $("#play-pause-button"),
    i = playPauseButton.find("i"),
    tProgress = $("#current-time"),
    tTime = $("#track-length"),
    seekT,
    seekLoc,
    seekBarPos,
    cM,
    ctMinutes,
    ctSeconds,
    curMinutes,
    curSeconds,
    durMinutes,
    durSeconds,
    playProgress,
    bTime,
    nTime = 0,
    buffInterval = null,
    tFlag = false;

  var playPreviousTrackButton = $("#play-previous"),
    playNextTrackButton = $("#play-next"),
    currIndex = -1;

  var songs = [
    {
      artist: "Phương",
      name: "Là Em",
      url: "Musics/LaEm-Phuong.mp3",
      picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg"
    },
    {
      artist: "Thịnh Suy",
      name: "Nghe Em",
      url: "Musics/NgheEm.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
      artist: "Chillies",
      name: "Mascara",
      url: "Musics/Mascara-Chillies.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
      artist: "Nâu & Dương",
      name: "3 1 0 5",
      url: "Musics/3105-NauDuong.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
      artist: "Chillies",
      name: "Cảm Ơn Và Xin Lỗi",
      url: "Musics/CamOnVaXinLoi.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
      artist: "Tùa & CM1X",
      name: "Điều Chưa Nói",
      url: "Musics/DieuChuaNoi.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
      artist: "Thịnh Suy",
      name: "Làm Ơn",
      url: "Musics/LamOn-ThinhSuy.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
      artist: "Tùa & CM1X",
      name: "Mình Chẳng Thể Cùng Nhau",
      url: "Musics/MinhChangTheCungNhau.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
      artist: "Tùa & CM1X",
      name: "Ngày Hôm Nay Của Anh Thế Nào",
      url: "Musics/NgayHomNayCuaAnhTheNao.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
      artist: "Chilles",
      name: "Con Đường Song Song",
      url: "Musics/NhungConDuongSongSong.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
      artist: "Lou Hoàng",
      name: "Cảm Giác Lúc Ấy Sẽ Ra Sao",
      url: "Musics/1CamGiacLucAySeRaSao.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
      artist: "Alex Shun & Nguyễn Trọng Đức",
      name: "Ta Có Nên Yêu Nhau",
      url: "Musics/2TaCoNenYeuNhau.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
      artist: "Đăng Quân Pino",
      name: "Sau Chia Tay",
      url: "Musics/3SauChiaTay.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
      artist: "Trang",
      name: "Tỉnh Giấc Khi Ông Trời Đang Ngủ ",
      url: "Musics/5TinhGiacKhiOngTroiDangNgu.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
      artist: "Trang",
      name: "1000 Km",
      url: "Musics/41000Km.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
      artist: "Châu Dương",
      name: "Yêu",
      url: "Musics/6Yeu.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
      artist: "Trang & Phùng Khánh Linh",
      name: "Mẹ Ơi Cho Con Về Nhà",
      url: "Musics/7MeOiChoConVeNha.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
      artist: "Chillies",
      name: "Có Em Đời Bỗng Vui",
      url: "Musics/8CoEmDoiBongVui.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
      artist: "Suni Hạ Linh ft LyLy",
      name: "Không Sao Mà Em Đây Rồi",
      url: "Musics/9KhongSaoMaEmDayRoi.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
      artist: "LyLy",
      name: "Không Yêu Đừng Gây Thương Nhớ",
      url: "Musics/10KhongYeuDungGayThuongNho.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
      artist: "Lou Hoàng",
      name: "Là Bạn Không Thể Yêu",
      url: "Musics/11LaBanKhongTheYeu.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
      artist: "TÙNG ft Trang",
      name: "Con Dế Mèn Hát Vào Mùa Hè",
      url: "Musics/12ConDeMenHatVaoMuaHe.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
      artist: "Ali Hoàng Dương",
      name: "Mơ Một Ngày Không Xa",
      url: "Musics/13MoMotNgayKhongXa.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
      artist: "JSOL ft Viruss",
      name: "Giá Như Em Nhìn Lại",
      url: "Musics/14GiaNhuEmNhinLai.mp3",
      picture:
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    }
  ];

  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }
  songs = shuffle(songs);

  function playPause() {
    setTimeout(function() {
      if (audio.paused) {
        playerTrack.addClass("active");
        albumArt.addClass("active");
        checkBuffering();
        i.attr("class", "fas fa-pause");
        audio.play();
      } else {
        playerTrack.removeClass("active");
        albumArt.removeClass("active");
        clearInterval(buffInterval);
        albumArt.removeClass("buffering");
        i.attr("class", "fas fa-play");
        audio.pause();
      }
    }, 300);
  }

  function showHover(event) {
    seekBarPos = sArea.offset();
    seekT = event.clientX - seekBarPos.left;
    seekLoc = audio.duration * (seekT / sArea.outerWidth());

    sHover.width(seekT);

    cM = seekLoc / 60;

    ctMinutes = Math.floor(cM);
    ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

    if (ctMinutes < 0 || ctSeconds < 0) return;

    if (ctMinutes < 0 || ctSeconds < 0) return;

    if (ctMinutes < 10) ctMinutes = "0" + ctMinutes;
    if (ctSeconds < 10) ctSeconds = "0" + ctSeconds;

    if (isNaN(ctMinutes) || isNaN(ctSeconds)) insTime.text("--:--");
    else insTime.text(ctMinutes + ":" + ctSeconds);

    insTime.css({ left: seekT, "margin-left": "-21px" }).fadeIn(0);
  }

  function hideHover() {
    sHover.width(0);
    insTime
      .text("00:00")
      .css({ left: "0px", "margin-left": "0px" })
      .fadeOut(0);
  }

  function playFromClickedPos() {
    audio.currentTime = seekLoc;
    seekBar.width(seekT);
    hideHover();
  }

  function updateCurrTime() {
    nTime = new Date();
    nTime = nTime.getTime();

    if (!tFlag) {
      tFlag = true;
      trackTime.addClass("active");
    }

    curMinutes = Math.floor(audio.currentTime / 60);
    curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

    durMinutes = Math.floor(audio.duration / 60);
    durSeconds = Math.floor(audio.duration - durMinutes * 60);

    playProgress = (audio.currentTime / audio.duration) * 100;

    if (curMinutes < 10) curMinutes = "0" + curMinutes;
    if (curSeconds < 10) curSeconds = "0" + curSeconds;

    if (durMinutes < 10) durMinutes = "0" + durMinutes;
    if (durSeconds < 10) durSeconds = "0" + durSeconds;

    if (isNaN(curMinutes) || isNaN(curSeconds)) tProgress.text("00:00");
    else tProgress.text(curMinutes + ":" + curSeconds);

    if (isNaN(durMinutes) || isNaN(durSeconds)) tTime.text("00:00");
    else tTime.text(durMinutes + ":" + durSeconds);

    if (
      isNaN(curMinutes) ||
      isNaN(curSeconds) ||
      isNaN(durMinutes) ||
      isNaN(durSeconds)
    )
      trackTime.removeClass("active");
    else trackTime.addClass("active");

    seekBar.width(playProgress + "%");

    if (playProgress == 100) {
      i.attr("class", "fa fa-play");
      seekBar.width(0);
      tProgress.text("00:00");
      albumArt.removeClass("buffering").removeClass("active");
      clearInterval(buffInterval);
      selectTrack(1);
    }
  }

  function checkBuffering() {
    clearInterval(buffInterval);
    buffInterval = setInterval(function() {
      if (nTime == 0 || bTime - nTime > 1000) albumArt.addClass("buffering");
      else albumArt.removeClass("buffering");

      bTime = new Date();
      bTime = bTime.getTime();
    }, 100);
  }

  function selectTrack(flag) {
    if (flag == 0 || flag == 1) ++currIndex;
    else --currIndex;

    if (currIndex > -1 && currIndex < songs.length) {
      if (flag == 0) i.attr("class", "fa fa-play");
      else {
        albumArt.removeClass("buffering");
        i.attr("class", "fa fa-pause");
      }

      seekBar.width(0);
      trackTime.removeClass("active");
      tProgress.text("00:00");
      tTime.text("00:00");

      currAlbum = songs[currIndex].name;
      currTrackName = songs[currIndex].artist;
      currArtwork = songs[currIndex].picture;

      audio.src = songs[currIndex].url;

      nTime = 0;
      bTime = new Date();
      bTime = bTime.getTime();

      if (flag != 0) {
        audio.play();
        playerTrack.addClass("active");
        albumArt.addClass("active");

        clearInterval(buffInterval);
        checkBuffering();
      }

      albumName.text(currAlbum);
      trackName.text(currTrackName);
      $("#album-art img").prop("src", bgArtworkUrl);
    } else {
      if (flag == 0 || flag == 1) --currIndex;
      else ++currIndex;
    }
  }

  function initPlayer() {
    audio = new Audio();

    selectTrack(0);

    audio.loop = false;

    playPauseButton.on("click", playPause);

    sArea.mousemove(function(event) {
      showHover(event);
    });

    sArea.mouseout(hideHover);

    sArea.on("click", playFromClickedPos);

    $(audio).on("timeupdate", updateCurrTime);

    playPreviousTrackButton.on("click", function() {
      selectTrack(-1);
    });
    playNextTrackButton.on("click", function() {
      selectTrack(1);
    });
  }

  initPlayer();
});
