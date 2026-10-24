
(function () {
  var vals = {};

  function render() {
    document.querySelectorAll("[data-k]").forEach(function (element) {
      var value = vals[element.getAttribute("data-k")];

      if (value && value.trim()) {
        element.textContent = value.trim();
      } else {
        element.textContent = element.dataset.ph || element.textContent;
      }
    });
  }

  document.querySelectorAll("[data-k]").forEach(function (element) {
    element.dataset.ph = element.textContent;
  });

  document.querySelectorAll("[data-in]").forEach(function (input) {
    input.addEventListener("input", function () {
      vals[input.getAttribute("data-in")] = input.value;
      render();
    });
  });

  function fallback(text) {
    var textarea = document.createElement("textarea");

    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      document.execCommand("copy");
    } catch (error) {}

    document.body.removeChild(textarea);
  }

  document.querySelectorAll("[data-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      var text = document.getElementById(
        button.getAttribute("data-copy")
      ).innerText;

      var success = function () {
        var originalText = button.textContent;

        button.textContent = "Copied ✓";
        button.classList.add("done");

        setTimeout(function () {
          button.textContent = originalText;
          button.classList.remove("done");
        }, 1600);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          success,
          function () {
            fallback(text);
            success();
          }
        );
      } else {
        fallback(text);
        success();
      }
    });
  });
})();
