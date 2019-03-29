!(function() {
  var slidesDOM = document.querySelectorAll("[u-slider]");

  slidesDOM.forEach(function(item) {
    var pointer = 0;
    var container = item.children[0];
    var slidesItems = container.children;
    var slidesItemCount = slidesItems.length;
    var isLoop = item.hasAttribute("loop");
    var isAutoplay = item.hasAttribute("autoplay");
    var animateLock = false;
    var humanOp = false;
    var humanOpTimer = null;
    var humanOpReset = function() {
      humanOp = true;
      humanOpTimer && clearTimeout(humanOpTimer);
      humanOpTimer = setTimeout(function() {
        humanOp = false;
      }, 600);
    };

    var slideToPointer = function(p) {
      animateLock = true;
      if (isLoop) {
        if (p < 0) {
          pointer = slidesItemCount - 1;
          var containerTmp = container.cloneNode(true);
          containerTmp.style.transform =
            "translateX(" + -slidesItemCount * 100 + "%)";
          item.prepend(containerTmp);
          container.style.transform = "translateX(100%)";
          setTimeout(function() {
            containerTmp.style.transform =
              "translateX(" + -pointer * 100 + "%)";
            setTimeout(function() {
              container.remove();
              container = containerTmp;
              slidesItems = container.children;
              animateLock = false;
            }, 400);
          }, 1);
          pointerDomList.forEach(function(item) {
            item.style.backgroundColor = "#fff";
          });
          pointerDomList[pointer].style.backgroundColor = "#ff5000";
          return;
        } else if (p > slidesItemCount - 1) {
          pointer = 0;
          var containerTmp = container.cloneNode(true);
          containerTmp.style.transform = "translateX(100%)";
          item.append(containerTmp);
          container.style.transform =
            "translateX(" + -slidesItemCount * 100 + "%)";
          setTimeout(function() {
            containerTmp.style.transform = "translateX(0)";
            setTimeout(function() {
              container.remove();
              container = containerTmp;
              slidesItems = container.children;
              animateLock = false;
            }, 400);
          }, 1);
          pointerDomList.forEach(function(item) {
            item.style.backgroundColor = "#fff";
          });
          pointerDomList[pointer].style.backgroundColor = "#ff5000";
          return;
        } else {
          pointer = p;
        }
      } else {
        if (p < 0) {
          pointer = 0;
        } else if (p > slidesItemCount - 1) {
          pointer = slidesItemCount - 1;
        } else {
          pointer = p;
        }
      }

      container.style.transform = "translateX(" + -pointer * 100 + "%)";
      pointerDomList.forEach(function(item) {
        item.style.backgroundColor = "#fff";
      });
      pointerDomList[pointer].style.backgroundColor = "#ff5000";
      setTimeout(function() {
        animateLock = false;
      }, 400);
    };

    // 设定样式

    item.style.cssText +=
      "position: relative;width: 100%;height: 100%;overflow: hidden;user-select: none;";
    container.style.cssText +=
      "position: absolute;width: 100%;height: 100%;white-space: nowrap;font-size: 0;transition: all ease 0.4s;transform: translateX(0);z-index: 9;";

    for (var i = 0; i < slidesItems.length; i++) {
      slidesItems[i].style.cssText +=
        "position: relative;display: inline-block;width: 100%;height: 100%;font-size: 16px;";
    }

    /*
     *   左右控制器
     */

    var leftPointerDOM = document.createElement("div");
    var rightPointerDOM = document.createElement("div");

    leftPointerDOM.innerText = "<";
    rightPointerDOM.innerText = ">";

    leftPointerDOM.style.cssText =
      "position: absolute;margin: auto;top: 0;bottom: 0;left: -32px;width: 60px;height: 40px;line-height: 40px;background-color: rgba(0,0,0,0.3);border-radius: 20px;cursor: pointer;font-size: 16px;color: white;text-indent: 25px;text-align: center;z-index: 10;transition: all ease .4s;";
    rightPointerDOM.style.cssText =
      "position: absolute;margin: auto;top: 0;bottom: 0;right: -32px;width: 60px;height: 40px;line-height: 40px;background-color: rgba(0,0,0,0.3);border-radius: 20px;cursor: pointer;font-size: 16px;color: white;text-indent: -25px;text-align: center;z-index: 10;transition: all ease .4s;";

    item.appendChild(leftPointerDOM);
    item.appendChild(rightPointerDOM);

    rightPointerDOM.addEventListener("click", function() {
      if (!animateLock) {
        humanOpReset();
        slideToPointer(++pointer);
      }
    });

    leftPointerDOM.addEventListener("click", function() {
      if (!animateLock) {
        humanOpReset();
        slideToPointer(--pointer);
      }
    });

    /*
     *  左右控制器
     */

    /*
     *   点控制器
     */

    var pointCtrlDOM = document.createElement("div");
    var pointCtrlContainerDOM = document.createElement("div");
    var pointerDomList = [];

    for (var i = 0; i < slidesItemCount; i++) {
      pointerDomList.push(document.createElement("a"));
      pointCtrlContainerDOM.appendChild(pointerDomList[i]);
      pointerDomList[i].style.cssText =
        "display: inline-block;margin: 0 2px;background-color: #fff;width: 8px;height: 8px;border-radius: 4px;cursor: pointer;transition: all ease 0.2s;";
      pointerDomList[i].addEventListener(
        "click",
        (function(pointer) {
          return function() {
            humanOpReset();
            slideToPointer(pointer);
          };
        })(i)
      );
    }

    pointCtrlDOM.style.cssText =
      "position: absolute;margin: auto;bottom: 20px;left: 0;right: 0;text-align: center;z-index: 10;";
    pointCtrlContainerDOM.style.cssText =
      "position: relative;display: inline-block;padding: 0 5px 3px;margin: auto;width: auto;border-radius: 5px;background-color: rgba(255,255,255,0.3);";

    pointCtrlDOM.appendChild(pointCtrlContainerDOM);
    item.appendChild(pointCtrlDOM);

    /*
     *   点控制器
     */

    slideToPointer(pointer);

    var t1 = null;
    var t2 = null;
    var autoLoop = function(delay) {
      t1 = setTimeout(function() {
        if (!humanOp) {
          slideToPointer(++pointer);
          autoLoop(delay);
        } else {
          t2 = setInterval(function() {
            if (!humanOp) {
              clearInterval(t2);
              autoLoop(delay);
            }
          }, 200);
        }
      }, delay);
    };

    if (isAutoplay) {
      var autoDelay = item.getAttribute("autoplay");
      autoLoop(autoDelay);
    }

    // hover
    item.addEventListener("mouseover", function() {
      leftPointerDOM.style.opacity = 1;
      rightPointerDOM.style.opacity = 1;
    });

    item.addEventListener("mouseout", function() {
      leftPointerDOM.style.opacity = 0;
      rightPointerDOM.style.opacity = 0;
    });

    // 销毁时释放资源

    item.addEventListener("DOMNodeRemovedFromDocument", function() {
      item = null;
      t1 && clearTimeout(t1);
      t2 && clearInterval(t2);
    });
  });
})();
