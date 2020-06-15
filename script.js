$(function () {
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
      artist: "Lou Hoàng",
      name: "Cảm giác lúc ấy sẽ ra sao",
      url: "Musics/1CamGiacLucAySeRaSao.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Đăng Quân Pino",
      name: "Sau chia tay",
      url: "Musics/2SauChiaTay.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Trang",
      name: "Tỉnh giấc khi ông trời còn đang ngủ",
      url: "Musics/3TinhGiacKhiOngTroiDangNgu.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Châu Dương",
      name: "Yêu",
      url: "Musics/4Yeu.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Trang & Phùng Khánh Linh",
      name: "Mẹ ơi cho con về nhà",
      url: "Musics/5MeOiChoConVeNha.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Suni Hạ Linh",
      name: "Không sao mà em đây rồi",
      url: "Musics/6KhongSaoMaEmDayRoi.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Lou Hoàng",
      name: "Là bạn không thể yêu",
      url: "Musics/7LaBanKhongTheYeu.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Tùng",
      name: "Con dế mèn hát vào mùa hạ",
      url: "Musics/8ConDeMenHatVaoMuaHe.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Jsol",
      name: "Giá như em nhìn lại",
      url: "Musics/9GiaNhuEmNhinLai.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Nâu & Dương",
      name: "3 1 0 7",
      url: "Musics/103105-NauDuong.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Trang",
      name: "1000 Km",
      url: "Musics/111000Km.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "1nG & VoVanDuc",
      name: "Ai đưa em về",
      url: "Musics/12AiDuaEmVe.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Xơn & Rica",
      name: "Anh sẽ không đi đâu hết cả",
      url: "Musics/13AnhSeKhongDiDauHetCa.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Kim Tuyên",
      name: "Bản tình ca đơn phương",
      url: "Musics/14BanTinhCaDonPhuong.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Bon",
      name: "Bản tình ca không tựa",
      url: "Musics/15BanTinhCaKhongTua.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Cam & Quỳnh",
      name: "Chết đi cho rồi",
      url: "Musics/16ChetDiChoRoi.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Decade",
      name: "Chiếu thủy",
      url: "Musics/17ChieuThuy.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Suni Hạ Linh",
      name: "Em Đã Biết",
      url: "Musics/18EmDaBiet.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "3T & KayTee",
      name: "Hẹn yêu",
      url: "Musics/19HenYeu.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Khải & Xén",
      name: "Kẻ cô đơn trong thành phố này",
      url: "Musics/20KeCoDonTrongThanhPhoNay.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Thịnh Suy",
      name: "Làm ơn",
      url: "Musics/21LamOn-ThinhSuy.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Giang & QNT",
      name: "Nếu một ngày không xa",
      url: "Musics/22NeuMotNgayKhongXa.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Hoàng Dũng",
      name: "Ngu Nghếch",
      url: "Musics/23NguNghech.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Bozitt",
      name: "Những gì anh nói",
      url: "Musics/24NhungGiAnhNoi.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Củ Cải",
      name: "Sợ em đếch care",
      url: "Musics/25SoEmDechCare.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Yanbi",
      name: "Viết tên em",
      url: "Musics/26VietTenEm.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Clow & Linh Thộn",
      name: "Yêu lại chút thôi",
      url: "Musics/27YeuLaiChutThoi.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
    {
      artist: "Lil Zpoet",
      name: "Yêu từ đâu mà ra",
      url: "Musics/28YeuTuDauMaRa.mp3",
      picture:
        "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
    },
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
    setTimeout(function () {
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
    insTime.text("00:00").css({ left: "0px", "margin-left": "0px" }).fadeOut(0);
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
    buffInterval = setInterval(function () {
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

    sArea.mousemove(function (event) {
      showHover(event);
    });

    sArea.mouseout(hideHover);

    sArea.on("click", playFromClickedPos);

    $(audio).on("timeupdate", updateCurrTime);

    playPreviousTrackButton.on("click", function () {
      selectTrack(-1);
    });
    playNextTrackButton.on("click", function () {
      selectTrack(1);
    });
  }

  initPlayer();
});
