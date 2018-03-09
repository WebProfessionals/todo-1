"use strict";

function ready(cb) {
// ready
  if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    cb();
  } else {
    document.addEventListener("DOMContentLoaded", cb);
  }
}
