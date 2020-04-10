(function (undefined) {
  "use strict";

  var _global;

  function Carousel(conf) {
    this.config = {
      carousel: null,
      img_container: null,
      width: "100vw",
      offsetWidth: "100vw",
      height: "50vh",
      img_urls: [],
      duration: 3000,
      animation_duration: 1.5,
      iterval_id: null,
      now_index: 0,
      img_doms: [],
    };

    if (conf instanceof Object) {
      for (var prop in conf) {
        this.config[prop] = conf[prop];
      }
    }
  }

  Carousel.prototype = {
    init: function () {
      this.config.carousel.style.width = this.config.width;
      this.config.carousel.style.height = this.config.height;
      this.config.offsetWidth = this.config.carousel.offsetWidth;

      this.config.img_container = new Container(
        this.config.img_urls.length * 100 + "%",
        this.config.height,
        this.config.animation_duration
      ).generateDom();

      for (var i = 0; i < this.config.img_urls.length; i++) {
        var img_dom = new CarouselImg(
          i,
          this.config.img_urls[i],
          this.config.offsetWidth
        ).generateDom();
        this.config.img_doms[i] = img_dom;

        this.config.img_container.appendChild(img_dom);
      }

      this.config.carousel.appendChild(this.config.img_container);
    },
    trigger: function (status) {
      var ins = this;
      if (status) {
        var iterval_id = setInterval(function () {
          if (!ins.config.img_urls[ins.config.now_index]) {
            ins.config.now_index = 0;
          }

          ins.config.img_container.style.left =
            -(ins.config.now_index * 100) + "%";

          ins.config.now_index++;
        }, this.config.duration);

        this.config.iterval_id = iterval_id;
      } else {
        clearInterval(this.config.iterval_id);
      }
    },
    resize:function(){
        for(var i=0;i<this.config.img_doms.length;i++){
            this.config.img_doms[i].style.width=
            this.config.carousel.offsetWidth+"px";
        }
    }
  };

  function Container(width, height, animation_duration) {
    this.width = width;
    this.height = height;
    this.animation_duration = animation_duration;
  }

  Container.prototype = {
    generateDom: function () {
      var container = document.createElement("div");
      container.style.width = this.width;
      container.style.height = this.height;
      container.classList.add("container");
      container.style.transition = "all " + this.animation_duration + "s ease";

      return container;
    },
  };

  function CarouselImg(id, url, width) {
    this.id = id;
    this.src = url;
    this.width = width;
  }

  CarouselImg.prototype = {
    generateDom: function () {
      var img_dom = document.createElement("img");
      img_dom.alt = this.id;
      img_dom.src = this.src;
      img_dom.classList.add("carousel-img");
      img_dom.style.width = this.width + "px";
      img_dom.setAttribute("data-id", this.id);

      return img_dom;
    },
  };

  _global = (function () {
    return this || (0, eval)("this");
  })();

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Carousel;
  } else if (typeof define === "function" && define.amd) {
    define(function () {
      return Carousel;
    });
  } else {
    !("Carousel" in _global) && (_global.Carousel = Carousel);
  }
})();
