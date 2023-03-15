  $scrollingArea = $(".output-inner"),
  $scrollbar = $(".scrollbar"),
  height = $scrollingArea.outerHeight(true),    // visible height
  scrollingLength = $scrollingArea.prop("scrollHeight"), // total length to travel
  scrollBarLength = scrollingLength > height ? height * height / scrollingLength : 0;   // Scrollbar height!

// Set initial scrollbar height:
$scrollbar.height(scrollBarLength);

$scrollbar.draggable({
  axis: "y",
  containment: $scrollingArea,
  drag: function (e, ui) {
    var scrollbarOffset = $scrollbar.offset().top - $scrollingArea.offset().top;
    $scrollingArea.scrollTop(scrollingLength / height * scrollbarOffset);
  }
});
// Element scroll:
$scrollingArea.on("scroll", function () {
  $scrollbar.css({ top: $scrollingArea.scrollTop() / height * scrollBarLength });
});

// Function to update scrollbar when content is added:
function updateScrollbar() {
  height = $scrollingArea.outerHeight(true);
  scrollingLength = $scrollingArea.prop("scrollHeight");
  scrollBarLength = scrollingLength > height ? height * height / scrollingLength : 0;
  $scrollbar.height(scrollBarLength);
  if ($scrollingArea.prop('scrollHeight') > height) {
    // Scroll to bottom
    $scrollingArea.scrollTop($scrollingArea.prop('scrollHeight'));
  }
}

// Scrollbar page up\down to edge buttons:
$("#scroll-up-button").on("click", function () {
  $scrollingArea.scrollTop($scrollingArea.scrollTop() - scrollingLength); 
});

$("#scroll-down-button").on("click", function () {
  $scrollingArea.scrollTop($scrollingArea.scrollTop() + scrollingLength); 
});
